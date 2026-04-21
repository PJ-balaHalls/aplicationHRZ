export interface EmBreveBadgeProps {
  /** Nome da funcionalidade futura */
  featureName: string;
  /** Breve descrição do que está por vir para gerar expectativa */
  description?: string;
  /** Data prevista (opcional) para exibição no card */
  expectedRelease?: string;
  /** Se verdadeiro, envolve o componente filho bloqueando seus cliques (Wrapper Mode) */
  isWrapper?: boolean;
  children?: React.ReactNode;
}

export interface TeaserInterestPayload {
  featureName: string;
  userId: string;
  timestamp: string;
}