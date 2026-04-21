'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Globe, Smartphone, Monitor } from 'lucide-react';

const SECURITY_MESSAGES = [
  "PROTOCOLO TLS 1.3 ATIVO",
  "AUTENTICAÇÃO ZERO-KNOWLEDGE",
  "CRIPTOGRAFIA AES-256-GCM",
  "HORAZION UNIVERSE™ SECURE NODE"
];

export function RegisterAnimation() {
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');
  const [url, setUrl] = useState('');
  const [step, setStep] = useState(0); // 0: typing, 1: loading, 2: content

  useEffect(() => {
    const sequence = async () => {
      // Loop infinito da animação
      while (true) {
        setStep(0);
        setUrl('');
        // Simulação de digitação
        const targetUrl = "www.horazion.com/account";
        for (let i = 0; i <= targetUrl.length; i++) {
          setUrl(targetUrl.slice(0, i));
          await new Promise(r => setTimeout(r, 60));
        }
        
        await new Promise(r => setTimeout(r, 500));
        setStep(1); // Loading bar
        await new Promise(r => setTimeout(r, 1500));
        
        setStep(2); // Content reveal
        await new Promise(r => setTimeout(r, 6000));
        
        // Troca o modo e reinicia
        setMode(prev => prev === 'desktop' ? 'mobile' : 'desktop');
      }
    };
    sequence();
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 bg-gray-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === 'desktop' ? (
          <motion.div 
            key="desktop"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-xl aspect-video bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Browser Chrome */}
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white h-7 rounded-md border border-gray-200 flex items-center px-3 gap-2">
                <Lock className={`w-3 h-3 ${step >= 1 ? 'text-green-500' : 'text-gray-400'}`} />
                <span className="text-[11px] font-mono text-gray-500">{url}</span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 flex bg-white relative">
              {step < 2 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <Globe className="w-12 h-12 text-gray-100 animate-pulse" />
                  {step === 1 && (
                    <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-red-600"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex w-full h-full">
                  <div className="w-16 bg-gray-900 flex flex-col items-center py-6 gap-4">
                     <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">H</div>
                     <div className="w-6 h-1 bg-gray-700 rounded-full" />
                     <div className="w-6 h-1 bg-gray-700 rounded-full" />
                  </div>
                  <div className="flex-1 p-8">
                     <div className="space-y-4 max-w-xs">
                        {/* Skeleton Form */}
                        {[1,2,3].map(i => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="h-2 w-24 bg-gray-100 rounded" />
                            <div className="h-10 w-full border border-gray-100 rounded-lg" />
                          </motion.div>
                        ))}
                     </div>
                     <div className="absolute bottom-6 right-6 space-y-2">
                        {SECURITY_MESSAGES.map((msg, i) => (
                          <motion.div 
                            key={i}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 + (i * 0.2) }}
                            className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full"
                          >
                            <ShieldCheck className="w-3 h-3" /> {msg}
                          </motion.div>
                        ))}
                     </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="mobile"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="w-64 aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 relative overflow-hidden"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />
             <div className="p-4 pt-12">
               {step < 2 ? (
                 <div className="flex flex-col items-center gap-8 mt-12">
                    <div className="w-16 h-16 rounded-2xl bg-red-600 shadow-xl flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-xs font-medium text-gray-400">Opening Horazion Account...</p>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="h-6 w-32 bg-gray-100 rounded-md" />
                    <div className="space-y-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-12 w-full bg-white border border-gray-100 rounded-xl" />
                      ))}
                    </div>
                 </div>
               )}
             </div>
             {step === 2 && (
               <motion.div 
                 initial={{ y: 100 }}
                 animate={{ y: 0 }}
                 className="absolute bottom-0 inset-x-0 h-32 bg-gray-900 p-6 rounded-t-3xl"
               >
                 <div className="text-[10px] text-green-400 font-mono flex items-center gap-2 mb-2">
                   <Lock className="w-3 h-3" /> SECURITY_STATUS: OPTIMAL
                 </div>
                 <div className="text-[9px] text-gray-500 font-mono leading-relaxed">
                   ENCRYPTION: AES-256<br/>
                   NODE: HORAZION-V2<br/>
                   ZERO-TRUST: ENABLED
                 </div>
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}