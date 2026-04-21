'use client';

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Cpu, CheckCircle2, User, RefreshCw, ShieldCheck, Fingerprint, MapPin } from "lucide-react";
import "./ticket-styles.css";

export function RegisterTicketPreview({ isFinalizing = false }: { isFinalizing?: boolean }) {
  const { watch } = useFormContext();
  const [animState, setAnimState] = useState<'idle' | 'cutting'>('idle');
  const [isFlipped, setIsFlipped] = useState(false);
  
  // FIX HYDRATION: Mantém o componente ciente se está rodando no Server ou Client
  const [mounted, setMounted] = useState(false);
  const [secureHash, setSecureHash] = useState("LOADING");

  const formValues = watch(); 
  const prevValuesRef = useRef(formValues);

  // Inicialização segura no Client-Side
  useEffect(() => {
    setMounted(true);
    // Gera o Hash apenas no cliente, impedindo o Mismatch com o Servidor
    setSecureHash(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);
  
  useEffect(() => {
    const prev = prevValuesRef.current;
    const curr = formValues;
    if (!prev || !curr) return;

    const backFocused = 
      curr.legal_name !== prev.legal_name || 
      curr.tax_id !== prev.tax_id || 
      curr.account_type !== prev.account_type;

    const frontFocused = 
      curr.social_name !== prev.social_name || 
      curr.horizon_id !== prev.horizon_id || 
      curr.avatar_url !== prev.avatar_url ||
      curr.email !== prev.email;

    if (backFocused) setIsFlipped(true);
    else if (frontFocused) setIsFlipped(false);

    prevValuesRef.current = curr;
  }, [formValues]);

  const socialName = formValues?.social_name || "";
  const legalName = formValues?.legal_name || "";
  const horizonId = formValues?.horizon_id || ""; 
  const email = formValues?.email || "";
  const taxId = formValues?.tax_id || "";
  const accountType = formValues?.account_type || "INDIVIDUAL";
  const photoUrl = formValues?.avatar_url || null;
  const country = formValues?.country_code || "BR";
  const state = formValues?.state_province || "SP";
  const city = formValues?.city || "";
  
  const canonicalGroup = "COMETA";
  const canonicalLevel = "ALFA";
  const locationStr = state && country ? `${state}/${country}`.toUpperCase() : "PENDING";
  
  const liveSignature = `HZ-${locationStr}-${canonicalLevel.substring(0,3)}-IND`;

  const initials = useMemo(() => {
    const n = socialName || legalName;
    if (!n) return "HZ";
    return n.trim().split(" ")[0][0].toUpperCase();
  }, [socialName, legalName]);

  const [barcode, setBarcode] = useState<number[]>([]);
  useEffect(() => {
    const pattern = [];
    for (let i = 0; i < 40; i++) pattern.push((i % 3 === 0) ? 2 : (i % 4 === 0) ? 3 : 1);
    setBarcode(pattern);
  }, []);

  useEffect(() => {
    if (isFinalizing) {
      setIsFlipped(false); 
      setTimeout(() => setAnimState('cutting'), 500);
    }
  }, [isFinalizing]);

  // FIX HYDRATION: Retorna null ou Skeleton leve até o Client montar
  if (!mounted) return null;

  return (
    <div className="relative w-full max-w-[340px] flex justify-center items-start z-[90] font-inter">
      <div className="ticket-slot-wrapper">
        
        <div className={`physical-ticket ${animState === 'cutting' ? 'is-cutting' : ''}`}>
          
          <div 
            className={`ticket-flat-container cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
              
            {/* FACE A: FRENTE DO TICKET (Identidade Principal) */}
            <div className="ticket-layer ticket-front">
              <div className="bg-[var(--color-hrz-red)] p-5 border-b border-[var(--color-border)]">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[var(--color-background)] border border-[var(--color-border)] rounded flex items-center justify-center shrink-0">
                      <Cpu size={14} className="text-[var(--color-hrz-red)]" />
                    </div>
                    <div>
                      <h4 className="text-[var(--color-background)] text-[12px] font-black tracking-[0.1em] leading-none uppercase">HORAZION</h4>
                      <p className="text-[var(--color-background)]/80 text-[8px] font-bold tracking-[0.2em] mt-1 uppercase">IDENTITY PASS</p>
                    </div>
                  </div>
                  <div className="border border-[var(--color-background)]/20 text-[var(--color-background)] text-[8px] font-bold px-2 py-1 rounded tracking-[0.1em] uppercase flex items-center gap-1.5 opacity-90">
                    <RefreshCw size={10} /> {isFlipped ? "Verso" : "Frente"}
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] flex items-center justify-center overflow-hidden shrink-0">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : socialName ? (
                      <span className="text-[16px] font-black text-[var(--color-hrz-red)]">{initials}</span>
                    ) : (
                      <User size={18} className="text-[var(--color-text-secondary)] opacity-50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Titular Soberano</p>
                    {socialName ? (
                      <h3 className="text-[15px] font-black text-[var(--color-text-primary)] truncate mt-0.5">{socialName}</h3>
                    ) : (
                      <div className="h-[16px] w-[80%] sk-shimmer mt-0.5" />
                    )}
                    {horizonId ? (
                      <p className="text-[11px] font-bold text-[var(--color-hrz-red)] truncate mt-0.5">@{horizonId}</p>
                    ) : (
                      <div className="h-[12px] w-[40%] sk-shimmer mt-1" />
                    )}
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-[var(--color-border)]" />
                
                <div className="flex flex-col gap-1.5">
                  <p className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Digital Signature</p>
                  <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-md px-3 py-2.5">
                    <span className="text-[12px] font-black text-[var(--color-text-primary)] truncate block tracking-widest text-center uppercase">
                      {liveSignature}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[8px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Grupo</p>
                    <p className="text-[11px] font-black text-[var(--color-text-primary)] uppercase truncate tracking-wide">{canonicalGroup}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[8px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Nível</p>
                    <p className="text-[11px] font-black text-[var(--color-text-primary)] uppercase truncate tracking-wide">{canonicalLevel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FACE B: VERSO DO TICKET (Dados Jurídicos) */}
            <div className="ticket-layer ticket-back">
              <div className="bg-[var(--color-background)] p-5 border-b border-[var(--color-border)]">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-[var(--color-text-primary)] text-[12px] font-black tracking-[0.1em] leading-none flex items-center gap-1.5 uppercase">
                      <ShieldCheck size={14} className="text-[var(--color-text-secondary)]" /> DOSSIÊ TÉCNICO
                    </h4>
                    <p className="text-[var(--color-text-secondary)] text-[8px] font-bold tracking-[0.2em] mt-1.5 uppercase">ACCOUNT DATA</p>
                  </div>
                  <div className="border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[8px] font-bold px-2 py-1 rounded tracking-[0.1em] uppercase flex items-center gap-1.5">
                    <RefreshCw size={10} /> Verso
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-5 h-full bg-[var(--color-surface)]">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Raiz Jurídica</p>
                  {legalName ? (
                    <p className="text-[13px] font-black text-[var(--color-text-primary)] truncate tracking-wide">{legalName}</p>
                  ) : (
                    <div className="h-[14px] w-[90%] sk-shimmer" />
                  )}
                  {taxId && <p className="text-[10px] font-bold text-[var(--color-text-secondary)] tracking-widest mt-0.5 uppercase">DOC: {taxId}</p>}
                </div>
                
                <div className="h-[1px] w-full border-t border-dashed border-[var(--color-border)]" />

                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">Contato Oficial</p>
                  {email ? (
                    <p className="text-[12px] font-bold text-[var(--color-text-primary)] truncate">{email}</p>
                  ) : (
                    <div className="h-[14px] w-[80%] sk-shimmer" />
                  )}
                  <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase mt-1 tracking-widest">
                    TIPO: {accountType}
                  </p>
                </div>

                <div className="h-[1px] w-full border-t border-dashed border-[var(--color-border)]" />

                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase flex items-center gap-1.5">
                    <MapPin size={10} /> Célula de Origem
                  </p>
                  {(city || state) ? (
                    <p className="text-[12px] font-bold text-[var(--color-text-primary)] truncate">{city} - {state}</p>
                  ) : (
                    <div className="h-[14px] w-[70%] sk-shimmer" />
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* O PICOTE MECÂNICO */}
          <div className="ticket-perforation"><div className="dashed-line" /></div>

          {/* CANHOTO INFERIOR (Corte Final) */}
          <div className="ticket-bottom p-5 flex flex-col items-center gap-4 bg-[var(--color-background)]">
            <div className="w-full flex justify-between items-center mb-1">
              <span className="text-[9px] font-black text-[var(--color-text-primary)] tracking-widest uppercase">ENCRYPTED</span>
              <span className="text-[9px] font-bold text-[var(--color-text-secondary)] tracking-widest uppercase">{secureHash}</span>
            </div>
            
            <div className="barcode-lines px-2">
              {barcode.map((width, i) => (
                <div key={i} className="bc-line" style={{ width: `${width}px` }} />
              ))}
            </div>
            
            <div className="text-[10px] font-black text-[var(--color-text-secondary)] tracking-[0.3em] mt-1 uppercase">
              7724 · CMT · 001
            </div>
          </div>

        </div>

        {/* PASTA DE ARQUIVAMENTO (Sólida e Flat) */}
        <div className="folder-container">
          <div className="folder-back" />
          <div className="folder-front">
            {animState === 'cutting' && (
              <div className="animate-in fade-in duration-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--color-text-primary)]" />
                <p className="text-[12px] font-bold text-[var(--color-text-primary)] uppercase tracking-tight">
                  Soberania Ativa
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}