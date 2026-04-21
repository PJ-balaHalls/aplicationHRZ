'use client';

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  LayoutGrid, 
  CheckSquare,
  Fingerprint,
  BadgeCheck,
  Star,
  Clock,
  ShieldEllipsis,
  CheckCircle2
} from "lucide-react";
import { cn } from "../../../../../../../packages/ui/components/button/button";
import { BadgeEmBreve } from "../../../../../../../packages/ui/components/badge/embreve/badgeembreve";

// ÍCONE: Material Symbols Outlined | verified (#75FB4C)
const VerifiedBadgeIcon = ({ size = 16, color = "#75FB4C" }: { size?: number, color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
    <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 106-24-10-108 70-82-70-82 10-108-106-24-56-96-104 44-102-44-56 96-106 24 10 108-70 82 70 82-10 108 106 24 56 96Zm102-318Zm-42 142 226-226-28-28-198 198-87-87-28 28 115 115Z"/>
  </svg>
);

// ÍCONE: Child Care (Kids Account - #B6192E)
const ChildCareIcon = ({ size = 16, color = "#B6192E" }: { size?: number, color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q150 0 255 105t105 255q0 150-105 255T480-120Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-360q25 0 42.5-17.5T540-620q0-25-17.5-42.5T480-680q-25 0-42.5 17.5T420-620q0 25 17.5 42.5T480-560Zm0 280q66 0 118-35.5T672-400H288q22 49 74 84.5T480-280Z"/>
  </svg>
);

const TABS = [
  { id: 'checklist', label: 'Checklist', icon: CheckSquare },
  { id: 'verificacoes', label: 'Verificações', icon: Fingerprint },
  { id: 'selos', label: 'Selos e Badges', icon: BadgeCheck },
  { id: 'grupo', label: 'Hierarquia', icon: Star },
];

function calcAge(dob: string): number {
  if (!dob) return 99;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function SuccessScene() {
  const { getValues } = useFormContext();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('checklist');

  const horizonId = getValues('horizon_id') || 'usuario';
  const accountName = getValues('account_name') || 'Meu Universo';
  const legalName = getValues('legal_name') || 'Cidadão Soberano';
  const taxId = getValues('tax_id');
  const birthDate = getValues('birth_date') || '';
  
  const age = calcAge(birthDate);
  const isKids = age < 18 && birthDate !== '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 w-full font-sans pb-10">
      
      {/* 1. HEADER HERO - ILUSTRAÇÃO GIGANTE */}
      <div className="flex flex-col items-center text-center space-y-8 pt-4">
        <div className="relative w-full max-w-[380px] h-[240px] drop-shadow-sm transition-transform hover:scale-[1.02] duration-500">
          <Image 
            src="/images/HRZ-ILUSTRACION/sucess/undraw_complete-form_aarh.svg" 
            alt="Concluído" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-[36px] sm:text-[44px] font-black tracking-tighter text-text-primary leading-none uppercase italic">
            Soberania Ativa.
          </h3>
          <p className="text-[15px] text-text-secondary font-medium leading-relaxed max-w-[480px] mx-auto">
            Sua infraestrutura digital foi provisionada com sucesso. Você agora é o arquiteto do seu próprio Universo no ecossistema Horazion.
          </p>
        </div>
      </div>

      {/* 2. PREVIEW DE IDENTIDADE COM ISOLOGO */}
      <div className="relative overflow-hidden p-8 rounded-[32px] border border-border/40 bg-surface/10">
        
        {/* MARCA D'ÁGUA: Isologo Oficial Horazion */}
        <div className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.03] pointer-events-none">
          <Image 
            src="/images/HORAZION/ISOLOGO-RED.svg" 
            alt="Horazion Isologo" 
            fill 
            className="object-contain"
          />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-brand" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Identidade Global</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[28px] sm:text-[36px] font-black text-text-primary tracking-tighter">
                @{horizonId}
              </span>
            </div>
            
            <p className="text-[13px] font-medium text-text-secondary pl-1">{legalName}</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="px-5 py-3 bg-surface/60 border border-border/30 rounded-2xl flex items-center gap-4 shadow-sm">
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary italic opacity-70">Designação do Universo</span>
                <span className="text-[14px] font-black text-text-primary uppercase tracking-tight">{accountName}</span>
              </div>
              <div className="p-2.5 bg-background rounded-xl border border-border/20">
                <LayoutGrid size={20} className="text-text-secondary" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HUB DE ONBOARDING (ABAS) */}
      <div className="space-y-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-border/10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all shrink-0 relative",
                  isActive 
                    ? "text-brand" 
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Icon size={14} strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand animate-in fade-in slide-in-from-bottom-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* ÁREA DE CONTEÚDO DAS ABAS */}
        <div className="min-h-[300px] p-8 sm:p-10 border border-border/20 rounded-[32px] bg-surface/5 animate-in fade-in duration-500">
          
          {/* TAB: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative shrink-0 opacity-90">
                <Image src="/images/HRZ-ILUSTRACION/sucess/undraw_onboarding_dcq2.svg" alt="Onboarding" fill className="object-contain" />
              </div>
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-1">
                  <h4 className="text-[15px] font-black text-text-primary uppercase tracking-widest">Protocolo de Prontidão</h4>
                  <p className="text-[13px] text-text-secondary font-medium">Seu progresso atual na infraestrutura.</p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/30 border border-border/40">
                    <CheckCircle2 size={18} className="text-text-primary" strokeWidth={2} />
                    <span className="text-[13px] font-bold text-text-primary">Identidade Global Provisionada</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/20 border border-border/20 opacity-60">
                    <Clock size={18} className="text-text-secondary" />
                    <span className="text-[13px] font-medium text-text-secondary">Configuração de Blocos Vivos</span>
                    <BadgeEmBreve featureName="Dashboard" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: VERIFICAÇÕES */}
          {activeTab === 'verificacoes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-[15px] font-black text-text-primary uppercase tracking-widest">Verificação KYC</h4>
                  <p className="text-[13px] text-text-secondary font-medium">Segurança jurídica e financeira.</p>
                </div>
                {taxId ? <span className="px-4 py-1.5 bg-brand/10 text-brand text-[11px] font-black rounded-full uppercase tracking-tighter">Em Análise</span> : <span className="px-4 py-1.5 bg-warning/10 text-warning text-[11px] font-black rounded-full uppercase tracking-tighter">Pendente</span>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div className="p-6 border border-border/30 bg-background rounded-3xl space-y-4">
                  <Fingerprint size={28} className="text-brand" strokeWidth={1.5} />
                  <p className="text-[13px] font-bold text-text-primary uppercase">Autenticação Documental</p>
                  <p className="text-[12px] text-text-secondary leading-relaxed">
                    {taxId ? "Documento recebido. Estamos validando sua raiz jurídica no sistema para emissão do selo." : "Seu Universo opera em modo anônimo. O fornecimento de documento é opcional, mas limita transações e bloqueia a Verified Badge."}
                  </p>
                </div>
                
                {!taxId && (
                  <button 
                    type="button"
                    onClick={() => setActiveTab('selos')}
                    className="p-6 border-2 border-dashed border-border/40 rounded-3xl flex flex-col justify-center items-center text-center gap-3 hover:border-brand/40 hover:bg-brand/5 transition-all group"
                  >
                    <ShieldEllipsis size={28} className="text-text-secondary group-hover:text-brand transition-colors" />
                    <span className="text-[12px] font-bold text-text-secondary group-hover:text-brand uppercase">Completar KYC agora</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB: SELOS (Selo Verde e Aspiracional) */}
          {activeTab === 'selos' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-[15px] font-black text-text-primary uppercase tracking-widest">Suas Badges</h4>
                <p className="text-[13px] text-text-secondary font-medium">Reconhecimento técnico e credenciais ativas no ecossistema.</p>
              </div>
              
              <div className="grid gap-4">
                
                {/* 1. Verified Badge (Sempre Verde, texto orienta se falta KYC) */}
                <div className="p-6 border border-border/30 bg-surface/20 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-border/60 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="p-4 rounded-2xl shrink-0 bg-[#75FB4C]/10">
                      <VerifiedBadgeIcon size={28} color="#75FB4C" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[15px] font-black text-text-primary uppercase tracking-tight">Verified Protocol</span>
                      <p className="text-[12px] text-text-secondary leading-relaxed">
                        {taxId ? "Seu documento está em análise KYC para emissão oficial do selo." : "Selo aguardando validação documental (KYC Nível 1)."}
                      </p>
                    </div>
                  </div>
                  {!taxId && (
                    <button type="button" onClick={() => setActiveTab('verificacoes')} className="text-[10px] font-bold text-brand uppercase tracking-widest shrink-0 hover:underline">
                      Adquirir Selo
                    </button>
                  )}
                </div>

                {/* 2. Account Kids Badge */}
                {isKids && (
                  <div className="p-6 border border-brand/20 bg-brand/5 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-brand/10 rounded-2xl shrink-0">
                        <ChildCareIcon size={28} color="#B6192E" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[15px] font-black text-brand uppercase tracking-tight">Account Kids</span>
                        <p className="text-[12px] text-text-secondary leading-relaxed">
                          Universo operando sob proteção de menor de idade. Controle parental e bloqueio algorítmico ativados.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB: GRUPO CELESTIAL */}
          {activeTab === 'grupo' && (
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative shrink-0 opacity-90">
                <Image src="/images/HRZ-ILUSTRACION/sucess/undraw_contact-us_s4jn.svg" alt="Hierarquia" fill className="object-contain" />
              </div>
              <div className="flex-1 space-y-5 w-full">
                <div className="space-y-1">
                  <h4 className="text-[15px] font-black text-text-primary uppercase tracking-widest">Status de Comutação</h4>
                  <p className="text-[13px] text-text-secondary font-medium">Sua posição na infraestrutura celestial.</p>
                </div>
                <div className="p-6 border border-border/30 bg-surface/30 rounded-3xl relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <Star size={20} className="text-text-primary" strokeWidth={1.5} />
                    <span className="text-[18px] font-black text-text-primary uppercase tracking-tight">Cometa (Trial)</span>
                  </div>
                  <p className="text-[12px] text-text-secondary leading-relaxed">
                    Você está em um ambiente de exploração. Recursos de IA e armazenamento operam em modo de alta eficiência. A conversão para <strong className="text-text-primary font-bold">Sol</strong> libera largura de banda irrestrita.
                  </p>
                  <div className="mt-5 pt-5 border-t border-border/20 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Upgrade: Nível Sun</span>
                    <button className="text-[11px] font-black text-brand uppercase hover:underline transition-all">
                      Conhecer Planos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. CALL TO ACTIONS - AÇÃO FINAL DE CONCLUSÃO */}
      <div className="space-y-4 pt-8 border-t border-border/20">
        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-4 p-5 sm:p-6 rounded-2xl bg-text-primary hover:bg-text-secondary text-background transition-all group active:scale-[0.98] outline-none shadow-xl"
        >
          <span className="text-[14px] font-black uppercase tracking-[0.1em]">Inicializar Ecossistema</span>
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
        </button>
        
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="px-6 py-3 text-text-secondary/50 hover:text-text-primary transition-all text-[11px] font-bold uppercase tracking-[0.2em] outline-none"
          >
            Configurar Hub em outro momento
          </button>
        </div>
      </div>

    </div>
  );
}