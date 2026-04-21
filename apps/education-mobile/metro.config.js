const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Expande o domínio de observação para o ecossistema (Horazion Core)
config.watchFolders = [workspaceRoot];

// 2. Força a resolução estrita blindando contra injeções de caminhos errados
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// 3. Integração do Design System
module.exports = withNativeWind(config, { input: './src/styles/global.css' });