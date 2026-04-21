import { NovoPayload } from "./type";
export async function logNovoAdoption(payload: NovoPayload) {
  console.info(`[HORAZION TRACK] Nova adesão mapeada: ${payload.featureName}`);
}