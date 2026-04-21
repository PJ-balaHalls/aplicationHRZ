'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { ArrowLeft } from 'lucide-react';

import { RegisterFlow } from '@/features/account/components/register/register-flow';
import { RegisterTicketPreview } from '@/features/account/components/register/register-ticket-preview';
import { RegisterAccountSchema, type RegisterAccountInput } from '@horizion/types/src/validators/account.schema';
import { registerNewUser, type RegisterSuccessPayload } from '@/features/account/actions/register.action';

export default function RegisterPage() {
  const methods = useForm<RegisterAccountInput>({
    mode: 'onChange',
    resolver: zodResolver(RegisterAccountSchema),
  });

  const [isFinalizing, setIsFinalizing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState<RegisterSuccessPayload['data'] | undefined>(undefined);
  const [serverError, setServerError] = useState<string | null>(null);

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const executeRegistrationSequence = async (formData: RegisterAccountInput) => {
    setServerError(null);
    setIsFinalizing(true);

    try {
      const result = await registerNewUser(formData);

      if (!result.success) {
        setIsFinalizing(false);
        setServerError(result.error.message);
        if (result.error.field) {
          methods.setError(result.error.field as keyof RegisterAccountInput, {
             type: "server", message: result.error.message 
          });
        }
        return;
      }

      // Aguarda o tempo da animação do ticket cortar antes de virar a tela inteira
      setTimeout(() => {
        setRegisteredData(result.data);
        setIsRegistered(true);
      }, 4000);

    } catch (error) {
      setIsFinalizing(false);
      setServerError("Divergência sistêmica. Por favor, tente novamente.");
    }
  };

  const currentTheme = theme || resolvedTheme || 'light';
  let isologoSrc = '/images/HORAZION/ISOLOGO-RED.svg';
  if (currentTheme === 'black' || currentTheme === 'dark') isologoSrc = '/images/HORAZION/ISOLOGO-WHITE.svg';
  else if (currentTheme === 'gray') isologoSrc = '/images/HORAZION/ISOLOGO-BLACK.svg';

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--color-background)] transition-colors duration-300">

        {/* HEADER DE GOVERNANÇA */}
        <header className="absolute top-0 left-0 w-full p-6 lg:px-12 flex justify-between items-center z-30">
          <Link href="/" className="font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-2 transition-colors outline-none">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Retornar à Base</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            {mounted && <Image src={isologoSrc} alt="Horazion Isologo" width={34} height={34} priority />}
          </div>
          <div className="w-[100px] hidden md:block" />
        </header>

        {/* ESTRUTURA PRINCIPAL REATIVA */}
        {/* Se isRegistered, a grid perde as colunas e vira 100% para o SuccessScene centralizar */}
        <main className={`flex-1 grid grid-cols-1 ${!isRegistered ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''} pt-24 lg:pt-0 relative`}>

          {/* LADO ESQUERDO (Flow/Success) */}
          <section className={`flex flex-col items-center justify-center p-6 lg:p-20 order-2 lg:order-1 relative z-10 ${isRegistered ? 'w-full max-w-4xl mx-auto' : ''}`}>
            <div className={`w-full ${isRegistered ? 'max-w-2xl' : 'max-w-md'} mt-4 lg:mt-0 transition-all duration-700`}>

              {!isRegistered && (
                <div className="mb-10 text-center lg:text-left space-y-3">
                  <h1 className="text-[32px] lg:text-[42px] font-black tracking-tighter uppercase italic leading-none text-[var(--color-text-primary)]">
                    Estabeleça<br />Sua Account.
                  </h1>
                  <p className="text-[14px] text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-[340px] mx-auto lg:mx-0">
                    Inicie a construção do seu Profile primário no ecossistema Horazion de forma segura e soberana.
                  </p>
                </div>
              )}

              {serverError && !isFinalizing && (
                <div className="mb-6 p-4 bg-[var(--color-hrz-red)]/10 border border-[var(--color-hrz-red)]/20 rounded-2xl">
                  <p className="text-[13px] text-[var(--color-hrz-red)] font-bold leading-relaxed">{serverError}</p>
                </div>
              )}

              <RegisterFlow
                onSubmit={methods.handleSubmit(executeRegistrationSequence)}
                isFinalizing={isFinalizing}
                isRegistered={isRegistered}
                registeredData={registeredData}
              />

              {!isRegistered && (
                <div className="mt-8 text-center">
                  <Link href="/login" className="text-[11px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors inline-block uppercase tracking-widest">
                    Já possui um Nó Ativo? <span className="text-[var(--color-hrz-red)]">Autenticar agora</span>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* LADO DIREITO (Ticket Dinâmico) */}
          {/* Removida a linha divisória (border-l). O componente é desmontado no isRegistered */}
          {!isRegistered && (
            <section className="order-1 lg:order-2 relative bg-transparent">
              <div className="w-full lg:sticky lg:top-0 lg:h-screen flex items-center justify-center py-10 lg:py-0 relative">
                <RegisterTicketPreview isFinalizing={isFinalizing} />
              </div>
            </section>
          )}
        </main>

        {/* RODAPÉ JURÍDICO */}
        <footer className="border-t border-[var(--color-border)] pt-8 pb-8 px-6 lg:px-24 transition-colors duration-300 relative z-20 bg-[var(--color-surface)]/80 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">
              © {new Date().getFullYear()} Horazion Group S.A. · ISO 42001 & LGPD Compliant
            </p>
            <div className="flex items-center gap-6">
              <Link href="/legal/privacidade" className="text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest font-bold">Privacidade</Link>
              <Link href="/legal/termos-de-uso" className="text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest font-bold">Termos</Link>
              <Link href="/legal/niveis-e-grupos" className="text-[10px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest font-bold">Grupos & Níveis</Link>
            </div>
          </div>
        </footer>
      </div>
    </FormProvider>
  );
}