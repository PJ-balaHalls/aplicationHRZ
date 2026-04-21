import { BetaFeedbackPayload } from "./type";

// [CORE-HZ] Centralização de I/O de dados da Badge Beta
export async function storeBetaFeedback(payload: BetaFeedbackPayload): Promise<boolean> {
  try {
    // Na arquitetura real, isso passará pelo API Gateway para validação Zero Trust
    // e RLS no banco administrativo (BD-ADMIN)
    console.info(`[HORAZION LOG] Enviando feedback da feature Beta: ${payload.featureName}`);
    
    // Exemplo de payload formatado para o Supabase:
    // await supabaseAdmin.from('beta_feedbacks').insert([payload]);
    
    return true;
  } catch (error) {
    console.error("[HORAZION ERROR] Falha ao registrar feedback beta", error);
    return false;
  }
}