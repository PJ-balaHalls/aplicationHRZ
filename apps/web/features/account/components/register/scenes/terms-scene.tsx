'use client';

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Drawer } from "vaul";
import {
  Shield, ChevronDown, CheckCircle2, ExternalLink,
  ScrollText, Lock, Bell, FileText, X, ChevronRight, 
  AlertTriangle, FileCheck, EyeOff, Eye
} from "lucide-react";
import { cn } from "../../../../../../../packages/ui/components/button/button";

const TERMS_SECTIONS = [
  {
    id: "identity", icon: Lock, title: "1. Soberania de Identidade",
    content: `Ao criar sua Account, você estabelece um nó de governança único. Seu Horizon ID é imutável após confirmação. A Horazion Group não reivindica propriedade sobre seus dados — você é o titular de toda informação gerada na sua jornada.`,
  },
  {
    id: "data", icon: Eye, title: "2. Governança de Dados (LGPD)",
    content: `Dados processados exclusivamente para viabilizar as funcionalidades contratadas. Nunca vendemos dados para fins comerciais. Processamento em conformidade com a LGPD e Privacy by Design. Você pode exportar ou excluir tudo via Central de Soberania.`,
  },
  {
    id: "ai", icon: Shield, title: "3. Algoritmos e IA (ISO 42001)",
    content: `Toda IA opera sob a ISO/IEC 42001. Nenhuma decisão de alto impacto é tomada sem supervisão humana. Você tem direito de contestar, auditar e solicitar explicabilidade de ações automatizadas no ecossistema.`,
  },
  {
    id: "notifications", icon: Bell, title: "4. Comunicações Oficiais",
    content: `Você consente com comunicações essenciais de segurança. Comunicações de marketing são 100% opt-in. A Horazion compromete-se a jamais utilizar Dark Patterns ou pressão comercial em suas interfaces.`,
  },
  {
    id: "legal", icon: FileText, title: "5. Foro e Legislação",
    content: `Este contrato é regido pelas leis da República Federativa do Brasil. Para relações B2C aplica-se o CDC. Foro de eleição: Comarca de São Paulo/SP. Disputas serão preferencialmente resolvidas via mediação.`,
  },
];

const SUMMARY = [
  { icon: Lock, text: "Soberania de Dados" },
  { icon: Shield, text: "IA Auditável (ISO)" },
  { icon: FileCheck, text: "Conformidade LGPD" },
  { icon: EyeOff, text: "Zero Dark Patterns" },
];

