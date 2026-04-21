import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Nível 1: Identidade Institucional */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded">
            <Image
              src="/images/HORAZION/LOGO-GROUP-BLACK.svg"
              alt="Horazion Group"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nível 2: Navegação Estrutural (Oculta no mobile para focar na conversão) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="/ecossistema" className="hover:text-gray-900 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1">
            Ecossistema
          </Link>
          <Link href="/manifesto" className="hover:text-gray-900 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1">
            Manifesto
          </Link>
        </nav>

        {/* Nível 3: Ações de Identidade (Auth) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            Acessar Hub
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors px-5 py-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            Criar Identidade
          </Link>
        </div>
        
      </div>
    </header>
  );
}