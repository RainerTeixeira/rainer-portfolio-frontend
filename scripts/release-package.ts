#!/usr/bin/env node

/**
 * @fileoverview Script de RELEASE e Publicação
 *
 * @description
 * Script unificado que gerencia todo o processo de release e publicação:
 * - Validação de código
 * - Build e compilação
 * - Geração de changelog
 * - Deploy automatizado
 *
 * Uso: npx tsx scripts/release-package.ts [opções]
 *
 * @module scripts/release-package
 * @version 1.0.0
 * @author Rainer Teixeira
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

// Tipos
interface Colors {
  reset: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  cyan: string;
  magenta: string;
}

interface PackageJson {
  name: string;
  version: string;
  repository?: {
    url?: string;
  };
}

// Cores para output
const colors: Colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message: string, color: keyof Colors = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step: string, message: string): void {
  console.log(`${colors.blue}${step}${colors.reset} ${message}`);
}

function logSuccess(message: string): void {
  log(`✅ ${message}`, 'green');
}

function logWarning(message: string): void {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message: string): void {
  log(`❌ ${message}`, 'red');
}

function logInfo(message: string): void {
  log(`ℹ️  ${message}`, 'cyan');
}

function logHeader(title: string): void {
  console.log('');
  log(`🚀 ${title}`, 'magenta');
  console.log('');
}

/**
 * Executa comando e trata erros
 */
function runCommand(command: string, description: string): void {
  try {
    logStep('🔧', description);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${description} concluído`);
  } catch (error) {
    logError(`Erro em ${description}: ${error}`);
    process.exit(1);
  }
}

/**
 * Obtém informações do package.json
 */
function getPackageInfo(): PackageJson {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    return packageJson;
  } catch (error) {
    logError('Erro ao ler package.json');
    process.exit(1);
  }
}

/**
 * Valida se está na branch main
 */
function validateBranch(): void {
  const currentBranch = execSync('git branch --show-current', { 
    encoding: 'utf8' 
  }).trim();

  if (currentBranch !== 'main') {
    logError(`Você não está na branch main. Branch atual: ${currentBranch}`);
    logInfo('Mude para a branch main: git checkout main');
    process.exit(1);
  }

  logSuccess('Branch validada: main');
}

/**
 * Verifica se há mudanças não commitadas
 */
function validateWorkingDirectory(): void {
  const status = execSync('git status --porcelain', { 
    encoding: 'utf8' 
  }).trim();

  if (status) {
    logError('Você tem mudanças não commitadas:');
    console.log(status);
    logInfo('Faça commit das mudanças antes de continuar');
    process.exit(1);
  }

  logSuccess('Diretório de trabalho limpo');
}

/**
 * Busca mudanças do remote
 */
function pullLatestChanges(): void {
  runCommand('git pull origin main', 'Buscando últimas mudanças');
}

/**
 * Roda testes
 */
function runTests(): void {
  runCommand('pnpm test', 'Executando testes');
}

/**
 * Roda lint
 */
function runLint(): void {
  runCommand('pnpm lint', 'Verificando lint');
}

/**
 * Roda build
 */
function runBuild(): void {
  runCommand('pnpm build', 'Build do projeto');
}

/**
 * Roda testes E2E
 */
function runE2ETests(): void {
  try {
    logStep('🧪', 'Executando testes E2E...');
    execSync('pnpm test:e2e', { stdio: 'inherit' });
    logSuccess('Testes E2E concluídos');
  } catch (error) {
    logWarning('Erro nos testes E2E, continuando...');
  }
}

/**
 * Gera changelog
 */
function generateChangelog(): void {
  try {
    logStep('📝', 'Gerando changelog...');
    execSync('npx tsx scripts/generate-changelog.ts', { stdio: 'inherit' });
    logSuccess('Changelog gerado');
  } catch (error) {
    logWarning('Erro ao gerar changelog, continuando...');
  }
}

/**
 * Cria commit e tag
 */
function createCommitAndTag(version: string): void {
  const packageInfo = getPackageInfo();
  
  // Adicionar arquivos modificados
  runCommand('git add package.json docs/98-CHANGELOG.md', 'Adicionando arquivos modificados');
  
  // Criar commit
  const commitMessage = `chore: release ${packageInfo.name}@${version}`;
  runCommand(`git commit -m "${commitMessage}"`, 'Criando commit de release');
  
  // Criar tag
  const tagName = `v${version}`;
  runCommand(`git tag ${tagName}`, `Criando tag ${tagName}`);
  
  logSuccess(`Commit e tag criados: ${tagName}`);
}

/**
 * Push para GitHub
 */
function pushToGitHub(): void {
  runCommand('git push origin main', 'Push para GitHub');
  runCommand('git push origin --tags', 'Push das tags');
}

/**
 * Deploy para Vercel
 */
function deployToVercel(): void {
  try {
    logStep('🚀', 'Fazendo deploy para Vercel...');
    execSync('vercel --prod', { stdio: 'inherit' });
    logSuccess('Deploy para Vercel concluído');
  } catch (error) {
    logWarning('Erro no deploy, continuando...');
  }
}

/**
 * Cria release no GitHub
 */
function createGitHubRelease(version: string): void {
  try {
    // Obter changelog da versão atual
    const changelog = readFileSync('docs/98-CHANGELOG.md', 'utf8');
    const versionSection = changelog.match(
      new RegExp(`## \\[${version}\\] - \\d{4}-\\d{2}-\\d{2}\\n\\n([\\s\\S]*?)(?=## \\[|$)`)
    );
    
    const releaseNotes = versionSection ? versionSection[1] : `Release ${version}`;
    
    // Criar release via GitHub CLI (se disponível)
    const releaseCommand = `gh release create v${version} --title "Release v${version}" --notes "${releaseNotes}"`;
    execSync(releaseCommand, { stdio: 'inherit' });
    
    logSuccess('Release criada no GitHub');
  } catch (error) {
    logWarning('GitHub CLI não disponível, pulando criação de release');
  }
}

