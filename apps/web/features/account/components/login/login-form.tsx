'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, ArrowRight, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { loginAction, forgotPasswordAction } from '@/features/account/actions/login.action';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isForgot, setIsForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    setErrorMsg(null);
    startTransition(async () => {
      const result = await loginAction(data.email, data.password);
      // loginAction redireciona em caso de sucesso — só chega aqui em erro
      if (!result.success) setErrorMsg(result.error.message);
    });
  };

  const handleForgot = async () => {
    const email = getValues('email');
    if (!email) { setErrorMsg('Insira seu e-mail acima primeiro.'); return; }
    setForgotLoading(true);
    const result = await forgotPasswordAction(email);
    setForgotLoading(false);
    if (result.success) setForgotSent(true);
    else setErrorMsg(result.message);
  };

  const inputBase =
    'w-full bg-transparent border border-current border-opacity-20 rounded-xl text-sm outline-none focus:border-[var(--color-hrz-red)] focus:border-opacity-60 transition-all px-4 py-3.5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:opacity-40';

  if (forgotSent) {
    return (
      <div className="w-full p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
        <CheckCircle2 className="mx-auto text-emerald-600" size={28} />
        <p className="text-[14px] font-bold text-emerald-800">E-mail enviado!</p>
        <p className="text-[12px] text-emerald-700">Verifique sua caixa de entrada e siga as instruções.</p>
        <button
          onClick={() => { setForgotSent(false); setIsForgot(false); }}
          className="mt-2 text-[11px] font-bold text-[var(--color-hrz-red)] uppercase tracking-widest"
        >
          Voltar ao login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {errorMsg && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 text-red-700 text-[13px] border border-red-200 flex items-start gap-2" role="alert">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="email"
              autoComplete="email"
              placeholder="nome@exemplo.com"
              {...register('email', { required: 'E-mail obrigatório.' })}
              className={`${inputBase} pl-11`}
            />
          </div>
          {errors.email && <p className="text-[10px] text-red-600 font-bold">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">
              Chave Mestra
            </label>
            <button
              type="button"
              onClick={handleForgot}
              disabled={forgotLoading}
              className="text-[10px] font-bold text-[var(--color-hrz-red)] hover:opacity-70 transition-opacity uppercase tracking-widest disabled:opacity-50"
            >
              {forgotLoading ? 'Enviando…' : 'Esqueci a chave'}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              {...register('password', { required: 'Senha obrigatória.' })}
              className={`${inputBase} pl-11`}
            />
          </div>
          {errors.password && <p className="text-[10px] text-red-600 font-bold">{errors.password.message}</p>}
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-xl text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-[var(--color-hrz-red)] text-white hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-[0_6px_20px_rgba(182,25,46,0.25)]"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Autenticando…</>
            ) : (
              <>Acessar Espaço <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}