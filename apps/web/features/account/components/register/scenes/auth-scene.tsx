

'use client';


import { useFormContext } from 'react-hook-form';
import { Mail, ShieldAlert } from 'lucide-react';


export function AuthScene() {
  const { register, formState: { errors } } = useFormContext();


  const inputStyles =
    'w-full bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-base font-medium text-text-primary placeholder:text-text-secondary/40 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all';


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <p className="text-[13px] text-text-secondary leading-relaxed">
        Insira os endereços eletrônicos primários para governar seu acesso global.
      </p>


      {/* E-MAIL PRIMÁRIO */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">
          E-mail Primário <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/60" />
          <input
            type="email"
            placeholder="nome@exemplo.com"
            {...register('email', {
              required: 'E-mail obrigatório.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido.' },
            })}
            className={`${inputStyles} pl-10 ${errors.email ? 'border-danger/50 focus:border-danger' : ''}`}
          />
        </div>
        {errors.email && (
          <p className="text-[10px] text-danger font-bold uppercase">{errors.email.message as string}</p>
        )}
      </div>


      {/* E-MAIL DE RECUPERAÇÃO */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
          E-mail de Recuperação <ShieldAlert className="w-3 h-3 text-brand" />
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/60" />
          <input
            type="email"
            placeholder="backup@exemplo.com"
            {...register('recovery_email', {
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido.' },
            })}
            className={`${inputStyles} pl-10 ${errors.recovery_email ? 'border-danger/50 focus:border-danger' : ''}`}
          />
        </div>
        {errors.recovery_email && (
          <p className="text-[10px] text-danger font-bold uppercase">{errors.recovery_email.message as string}</p>
        )}
        <p className="text-[10px] text-text-secondary/60">Opcional. Usado para recuperação de conta em caso de perda de acesso.</p>
      </div>
    </div>
  );
}


