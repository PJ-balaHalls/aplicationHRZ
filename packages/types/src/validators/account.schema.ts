import { z } from 'zod';
import { isValidCPF, isValidCNPJ, sanitizeDocument } from '../../../utils/src/document';

const parseDateSafe = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  if (dateStr.includes('-')) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return isNaN(d.getTime()) ? null : d;
    }
  }
  return null;
};

const calcAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return Math.max(0, age);
};

export const RegisterAccountSchema = z
  .object({
    email: z.string().email('Formato de e-mail inválido.').toLowerCase().trim(),
    recovery_email: z.string().email('E-mail inválido.').toLowerCase().trim().optional().or(z.literal('')),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres.')
      .regex(/[A-Z]/, 'Deve conter maiúscula.')
      .regex(/[a-z]/, 'Deve conter minúscula.')
      .regex(/[0-9]/, 'Deve conter número.')
      .regex(/[^A-Za-z0-9]/, 'Deve conter caractere especial.'),
    confirm_password: z.string().min(1, 'Confirme a senha.'),
    trust_device: z.boolean().optional(),

    tax_id_type: z.enum(['CPF', 'CNPJ']),
    tax_id: z.string().trim().optional().or(z.literal('')).transform((val) => (val ? sanitizeDocument(val) : undefined)),
    legal_name: z.string().min(3, 'Nome civil/legal é obrigatório.').trim(),
    social_name: z.string().trim().optional().or(z.literal('')), // 100% Opcional e aceita vazio
    account_type: z.enum(['INDIVIDUAL', 'EDUCATIONAL', 'ENTERPRISE']),
    account_name: z.string().min(3, 'Defina um nome para o seu universo.').trim(),
    birth_date: z.string()
      .min(8, 'Data de nascimento obrigatória.')
      .refine((v) => parseDateSafe(v) !== null, 'Data inválida.'), 

    horizon_id: z.string().min(3, 'Mínimo 3 caracteres.').regex(/^[a-z0-9_.]+$/, 'Apenas minúsculas, números, _ e .'),
    pronoun: z.string().optional().or(z.literal('')),
    gender: z.string().optional().or(z.literal('')),       // Novo Campo
    sexuality: z.string().optional().or(z.literal('')),    // Novo Campo
    bio: z.string().max(160, 'Bio máximo 160 caracteres.').optional().or(z.literal('')),
    avatar_url: z.string().optional(),
    avatar_name: z.string().optional(),
    avatar_color: z.string().optional(),
    cover_url: z.string().optional(),
    no_photo: z.boolean().optional(),

    postal_code: z.string().optional().or(z.literal('')),
    street_address: z.string().optional().or(z.literal('')),
    address_number: z.string().optional().or(z.literal('')),
    neighborhood: z.string().optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
    state_province: z.string().optional().or(z.literal('')),
    country_code: z.string().default('BR'),
    timezone: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),

    accept_terms: z.literal(true, { errorMap: () => ({ message: 'A aceitação é obrigatória.' }) }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'As senhas não coincidem.', path: ['confirm_password'] });
    }
    const bDate = parseDateSafe(data.birth_date);
    if (bDate) {
      if (data.tax_id && data.tax_id.length > 0) {
        if (data.tax_id_type === 'CPF' && !isValidCPF(data.tax_id)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CPF fornecido é inválido.', path: ['tax_id'] });
        }
        if (data.tax_id_type === 'CNPJ' && !isValidCNPJ(data.tax_id)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CNPJ fornecido é inválido.', path: ['tax_id'] });
        }
      }
    }
    if (!data.avatar_url && !data.no_photo) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Escolha um avatar ou marque "Não quero usar foto".', path: ['avatar_url'] });
    }
  });

export type RegisterAccountInput = z.infer<typeof RegisterAccountSchema>;