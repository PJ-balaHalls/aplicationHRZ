export type CookieConsent = {
  essential: boolean; // Sempre true (Auth/JWT)
  analytics: boolean; // Vercel Analytics / Speed Insights
  marketing: boolean;
  version: string;    // Para invalidar consentimentos antigos
  updatedAt: string;
};