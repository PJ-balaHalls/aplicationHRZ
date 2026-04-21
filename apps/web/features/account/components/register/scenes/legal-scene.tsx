'use client';

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Building2, FileText, User, BookOpen, Fingerprint, Info } from 'lucide-react';
import { BadgeEmBreve } from '../../../../../../../packages/ui/components/badge/embreve/badgeembreve';

const ACCOUNT_TYPES = [
  { 
    id: 'INDIVIDUAL', 
    label: 'Pessoa Física', 
    icon: User, 
    taxType: 'CPF',
    desc: 'Universo pessoal para gestão de vida, dados privados e interações civis.' 
  },
  { 
    id: 'EDUCATIONAL', 
    label: 'Educacional', 
    icon: BookOpen, 
    taxType: 'CPF',
    desc: 'Universo voltado a estudantes e acadêmicos, com foco em aprendizado e constelações de pesquisa.' 
  },
  { 
    id: 'ENTERPRISE', 
    label: 'Corporativo', 
    icon: Building2, 
    taxType: 'CNPJ',
    desc: 'Universo empresarial para gestão de equipes, faturamento e governança avançada.' 
  },
];

const applyMask = (value: string, type: string) => {
  let v = value.replace(/\D/g, "");
  if (type === "ENTERPRISE") {
    if (v.length > 14) v = v.substring(0, 14);
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    if (v.length > 11) v = v.substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  }
  return v;
};

// SVG Icons (Google Icons Standards)
const VerifiedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="#75FB4C">
    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
  </svg>
);

const ChildCareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="#B6192E">
    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q150 0 255 105t105 255q0 150-105 255T480-120Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-360q25 0 42.5-17.5T540-620q0-25-17.5-42.5T480-680q-25 0-42.5 17.5T420-620q0 25 17.5 42.5T480-560Zm0 280q66 0 118-35.5T672-400H288q22 49 74 84.5T480-280Z"/>
  </svg>
);

