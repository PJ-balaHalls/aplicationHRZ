'use client';

import React, { useState, useEffect } from 'react';
import { getStoredConsent, setStoredConsent } from './storage';
import { Button, cn } from '../button/button';

// --- Ícones de Alta Fidelidade (Traços de 1.5px) ---
const Icons = {
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Activity: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  ),
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
  )
};

// --- Switch Customizado ---
// Utilizando cn() e as cores da sua paleta
const CustomSwitch = ({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    type="button"
    onClick={onChange}
    disabled={disabled}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 focus-visible:outline-none",
      checked ? "bg-[var(--color-hrz-red)]" : "bg-neutral-400 dark:bg-neutral-600",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    <span className={cn(
      "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300",
      checked ? "translate-x-5" : "translate-x-0.5"
    )} />
  </button>
);

export function CookieConsentDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'summary' | 'details'>('summary');
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (type: 'all' | 'essential' | 'custom') => {
    const data = {
      all: { analytics: true, marketing: true },
      essential: { analytics: false, marketing: false },
      custom: preferences
    }[type];

    setStoredConsent(data);
    setIsOpen(false);
    setTimeout(() => window.location.reload(), 400);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Escurecido e Desfocado */}
      <div className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-[4px] animate-in fade-in duration-500" />

      {/* Container Principal do Drawer (Alinhado à base) */}
      <div className="fixed inset-x-0 bottom-0 z-[999] flex flex-col items-center justify-end p-0 sm:p-4 pointer-events-none">
        
        {/* Corpo do Drawer */}
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] w-full max-w-5xl rounded-t-[2rem] sm:rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-bottom-full duration-700 ease-out">
          
          {/* Indicador de "Puxar" para Mobile */}
          <div className="w-full flex justify-center py-4 sm:hidden">
            <div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
          </div>

          <div className="px-6 sm:px-12 pb-10 sm:pb-12 pt-2 sm:pt-12">
            
            {view === 'summary' ? (
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
                
                {/* Textos */}
                <div className="flex-1 space-y-5">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight">
                    Privacidade & <br />
                    <span className="text-[var(--color-hrz-red)]">Governança Digital</span>
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl">
                    O <strong>Sistema Operacional Horazoin</strong> utiliza infraestrutura invisível para unificar sua jornada. Escolha como deseja conectar seus dados de educação, finanças e carreira com segurança ISO 42001.
                  </p>
                </div>

                {/* Botões - Utilizando o Design System corretamente */}
                <div className="flex flex-col gap-3 w-full lg:w-[300px] shrink-0">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => handleAction('all')}
                    className="w-full font-bold shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Aceitar Tudo e Evoluir
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => handleAction('essential')}
                    className="w-full font-semibold"
                  >
                    Apenas Essenciais
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    size="md"
                    onClick={() => setView('details')}
                    className="w-full font-medium"
                  >
                    Personalizar Preferências
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                
                {/* Header dos Detalhes */}
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Gerenciar Soberania</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setView('summary')} 
                    className="font-bold text-[var(--color-hrz-red)]"
                  >
                    Voltar
                  </Button>
                </div>

                {/* Cards de Opções */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card: Essencial */}
                  <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-emerald-500"><Icons.Shield /></div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">Obrigatório</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">Identidade Digital</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        Fundamental para o Single Sign-On e segurança da plataforma. Não pode ser desativado.
                      </p>
                    </div>
                  </div>

                  {/* Card: Analytics */}
                  <div className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 space-y-4",
                    preferences.analytics ? "border-[var(--color-hrz-red)] bg-[var(--color-surface)]" : "border-[var(--color-border)] bg-transparent"
                  )}>
                    <div className="flex justify-between items-center">
                      <div className={preferences.analytics ? "text-[var(--color-hrz-red)]" : "text-[var(--color-text-secondary)]"}><Icons.Activity /></div>
                      <CustomSwitch checked={preferences.analytics} onChange={() => setPreferences(p => ({...p, analytics: !p.analytics}))} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">Evolução da IA</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        Métricas de performance para que nossa inteligência otimize sua interface continuamente.
                      </p>
                    </div>
                  </div>

                  {/* Card: Marketing */}
                  <div className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 space-y-4",
                    preferences.marketing ? "border-[var(--color-hrz-red)] bg-[var(--color-surface)]" : "border-[var(--color-border)] bg-transparent"
                  )}>
                    <div className="flex justify-between items-center">
                      <div className={preferences.marketing ? "text-[var(--color-hrz-red)]" : "text-[var(--color-text-secondary)]"}><Icons.Target /></div>
                      <CustomSwitch checked={preferences.marketing} onChange={() => setPreferences(p => ({...p, marketing: !p.marketing}))} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">Personalização</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        Sugestões inteligentes de cursos e soluções financeiras baseadas no seu perfil único.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer dos Detalhes */}
                <div className="flex justify-end pt-2">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => handleAction('custom')}
                    className="w-full sm:w-auto px-10 font-bold"
                  >
                    Salvar e Aplicar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}