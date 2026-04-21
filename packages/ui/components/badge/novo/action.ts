import { logNovoAdoption } from "./storage";
export async function handleNovoInteraction(featureName: string) {
  await logNovoAdoption({ featureName, userId: "session_id", action: "click" });
}