export function TermsScene() {
  const { register, formState: { errors }, watch } = useFormContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const acceptTerms = watch("accept_terms");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 w-full">
      
      {/* 1. HEADER (Idêntico às outras cenas) */}
      <div className="space-y-2 pb-2">
        <h3 className="text-[32px] sm:text-[36px] font-black tracking-tighter text-text-primary leading-none uppercase italic">
          Acordo Soberano.
        </h3>
        <p className="text-[13px] text-text-secondary leading-relaxed max-w-[420px]">
          Revise as diretrizes estruturais que regem sua presença digital antes de provisionar seu Universo no ecossistema Horazion.
        </p>
      </div>

      {/* 2. SUMMARY GRID (Tags Livres sem bordas ou fundos) */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
        {SUMMARY.map(p => {
          const Icon = p.icon;
          return (
            <div key={p.text} className="flex items-center gap-2">
              <Icon size={16} className="text-text-secondary" strokeWidth={1.5} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-text-primary">{p.text}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {/* 3. BOTÃO DE ABERTURA DOS TERMOS (Idêntico ao Hub de Identidade da Profile Scene) */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-border/60 bg-surface/40 hover:border-brand/40 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <ScrollText className="text-brand" size={20} />
            <div className="text-left">
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-text-primary">Analisar Acordo Soberano</h3>
              <p className="text-[10px] text-text-secondary">5 cláusulas essenciais · ~2 min de leitura</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-brand transition-all" />
        </button>

        {/* 4. CHECKBOX DE ACEITE ESTRUTURADO (No padrão dos Inputs da plataforma) */}
        <label className={cn(
          "w-full flex items-start gap-4 px-5 py-5 rounded-xl border transition-all cursor-pointer group",
          acceptTerms 
            ? "bg-background border-brand ring-1 ring-brand/20" 
            : "bg-surface/30 border-border/60 hover:border-brand/40"
        )}>
          <div className="mt-0.5 shrink-0">
            <input 
              type="checkbox" 
              className="sr-only" 
              {...register("accept_terms", { required: "A aceitação do acordo é obrigatória para ingressar." })} 
            />
            <div className={cn(
              "w-5 h-5 rounded-lg border-[1.5px] flex items-center justify-center transition-colors",
              acceptTerms ? "bg-brand border-brand" : "border-border/60 bg-transparent group-hover:border-brand/50"
            )}>
              {acceptTerms && <CheckCircle2 size={14} className="text-background" strokeWidth={2.5} />}
            </div>
          </div>
          <div className="space-y-1.5">
            <p className={cn(
              "text-[12px] font-bold uppercase tracking-widest transition-colors",
              acceptTerms ? "text-brand" : "text-text-primary"
            )}>
              Ratificar Acordo Soberano
            </p>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Confirmo a leitura e aceitação integral dos{" "}
              <button type="button" onClick={(e) => { e.preventDefault(); setIsDrawerOpen(true); }} className="text-text-primary font-bold hover:text-brand transition-all">
                Termos de Uso
              </button>
              {", da "}
              <a href="/legal/privacidade" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold hover:text-brand transition-all">Política de Privacidade</a>
              {" e dos frameworks de Governança de IA do Horazion Group."}
            </p>
          </div>
        </label>

        {/* MENSAGEM DE ERRO (ZOD) */}
        {errors.accept_terms && (
          <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl flex items-center gap-2 animate-in fade-in">
            <AlertTriangle size={16} className="text-danger shrink-0" strokeWidth={1.5} />
            <p className="text-[10px] text-danger font-bold uppercase tracking-widest">
              {String(errors.accept_terms.message)}
            </p>
          </div>
        )}
      </div>

      {/* 5. LINKS LEGAIS COMPLEMENTARES */}
      <div className="flex items-center justify-center gap-6 pt-6 flex-wrap border-t border-border/40">
        {[
          { href: "/legal/privacidade", label: "Privacidade e Dados" },
          { href: "/legal/niveis-e-grupos", label: "Grupos Celestiais" },
          { href: "/legal/cookies", label: "Gestão de Cookies" },
        ].map(link => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[10px] text-text-secondary/60 hover:text-text-primary transition-colors flex items-center gap-1.5 uppercase tracking-widest font-bold">
            {link.label} <ExternalLink size={10} strokeWidth={2} />
          </a>
        ))}
      </div>

      {/* 6. LEFT DRAWER DE TERMOS (Idêntico ao Identity Drawer) */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-[2px]" />
          
          <Drawer.Content className="bg-background border-r border-border flex flex-col h-full w-[100vw] md:w-[440px] fixed top-0 left-0 z-[120] outline-none shadow-none font-sans">
            
            {/* Header Drawer com a barra vermelha no topo */}
            <div className="relative flex items-center justify-between p-8 border-b border-border/60">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand" />
              <div>
                <Drawer.Title className="text-xl font-bold tracking-tight text-text-primary">
                  Termos Estruturais
                </Drawer.Title>
                <Drawer.Description className="text-sm text-text-secondary mt-1">
                  Horazion Group S.A.
                </Drawer.Description>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="p-2 border border-border/60 rounded-full hover:border-brand transition-all bg-transparent text-text-primary outline-none"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Drawer Content (Acordeão Clean White) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar">
              <section className="mb-6 px-1">
                <p className="text-[13px] leading-relaxed text-text-secondary">
                  Este é o documento de fundação do seu nó. O ecossistema Horazion opera sob protocolos rígidos de segurança, privacidade by design e inteligência artificial auditável.
                </p>
              </section>

              {TERMS_SECTIONS.map((section) => {
                const Icon = section.icon;
                const isExpanded = activeSection === section.id;
                
                return (
                  <div key={section.id} className={cn(
                    "border rounded-xl overflow-hidden transition-all duration-200",
                    isExpanded ? "border-brand/50 bg-brand/5" : "border-border/60 bg-surface/30 hover:border-brand/40"
                  )}>
                    <button 
                      onClick={() => setActiveSection(isExpanded ? null : section.id)} 
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={16} className={isExpanded ? "text-brand" : "text-text-secondary group-hover:text-text-primary"} strokeWidth={1.5} />
                        <span className={cn(
                          "text-[12px] font-bold uppercase tracking-widest transition-colors", 
                          isExpanded ? "text-brand" : "text-text-primary"
                        )}>
                          {section.title}
                        </span>
                      </div>
                      <ChevronDown size={16} className={cn("text-text-secondary transition-transform duration-300", isExpanded && "rotate-180 text-brand")} />
                    </button>
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 animate-in fade-in slide-in-from-top-1">
                        <p className="text-[12px] leading-relaxed text-text-secondary">{section.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <a href="/legal/termos-de-uso" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 border border-dashed border-border/60 rounded-xl hover:border-brand/40 bg-surface/20 transition-all group mt-6">
                <span className="text-[11px] font-bold text-text-secondary group-hover:text-brand uppercase tracking-widest">Ler Contrato na Íntegra</span>
                <ExternalLink size={14} className="text-text-secondary group-hover:text-brand transition-colors" strokeWidth={1.5} />
              </a>
            </div>

            {/* Footer com botão discreto (Reduzindo redundância) */}
            <div className="p-8 border-t border-border/60 bg-surface/40 flex justify-between items-center">
               <button 
                 onClick={() => setIsDrawerOpen(false)}
                 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-brand transition-colors"
               >
                 Fechar Painel de Termos
               </button>
               <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(75,168,43,0.5)]" />
            </div>

          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}