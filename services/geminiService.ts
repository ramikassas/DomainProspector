import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DomainAppraisal, Lead } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema for Appraisal
const appraisalSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    domainName: { type: Type.STRING },
    estimatedValue: { type: Type.NUMBER, description: "Estimated value in USD" },
    currency: { type: Type.STRING, description: "Always USD" },
    rating: { type: Type.STRING, enum: ['Premium', 'High', 'Moderate', 'Low'] },
    reasoning: { type: Type.STRING, description: "Detailed analysis of why this price was chosen based on length, TLD, keywords, and memorability." },
    marketTrends: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Current market trends relevant to this domain's niche."
    },
    comparableSales: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          domain: { type: Type.STRING },
          price: { type: Type.NUMBER },
          year: { type: Type.NUMBER }
        }
      },
      description: "Real comparable sales from history found via search."
    },
    searchVolume: { type: Type.STRING, description: "Estimated monthly search volume for the keywords." },
    keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["domainName", "estimatedValue", "rating", "reasoning", "comparableSales"]
};

// Schema for Leads
const leadsSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    leads: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          companyName: { type: Type.STRING },
          website: { type: Type.STRING, description: "Current website of the prospect" },
          matchReason: { type: Type.STRING, description: "Why specifically they should buy this domain (e.g. Upgrade, Brand Protection, Exact Match)." },
          matchScore: { type: Type.NUMBER, description: "0 to 100 score of likelihood to buy" },
          contactPerson: { type: Type.STRING, description: "Name of CEO, CMO or Decision Maker" },
          email: { type: Type.STRING, description: "Best guess email or public contact" },
          industry: { type: Type.STRING },
          location: { type: Type.STRING },
          socialLinks: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  }
};

export const appraiseDomain = async (domain: string): Promise<DomainAppraisal> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a strict, professional domain appraisal for: "${domain}".
      
      Use Google Search to find REAL comparable sales and current search volume trends.
      Analyze the TLD value, keyword value, radio test (pronunciation), and brandability.
      
      Be conservative with pricing. Do not overestimate. 
      The goal is to provide a price that an investor might pay (wholesale) vs end-user price (retail). Provide the Retail Price estimate.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: appraisalSchema,
        thinkingConfig: {
            thinkingBudget: 32768
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DomainAppraisal;
    }
    throw new Error("No data returned from appraisal.");
  } catch (error) {
    console.error("Appraisal Error:", error);
    throw error;
  }
};

export const generateLeads = async (domain: string): Promise<Lead[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am a domain broker selling the domain "${domain}".
      
      Find 5-10 high-quality potential buyers (companies) for this domain.
      
      Strategies for finding leads:
      1. Companies with the exact match name but a weaker extension (e.g. .net, .org, -hyphenated).
      2. Companies launching products with this name.
      3. Competitors who might want it for defensive reasons.
      4. Local businesses if it is a geo-domain.
      
      Use Google Search to verify these companies exist.
      Return the data in JSON format.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: leadsSchema
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.leads || [];
    }
    throw new Error("No leads found.");
  } catch (error) {
    console.error("Leads Error:", error);
    throw error;
  }
};

export const verifyLocation = async (companyName: string, city: string) => {
    // Grounding with Maps to verify existence
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Verify the existence of the company "${companyName}" in or near "${city}". Provide a brief 1 sentence confirmation and the address if found.`,
            config: {
                tools: [{ googleMaps: {} }]
            }
        });
        return response.text;
    } catch (e) {
        return "Location verification unavailable.";
    }
}
