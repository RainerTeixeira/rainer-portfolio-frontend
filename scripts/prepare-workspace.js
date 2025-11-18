/**
 * Script para preparar o workspace antes do build
 *
 * Este script garante que o @rainersoft/design-tokens esteja disponível
 * durante o build na Vercel ou outros ambientes CI/CD.
 *
 * @fileoverview Script de preparação do workspace
 * @author Rainer Teixeira
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DESIGN_TOKENS_DEST = path.join(
  __dirname,
  '..',
  'node_modules',
  '@rainersoft',
  'design-tokens'
);

/**
 * Verifica se o diretório existe
 */
function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Copia um diretório recursivamente (cross-platform)
 */
function copyDirectory(src, dest) {
  const isWindows = process.platform === 'win32';

  if (isWindows) {
    // Windows: usa xcopy ou robocopy
    try {
      execSync(`xcopy /E /I /Y "${src}" "${dest}"`, { stdio: 'inherit' });
      return true;
    } catch {
      try {
        execSync(`robocopy "${src}" "${dest}" /E /NFL /NDL /NJH /NJS`, {
          stdio: 'inherit',
        });
        return true;
      } catch {
        return false;
      }
    }
  } else {
    // Linux/Mac: usa cp -r
    try {
      execSync(`cp -r "${src}" "${dest}"`, { stdio: 'inherit' });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Cria um symlink ou copia o diretório
 */
function prepareWorkspace() {
  console.log('🔧 Preparando workspace para build...');

  // Se já existe no node_modules, não precisa fazer nada
  if (directoryExists(DESIGN_TOKENS_DEST)) {
    console.log('✅ @rainersoft/design-tokens já está disponível');
    return;
  }

  // Lista de caminhos possíveis para o rainer-design-tokens
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'rainer-design-tokens'),
    path.join(__dirname, '..', 'rainer-design-tokens'),
    path.join(process.cwd(), 'rainer-design-tokens'),
    path.join(process.cwd(), '..', 'rainer-design-tokens'),
    // Para Vercel/monorepo
    path.join(process.cwd(), 'packages', 'rainer-design-tokens'),
    path.join(process.cwd(), '..', 'packages', 'rainer-design-tokens'),
  ];

  let foundPath = null;
  for (const possiblePath of possiblePaths) {
    if (directoryExists(possiblePath)) {
      foundPath = possiblePath;
      console.log(`✅ rainer-design-tokens encontrado em: ${foundPath}`);
      break;
    }
  }

  if (!foundPath) {
    console.error(
      '❌ rainer-design-tokens não encontrado em nenhum caminho esperado'
    );
    console.error('   Caminhos verificados:');
    possiblePaths.forEach(p => console.error(`     - ${p}`));
    console.error(
      '\n   Por favor, verifique se o workspace está configurado corretamente.'
    );
    console.error(
      '   Na Vercel, o rainer-design-tokens precisa estar no mesmo repositório Git.'
    );
    process.exit(1);
  }

  // Cria o diretório de destino se não existir
  const destDir = path.dirname(DESIGN_TOKENS_DEST);
  if (!directoryExists(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Tenta criar symlink primeiro (mais eficiente)
  try {
    // Remove destino se já existir (pode ser um arquivo)
    if (fs.existsSync(DESIGN_TOKENS_DEST)) {
      fs.rmSync(DESIGN_TOKENS_DEST, { recursive: true, force: true });
    }

    fs.symlinkSync(foundPath, DESIGN_TOKENS_DEST, 'dir');
    console.log('✅ Symlink criado com sucesso');
  } catch (error) {
    console.warn('⚠️  Falha ao criar symlink:', error.message);
    console.warn('   Tentando copiar o diretório...');

    // Se symlink falhar, copia o diretório
    if (copyDirectory(foundPath, DESIGN_TOKENS_DEST)) {
      console.log('✅ Diretório copiado com sucesso');
    } else {
      console.error('❌ Erro ao copiar diretório');
      process.exit(1);
    }
  }

  // Verifica se o package.json do rainer-design-tokens existe
  const packageJsonPath = path.join(DESIGN_TOKENS_DEST, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(
      '❌ package.json do @rainersoft/design-tokens não encontrado'
    );
    console.error(`   Esperado em: ${packageJsonPath}`);
    process.exit(1);
  }

  console.log('✅ Workspace preparado com sucesso!');
}

// Executa o script
try {
  prepareWorkspace();
} catch (error) {
  console.error('❌ Erro ao preparar workspace:', error);
  process.exit(1);
}
