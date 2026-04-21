/**
 * Analisa o array de pronomes do usuário e retorna os sufixos de gênero apropriados.
 * Aplica-se ao Minimalismo Funcional: a interface se ajusta silenciosamente.
 */
export function getGenderedGreeting(pronouns: string[]): {
  welcome: string;
  article: string;
  adjectiveSuffix: string;
} {
  const isFemale = pronouns.includes('ela/dela');
  const isNeutral = pronouns.includes('elu/delu') || pronouns.includes('ile/dile');
  
  if (isFemale) return { welcome: 'Bem-vinda', article: 'a', adjectiveSuffix: 'a' };
  if (isNeutral) return { welcome: 'Bem-vinde', article: 'e', adjectiveSuffix: 'e' };
  
  // Default (Masculino / Não especificado)
  return { welcome: 'Bem-vindo', article: 'o', adjectiveSuffix: 'o' };
}

/**
 * Retorna saudação baseada no timezone do usuário, evitando o uso de relógios locais incorretos.
 */
export function getTimeBasedGreeting(timezone: string = 'America/Sao_Paulo'): string {
  const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: timezone, hour: 'numeric', hour12: false });
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
}