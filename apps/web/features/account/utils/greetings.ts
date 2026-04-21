// [CORE-HZ-014] Contrato de dados alinhado com a desestruturação do Hub Selection
export function getTimeBasedGreeting(timezone?: string): string {
  // Em uma implementação avançada, usaremos o timezone do usuário. 
  // Por enquanto, resolvemos com a hora local do servidor/cliente.
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function getGenderedGreeting(pronouns?: string[] | string | null): { 
  welcome: string; 
  adjectiveSuffix: string; 
} {
  // Fallback para quando o usuário não definiu pronomes
  if (!pronouns || pronouns.length === 0) {
    return { welcome: 'Boas-vindas', adjectiveSuffix: '(a)' };
  }
  
  const p = Array.isArray(pronouns) 
    ? pronouns.join(' ').toLowerCase() 
    : pronouns.toLowerCase();
    
  if (p.includes('ela') || p.includes('a')) {
    return { welcome: 'Bem-vinda', adjectiveSuffix: 'a' };
  }
  
  if (p.includes('ele') || p.includes('o')) {
    return { welcome: 'Bem-vindo', adjectiveSuffix: 'o' };
  }
  
  // Tratamento para pronomes neutros ou customizados
  return { welcome: 'Boas-vindas', adjectiveSuffix: 'e' };
}