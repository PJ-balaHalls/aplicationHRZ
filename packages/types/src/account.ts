// Identificadores Canônicos
export type HorizonID = string; // Formato: HRZ-[GRUPO]-[ANO]-[RANDOM]
export type UUID = string;

// Taxonomia Celestial
export enum CelestialGroup {
  SIRIUS = 'SIRIUS', // Staff
  SUN = 'SUN',       // B2C Paid
  POLARIS = 'POLARIS', // B2B Enterprise
  VEGA = 'VEGA',     // Partner
  COMET = 'COMET',   // Trial
  RIGEL = 'RIGEL'    // Guest
}

export enum AccessLevel {
  ALFA = 'ALFA',   // Read
  BETA = 'BETA',   // Test
  SIGMA = 'SIGMA', // Write (Standard)
  OMEGA = 'OMEGA'  // Admin
}

export enum ConstellationDomain {
  EDU = 'EDU',
  CORP = 'CORP',
  IND = 'IND'
}

// Interfaces de Entidade
export interface Profile {
  id: UUID;
  horizon_id: HorizonID;
  legal_name: string;
  social_name: string;
  celestial_group: CelestialGroup;
  access_level: AccessLevel;
  constellation_code?: string;
  constellation_domain?: ConstellationDomain;
  prestige_score: number;
  avatar_url?: string;
  status: 'active' | 'pending_verification' | 'suspended' | 'dormant';
}

export interface Account {
  id: UUID;
  type: 'INDIVIDUAL' | 'EDUCATIONAL' | 'ENTERPRISE';
  name: string;
  slug: string;
  role: 'owner' | 'admin' | 'member';
  organization_id?: UUID;
}