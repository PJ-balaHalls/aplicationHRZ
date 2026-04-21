import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Grupos Celestiais, Níveis e Constelações | Horazion Group",
  description:
    "Entenda o sistema de governança de identidade digital da Horazion: Grupos Celestiais, Níveis de Acesso e Constelações de Domínio.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CELESTIAL_GROUPS = [
  {
    id: "RIGEL",
    name: "Rigel",
    emoji: "🔭",
    color: "#8C8C8C",
    bgColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    type: "Convidado",
    description:
      "Visitante temporário do ecossistema. Acesso limitado a conteúdo público, sem capacidade de criação ou interação persistente.",
    requirements: ["Acesso sem Account", "Navegação pública"],
    permissions: ["Leitura de conteúdo público", "Visualização de demonstrações"],
    restrictions: ["Sem criação de conteúdo", "Sem histórico", "Sem personalização"],
  },
  {
    id: "COMET",
    name: "Cometa",
    emoji: "☄️",
    color: "#5F6368",
    bgColor: "#F8F9FA",
    borderColor: "#E0E0E0",
    type: "Trial",
    description:
      "Novo habitante do ecossistema em período de estabelecimento. Acesso básico para explorar o ambiente e definir sua presença digital.",
    requirements: ["Account criada", "E-mail verificado"],
    permissions: [
      "Criação de Profile básico",
      "Acesso ao Dashboard",
      "Até 3 Blocos de Interesse",
      "Participação em comunidades públicas",
    ],
    restrictions: ["Sem acesso a módulos premium", "Histórico limitado a 30 dias"],
    isDefault: true,
  },
  {
    id: "SUN",
    name: "Sol",
    emoji: "☀️",
    color: "#B6192E",
    bgColor: "#FFF5F5",
    borderColor: "#FFD0D0",
    type: "B2C Pago",
    description:
      "Habitante ativo do ecossistema com assinatura ativa. Acesso completo à suíte de ferramentas pessoais e educacionais.",
    requirements: [
      "Assinatura Horazion ativa",
      "Account verificada",
      "Autenticação em dois fatores",
    ],
    permissions: [
      "Blocos de Interesse ilimitados",
      "Assistente de IA personalizado",
      "Histórico completo",
      "Exportação de dados",
      "Suporte prioritário",
      "Acesso antecipado a features",
    ],
    restrictions: [],
  },
  {
    id: "VEGA",
    name: "Vega",
    emoji: "⭐",
    color: "#0A2540",
    bgColor: "#F0F4FF",
    borderColor: "#C5D0E8",
    type: "Parceiro",
    description:
      "Organização ou indivíduo com parceria formal com a Horazion Group. Acesso a recursos de integração e co-criação.",
    requirements: [
      "Contrato de parceria ativo",
      "Account Business verificada",
      "KYB (Know Your Business) completo",
    ],
    permissions: [
      "API de integração",
      "White-label limitado",
      "Co-branding",
      "Relatórios avançados",
      "Account Manager dedicado",
    ],
    restrictions: ["Sujeito a termos do contrato de parceria"],
  },
  {
    id: "POLARIS",
    name: "Polaris",
    emoji: "🌟",
    color: "#2A0039",
    bgColor: "#F8F0FF",
    borderColor: "#D0B0E8",
    type: "B2B Enterprise",
    description:
      "Corporação com licença Enterprise ativa. Infraestrutura dedicada, governança customizável e suporte SLA.",
    requirements: [
      "Contrato Enterprise ativo",
      "Onboarding corporativo completo",
      "DPO designado",
      "Política de segurança aprovada",
    ],
    permissions: [
      "Instância dedicada",
      "SSO corporativo (SAML/OIDC)",
      "Governança de IA customizável",
      "Data Residency configurável",
      "Suporte SLA 99.9%",
      "Auditoria completa",
      "Integração com ERPs e sistemas legados",
    ],
    restrictions: [],
  },
  {
    id: "SIRIUS",
    name: "Sírius",
    emoji: "💫",
    color: "#B6192E",
    bgColor: "#FFF0F0",
    borderColor: "#FFB0B0",
    type: "Staff",
    description:
      "Colaborador interno da Horazion Group. Acesso administrativo com responsabilidade reforçada e auditoria contínua.",
    requirements: [
      "Vínculo empregatício/contratual ativo",
      "Treinamento de segurança concluído",
      "Acordo de confidencialidade assinado",
    ],
    permissions: [
      "Acesso administrativo por função",
      "Dashboard de monitoramento",
      "Ferramentas de suporte ao cliente",
      "Painel de analytics",
    ],
    restrictions: [
      "Acesso restrito por princípio de menor privilégio",
      "Auditoria de todas as ações",
    ],
  },
];

