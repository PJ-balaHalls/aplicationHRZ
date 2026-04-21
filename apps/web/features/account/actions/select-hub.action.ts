'use server';

// [CORE-HZ-010] Substituição do caminho relativo frágil pelo alias absoluto
import { createSession, verifySession } from '@/lib/auth/jwt';
import { redirect } from 'next/navigation';

export async function selectHubAction(accountId: string, environment: string) {
  const session = await verifySession();
  if (!session) redirect('/login');

  // Atualiza o JWT com o contexto do ambiente selecionado
  await createSession({
    ...session,
    current_account_id: accountId,
    environment: environment,
  });

  // Redireciona para o subdomínio/rota do Hub
  redirect(`/dashboard/${environment.toLowerCase()}`);
}