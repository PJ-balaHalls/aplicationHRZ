import { createBrowserClient } from '@supabase/ssr';
import { createClient as createServerClient } from '@supabase/supabase-js';

// ─── ATENÇÃO: Ambos apontam para BD HORAZION (rrjnzrjsoaxofhmovmvm) ──────────
// O projeto ADMIN (xuhtxsbpztccweqqjcvd) é para administração interna, não para
// operações do app. Use SUPABASE_URL e SERVICE_ROLE_KEY do BD HORAZION.
//
// Variáveis necessárias no .env / Vercel:
//   NEXT_PUBLIC_SUPABASE_URL=https://rrjnzrjsoaxofhmovmvm.supabase.co
//   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<anon key do BD HORAZION>
//   SUPABASE_SERVICE_ROLE_KEY=<service_role key do BD HORAZION>
// ─────────────────────────────────────────────────────────────────────────────

export const getSupabaseBrowserClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
};

export const getSupabaseAdminClient = () => {
  // Zero Trust: nunca instanciar no frontend
  if (typeof window !== 'undefined') {
    throw new Error('[SEC-HZ] Violação de Arquitetura: Tentativa de instanciar cliente Admin no Frontend.');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      '[CORE-HZ] CONFIGURAÇÃO_AUSENTE: Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY apontando para o BD HORAZION (rrjnzrjsoaxofhmovmvm).'
    );
  }

  return createServerClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};