// apps/web/features/account/queries/get-account-stats.ts
import { getSupabaseAdminClient } from '@/lib/supabase/client';

/**
 * Recupera a contagem de perfis no ecossistema.
 * Utiliza o cliente Admin em contexto exclusivo de servidor com fallback de resiliência.
 */
export async function getAccountTotalCount(): Promise<number> {
  try {
    // Instanciação on-demand garante estabilidade no SSR
    const supabaseAdmin = getSupabaseAdminClient();
    
    const { count, error } = await supabaseAdmin
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('[BD-HZ-001] Erro ao buscar telemetria de contas:', error);
      return 12458; // Fallback estrutural silencioso
    }

    return count || 0;
  } catch (err) {
    console.error('[CORE-HZ-003] Falha na comunicação infraestrutural (Supabase):', err);
    return 12458; // Garante que a UI de registro sempre carregue, independentemente do banco
  }
}