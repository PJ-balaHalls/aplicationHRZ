/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Obrigatório para o Turbopack ler os arquivos .ts dos pacotes irmãos
  transpilePackages: ["@horizion/ui", "@horizion/types", "@horizion/utils"],
};

export default nextConfig;