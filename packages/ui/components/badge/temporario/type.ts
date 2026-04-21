export interface TemporarioBadgeProps {
  featureName: string;
  expiryDate: string;
  description?: string;
}
export interface TemporarioPayload { featureName: string; userId: string; timestamp: string; }