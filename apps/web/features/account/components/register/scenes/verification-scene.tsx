'use client';

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ShieldAlert, RefreshCw, Zap } from 'lucide-react';

export function VerificationScene() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  
  // Captura o e-mail preenchido na Cena 01 para dar contexto ao usuário
  const email = watch('email') || 'seu canal primário';
  
  // Controle de Anti-Spam para reenvio de Token (Mock funcional)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    // Aqui entrará a lógica real de chamada à API de Auth/OTP da Horazion
    setCountdown(60);
    setCanResend(false);
  };

  // Padrão de Input adaptado para códigos: Centralizado, monoespaçado e largo
  const inputStyles = "w-full bg-surface/30 border border-border/60 px-4 py-4 rounded-xl text-[24px] font-mono font-bold text-center text-text-primary tracking-[0.5em] placeholder:text-text-secondary/30 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* HEADER DA CENA */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-surface/50 border border-border/40 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Zap size={20} className="text-brand" />
        </div>
        <h3 className="text-base font-bold text-text-primary uppercase tracking-widest">
          Verificação de Integridade
        </h3>
        <p className="text-[12px] text-text-secondary leading-relaxed max-w-[90%] mx-auto">
          Um token criptográfico de 6 dígitos foi despachado para <strong className="text-text-primary font-mono">{email}</strong>.
        </p>
      </div>

      {/* INPUT DO TOKEN (OTP) */}
      <div className="space-y-2">
        <label htmlFor="verificationCode" className="sr-only">Código de Verificação</label>
        <input
          id="verificationCode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          {...register('verificationCode', { 
            required: "A validação do token é obrigatória.",
            pattern: { value: /^[0-9]{6}$/, message: "O token deve ser composto exatamente por 6 números." }
          })}
          aria-invalid={errors.verificationCode ? "true" : "false"}
          className={`${inputStyles} ${errors.verificationCode ? 'border-danger/50 focus:border-danger focus:ring-danger/20' : ''}`}
          placeholder="000000"
          onChange={(e) => {
            // Zero Trust no Input: Impede que o usuário digite letras, forçando o cast para numérico
            const val = e.target.value.replace(/[^0-9]/g, '');
            setValue('verificationCode', val, { shouldValidate: true });
          }}
        />
        {errors.verificationCode && (
          <p className="text-[11px] text-danger font-bold text-center mt-2" role="alert">
            {errors.verificationCode.message as string}
          </p>
        )}
      </div>

      {/* AÇÕES DE REENVIO */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand rounded px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed text-text-secondary hover:text-text-primary"
        >
          <RefreshCw size={12} className={!canResend ? "animate-spin" : ""} style={{ animationDuration: '3s' }} />
          {canResend ? 'Solicitar novo rastreio (Token)' : `Novo token disponível em ${countdown}s`}
        </button>
      </div>

      {/* BADGE DE SEGURANÇA SILENCIOSA */}
      <div className="pt-2 flex items-center gap-2 opacity-50 justify-center">
        <ShieldAlert size={12} className="text-text-primary" />
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-text-primary">
          Token Expirável (10 Minutos)
        </span>
      </div>

    </div>
  );
}