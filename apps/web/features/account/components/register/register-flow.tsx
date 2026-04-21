'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2, ShieldCheck, AlertTriangle, Terminal } from 'lucide-react';

import { AuthScene }         from './scenes/auth-scene';
import { SecurityScene }     from './scenes/security-scene';
import { VerificationScene } from './scenes/verification-scene';
import { LegalScene }        from './scenes/legal-scene';
import { ProfileScene }      from './scenes/profile-scene';
import { LocationScene }     from './scenes/location-scene';
import { TermsScene }        from './scenes/terms-scene';
import { SuccessScene }      from './scenes/success-scene';
import type { RegisterSuccessPayload } from '@/features/account/actions/register.action';

const SCENES = [
  { id: 'auth',     component: AuthScene,         title: '01. Identificação de Profile',  fields: ['email', 'recovery_email'] },
  { id: 'security', component: SecurityScene,     title: '02. Segurança',                 fields: ['password', 'confirm_password'] },
  { id: 'verify',   component: VerificationScene, title: '03. Integridade',               fields: ['verificationCode'] },
  { id: 'legal',    component: LegalScene,        title: '04. Raiz Jurídica',             fields: ['tax_id_type', 'tax_id', 'legal_name', 'account_type', 'account_name'] },
  { id: 'profile',  component: ProfileScene,      title: '05. Profile Público',           fields: ['social_name', 'horizon_id', 'birth_date', 'pronoun', 'avatar_url', 'no_photo'] },
  { id: 'location', component: LocationScene,     title: '06. Célula de Origem',          fields: ['postal_code', 'country_code', 'state_province', 'city', 'neighborhood', 'street_address'] },
  { id: 'terms',    component: TermsScene,        title: '07. Acordo Soberano',           fields: ['accept_terms'] },
];

interface RegisterFlowProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isFinalizing: boolean;
  isRegistered: boolean;
  registeredData?: RegisterSuccessPayload['data'];
}

export function RegisterFlow({ onSubmit, isFinalizing, isRegistered, registeredData }: RegisterFlowProps) {
  const [step, setStep] = useState(0);
  const { trigger, formState: { errors, isValidating }, watch, getValues } = useFormContext();

  const currentScene = SCENES[step];
  const isLastScene  = step === SCENES.length - 1;
  const SceneComponent = currentScene.component;
  const progressPercent = Math.round(((step + 1) / SCENES.length) * 100);
  const hasGlobalErrors = isLastScene && Object.keys(errors).filter(k => k !== 'accept_terms').length > 0;

  const goToFirstError = () => {
    const firstErrorField = Object.keys(errors).find(k => k !== 'accept_terms');
    if (firstErrorField) {
      const sceneIndex = SCENES.findIndex(s => s.fields.includes(firstErrorField as any));
      setStep(sceneIndex !== -1 ? sceneIndex : 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const processFlow = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!isLastScene) {
      const isStepValid = await trigger(currentScene.fields as any);
      if (!isStepValid) return;
      setStep(s => Math.min(s + 1, SCENES.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const isFormValid = await trigger();
      if (!isFormValid) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (onSubmit) onSubmit(e as any);
    }
  };

  const prevScene = () => setStep(s => Math.max(s - 1, 0));

  // ── Success ──────────────────────────────────────────────────────────────────
  if (isRegistered) return <SuccessScene registeredData={registeredData} />;

  return (
    <div className="w-full relative space-y-6">
      {/* Header de auditoria */}
      <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-[var(--color-brand)] flex items-center gap-1.5">
            <Terminal size={10} /> CORE-HZ Engine Ativo
          </span>
          <h2 className="text-[12px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
            {currentScene.title}
          </h2>
        </div>
        <span className="text-[11px] font-mono text-[var(--color-text-secondary)] font-bold">
          {step + 1} <span className="opacity-30">/</span> {SCENES.length}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-0.5 bg-[var(--color-border)]/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-brand)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Formulário */}
      <form
        onSubmit={e => { e.preventDefault(); if (isLastScene) processFlow(e); }}
        onKeyDown={e => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') { e.preventDefault(); processFlow(); } }}
        className="flex flex-col gap-2"
      >
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <SceneComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[var(--color-border)] mt-4">

          {hasGlobalErrors && (
            <div className="p-5 bg-red-50/50 border border-red-200 rounded-2xl mb-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle size={14} className="text-red-700" />
                </div>
                <h4 className="text-[12px] font-black text-red-800 uppercase tracking-widest">Divergência Estrutural</h4>
              </div>
              <ul className="text-[11px] font-bold text-red-700 list-disc list-inside space-y-1.5 mb-5 ml-1">
                {Object.entries(errors).map(([field, error]) => {
                  if (field === 'accept_terms') return null;
                  return <li key={field}>{String(error?.message || `Erro em: ${field}`)}</li>;
                })}
              </ul>
              <button type="button" onClick={goToFirstError} className="w-full text-[11px] font-black bg-red-700 text-white py-3.5 rounded-xl uppercase tracking-widest hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
                Retornar à Cena Incorreta <ArrowLeft size={14} />
              </button>
            </div>
          )}

          {!isLastScene ? (
            <button
              type="button"
              onClick={processFlow}
              disabled={isValidating}
              className="w-full bg-[var(--color-text-primary)] text-[var(--color-background)] py-5 rounded-xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform active:scale-95 shadow-md disabled:opacity-50"
            >
              {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Confirmar Dados <ArrowRight className="w-4 h-4" /></>}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isFinalizing || hasGlobalErrors || isValidating}
              className="w-full bg-[var(--color-brand)] text-white py-5 rounded-xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-60 shadow-[0_10px_30px_rgba(182,25,46,0.2)]"
            >
              {isFinalizing || isValidating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando Assinatura…</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Finalizar Cadastro</>
              )}
            </button>
          )}

          {step > 0 && !isFinalizing && (
            <button
              type="button"
              onClick={prevScene}
              className="text-[11px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-2 py-2 outline-none group"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Etapa Anterior
            </button>
          )}
        </div>
      </form>
    </div>
  );
}