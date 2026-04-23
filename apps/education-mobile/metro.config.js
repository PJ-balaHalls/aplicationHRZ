
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Expande o domínio de observação para o monorepo
config.watchFolders = [workspaceRoot];

// 2. Define a resolução de nós base (SEM o disableHierarchicalLookup)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Integração do Design System Horizon Clarity
module.exports = withNativeWind(config, { input: './src/styles/global.css' });