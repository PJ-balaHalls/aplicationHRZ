"use server";

import { getSupabaseAdminClient } from "@/lib/supabase/client";
import { RegisterAccountSchema } from "@horizion/types/src/validators/account.schema";
import type { RegisterAccountInput } from "@horizion/types/src/validators/account.schema";

// ─── Response types ───────────────────────────────────────────────────────────

export interface RegisterSuccessPayload {
  success: true;
  data: {
    horizon_id: string;
    social_name: string;
    email: string;
    account_type: "INDIVIDUAL" | "EDUCATIONAL" | "ENTERPRISE";
    city?: string;
    state_province?: string;
    celestial_group: string;
    access_level: string;
    prestige_score: number;
    profile_id: string;
    account_id: string;
  };
}

export interface RegisterErrorPayload {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
  };
}

export type RegisterResult = RegisterSuccessPayload | RegisterErrorPayload;

// ─── Error code mapping ───────────────────────────────────────────────────────

const ERROR_MAP: Record<string, { message: string; field?: string }> = {
  HORIZON_ID_TAKEN: { message: "Este Horizon ID já está em uso. Escolha outro.", field: "horizon_id" },
  EMAIL_ALREADY_EXISTS: { message: "Este e-mail já possui uma Account. Tente fazer login.", field: "email" },
  CPF_ALREADY_REGISTERED: { message: "Este CPF já está associado a uma Account.", field: "tax_id" },
  CNPJ_ALREADY_REGISTERED: { message: "Este CNPJ já está associado a uma Account.", field: "tax_id" },
  INVALID_TAX_ID: { message: "Documento (CPF/CNPJ) inválido.", field: "tax_id" },
  INTERNAL_ERROR: { message: "Erro interno. Nossa equipe foi notificada. Tente novamente em instantes." },
};

// ─── Main action ──────────────────────────────────────────────────────────────

export async function registerNewUser(
  rawData: RegisterAccountInput
): Promise<RegisterResult> {
  // ── 1. Validate with Zod (Zero Trust) ────────────────────────────────────
  const parsed = RegisterAccountSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: firstError?.message || "Dados inválidos.", field: firstError?.path?.[0]?.toString() },
    };
  }

  const data = parsed.data;

  // ── 2. Get admin client ──────────────────────────────────────────────────
  let supabase: ReturnType<typeof getSupabaseAdminClient>;
  try {
    supabase = getSupabaseAdminClient();
  } catch (err) {
    console.error("[CORE-HZ] Falha ao instanciar cliente Supabase Admin:", err);
    return {
      success: false,
      error: { code: "SERVICE_UNAVAILABLE", message: "Serviço temporariamente indisponível." },
    };
  }

  // ── 3. Verificar ID previamente ──────────────────────────────────────────
  const { data: idCheck } = await supabase.from("profiles").select("horizon_id").eq("horizon_id", data.horizon_id).maybeSingle();
  if (idCheck) {
    return { success: false, error: ERROR_MAP.HORIZON_ID_TAKEN };
  }

  // ========================================================================
  // ── 4. SAGA PATTERN: CRIAÇÃO DE IDENTIDADE (GoTrue) ─────────────────────
  // ========================================================================
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      horizon_id: data.horizon_id,
      social_name: data.social_name,
    }
  });

  if (authError || !authData.user) {
    console.error("[CORE-HZ] Erro ao criar usuário GoTrue:", authError);
    if (authError?.message.includes('already exists')) {
      return { success: false, error: ERROR_MAP.EMAIL_ALREADY_EXISTS };
    }
    return { success: false, error: { code: "AUTH_ERROR", message: "Falha ao criar credenciais de acesso." } };
  }

  const userId = authData.user.id;

  // ========================================================================
  // ── 5. SAGA PATTERN: INSERÇÃO ATÔMICA DE DOMÍNIO (RPC) ──────────────────
  // ========================================================================
  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "setup_horazion_account",
    {
      p_user_id: userId,
      p_tax_id_type: data.tax_id_type,
      p_tax_id: data.tax_id || null,
      p_legal_name: data.legal_name,
      p_account_type: data.account_type,
      p_account_name: data.account_name,
      p_social_name: data.social_name,
      p_horizon_id: data.horizon_id,
      p_birth_date: data.birth_date,
      p_pronoun: data.pronoun,
      p_bio: data.bio || null,
      p_avatar_url: data.avatar_url || null,
      p_avatar_name: data.avatar_name || null,
      p_avatar_color: data.avatar_color || null,
      p_cover_url: data.cover_url || null,
      p_no_photo: data.no_photo ?? false,
      p_postal_code: data.postal_code || null,
      p_street_address: data.street_address || null,
      p_address_number: data.address_number || null,
      p_neighborhood: data.neighborhood || null,
      p_city: data.city || null,
      p_state_province: data.state_province || null,
      p_country_code: data.country_code,
      p_timezone: data.timezone || "America/Sao_Paulo",
      p_latitude: data.latitude || null,
      p_longitude: data.longitude || null,
    }
  );

  // ========================================================================
  // ── 6. SAGA PATTERN: ROLLBACK (Compensação em caso de falha) ────────────
  // ========================================================================
  if (rpcError) {
    console.error("[CORE-HZ] RPC setup_horazion_account erro. Iniciando ROLLBACK.", rpcError);
    await supabase.auth.admin.deleteUser(userId); // APAGA O USUÁRIO DO BANCO

    return { success: false, error: ERROR_MAP.INTERNAL_ERROR };
  }

  const result = rpcResult as any;

  if (result && result.error_code) {
    console.error("[CORE-HZ] RPC reportou divergência estrutural. Iniciando ROLLBACK.", result);
    await supabase.auth.admin.deleteUser(userId); // APAGA O USUÁRIO DO BANCO
    
    const mapped = ERROR_MAP[result.error_code as string] || ERROR_MAP.INTERNAL_ERROR;
    return { success: false, error: { code: result.error_code, message: result.error_message || mapped.message, field: mapped.field } };
  }

  // ── 7. Transação Confirmada ─────────────────────────────────────────────
  return {
    success: true,
    data: {
      horizon_id: result.horizon_id || data.horizon_id,
      social_name: result.social_name || data.social_name,
      email: data.email,
      account_type: data.account_type,
      city: data.city || undefined,
      state_province: data.state_province || undefined,
      celestial_group: result.celestial_group || "COMET",
      access_level: result.access_level || "SIGMA",
      prestige_score: result.prestige_score ?? 0,
      profile_id: result.profile_id || "",
      account_id: result.account_id || "",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export async function checkHorizonIdAvailability(
  horizonId: string
): Promise<{ available: boolean; message?: string }> {
  if (!horizonId || horizonId.length < 3) return { available: false, message: "Mínimo 3 caracteres." };
  if (!/^[a-z0-9_.]+$/.test(horizonId)) return { available: false, message: "Apenas letras minúsculas, números, _ e ." };

  const RESERVED = ["admin", "horazion", "horizion", "suporte", "system", "horazion_core"];
  if (RESERVED.includes(horizonId.toLowerCase())) return { available: false, message: "Este ID está reservado." };

  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase.from("profiles").select("horizon_id").eq("horizon_id", horizonId).maybeSingle();
    return { available: !data, message: data ? "Este Horizon ID já está em uso." : undefined };
  } catch (err) {
    return { available: false, message: "Serviço indisponível." };
  }
}