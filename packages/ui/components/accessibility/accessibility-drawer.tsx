"use client";

import React, { useState } from "react";
import { Drawer } from "vaul";
import { ThemeSettings } from "./themes/theme-settings";
import { TypographySettings } from "./typography/typography-settings";
import { BadgeNovo } from "../badge/novo/badgenovo";
import { BadgeEmBreve } from "../badge/embreve/badgeembreve";
import { X, Palette, Type, Contrast, Activity, Target, Brain, Filter, MessageSquare, ChevronDown, ExternalLink, ScrollText } from "lucide-react";
import { cn } from "../button/button";

export function AccessibilityDrawer({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>("themes");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const sections = [
    { id: "themes", label: "Personalização de Cor", icon: Palette, status: "novo", component: <ThemeSettings /> },
    { id: "typography", label: "Tipografia & Leitura", icon: Type, status: "novo", component: <TypographySettings /> },
    { id: "contrast", label: "Contraste Dinâmico", icon: Contrast, status: "em_breve" },
    { id: "motion", label: "Redução de Movimento", icon: Activity, status: "em_breve" },
    { id: "focus", label: "Foco Assistido", icon: Target, status: "em_breve" },
    { id: "cognitive", label: "Carga Cognitiva", icon: Brain, status: "em_breve" },
    { id: "filters", label: "Filtros de Cor", icon: Filter, status: "em_breve" },
    { id: "assistant", label: "Assistente de Leitura", icon: MessageSquare, status: "em_breve" },
  ];

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange} direction="left">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-[2px]" />
        <Drawer.Content className="bg-[var(--color-background)] border-l border-[var(--color-border)] flex flex-col h-full w-[100vw] md:w-[440px] fixed top-0 left-0 z-[120] outline-none shadow-none">
          
          <div className="relative flex items-center justify-between p-8 border-b border-[var(--color-border)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-hrz-red)]" />
            <div>
              <Drawer.Title className="text-title2 font-bold tracking-tight text-[var(--color-text-primary)]">Horizon Aura</Drawer.Title>
              <Drawer.Description className="text-label text-[var(--color-text-secondary)] mt-1">Soberania de Interface v1.2.0</Drawer.Description>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-2 border border-[var(--color-border)] rounded-full hover:border-[var(--color-hrz-red)] transition-all bg-transparent text-[var(--color-text-primary)]">
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 font-sans">
            <section className="space-y-3">
              <div className={cn("text-[13px] leading-relaxed text-[var(--color-text-secondary)]", !isDescriptionExpanded && "line-clamp-3")}>
                O Horizon Aura é o nó central de adaptação cognitiva do Horazion Group. Aqui, você não apenas altera cores, mas calibra a densidade de informação para reduzir o ruído visual e otimizar sua clareza mental, garantindo que a tecnologia se adapte à sua biologia e não o contrário.
              </div>
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-[11px] font-bold text-[var(--color-hrz-red)] uppercase tracking-tighter hover:opacity-70 transition-opacity"
              >
                {isDescriptionExpanded ? "Ler menos" : "Ler mais sobre o Aura"}
              </button>
            </section>

            <section className="p-5 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)]/30">
              <div className="flex items-center gap-2 mb-4">
                <ScrollText size={16} className="text-[var(--color-hrz-red)]" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-primary)]">Patch Notes</h4>
              </div>
              <ul className="space-y-2 text-[11px] text-[var(--color-text-secondary)]">
                <li className="flex gap-2"><span className="text-[var(--color-hrz-red)] font-bold">1.2</span> Snap-to-edge multieixo no assistente.</li>
                <li className="flex gap-2"><span className="text-[var(--color-hrz-red)] font-bold">1.1</span> Consolidação de 8 módulos adaptativos.</li>
              </ul>
            </section>

            <div className="space-y-4">
              {sections.map((sec) => {
                const isExpanded = expandedSection === sec.id;
                const isComingSoon = sec.status === "em_breve";

                return (
                  <div key={sec.id} className="border-b border-[var(--color-border)] pb-4 last:border-0">
                    <div 
                      onClick={() => !isComingSoon && setExpandedSection(isExpanded ? null : sec.id)} 
                      className={cn("flex items-center justify-between group", !isComingSoon && "cursor-pointer")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg border transition-colors", isExpanded ? "border-[var(--color-hrz-red)] bg-[#B6192E]/5" : "border-[var(--color-border)] group-hover:border-[var(--color-text-primary)]")}>
                          <sec.icon size={16} className={isExpanded ? "text-[var(--color-hrz-red)]" : "text-[var(--color-text-primary)]"} />
                        </div>
                        <span className={cn("text-[14px] font-bold", isExpanded ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]")}>{sec.label}</span>
                      </div>
                      <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                        {sec.status === "novo" && <BadgeNovo featureName={sec.label} description="Módulo ativo." />}
                        {sec.status === "em_breve" && <BadgeEmBreve featureName={sec.label} description="Em desenvolvimento." />}
                        {!isComingSoon && <ChevronDown size={16} className={cn("transition-transform duration-300", isExpanded && "rotate-180 text-[var(--color-hrz-red)]")} />}
                      </div>
                    </div>
                    {isExpanded && sec.component && (
                      <div className="pt-5 pl-12 animate-in fade-in slide-in-from-top-2 duration-300">
                        {sec.component}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-8 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex justify-between items-center">
             <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-hrz-red)] transition-colors inline-flex items-center gap-1.5">
               Manifesto de Acessibilidade <ExternalLink size={12} />
             </a>
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}