/**
 * Função principal de release
 */
function main(): void {
  logHeader('Sistema de Release - rainer-portfolio-frontend');

  // Obter informações do pacote
  const packageInfo = getPackageInfo();
  logInfo(`Pacote: ${packageInfo.name}`);
  logInfo(`Versão: ${packageInfo.version}`);

  // Validações
  logHeader('Validações');
  validateBranch();
  validateWorkingDirectory();
  pullLatestChanges();

  // Build e testes
  logHeader('Build e Testes');
  runLint();
  runTests();
  runBuild();
  runE2ETests();

  // Gerar changelog
  logHeader('Changelog');
  generateChangelog();

  // Commit e tag
  logHeader('Versionamento');
  createCommitAndTag(packageInfo.version);

  // Push
  logHeader('Publicação');
  pushToGitHub();

  // Deploy para Vercel
  logHeader('Deploy');
  deployToVercel();

  // Release no GitHub
  logHeader('GitHub Release');
  createGitHubRelease(packageInfo.version);

  // Resumo
  logHeader('Release Concluída!');
  console.log(`📦 Pacote: ${packageInfo.name}`);
  console.log(`🔢 Versão: ${packageInfo.version}`);
  console.log(`🚀 Deploy: Vercel`);
  console.log(`📋 GitHub: https://github.com/RainerTeixeira/rainer-portfolio-frontend/releases/tag/v${packageInfo.version}`);

  logSuccess('Release publicada com sucesso! 🎉');
}

/**
 * Validação apenas
 */
function validateOnly(): void {
  logHeader('Modo de Validação');
  validateBranch();
  validateWorkingDirectory();
  runLint();
  runTests();
  logSuccess('Validação concluída com sucesso!');
}

/**
 * Parse de argumentos CLI
 */
function parseArgs(): { validateOnly: boolean; dryRun: boolean } {
  const args = process.argv.slice(2);
  return {
    validateOnly: args.includes('--validate-only'),
    dryRun: args.includes('--dry-run')
  };
}

// Executar script
if (require.main === module) {
  const args = parseArgs();
  
  if (args.validateOnly) {
    validateOnly();
  } else if (args.dryRun) {
    logHeader('Modo Dry Run');
    logInfo('Executando validações sem publicar...');
    validateOnly();
    logSuccess('Dry run concluído!');
  } else {
    main();
  }
}

export { main, validateOnly };
