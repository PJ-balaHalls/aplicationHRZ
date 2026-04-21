"use client";

import { Header } from "@/components/layout/header";
import { BadgeNovo } from "@horizion/ui/components/badge/novo/badgenovo";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-16 md:py-24">
        <section className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
             <span className="px-2.5 py-1 rounded-full border border-[var(--color-hrz-red)] bg-[#B6192E]/5 text-[var(--color-hrz-red)] text-[11px] font-bold uppercase tracking-widest">
               Horizion Core
             </span>
             <BadgeNovo featureName="Aura" description="Motor de adaptação cognitiva e acessibilidade visual ativado." />
          </div>

          <h1 className="text-hero font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-6">
            O Sistema Operacional da <br />
            <span className="text-[var(--color-text-secondary)]">Sua Evolução Digital.</span>
          </h1>
          
          <p className="text-sub text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-12">
            Organizamos o caos da sua vida digital. Um centro de gravidade único onde educação, finanças e conhecimento convergem na arquitetura de Blocos Vivos. Você no controle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface)] transition-colors">
              <h2 className="text-title2 font-bold text-[var(--color-text-primary)] mb-3">Soberania de Interface</h2>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                Utilize o gatilho "Horizon Aura" localizado no canto inferior direito. Mova-o pela tela. Abra a gaveta e observe como o Minimalismo Funcional se adapta perfeitamente à sua necessidade cognitiva em tempo real.
              </p>
            </div>
            
            <div className="p-8 border border-[var(--color-border)] rounded-2xl bg-transparent">
              <h2 className="text-title2 font-bold text-[var(--color-text-primary)] mb-3">Governança Integrada</h2>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                O fluxo de cookies e a telemetria do sistema operam de forma transparente, permitindo auditoria contínua sem quebrar a estética ou poluir o seu foco.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}