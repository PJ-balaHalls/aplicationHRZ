import { setCookie, getCookie } from 'cookies-next';
import { CookieConsent } from './type';

const CONSENT_KEY = 'hrz-consent-v1';

export const getStoredConsent = (): CookieConsent | null => {
  const consent = getCookie(CONSENT_KEY);
  return consent ? JSON.parse(consent as string) : null;
};

export const setStoredConsent = (consent: Partial<CookieConsent>) => {
  const data: CookieConsent = {
    essential: true, // Imutável
    analytics: consent.analytics ?? false,
    marketing: consent.marketing ?? false,
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
  };
  
  setCookie(CONSENT_KEY, JSON.stringify(data), {
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    path: '/',
    sameSite: 'lax',
  });
};