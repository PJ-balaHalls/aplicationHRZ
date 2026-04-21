import type { Metadata } from "next";
import "@horizion/ui/globals.css";
import { HorizonProvider } from "@horizion/ui/providers/horizon-provider";
import { CookieConsentDrawer } from "@horizion/ui/components/consent/cookie-drawer";
import { AccessibilityTrigger } from "@horizion/ui/components/accessibility/accessibility-trigger";

// Importações para Analytics e Performance da Vercel
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://horazion.com";
const ORGANIZATION_NAME = "Horazoin Group";
const ORGANIZATION_ALTERNATE_NAME = "Horazion";
const TAGLINE = "O Sistema Operacional da Evolução Humana e Governança Digital";
const DESCRIPTION_LONG =
  "Infraestrutura digital unificada que integra educação, finanças, produtividade e conformidade jurídica. Expandimos o potencial humano por meio de IA ética, soberania de dados e experiências centradas no usuário. Do lifelong learning ao compliance corporativo, a Horazoin Group é a plataforma‑mãe que conecta dados, pessoas e oportunidades em uma única identidade digital.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `Horazoin Group | ${TAGLINE}`,
    template: `%s | ${ORGANIZATION_NAME}`,
  },

  description: DESCRIPTION_LONG,

  // Palavras‑chave robustas e alinhadas com o ecossistema descrito no PDF
  keywords: [
    "Horazoin Group",
    "Horazion",
    "Sistema Operacional da Evolução",
    "Governança Digital",
    "Identidade Digital",
    "Soberania de Dados",
    "Inteligência Artificial Responsável",
    "ISO 42001",
    "Plataforma Integrada",
    "Educação Adaptativa",
    "Finanças Pessoais Inteligentes",
    "Compliance Digital",
    "Open Finance",
    "Ecossistema de Aprendizagem",
    "Blocos de Interesse",
    "Single Sign-On",
    "Infraestrutura Invisível",
    "Lifelong Partner",
    "Transformação Digital Humana",
    "LGPD by Design",
    "Smart Governance",
    "IA Generativa Educacional",
    "Horazoin Life",
    "Horazoin Education",
    "Horazoin Enterprises",
  ],

  authors: [{ name: "Horazoin Core", url: SITE_URL }],
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,

  // Favicon e ícones com suporte internacional (favicon.ico fornecido)
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any" },
      { url: "/images/HORAZION/ISOLOGO-RED.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/images/HORAZION/ISOLOGO-RED.svg", sizes: "180x180" },
      { url: "/images/HORAZION/apple-touch-icon.png", sizes: "180x180" },
    ],
  },

  // Configuração de manifesto e tema para PWA (alinhado com grandes empresas)
  manifest: "/manifest.webmanifest",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    url: SITE_URL,
    title: `${ORGANIZATION_NAME} | ${TAGLINE}`,
    description:
      "Unificamos a sua jornada digital: aprendizado, finanças, carreira e governança em uma única plataforma inteligente, ética e invisível. Onde tudo se conecta para expandir o potencial humano.",
    siteName: ORGANIZATION_NAME,
    images: [
      {
        url: "/images/HORAZION/LOGO-GROUP-FUNDOGRADIENT.svg",
        width: 1200,
        height: 630,
        alt: "Horazoin Group – Expandindo o potencial humano",
        type: "image/svg+xml",
      },
      {
        url: "/images/HORAZION/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Horazoin Group – Ecossistema Digital Integrado",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: ORGANIZATION_NAME,
    description:
      "Infraestrutura digital centrada no ser humano. Educação, finanças e governança integradas com ética e soberania.",
    images: ["/images/HORAZION/LOGO-GROUP-FUNDOGRADIENT.svg"],
    creator: "@HorazoinGroup",
    site: "@HorazoinGroup",
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": `${SITE_URL}/pt-BR`,
      "en-US": `${SITE_URL}/en-US`,
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Cabeçalhos de segurança e políticas para grandes corporações
  verification: {
    google: "adicione-seu-codigo-de-verificacao-google",
    yandex: "yandex-verification-code",
  },

  category: "technology",
  classification: "Digital Infrastructure, EdTech, FinTech, RegTech",
};

// JSON‑LD enriquecido – alinhado com o conteúdo do PDF e Schema.org para grandes empresas
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORGANIZATION_NAME,
  alternateName: ORGANIZATION_ALTERNATE_NAME,
  legalName: "Horazoin Group S.A.",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/HORAZION/LOGO-GROUP-BLACK.svg`,
    width: 600,
    height: 120,
  },
  slogan: "Expandindo o potencial humano",
  description: DESCRIPTION_LONG,
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Nome do Fundador",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "00000-000",
    streetAddress: "Av. Paulista, 1000",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contato@horazoin.com",
    availableLanguage: ["Portuguese", "English", "Spanish"],
  },
  sameAs: [
    "https://linkedin.com/company/horazoin-group",
    "https://twitter.com/HorazoinGroup",
    "https://instagram.com/horazoin",
    "https://github.com/horazoin",
  ],
  knowsAbout: [
    "Digital Governance",
    "Artificial Intelligence Management System (AIMS) ISO/IEC 42001",
    "Data Sovereignty",
    "Lifelong Learning Ecosystem",
    "Financial Intelligence Automation",
    "Corporate Compliance and LGPD",
    "Open Finance Integration",
    "Adaptive Educational Platforms",
    "Single Sign-On Identity Management",
  ],
  award: ["ISO/IEC 42001 Certified AI Governance"],
  areaServed: "Global",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "ISO 42001 AIMS",
  },
  ethicsPolicy: `${SITE_URL}/legal/ethics-policy`,
  diversityPolicy: `${SITE_URL}/legal/diversity-policy`,
  actionableFeedbackPolicy: `${SITE_URL}/legal/feedback-policy`,
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORGANIZATION_NAME,
  description: TAGLINE,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "pt-BR",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  ],
};

// BreadcrumbList para melhor navegação nos resultados de busca
const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ecossistema",
      item: `${SITE_URL}/ecossistema`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      dir="ltr"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Metadados adicionais para performance e segurança */}
        <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />

        {/* Preconexões para desempenho */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.horazoin.com" />

        {/* Injeção de Schema.org estruturado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </head>
      <body className="font-sans min-h-screen bg-background text-text-primary antialiased transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
        <HorizonProvider>
          {children}
          <CookieConsentDrawer />
          <AccessibilityTrigger />
        </HorizonProvider>

        {/* Scripts de monitoramento da Vercel */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}