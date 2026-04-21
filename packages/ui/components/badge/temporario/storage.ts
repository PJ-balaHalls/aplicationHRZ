import { TemporarioPayload } from "./type";
// [CORE-HZ] Registra interação em features de ciclo curto (KPI de urgência)
export async function logTemporarioUsage(payload: TemporarioPayload) {
  console.info(`[HORAZION TRACK] Acesso à feature sazonal: ${payload.featureName}`);
}