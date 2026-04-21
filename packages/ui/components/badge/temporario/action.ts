import { logTemporarioUsage } from "./storage";
export async function handleTemporarioInteraction(featureName: string) {
  await logTemporarioUsage({ featureName, userId: "session_id", timestamp: new Date().toISOString() });
}