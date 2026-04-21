import Image from 'next/image';
import Link from 'next/link';
// [CORE-HZ-009] Importação com alias absoluto previne quebras de build no Vercel
import { LoginForm } from '@/features/account/components/login/login-form';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 items-center justify-center relative p-6">
      
      {/* Header Fixo Minimalista */}
      <header className="absolute top-0 left-0 w-full p-6 lg:px-12 flex justify-between items-center z-20">
        <Link href="/" className="text-[13px] font-semibold opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Voltar para o início</span>
        </Link>
      </header>

      {/* Caixa Central de Login */}
      <main className="w-full max-w-sm flex flex-col items-center z-10">
        
        {/* Logo */}
        <div className="mb-10">
          <Image 
            src="/images/HORAZION/LOGO-UNIDADE-accoutn.svg" 
            alt="Horazion Account" 
            width={180} 
            height={45} 
            priority
          />
        </div>

        {/* Título e Formulário */}
        <div className="w-full text-center space-y-2 mb-8">
          <h1 className="text-2xl font-medium tracking-tight">
            Autenticação
          </h1>
          <p className="text-[13px] opacity-70">
            Acesse o seu ecossistema.
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center">
          <Link href="/register" className="text-[13px] font-semibold opacity-70 hover:opacity-100 transition-opacity inline-block focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1">
            Ainda não tem conta? <span className="font-bold">Criar seu espaço</span>
          </Link>
        </div>

      </main>

      {/* Rodapé Simples Absoluto */}
      <div className="absolute bottom-6 text-[10px] opacity-40 font-bold uppercase tracking-widest text-center">
        © 2026 Horazion Group
      </div>

    </div>
  );
}