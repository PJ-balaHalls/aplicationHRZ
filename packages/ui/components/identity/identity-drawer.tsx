"use client";

import React from "react";
import { Drawer } from "vaul";
import { X, Sparkles, ShieldCheck, ExternalLink } from "lucide-react";

interface IdentityDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IdentityDrawer({ isOpen, onOpenChange }: IdentityDrawerProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange} direction="left">
      <Drawer.Portal>
        {/* Overlay idêntico ao Accessibility */}
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-[2px]" />
        
        {/* Content idêntico ao Accessibility */}
        <Drawer.Content className="bg-[var(--color-background)] border-l border-[var(--color-border)] flex flex-col h-full w-[100vw] md:w-[440px] fixed top-0 left-0 z-[120] outline-none shadow-none font-sans">
          
          {/* Header com a barra vermelha idêntica */}
          <div className="relative flex items-center justify-between p-8 border-b border-[var(--color-border)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-hrz-red)]" />
            <div>
              <Drawer.Title className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Horizon Identity Hub</Drawer.Title>
              <Drawer.Description className="text-sm text-[var(--color-text-secondary)] mt-1">
                Governança do seu Grupo Celestial
              </Drawer.Description>
            </div>
            <button 
              onClick={() => onOpenChange(false)} 
              className="p-2 border border-[var(--color-border)] rounded-full hover:border-[var(--color-hrz-red)] transition-all bg-transparent text-[var(--color-text-primary)]"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 font-sans">
            <section className="space-y-3">
              <div className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                Este é o seu centro de soberania digital. O seu Grupo Celestial define as capacidades do seu nó no ecossistema Horazion. A sua progressão é orgânica e baseada no seu engajamento com a infraestrutura.
              </div>
            </section>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Seu Grupo Base</h3>
                <div className="p-6 border border-[var(--color-border)]/60 bg-[var(--color-surface)]/30 rounded-2xl space-y-3 relative overflow-hidden group hover:border-[var(--color-text-primary)]/40 transition-colors">
                  <Sparkles size={24} className="text-[#5F6368] group-hover:text-[var(--color-text-primary)] transition-colors" strokeWidth={1.5} />
                  <div>
                    <p className="text-[18px] font-black text-[var(--color-text-primary)] tracking-tight">Cometa (Trial)</p>
                    <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mt-1">Acesso inicial de exploração. Aprimore para Sol adicionando uma assinatura no futuro.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Badges e Selos Ativos</h3>
                <div className="p-5 border border-[var(--color-border)]/40 rounded-2xl flex items-center gap-4 opacity-60 grayscale transition-all hover:grayscale-0">
                  <div className="p-2.5 rounded-full bg-[#75FB4C]/10 shrink-0">
                    <ShieldCheck size={20} className="text-[#75FB4C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-[var(--color-text-primary)] block">Verified Badge</span>
                    <span className="text-[11px] text-[var(--color-text-secondary)]">Pendente conclusão do KYC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer idêntico ao Accessibility */}
          <div className="p-8 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex justify-between items-center">
             <a href="/legal/niveis-e-grupos" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-hrz-red)] transition-colors inline-flex items-center gap-1.5">
               Documentação de Grupos Celestiais <ExternalLink size={12} />
             </a>
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}