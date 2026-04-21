// Strip de caracteres não numéricos
export const sanitizeDocument = (doc: string) => doc.replace(/\D/g, '');

export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = sanitizeDocument(cpf);
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cleanCPF.substring(10, 11));
};

export const isValidCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = sanitizeDocument(cnpj);
  if (cleanCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanCNPJ)) return false;
  // Simplificado para o exemplo: Aqui entraria o cálculo real de módulo 11 para CNPJ
  return true; 
};