'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { MapPin, Radar, Crosshair, Globe2, AlertCircle, Map, Navigation, Loader2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LocationScene() {
  // Extraímos errors para lidar com a validação visual do Zod, se necessário
  const { register, setValue } = useFormContext();
  
  const [isScanning, setIsScanning] = useState(false);
  const [isFetchingZip, setIsFetchingZip] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // FE-HZ-003: Separação entre estado de interface e dados de backend
  // Guardamos as coordenadas formatadas apenas na camada de UI.
  const [displayCoords, setDisplayCoords] = useState<string>('');

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    setValue('postal_code', val, { shouldValidate: true });

    if (val.length === 8) {
      setIsFetchingZip(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${val}/json/`);
        const data = await res.json();
        
        if (!data.erro) {
          setValue('country_code', 'BR', { shouldValidate: true });
          setValue('state_province', data.uf, { shouldValidate: true });
          setValue('city', data.localidade, { shouldValidate: true });
          setValue('neighborhood', data.bairro, { shouldValidate: true });
          setValue('street_address', data.logradouro, { shouldValidate: true });
          setGeoError(null);
        }
      } catch (err) {
        // Fallback silencioso (Minimalismo Funcional)
      } finally { 
        setIsFetchingZip(false); 
      }
    }
  };

  const handleScanLocation = () => {
    setGeoError(null);
    setIsScanning(true);

    if (!navigator.geolocation) {
      setGeoError("Telemetria não suportada por este hardware.");
      setIsScanning(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Registra os números puros no formulário para satisfazer o Schema (z.number())
        setValue('latitude', latitude, { shouldValidate: true });
        setValue('longitude', longitude, { shouldValidate: true });
        
        // Atualiza a interface
        setDisplayCoords(`LAT: ${latitude.toFixed(4)} | LNG: ${longitude.toFixed(4)}`);

        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          if (!res.ok) throw new Error();
          const data = await res.json();
          const address = data.address || {};
          
          setValue('country_code', address.country_code?.toUpperCase() || 'BR', { shouldValidate: true });
          setValue('state_province', address.state || address.region || '', { shouldValidate: true });
          setValue('city', address.city || address.town || address.municipality || '', { shouldValidate: true });
          setValue('neighborhood', address.suburb || address.neighbourhood || address.quarter || '', { shouldValidate: true });
          setValue('street_address', address.road || address.pedestrian || '', { shouldValidate: true });
          
          if (address.postcode) {
             setValue('postal_code', address.postcode.replace(/\D/g, ''), { shouldValidate: true });
          }
        } catch (error) {
          setGeoError("Sinal detectado, mas falha ao decodificar a região. Insira manualmente.");
        } finally {
          setIsScanning(false);
        }
      },
      (error) => {
        setIsScanning(false);
        if (error.code === error.PERMISSION_DENIED) setGeoError("Acesso negado. Autorização é necessária para verificação automática.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const inputStyles = "w-full bg-surface/30 border border-border/60 px-4 py-3.5 rounded-xl text-sm font-medium text-text-primary placeholder:text-text-secondary/40 focus:bg-background focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="flex flex-col items-center justify-center p-6 border border-border/40 rounded-xl bg-surface/20 relative overflow-hidden h-[160px]">
        {/* Ilustração Solicitada */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
           <Image src="/images/HRZ-ILUSTRACION/undraw_my-current-location_tudq.svg" alt="Location" fill className="object-contain p-4" priority />
        </div>
        <AnimatePresence>
          {isScanning && (
            <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute w-24 h-24 border border-brand rounded-full pointer-events-none z-0" />
          )}
        </AnimatePresence>

        <button type="button" onClick={handleScanLocation} disabled={isScanning} className={`relative z-10 flex flex-col items-center gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xl p-2 ${isScanning ? 'opacity-90 scale-95' : 'hover:scale-105 hover:text-brand text-text-primary'}`}>
          <div className={`p-4 rounded-full shadow-sm transition-colors ${isScanning ? 'bg-brand text-white border border-brand' : 'bg-surface border border-border'}`}>
            {isScanning ? <Radar size={28} className="animate-spin-slow" /> : <Crosshair size={28} />}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-center">
            {isScanning ? 'Verifique o Pop-up do seu Navegador' : 'Verificar Integridade Geográfica (GPS)'}
          </span>
        </button>
        {geoError && <p className="mt-2 text-[10px] text-warning font-bold flex items-center justify-center gap-1.5 uppercase tracking-widest text-center z-10"><AlertCircle size={14} /> {geoError}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex justify-between">
            <span className="flex items-center gap-2"><Navigation size={12} /> Código Postal</span>
            {isFetchingZip && <Loader2 size={12} className="animate-spin text-brand" />}
          </label>
          <input type="text" {...register('postal_code')} onChange={handleZipCodeChange} className={inputStyles} placeholder="00000-000" maxLength={9} />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <Globe2 size={12} /> Nação Sede
          </label>
          <input type="text" {...register('country_code')} className={inputStyles} placeholder="Ex: BR" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <Map size={12} /> Estado/UF
          </label>
          <input type="text" {...register('state_province')} className={inputStyles} placeholder="Ex: SP" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <MapPin size={12} /> Cidade Base
          </label>
          <input type="text" {...register('city')} className={inputStyles} placeholder="Ex: São Paulo" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <Home size={12} /> Bairro
          </label>
          <input type="text" {...register('neighborhood')} className={inputStyles} placeholder="Distrito/Bairro" />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
            <Navigation size={12} /> Logradouro
          </label>
          <input type="text" {...register('street_address')} className={inputStyles} placeholder="Rua/Avenida" />
        </div>
      </div>

      {/* DISPLAY DE COORDENADAS HIGH-TECH SEMPRE VISÍVEL QUANDO EXISTENTE */}
      <div className="bg-surface/50 border border-border/40 p-3 rounded-lg flex items-center justify-between">
         <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">Vetor Geográfico:</span>
         <span className="text-[10px] font-mono font-bold text-brand tracking-widest">
            {displayCoords ? displayCoords : 'AGUARDANDO SINCRONIZAÇÃO...'}
         </span>
      </div>

    </div>
  );
}