'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Gamepad2, BrainCircuit } from 'lucide-react';

export default function KidsLandingPage() {
  const [textVal, setTextVal] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const wordsCount = textVal.trim() === "" ? 0 : textVal.trim().split(/\s+/).length;

  const handleEvaluate = () => {
    if (wordsCount < 3) return;
    setIsEvaluating(true);
    setScore(null);
    setTimeout(() => {
      setIsEvaluating(false);
      setScore(Math.floor(Math.random() * (950 - 700) + 700)); // Simulador gamificado
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary pb-20">
      
      {/* HEADER HERO */}
      <header className="pt-32 pb-20 px-6 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand/20">
          <ShieldCheck size={14} /> Ambiente Controlado
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Horizon Account <span className="text-brand">Kids</span>
        </h1>
        <p className="text-lg text-text-secondary font-medium">
          A infraestrutura digital projetada para evoluir com seus filhos. Sem ruído, sem algoritmos predatórios. Apenas foco, aprendizado e gamificação saudável.
        </p>
      </header>

      {/* MODULE 1: HORIZON WRITE KIDS SIMULATOR */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-surface border border-border/60 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="text-brand" size={28} />
            <h2 className="text-2xl font-bold tracking-tight">Horizon Write AI Simulação</h2>
          </div>
          
          <div className="space-y-4">
            <textarea
              className="w-full bg-background border border-border/60 p-6 rounded-2xl text-lg resize-none focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all placeholder:text-text-secondary/40 font-serif"
              rows={4}
              placeholder="Digite um pequeno texto aqui para ver a Inteligência Artificial ajudar na estrutura..."
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-text-secondary uppercase tracking-widest">
                {wordsCount} palavras
              </span>
              <button 
                onClick={handleEvaluate}
                disabled={isEvaluating || wordsCount < 3}
                className="bg-brand text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 hover:bg-brand/90 transition-colors"
              >
                {isEvaluating ? (
                  <><span className="w-2 h-2 bg-white rounded-full animate-ping" /> Analisando...</>
                ) : (
                  <>Corrigir Agora <ArrowRight size={16} /></>
                )}
              </button>
            </div>

            {/* Resultado Simulado */}
            {score !== null && (
              <div className="mt-6 p-6 border-2 border-[#75FB4C] bg-[#75FB4C]/5 rounded-2xl animate-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#4BA82B]">Excelente Estrutura!</h3>
                    <p className="text-sm text-text-secondary mt-1">Pontuação gamificada baseada em coerência e gramática.</p>
                  </div>
                  <div className="text-4xl font-black text-[#4BA82B]">{score} <span className="text-lg text-text-secondary/60">XP</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODULE 2: DASHBOARD MOCKUP */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">Dashboard Interativo e Arrastável</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card XP */}
          <div className="bg-surface border border-border/60 p-6 rounded-2xl hover:border-brand/40 transition-colors cursor-move">
            <Sparkles className="text-brand mb-4" size={24} />
            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Nível Atual</div>
            <div className="text-3xl font-black">Lvl 12</div>
          </div>

          {/* Card Streak */}
          <div className="bg-surface border border-border/60 p-6 rounded-2xl hover:border-brand/40 transition-colors cursor-move">
            <Gamepad2 className="text-brand mb-4" size={24} />
            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Ofensiva</div>
            <div className="text-3xl font-black">5 Dias</div>
          </div>

          {/* Card Tarefas */}
          <div className="bg-surface border border-border/60 p-6 rounded-2xl hover:border-brand/40 transition-colors cursor-move col-span-1 md:col-span-2">
            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4">Missões do Dia</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-background border border-border/40 rounded-xl">
                <div className="w-4 h-4 rounded-full border-2 border-brand" />
                <span className="text-sm font-medium">Ler 1 capítulo de História</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-brand/5 border border-brand/20 rounded-xl">
                <div className="w-4 h-4 rounded-full bg-brand" />
                <span className="text-sm font-medium line-through text-text-secondary">Organizar a mochila</span>
              </div>
            </div>
          </div>

        </div>
        <p className="text-center text-[11px] text-text-secondary uppercase tracking-widest mt-6">
          * Funcionalidade de Drag and Drop em fase de implementação (Em Breve).
        </p>
      </section>

    </div>
  );
}