import { TeaserInterestPayload } from "./type";

// [CORE-HZ] Registra o interesse (KPI de antecipação) sem expor dados reais
export async function logTeaserInterest(payload: TeaserInterestPayload): Promise<void> {
  try {
    // Integração futura via API Gateway (BD-ADMIN)
    console.info(`[HORAZION TRACK] Interesse registrado para a feature futura: ${payload.featureName}`);
  } catch (error) {
    console.error("[HORAZION ERROR] Falha ao registrar interesse em feature futura.", error);
  }
}