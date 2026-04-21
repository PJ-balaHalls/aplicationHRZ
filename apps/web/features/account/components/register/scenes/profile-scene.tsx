'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { UploadCloud, CheckCircle2, XCircle, Loader2, LayoutGrid, Palette, MessageSquare } from 'lucide-react';
import { BadgeEmBreve } from '../../../../../../../packages/ui/components/badge/embreve/badgeembreve';
import { IdentityDrawer } from '../../../../../../../packages/ui/components/identity/identity-drawer';
import { HorizonSelect } from '../../../../../../../packages/ui/components/select/horizon-select';

const PRESET_AVATARS = [
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_deep-thinker-avatar_6xg6.svg', name: 'Pensador' },
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_businesswoman-avatar_ktl2.svg', name: 'Executiva' },
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_developer-avatar_f6ac.svg', name: 'Dev' },
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_cool-girl-avatar_fifz.svg', name: 'Descolada' },
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_chill-guy-avatar_tqsm.svg', name: 'Tranquilo' },
  { src: '/images/HRZ-ILUSTRACION/avatar/undraw_pic-profile_nr49.svg', name: 'Criativo' },
];

const PRONOUN_OPTIONS = [
  { value: "", label: "Prefiro não informar" },
  { value: "ele/dele", label: "Ele / Dele" },
  { value: "ela/dela", label: "Ela / Dela" },
  { value: "elu/delu", label: "Elu / Delu" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Prefiro não informar" },
  { value: "cis_man", label: "Homem Cisgênero" },
  { value: "cis_woman", label: "Mulher Cisgênero" },
  { value: "trans_man", label: "Homem Transgênero" },
  { value: "trans_woman", label: "Mulher Transgênero" },
  { value: "non_binary", label: "Não-binário" },
  { value: "other", label: "Outro" },
];

const SEXUALITY_OPTIONS = [
  { value: "", label: "Prefiro não informar" },
  { value: "heterosexual", label: "Heterossexual" },
  { value: "homosexual", label: "Homossexual" },
  { value: "bisexual", label: "Bissexual" },
  { value: "pansexual", label: "Pansexual" },
  { value: "asexual", label: "Assexual" },
  { value: "other", label: "Outro" },
];

function generateCategorizedIds(name: string) {
  if (!name) return { formal: [], social: [], divertido: [] };
  const clean = name.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const parts = clean.split(/\s+/);
  const first = parts[0] || 'user';
  const last = parts.length > 1 ? parts[parts.length - 1] : '';

  return {
    formal: [`${first}.${last}`, `${first}_${last}`].filter(s => s.length > 3),
    social: [`${first}${last}`, `${first}oficial`],
    divertido: [`${first}_play`, `sr_${first}`],
  };
}

export function ProfileScene() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();

  const [avatarIndex, setAvatarIndex] = useState(0);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const horizonId = watch('horizon_id') || '';
  const legalName = watch('legal_name') || '';
  const socialName = watch('social_name') || '';
  const noPhoto = watch('no_photo') || false;

  const baseName = socialName || legalName;
  const suggestions = generateCategorizedIds(baseName);

  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idStatus, setIdStatus] = useState<'idle' | 'available' | 'taken'>('idle');

  useEffect(() => {
    if (!customAvatarUrl && !noPhoto) {
      const avatar = PRESET_AVATARS[avatarIndex];
      setValue('avatar_url', avatar.src);
      setValue('avatar_name', avatar.name);
    }
  }, [avatarIndex, customAvatarUrl, noPhoto, setValue]);

  useEffect(() => {
    if (horizonId.length < 3) { setIdStatus('idle'); return; }
    setIsCheckingId(true);
    const timer = setTimeout(() => { setIdStatus('available'); setIsCheckingId(false); }, 600);
    return () => clearTimeout(timer);
  }, [horizonId]);

  const handleFile = (file: File, type: 'avatar' | 'cover') => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (type === 'avatar') { setCustomAvatarUrl(url); setValue('avatar_url', url); } 
      else { setValue('cover_url', url); }
    };
    reader.readAsDataURL(file);
  };

  // Os mesmos estilos exatos da Legal Scene
  const inputStyles = 'w-full bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-base font-medium text-text-primary placeholder:text-text-secondary/40 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">

      <IdentityDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />

      {/* BOTÃO HUB */}
      <button 
        type="button" 
        onClick={() => setIsDrawerOpen(true)}
        className="w-full flex items-center justify-between p-4 rounded-xl border border-border/60 bg-surface/40 hover:border-brand/40 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <LayoutGrid className="text-brand" size={20} />
          <div className="text-left">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-text-primary">Hub de Identidade</h3>
            <p className="text-[10px] text-text-secondary">Gerencie seu Grupo Celestial e Badges</p>
          </div>
        </div>
      </button>

      {/* HORIZON ID */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">
          Identificador Global <span className="text-danger">*</span>
        </label>
        <div className="relative group">
          <input
            type="text"
            {...register('horizon_id', { required: 'Obrigatório.', minLength: 3 })}
            className={`${inputStyles} pl-12 pr-10 ${errors.horizon_id ? 'border-danger/50 focus:border-danger' : idStatus === 'available' ? 'border-success/50' : ''}`}
            placeholder="@"
            onChange={(e) => setValue('horizon_id', e.target.value.toLowerCase().replace(/\s/g, '_').replace(/[^a-z0-9_.]/g, ''), { shouldValidate: true })}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isCheckingId ? <Loader2 size={18} className="animate-spin text-text-secondary"/> : idStatus === 'available' ? <CheckCircle2 size={18} className="text-success" /> : idStatus === 'taken' ? <XCircle size={18} className="text-danger" /> : null}
          </div>
        </div>
        {errors.horizon_id && <p className="text-[10px] text-danger font-bold uppercase">{errors.horizon_id.message as string}</p>}

        {/* SUGESTÕES DE IDENTIFICADOR */}
        {baseName.length > 2 && idStatus !== 'available' && (
          <div className="pt-2">
            <p className="text-[10px] text-text-secondary/60 uppercase tracking-widest mb-2">Sugestões baseadas no seu nome:</p>
            <div className="flex flex-wrap gap-2">
              {[...suggestions.formal, ...suggestions.social, ...suggestions.divertido].slice(0, 4).map(s => (
                <button 
                  key={s} type="button" onClick={() => setValue('horizon_id', s, { shouldValidate: true })} 
                  className="px-3 py-1.5 bg-surface border border-border/60 rounded-lg text-[11px] font-bold text-text-secondary hover:border-brand hover:text-brand transition-all"
                >
                  @{s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DEMOGRAFIA E BIO (gap-6 cria o respiro visual perfeito entre as colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HorizonSelect label="Pronome" options={PRONOUN_OPTIONS} value={watch('pronoun') || ''} onChange={(val) => setValue('pronoun', val)} error={errors.pronoun?.message as string} />
        <HorizonSelect label="Gênero" options={GENDER_OPTIONS} value={watch('gender') || ''} onChange={(val) => setValue('gender', val)} error={errors.gender?.message as string} />
        <HorizonSelect label="Sexualidade" options={SEXUALITY_OPTIONS} value={watch('sexuality') || ''} onChange={(val) => setValue('sexuality', val)} error={errors.sexuality?.message as string} />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary flex justify-between">
          <span>Bio Pública</span> <span className="opacity-50 font-normal">{(watch('bio') || '').length}/160</span>
        </label>
        <textarea {...register('bio')} rows={2} className={`${inputStyles} resize-none`} placeholder="Uma frase que te define digitalmente..." />
      </div>

      {/* COMPOSIÇÃO VISUAL E CARROSSEL DE AVATAR */}
      <div className="space-y-6 pt-4 border-t border-border/40">
        <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Identidade Visual</label>
        
        {/* CAPA */}
        <div className="relative w-full h-32 rounded-2xl bg-surface/40 border-2 border-dashed border-border/60 hover:border-brand/40 overflow-hidden cursor-pointer group transition-colors" onClick={() => coverInputRef.current?.click()}>
          {watch('cover_url') ? (
            <Image src={watch('cover_url')} alt="Capa" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
              <UploadCloud size={20} className="mb-2 text-text-secondary"/>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-primary">Adicionar Capa</span>
            </div>
          )}
          <input ref={coverInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0], 'cover')} />
        </div>

        {/* AVATAR + CARROSSEL (Arrastável, padronizado com os botões) */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative -mt-12 z-10 px-4">
          <div className="relative w-24 h-24 shrink-0">
            <div className="w-full h-full rounded-full border-[4px] border-background shadow-lg overflow-hidden bg-surface relative flex items-center justify-center cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
              {customAvatarUrl ? (
                <Image src={customAvatarUrl} alt="Custom" fill className="object-cover" />
              ) : noPhoto ? (
                 <div className="text-[10px] uppercase font-bold text-text-secondary text-center leading-tight">Sem<br/>Foto</div>
              ) : (
                <Image src={PRESET_AVATARS[avatarIndex].src} alt="Avatar" fill className="object-cover p-3" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <UploadCloud size={20} className="text-white"/>
              </div>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0], 'avatar')} />
          </div>

          <div className="flex-1 w-full mt-4 sm:mt-12 overflow-hidden">
            <p className="text-[10px] text-text-secondary/60 uppercase tracking-widest mb-3">Escolha um estilo base:</p>
            {/* O Carrossel Fluído */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1">
              {!customAvatarUrl && !noPhoto && PRESET_AVATARS.map((av, i) => (
                <button 
                  key={av.name} type="button" onClick={() => setAvatarIndex(i)} 
                  className={`snap-start shrink-0 px-5 py-2.5 rounded-xl border text-[11px] font-bold uppercase transition-all ${avatarIndex === i ? 'border-brand bg-brand/5 text-brand' : 'border-border/60 bg-surface/30 text-text-secondary hover:border-brand/40'}`}
                >
                  {av.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MÓDULOS FUTUROS (No padrão da Legal Scene) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/40">
        <div className="p-4 bg-surface/30 border border-border/60 rounded-xl flex items-center justify-between opacity-70">
          <div className="flex items-center gap-3">
            <Palette className="text-text-secondary shrink-0" size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Tema Custom</span>
          </div>
          <BadgeEmBreve featureName="Temas" />
        </div>
        
        <div className="p-4 bg-surface/30 border border-border/60 rounded-xl flex items-center justify-between opacity-70">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-text-secondary shrink-0" size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Config. IA</span>
          </div>
          <BadgeEmBreve featureName="IA Voice" />
        </div>
      </div>

    </div>
  );
}