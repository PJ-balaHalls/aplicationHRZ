

'use client';


import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff, ShieldCheck, Laptop, Check, AlertCircle } from 'lucide-react';


export function SecurityScene() {
  const { register, watch, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);


  const passwordValue = watch('password') || '';
  const confirmValue = watch('confirm_password') || '';


  const rules = {
    length: passwordValue.length >= 8,
    upperLower: /[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue),
    numberSpecial: /[0-9]/.test(passwordValue) && /[^A-Za-z0-9]/.test(passwordValue),
  };
  const strengthScore = Object.values(rules).filter(Boolean).length;
  const strengthPercentage = (strengthScore / 3) * 100;
  let strengthColor = 'bg-border';
  if (strengthScore === 1) strengthColor = 'bg-danger';
  if (strengthScore === 2) strengthColor = 'bg-warning';
  if (strengthScore === 3) strengthColor = 'bg-success';


  // Verificação em tempo real se senhas coincidem
  const passwordsMatch = confirmValue.length > 0 && passwordValue === confirmValue;
  const passwordsMismatch = confirmValue.length > 0 && passwordValue !== confirmValue;


  const inputStyles =
    'w-full bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-base font-medium text-text-primary placeholder:text-text-secondary/40 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all';


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">


      {/* CAMPO DE SENHA */}
      <div className="space-y-3">
        <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-text-secondary flex justify-between">
          <span>Criptografia Primária <span className="text-danger">*</span></span>
          {strengthScore === 3 && <span className="text-success flex items-center gap-1"><Check size={12} /> Forte</span>}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Senha obrigatória.' })}
            className={`${inputStyles} pr-12 ${errors.password ? 'border-danger/50' : ''}`}
            placeholder="Estabeleça sua senha..."
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-2 rounded-md transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-[10px] text-danger font-bold uppercase">{errors.password.message as string}</p>}


        {/* Barra de Força */}
        <div className="pt-1">
          <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ease-out ${strengthColor}`} style={{ width: `${strengthPercentage}%` }} />
          </div>
          <div className="flex justify-between items-center mt-2 text-[10px] font-mono tracking-tight text-text-secondary/70">
            <span className={rules.length ? 'text-text-primary font-bold' : ''}>8+ Chars</span>
            <span className={rules.upperLower ? 'text-text-primary font-bold' : ''}>A-a</span>
            <span className={rules.numberSpecial ? 'text-text-primary font-bold' : ''}>0-9 & #$%</span>
          </div>
        </div>
      </div>


      {/* CONFIRMAÇÃO DE SENHA */}
      <div className="space-y-3">
        <label htmlFor="confirm_password" className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
          Confirmar Senha <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <input
            id="confirm_password"
            type={showPassword ? 'text' : 'password'}
            {...register('confirm_password', {
              required: 'Confirmação obrigatória.',
              validate: (val) => val === watch('password') || 'As senhas não coincidem.',
            })}
            className={`${inputStyles} pr-10 ${passwordsMismatch || errors.confirm_password ? 'border-danger/50 focus:border-danger focus:ring-danger/20' : passwordsMatch ? 'border-success/50' : ''}`}
            placeholder="Confirme a senha..."
          />
          {passwordsMatch && (
            <Check size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-success" />
          )}
          {passwordsMismatch && (
            <AlertCircle size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-danger" />
          )}
        </div>
        {(errors.confirm_password || passwordsMismatch) && (
          <p className="text-[10px] text-danger font-bold uppercase">
            {(errors.confirm_password?.message as string) || 'As senhas não coincidem.'}
          </p>
        )}
      </div>


      {/* DEVICE TRUST */}
      <div className="pt-2 flex items-start gap-4">
        <div className="flex items-center h-6">
          <input
            id="trustDevice"
            type="checkbox"
            {...register('trust_device')}
            className="w-4 h-4 rounded border-border/80 text-brand focus:ring-brand bg-surface cursor-pointer"
          />
        </div>
        <div className="flex flex-col pt-0.5">
          <label htmlFor="trustDevice" className="text-[13px] font-bold text-text-primary cursor-pointer flex items-center gap-2 select-none">
            <Laptop size={14} className="text-text-secondary" /> Confiar neste dispositivo
          </label>
          <p className="text-[11px] text-text-secondary leading-relaxed mt-1.5 max-w-[90%]">
            Evita verificações MFA constantes por 30 dias. Apenas em aparelhos privados.
          </p>
        </div>
      </div>


      <div className="pt-4 flex items-center gap-2 opacity-50 justify-center">
        <ShieldCheck size={12} className="text-text-primary" />
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-text-primary">
          SHA-256 Encrypted Tunnel
        </span>
      </div>
    </div>
  );
}


