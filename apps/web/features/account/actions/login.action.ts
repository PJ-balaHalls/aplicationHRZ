'use server';

import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export interface LoginResult {
  success: false;
  error: { code: string; message: string };
}

export async function loginAction(
  email: string,
  password: string
): Promise<LoginResult> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    const msg =
      error?.message?.includes('Invalid login credentials')
        ? 'E-mail ou senha incorretos.'
        : error?.message?.includes('Email not confirmed')
        ? 'Confirme seu e-mail antes de acessar. Verifique sua caixa de entrada.'
        : error?.message?.includes('Too many requests')
        ? 'Muitas tentativas. Aguarde alguns minutos.'
        : 'Falha na autenticação. Tente novamente.';

    return { success: false, error: { code: error?.status?.toString() ?? 'AUTH_ERROR', message: msg } };
  }

  // Redireciona para seleção de Hub
  redirect('/hub-selection');
}

export async function forgotPasswordAction(email: string): Promise<{ success: boolean; message: string }> {
  const supabase = await getSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://horazion.com';

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${siteUrl}/auth/reset-password`,
  });

  if (error) {
    return { success: false, message: 'Não foi possível enviar o e-mail. Tente novamente.' };
  }

  return { success: true, message: 'E-mail de recuperação enviado. Verifique sua caixa de entrada.' };
}

export async function logoutAction() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}