function calcAge(dob: string): number {
  if (!dob) return 99;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function LegalScene() {
  const { register, formState: { errors }, watch, setValue, getValues } = useFormContext();
  const accountType = watch('account_type') || 'INDIVIDUAL';
  const birthDate = watch('birth_date') || '';
  
  const isEnterprise = accountType === 'ENTERPRISE';
  const isEducational = accountType === 'EDUCATIONAL';
  const age = calcAge(birthDate);
  const isKids = age < 18 && birthDate !== '';

  useEffect(() => {
    const currentType = getValues('account_type');
    if (!currentType) {
      setValue('account_type', 'INDIVIDUAL', { shouldValidate: false });
      setValue('tax_id_type', 'CPF', { shouldValidate: false });
    }
  }, [setValue, getValues]);

  const taxIdRegister = register('tax_id');
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = applyMask(e.target.value, accountType);
    taxIdRegister.onChange(e);
  };

  const handleAccountTypeChange = (typeId: string, taxType: string) => {
    if (accountType === typeId) return;
    setValue('account_type', typeId, { shouldValidate: true });
    setValue('tax_id_type', taxType, { shouldValidate: true });
    setValue('tax_id', '', { shouldValidate: false }); 
  };

  const inputStyles =
    'w-full bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-base font-medium text-text-primary placeholder:text-text-secondary/40 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <p className="text-[13px] text-text-secondary leading-relaxed">
        Defina a natureza operacional do seu Universo. Esta etapa unifica sua identidade civil e legal, sendo a base estrutural do Horizon Group.
      </p>

      {/* NATUREZA DO UNIVERSO (ACCOUNT TYPE) */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
          Natureza do Universo <span className="text-danger">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ACCOUNT_TYPES.map((type) => {
            const Icon = type.icon;
            const isActive = accountType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleAccountTypeChange(type.id, type.taxType)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold border transition-all uppercase tracking-wide ${
                  isActive
                    ? 'border-brand bg-brand/5 text-brand'
                    : 'border-border/60 text-text-secondary hover:border-brand/40 bg-surface/30'
                }`}
              >
                <Icon size={14} />
                {type.label}
              </button>
            );
          })}
        </div>
        {/* Descrição Dinâmica baseada na escolha */}
        <div className="p-3 bg-surface/40 border border-border/40 rounded-lg">
           <p className="text-[11px] text-text-secondary leading-relaxed">
             <strong className="text-text-primary">{ACCOUNT_TYPES.find(t => t.id === accountType)?.label}:</strong> {ACCOUNT_TYPES.find(t => t.id === accountType)?.desc}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NOME DO UNIVERSO (ACCOUNT NAME) */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            Nome do Universo <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            placeholder={isEnterprise ? "Ex: Studio Horizon" : isEducational ? "Ex: Hub Acadêmico" : "Ex: Universo Criativo"}
            {...register('account_name', { required: 'Nome do universo é obrigatório.' })}
            className={`${inputStyles} ${errors.account_name ? 'border-danger/50 focus:border-danger' : ''}`}
          />
          {errors.account_name && <p className="text-[10px] text-danger font-bold uppercase">{errors.account_name.message as string}</p>}
          <p className="text-[9px] text-text-secondary/60 uppercase tracking-widest mt-1">Como seu ambiente digital será chamado.</p>
        </div>

        {/* NOME CIVIL OU RAZÃO SOCIAL */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
            {isEnterprise ? "Razão Social Oficial" : "Nome Civil Completo"} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            placeholder={isEnterprise ? "Ex: Horazion Group S.A." : "Conforme documento oficial"}
            {...register('legal_name', { required: 'O nome jurídico é obrigatório.' })}
            className={`${inputStyles} ${errors.legal_name ? 'border-danger/50 focus:border-danger' : ''}`}
          />
          {errors.legal_name && <p className="text-[10px] text-danger font-bold uppercase">{errors.legal_name.message as string}</p>}
        </div>
      </div>

      {/* NOME SOCIAL - CLAREZA JURÍDICA E OPCIONALIDADE */}
      <div className="space-y-2 bg-surface/20 border border-border/40 p-4 rounded-xl">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary flex items-center justify-between">
          <span>Nome Social (Opcional)</span>
        </label>
        <input
          type="text"
          {...register('social_name')}
          className={`${inputStyles} ${errors.social_name ? 'border-danger/50' : ''}`}
          placeholder="Preencha apenas caso possua"
        />
        <div className="flex items-start gap-2 mt-2">
          <Info size={14} className="text-text-secondary/60 mt-0.5 shrink-0" />
          <p className="text-[10px] text-text-secondary/80 leading-relaxed">
            O Nome Social é um <strong className="text-text-primary font-medium">direito civil de identidade de gênero</strong>, utilizado juridicamente e estruturalmente na plataforma no lugar do nome civil. <span className="text-danger">Não utilize este campo para apelidos comerciais ou pseudônimos.</span>
          </p>
        </div>
      </div>

      {/* DATA DE NASCIMENTO COM FLUXO LIVRE PARA A BADGE */}
      <div className="space-y-4 p-4 bg-surface/20 border border-border/50 rounded-xl">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            Data de Nascimento <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            {...register('birth_date', { required: 'Data de nascimento obrigatória.' })}
            max={new Date().toISOString().split('T')[0]}
            className={`${inputStyles} max-w-[250px] ${errors.birth_date ? 'border-danger/50' : ''}`}
          />
          {errors.birth_date && <p className="text-[10px] text-danger font-bold uppercase">{errors.birth_date.message as string}</p>}
        </div>

        {/* Deteção Automática de Conta Kids fluindo livremente abaixo */}
        {isKids && (
          <div className="w-full bg-brand/5 border border-brand/20 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 flex items-start gap-3">
            <div className="mt-0.5 shrink-0"><ChildCareIcon /></div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-[12px] font-bold text-brand uppercase tracking-widest">Account Kids</h4>
                <BadgeEmBreve featureName="Account Kids" description="Experiência supervisionada e interface adaptada para aprendizado com controle parental avançado." />
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Identificamos que este Universo pertence a um menor de idade. O ambiente digital será ativado sob o protocolo de proteção reforçada e gamificação educacional.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* DOCUMENTO NACIONAL E AVISO DO SELO */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary flex items-center justify-between">
          <span>{isEnterprise ? "CNPJ (Opcional)" : "CPF (Opcional)"}</span>
        </label>
        
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60">
            {isEnterprise ? <FileText size={16} /> : <Fingerprint size={16} />}
          </div>
          <input
            type="text"
            placeholder={isEnterprise ? "00.000.000/0000-00" : "000.000.000-00"}
            {...taxIdRegister}
            onChange={handleTaxIdChange}
            className={`${inputStyles} pl-10 font-mono tracking-wider ${errors.tax_id ? 'border-danger/50 focus:border-danger' : ''}`}
          />
        </div>
        {errors.tax_id && <p className="text-[10px] text-danger font-bold uppercase">{errors.tax_id.message as string}</p>}

        {/* Alerta Estratégico sobre Ausência de Documento e Selo Verified */}
        <div className="bg-surface/50 border border-border/60 p-4 rounded-xl flex items-start gap-3">
          <Info size={16} className="text-text-secondary mt-0.5 shrink-0" />
          <div className="space-y-2 w-full">
            <p className="text-[11px] text-text-secondary leading-relaxed">
              O fornecimento do documento oficial é opcional. Contudo, na ausência dele, limites de processamento financeiro e acessos a contratos digitais estarão restritos.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-border/40">
              <div className="shrink-0"><VerifiedIcon /></div>
              <p className="text-[10px] font-bold text-text-primary">
                O KYC completo concede o <span className="text-[#75FB4C]">Verified Badge</span>, desbloqueando benefícios operacionais exclusivos.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}