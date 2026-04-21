// Caminho: packages/ui/components/consent/action.ts
import { CookiePreferences } from "./type";
import { saveConsentAudited, defaultPreferences } from "./storage";

export async function acceptAllConsent() {
  const allAccepted: CookiePreferences = {
    essential: true,
    analytics: true,
    marketing: true,
    personalization: true,
  };
  await saveConsentAudited(allAccepted);
  return allAccepted;
}

export async function rejectOptionalConsent() {
  await saveConsentAudited(defaultPreferences);
  return defaultPreferences;
}

export async function saveCustomConsent(preferences: CookiePreferences) {
  await saveConsentAudited(preferences);
  return preferences;
}