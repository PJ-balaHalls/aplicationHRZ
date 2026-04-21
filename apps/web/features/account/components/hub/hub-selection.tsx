'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, User } from 'lucide-react';

// [CORE-HZ-013] Importações Absolutas: Quebram a dependência de pastas relativas (../)
import { getGenderedGreeting, getTimeBasedGreeting } from '@/features/account/utils/greetings';
import { ENVIRONMENT_THEMES } from '@/modules/account/constants';

// Tipagem baseada no token JWT decodificado ou da API de perfil atual
interface HubSelectionProps {
  user: {
    social_name: string;
    pronouns: string[];
    timezone: string;
    accounts: Array<{
      id: string;
      type: 'INDIVIDUAL' | 'EDUCATIONAL' | 'ENTERPRISE';
      name: string;
      organization_name?: string;
    }>;
  };
}

const HUB_ICONS = {
  INDIVIDUAL: User,
  EDUCATIONAL: GraduationCap,
  ENTERPRISE: Briefcase,
};

export function HubSelection({ user }: HubSelectionProps) {
  const { welcome, adjectiveSuffix } = getGenderedGreeting(user.pronouns);
  const timeGreeting = getTimeBasedGreeting(user.timezone);

  const handleSelectHub = async (accountId: string, type: string) => {
    // Dispara Server Action para gerar o Token de Sessão Específico do Hub (Isolamento de Ambiente)
    // Redireciona para /dashboard/[tipo]
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      
      {/* Saudação Dinâmica */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12"
      >
        <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">
          Horizion Gateway
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-gray-900 mb-2">
          {timeGreeting}, {user.social_name}.
        </h1>
        <p className="text-xl text-gray-500">
          {welcome} ao seu ecossistema. Qual universo você deseja acessar agora?
        </p>
      </motion.div>

      {/* Grid de Hubs (Containers de Conta) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {user.accounts.map((account) => {
          const theme = ENVIRONMENT_THEMES[account.type];
          const Icon = HUB_ICONS[account.type];

          return (
            <button
              key={account.id}
              onClick={() => handleSelectHub(account.id, account.type)}
              className="group relative flex flex-col items-start p-8 text-left bg-white border border-gray-100 rounded-2xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Linha indicadora de cor do ambiente (Sutil, no topo) */}
              <div 
                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: theme.color }}
              />

              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors"
                style={{ backgroundColor: `${theme.color}15`, color: theme.color }}
              >
                <Icon strokeWidth={1.5} className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {account.name}
              </h3>
              
              {account.organization_name ? (
                <p className="text-sm text-gray-500 mb-8 h-10">
                  Vinculad{adjectiveSuffix} à instituição: <br/>
                  <span className="font-medium text-gray-700">{account.organization_name}</span>
                </p>
              ) : (
                <p className="text-sm text-gray-500 mb-8 h-10">
                  Seu ambiente pessoal e intransferível de gestão e produtividade.
                </p>
              )}

              <div className="mt-auto flex items-center text-sm font-medium transition-colors" style={{ color: theme.color }}>
                Acessar {theme.label} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}