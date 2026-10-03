export type PageId = 
  | 'home' 
  | 'information' 
  | 'apps-matrix' 
  | 'parents-guide' 
  | 'livestreaming' 
  | 'legislation' 
  | 'contact-us';

export interface AppPlatform {
  id: string;
  name: string;
  category: 'short-form' | 'messaging' | 'ephemeral' | 'photo';
  company: string;
  activeUsers: string;
  tagline: string;
  score: number;
  threatLevel: 'Moderate Threat' | 'High Threat' | 'Critical Threat' | 'Low Threat' | 'Controlled Risk' | 'Guarded' | 'Monitored';
  threatClass: string;
  auditHash: string;
  version: string;
  threatVector: string;
  threatDescription: string;
  activeDefenseProtocol: string;
  defenseType: string;
  threatBadges: Array<{ label: string; icon: string; color: string }>;
  permissions: Array<{
    id: string;
    name: string;
    description: string;
    locked: boolean;
  }>;
  retentionNote: string;
  auditSummary: string;
}

export interface LegislativeBill {
  id: string;
  jurisdiction: string;
  mandateStatus: string;
  mandateColor: string;
  title: string;
  subTitle: string;
  description: string;
  provisions: Array<{
    title: string;
    text: string;
    icon: string;
    color: string;
  }>;
  target: string;
  actionText: string;
  category: 'data-protection' | 'age-code' | 'intl' | 'schools-creators';
}

export interface CouncilMember {
  name: string;
  age: number;
  role: string;
  roleColor: string;
  bio: string;
  image: string;
}
