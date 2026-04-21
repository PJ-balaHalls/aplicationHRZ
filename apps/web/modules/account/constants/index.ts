export const ACCOUNT_LIMITS = {
  INDIVIDUAL: 1,
  EDUCATIONAL: 3,
  ENTERPRISE: 2,
};

export const ENVIRONMENT_THEMES = {
  INDIVIDUAL: { color: '#4CAF50', label: 'Pessoal', hub: 'IND' },
  EDUCATIONAL: { color: '#2196F3', label: 'Educacional', hub: 'EDU' },
  ENTERPRISE: { color: '#9C27B0', label: 'Corporativo', hub: 'CORP' },
};

export const SESSION_TIMEOUTS = {
  SECURE: 15 * 60, // 15 min
  STANDARD: 24 * 60 * 60, // 24h
};