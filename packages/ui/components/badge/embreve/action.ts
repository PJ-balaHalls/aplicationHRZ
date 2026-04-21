import { logTeaserInterest } from "./storage";

// [CORE-HZ] Cérebro do Em Breve: Bloqueia e Rastreia
export async function handleEmBreveClick(e: React.MouseEvent, featureName: string) {
  // Previne que o clique vaze para o botão/link que está por baixo ou ao lado
  e.preventDefault();
  e.stopPropagation();

  // Simulação do ID do usuário via Contexto (Zero Trust Architecture)
  const userId = "user_session_id"; 

  await logTeaserInterest({
    featureName,
    userId,
    timestamp: new Date().toISOString(),
  });
}