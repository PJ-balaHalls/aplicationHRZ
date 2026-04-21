// Define as regras de negócio e tipagem estrita para a Badge Beta
export interface BetaBadgeProps {
  /** Nome da funcionalidade em fase de maturação */
  featureName: string;
  /** Restringe a visibilidade para grupos específicos. Se vazio, é público. */
  allowedGroups?: string[];
  /** Nível de maturidade da feature para categorização de logs */
  maturityLevel?: "early-beta" | "late-beta";
}

export interface BetaFeedbackPayload {
  featureName: string;
  userId: string;
  feedbackText: string;
  errorReported: boolean;
  timestamp: string;
}