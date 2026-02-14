export interface DomainAppraisal {
  domainName: string;
  estimatedValue: number;
  currency: string;
  rating: 'Premium' | 'High' | 'Moderate' | 'Low';
  reasoning: string;
  marketTrends: string[];
  comparableSales: {
    domain: string;
    price: number;
    year: number;
  }[];
  searchVolume: string;
  keywords: string[];
}

export interface Lead {
  companyName: string;
  website: string;
  matchReason: string; // Why they need this domain
  matchScore: number; // 0-100
  contactPerson?: string;
  email?: string; // Generic or specific
  industry: string;
  location: string;
  socialLinks?: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export enum ViewState {
  HOME = 'HOME',
  APPRAISAL = 'APPRAISAL',
  LEADS = 'LEADS',
  EDUCATION = 'EDUCATION'
}