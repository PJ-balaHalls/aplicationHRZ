const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Identificação das fronteiras de domínio (Projeto e Raiz do Monorepo)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Expande o universo de observação do Metro para incluir a raiz do sistema
config.watchFolders = [workspaceRoot];

// 2. Define a hierarquia explícita de resolução de dependências
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Força a resolução estrita para evitar colisão de pacotes (Arquitetura limpa)
config.resolver.disableHierarchicalLookup = true;

// 4. Integração do NativeWind / react-native-css-interop
// NOTA: Se você está usando NativeWind v4, envolva a config com withNativeWind.
// Se não, pode deixar apenas 'module.exports = config;'
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(config, { input: './global.css' }); // Ajuste se seu CSS global estiver em outro caminho