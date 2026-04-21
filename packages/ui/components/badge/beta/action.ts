import { storeBetaFeedback } from "./storage";

// [CORE-HZ] Lógica de ação separada da interface
export async function handleBetaInteraction(featureName: string, userId: string = "anonymous") {
  // Gatilho 1: Log de interação passiva (Monitoramento de adesão)
  console.log(`[HORAZION TRACK] Usuário ${userId} interagiu com a badge Beta de ${featureName}`);
}

export async function submitBetaFeedback(featureName: string, text: string, hasError: boolean) {
  // Gatilho 2: Envio ativo de feedback e relato de erros
  const payload = {
    featureName,
    userId: "user_session_id", // Substituir pelo HorizionID do contexto global
    feedbackText: text,
    errorReported: hasError,
    timestamp: new Date().toISOString(),
  };

  const success = await storeBetaFeedback(payload);
  return success;
}