export interface NovoBadgeProps { featureName: string; description: string; }
export interface NovoPayload { featureName: string; userId: string; action: "view" | "click"; }