const ACCESS_LEVELS = [
  {
    id: "ALFA",
    name: "Alfa",
    emoji: "🔍",
    color: "#8C8C8C",
    description: "Nível de leitura. Pode visualizar conteúdo conforme permissões do grupo, mas sem capacidade de escrita ou modificação.",
    capabilities: ["Leitura de dados", "Visualização de relatórios", "Acesso a conteúdo público do grupo"],
  },
  {
    id: "BETA",
    name: "Beta",
    emoji: "🧪",
    color: "#0A2540",
    description: "Nível de teste. Acesso a funcionalidades em fase beta com capacidade de interação e feedback.",
    capabilities: ["Tudo do Alfa", "Interação com features beta", "Envio de feedback", "Criação limitada de conteúdo"],
  },
  {
    id: "SIGMA",
    name: "Sigma",
    emoji: "✍️",
    color: "#B6192E",
    description: "Nível padrão de escrita. Acesso completo às funcionalidades contratadas com capacidade plena de criação.",
    capabilities: ["Tudo do Beta", "Criação de conteúdo plena", "Gestão do próprio perfil", "Configurações pessoais"],
    isDefault: true,
  },
  {
    id: "OMEGA",
    name: "Omega",
    emoji: "⚡",
    color: "#2A0039",
    description: "Nível administrativo. Gestão de espaços, membros e configurações avançadas. Implica responsabilidade aumentada.",
    capabilities: ["Tudo do Sigma", "Gestão de membros", "Configurações do espaço/organização", "Relatórios avançados", "Delegação de permissões"],
  },
];

const CONSTELLATIONS = [
  {
    id: "IND",
    name: "Individual",
    emoji: "🌱",
    color: "#4CAF50",
    description:
      "Domínio pessoal. Voltado para crescimento individual: aprendizado, finanças pessoais, carreira e bem-estar.",
    examples: [
      "Horazion Life",
      "Agenda inteligente",
      "Finanças pessoais",
      "Portfólio de competências",
    ],
  },
  {
    id: "EDU",
    name: "Educacional",
    emoji: "📚",
    color: "#2196F3",
    description:
      "Domínio de aprendizado. Conecta alunos, professores e instituições de ensino em um ambiente de aprendizagem adaptativa.",
    examples: [
      "Horazion Education",
      "Trilhas de aprendizado",
      "Avaliações adaptativas",
      "Colaboração acadêmica",
    ],
  },
  {
    id: "CORP",
    name: "Corporativo",
    emoji: "🏢",
    color: "#9C27B0",
    description:
      "Domínio empresarial. Ferramentas de governança, compliance, gestão de equipes e transformação digital corporativa.",
    examples: [
      "Horazion Enterprises",
      "Gestão de processos",
      "Compliance e LGPD",
      "Business Intelligence",
    ],
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] font-black tracking-tighter text-[var(--color-text-primary)] mb-2">
      {children}
    </h2>
  );
}

function SectionSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-2xl">
      {children}
    </p>
  );
}

function CelestialCard({ group }: { group: (typeof CELESTIAL_GROUPS)[0] }) {
  return (
    <div
      className="relative rounded-3xl border p-6 space-y-4 transition-all"
      style={{
        backgroundColor: group.bgColor,
        borderColor: group.borderColor,
      }}
    >
      {/* Badge */}
      {group.isDefault && (
        <span
          className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full"
          style={{ backgroundColor: group.color, color: "#fff" }}
        >
          Padrão inicial
        </span>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">{group.emoji}</span>
        <div>
          <p
            className="text-[18px] font-black tracking-tight"
            style={{ color: group.color }}
          >
            {group.name}
          </p>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: group.color, opacity: 0.7 }}
          >
            {group.type}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
        {group.description}
      </p>

      {/* Requirements */}
      {group.requirements.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            Requisitos
          </p>
          <ul className="space-y-1">
            {group.requirements.map((req) => (
              <li
                key={req}
                className="flex items-start gap-2 text-[12px] text-[var(--color-text-secondary)]"
              >
                <span className="mt-0.5 shrink-0" style={{ color: group.color }}>
                  ›
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Permissions */}
      {group.permissions.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            Permissões
          </p>
          <ul className="space-y-1">
            {group.permissions.map((perm) => (
              <li
                key={perm}
                className="flex items-start gap-2 text-[12px] text-[var(--color-text-secondary)]"
              >
                <span className="mt-0.5 text-emerald-500 shrink-0">✓</span>
                {perm}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Restrictions */}
      {group.restrictions.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">
            Restrições
          </p>
          <ul className="space-y-1">
            {group.restrictions.map((restriction) => (
              <li
                key={restriction}
                className="flex items-start gap-2 text-[12px] text-[var(--color-text-secondary)]"
              >
                <span className="mt-0.5 text-red-400 shrink-0">×</span>
                {restriction}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function AccessLevelRow({ level }: { level: (typeof ACCESS_LEVELS)[0] }) {
  return (
    <div className="flex items-start gap-5 p-5 border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)] hover:border-[var(--color-text-secondary)] transition-colors">
      <div className="text-2xl shrink-0 mt-0.5">{level.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <p
            className="text-[16px] font-black tracking-tight"
            style={{ color: level.color }}
          >
            {level.name}
          </p>
          {level.isDefault && (
            <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 bg-[var(--color-border)] text-[var(--color-text-secondary)] rounded-full">
              Padrão
            </span>
          )}
        </div>
        <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-3">
          {level.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {level.capabilities.map((cap) => (
            <span
              key={cap}
              className="text-[11px] font-semibold px-2.5 py-1 border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)]"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConstellationCard({
  constellation,
}: {
  constellation: (typeof CONSTELLATIONS)[0];
}) {
  return (
    <div className="p-6 border border-[var(--color-border)] rounded-3xl bg-[var(--color-surface)] space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{constellation.emoji}</span>
        <div>
          <p
            className="text-[16px] font-black tracking-tight"
            style={{ color: constellation.color }}
          >
            {constellation.name}
          </p>
          <code className="text-[10px] font-bold text-[var(--color-text-secondary)]">
            HUB:{constellation.id}
          </code>
        </div>
      </div>
      <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
        {constellation.description}
      </p>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-secondary)]">
          Módulos e ferramentas
        </p>
        {constellation.examples.map((ex) => (
          <p
            key={ex}
            className="text-[12px] text-[var(--color-text-secondary)] flex items-center gap-2"
          >
            <span style={{ color: constellation.color }}>›</span> {ex}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function NiveisEGruposPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Início
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
            Documentação Legal
          </p>
          <Link
            href="/register"
            className="text-[11px] font-black uppercase tracking-widest text-[var(--color-hrz-red)] hover:opacity-70 transition-opacity"
          >
            Criar Account →
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        {/* Label */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-6 h-px bg-[var(--color-hrz-red)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-hrz-red)]">
            Governança de Identidade
          </span>
        </div>

        <h1 className="text-[42px] sm:text-[56px] font-black tracking-tighter leading-[0.95] mb-6 text-[var(--color-text-primary)]">
          Grupos Celestiais,<br />
          <span className="text-[var(--color-text-secondary)]">Níveis e Constelações</span>
        </h1>

        <p className="text-[17px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-8">
          A arquitetura de identidade digital da Horazion é estruturada em três camadas complementares: o <strong>Grupo Celestial</strong> (quem você é no ecossistema), o <strong>Nível de Acesso</strong> (o que você pode fazer) e a <strong>Constelação</strong> (em qual domínio você opera).
        </p>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-3">
          {[
            { href: "#grupos", label: "Grupos Celestiais" },
            { href: "#niveis", label: "Níveis de Acesso" },
            { href: "#constelacoes", label: "Constelações" },
            { href: "#evolucao", label: "Como evoluir" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 border border-[var(--color-border)] rounded-xl text-[12px] font-bold text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Architecture diagram (visual summary) ── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 bg-[var(--color-surface)]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-6">
            Estrutura de Identidade
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Grupo Celestial",
                desc: "Define quem você é (tipo de usuário/organização) e o conjunto base de funcionalidades disponíveis.",
                examples: ["COMET", "SUN", "POLARIS", "SIRIUS"],
                color: "#B6192E",
              },
              {
                label: "Nível de Acesso",
                desc: "Define o que você pode fazer dentro do seu grupo — ler, testar, escrever ou administrar.",
                examples: ["ALFA", "BETA", "SIGMA", "OMEGA"],
                color: "#0A2540",
              },
              {
                label: "Constelação",
                desc: "Define em qual domínio você opera — pessoal, educacional ou corporativo.",
                examples: ["IND", "EDU", "CORP"],
                color: "#2A0039",
              },
            ].map((col) => (
              <div key={col.label} className="space-y-3">
                <div
                  className="text-[13px] font-black"
                  style={{ color: col.color }}
                >
                  {col.label}
                </div>
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                  {col.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {col.examples.map((ex) => (
                    <code
                      key={ex}
                      className="text-[10px] font-black px-2 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    >
                      {ex}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grupos Celestiais ── */}
      <section id="grupos" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Grupos Celestiais</SectionTitle>
        <SectionSubtitle>
          O Grupo Celestial é atribuído automaticamente com base no tipo de conta, contrato ativo e perfil verificado. Ele determina o conjunto de funcionalidades base disponíveis e o nível de suporte oferecido.
        </SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CELESTIAL_GROUPS.map((group) => (
            <CelestialCard key={group.id} group={group} />
          ))}
        </div>
      </section>

      {/* ── Níveis de Acesso ── */}
      <section id="niveis" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Níveis de Acesso</SectionTitle>
        <SectionSubtitle>
          O Nível de Acesso é uma camada ortogonal ao Grupo Celestial. Um usuário pode ter Grupo SUN com Nível ALFA (ex.: acesso de leitura apenas), ou Grupo COMET com Nível OMEGA em um espaço colaborativo específico. A combinação permite granularidade precisa de permissões.
        </SectionSubtitle>

        <div className="space-y-3">
          {ACCESS_LEVELS.map((level) => (
            <AccessLevelRow key={level.id} level={level} />
          ))}
        </div>
      </section>

      {/* ── Constelações ── */}
      <section id="constelacoes" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Constelações de Domínio</SectionTitle>
        <SectionSubtitle>
          As Constelações organizam os módulos do ecossistema em domínios de aplicação. Um mesmo usuário pode pertencer a múltiplas Constelações simultaneamente — por exemplo, acessar módulos IND (pessoal) e EDU (educacional) com a mesma Account.
        </SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONSTELLATIONS.map((constellation) => (
            <ConstellationCard key={constellation.id} constellation={constellation} />
          ))}
        </div>
      </section>

      {/* ── Como evoluir ── */}
      <section id="evolucao" className="max-w-5xl mx-auto px-6 mb-20 scroll-mt-20">
        <SectionTitle>Como Evoluir no Ecossistema</SectionTitle>
        <SectionSubtitle>
          A progressão no ecossistema Horazion é sempre explícita e controlada pelo usuário — nunca automática ou opaca. Não há "gamificação" forçada. Cada mudança de grupo ou nível requer uma ação consciente do usuário ou da organização.
        </SectionSubtitle>

        <div className="space-y-4">
          {[
            {
              step: "01",
              title: "Comece como Cometa",
              description:
                "Toda Account nova inicia no grupo COMET com nível SIGMA. Você tem acesso às funcionalidades essenciais para conhecer o ecossistema sem compromisso.",
              color: "#5F6368",
            },
            {
              step: "02",
              title: "Eleve para Sol com uma assinatura",
              description:
                "Ao assinar qualquer plano Horazion, seu grupo é automaticamente atualizado para SUN. Você mantém o mesmo Horizon ID, histórico e configurações — apenas expande suas capacidades.",
              color: "#B6192E",
            },
            {
              step: "03",
              title: "Nível Omega via delegação",
              description:
                "O nível OMEGA é concedido por um administrador de espaço ou pelo suporte Horazion. Não pode ser auto-atribuído — é sempre uma delegação explícita com responsabilidade documentada.",
              color: "#0A2540",
            },
            {
              step: "04",
              title: "Enterprise e Parcerias via contrato",
              description:
                "Os grupos POLARIS e VEGA requerem negociação e contrato formal. Entre em contato com a equipe comercial para iniciar o processo de onboarding Enterprise ou Parceiro.",
              color: "#2A0039",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-5 p-5 border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]"
            >
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-black text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.step}
              </div>
              <div>
                <p className="text-[15px] font-black text-[var(--color-text-primary)] mb-1">
                  {item.title}
                </p>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Prestige Score ── */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="border border-[var(--color-border)] rounded-3xl p-8 bg-[var(--color-surface)]">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-3xl">⭐</span>
            <div>
              <h2 className="text-[22px] font-black tracking-tight text-[var(--color-text-primary)]">
                Prestige Score
              </h2>
              <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
                Indicador de engajamento saudável — não de valor humano.
              </p>
            </div>
          </div>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
            O Prestige Score é um indicador opcional que reflete o nível de engajamento e contribuição de um usuário no ecossistema. É sempre transparente, auditável e nunca usado para discriminação de acesso a funcionalidades essenciais.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { range: "0 – 99", label: "Explorador", desc: "Fase inicial de descoberta" },
              { range: "100 – 499", label: "Habitante", desc: "Engajamento regular no ecossistema" },
              { range: "500+", label: "Arquiteto", desc: "Contribuição ativa e consistente" },
            ].map((tier) => (
              <div
                key={tier.range}
                className="p-4 border border-[var(--color-border)] rounded-xl"
              >
                <p className="text-[18px] font-black text-[var(--color-text-primary)] font-mono">
                  {tier.range}
                </p>
                <p className="text-[13px] font-bold text-[var(--color-hrz-red)]">
                  {tier.label}
                </p>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Footer ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-[var(--color-border)]">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mb-1">
              Dúvidas?
            </p>
            <a
              href="mailto:suporte@horazion.com"
              className="text-[14px] font-bold text-[var(--color-text-primary)] hover:text-[var(--color-hrz-red)] transition-colors flex items-center gap-1.5"
            >
              suporte@horazion.com
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="flex gap-4">
            <Link
              href="/legal/privacidade"
              className="text-[11px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest"
            >
              Privacidade
            </Link>
            <Link
              href="/legal/termos-de-uso"
              className="text-[11px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest"
            >
              Termos
            </Link>
            <Link
              href="/register"
              className="text-[11px] font-black text-[var(--color-hrz-red)] hover:opacity-70 transition-opacity uppercase tracking-widest"
            >
              Criar Account →
            </Link>
          </div>
        </div>

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] opacity-40">
          © {new Date().getFullYear()} Horazion Group S.A. · Última atualização: Abril 2026
        </p>
      </section>
    </div>
  );
}