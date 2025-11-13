#!/usr/bin/env node

/**
 * Script para executar todos os testes em paralelo
 * Divide os testes em até 15 grupos e executa simultaneamente
 * Consolida logs e gera relatório final
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const testsDir = join(rootDir, 'tests');
const logsDir = join(testsDir, 'logs');
const resultsDir = join(testsDir, 'test-results');

// Configurações
const MAX_PARALLEL = 15;
const TIMEOUT_MS = 600000; // 10 minutos por grupo

/**
 * Encontra todos os arquivos de teste
 */
async function findTestFiles() {
  const testFiles = [];
  const patterns = ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'];
  
  // Buscar arquivos de teste recursivamente
  async function searchDir(dir, basePath = '') {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relativePath = join(basePath, entry.name);
        
        // Ignorar node_modules, .next, coverage, etc
        if (
          entry.name.startsWith('.') ||
          entry.name === 'node_modules' ||
          entry.name === '.next' ||
          entry.name === 'coverage' ||
          entry.name === 'test-results' ||
          entry.name === 'logs'
        ) {
          continue;
        }
        
        if (entry.isDirectory()) {
          await searchDir(fullPath, relativePath);
        } else if (
          entry.isFile() &&
          (entry.name.endsWith('.test.ts') ||
           entry.name.endsWith('.test.tsx') ||
           entry.name.endsWith('.spec.ts') ||
           entry.name.endsWith('.spec.tsx'))
        ) {
          // Ignorar testes E2E e live (conforme jest.config.js)
          if (
            !relativePath.includes('e2e') &&
            !relativePath.includes('live')
          ) {
            testFiles.push(relativePath);
          }
        }
      }
    } catch (error) {
      // Ignorar erros de leitura de diretório
    }
  }
  
  await searchDir(testsDir);
  return testFiles.sort();
}

/**
 * Divide os arquivos de teste em grupos
 */
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Executa um grupo de testes
 */
async function runTestGroup(groupIndex, testFiles) {
  const logFile = join(logsDir, `group-${groupIndex + 1}.log`);
  const errorLogFile = join(logsDir, `group-${groupIndex + 1}-errors.log`);
  
  // Criar comando Jest para executar os testes específicos
  const testPaths = testFiles.map(file => 
    join(testsDir, file).replace(/\\/g, '/')
  ).join(' ');
  
  const command = `npm test -- ${testPaths}`;
  
  console.log(`[Grupo ${groupIndex + 1}] Iniciando ${testFiles.length} testes...`);
  console.log(`[Grupo ${groupIndex + 1}] Logs: ${logFile}`);
  
  const startTime = Date.now();
  
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: rootDir,
      maxBuffer: 10 * 1024 * 1024, // 10MB
      timeout: TIMEOUT_MS,
    });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Salvar logs
    await writeFile(logFile, `=== GRUPO ${groupIndex + 1} ===\n\n${stdout}\n\n${stderr}`, 'utf-8');
    
    if (stderr) {
      await writeFile(errorLogFile, stderr, 'utf-8');
    }
    
    console.log(`[Grupo ${groupIndex + 1}] ✅ Concluído em ${duration}s`);
    
    return {
      groupIndex: groupIndex + 1,
      success: true,
      duration,
      testFiles,
      stdout,
      stderr,
      logFile,
      errorLogFile: stderr ? errorLogFile : null,
    };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    const errorOutput = error.stderr || error.stdout || error.message || String(error);
    
    // Salvar logs de erro
    await writeFile(logFile, `=== GRUPO ${groupIndex + 1} ===\n\n${error.stdout || ''}\n\n${error.stderr || ''}\n\n${error.message || ''}`, 'utf-8');
    await writeFile(errorLogFile, errorOutput, 'utf-8');
    
    console.log(`[Grupo ${groupIndex + 1}] ❌ Falhou em ${duration}s`);
    
    return {
      groupIndex: groupIndex + 1,
      success: false,
      duration,
      testFiles,
      stdout: error.stdout || '',
      stderr: error.stderr || errorOutput,
      logFile,
      errorLogFile,
      error: error.message || String(error),
    };
  }
}

/**
 * Analisa os logs e extrai informações
 */
async function analyzeLogs(results) {
  const analysis = {
    totalGroups: results.length,
    successfulGroups: results.filter(r => r.success).length,
    failedGroups: results.filter(r => !r.success).length,
    totalTests: 0,
    failedTests: [],
    errors: [],
    uniqueErrors: new Map(),
    repeatedErrors: new Map(),
    criticalErrors: [],
  };
  
  // Padrões para identificar testes falhados
  const failedTestPattern = /FAIL\s+(.+?\.(test|spec)\.(ts|tsx))/gi;
  const errorPattern = /Error:\s*(.+?)(?:\n|$)/gi;
  const testFailurePattern = /●\s+(.+?)\n\n\s+(.+?)(?=\n\n|$)/gs;
  
  for (const result of results) {
    if (!result.success) {
      const content = result.stderr || result.stdout || '';
      
      // Extrair testes falhados
      let match;
      while ((match = failedTestPattern.exec(content)) !== null) {
        const testFile = match[1].trim();
        if (!analysis.failedTests.includes(testFile)) {
          analysis.failedTests.push(testFile);
        }
      }
      
      // Extrair erros
      const errorMatches = content.match(/Error[:\s]+(.+?)(?:\n|$)/gi) || [];
      for (const errorMatch of errorMatches) {
        const errorMsg = errorMatch.replace(/Error[:\s]+/i, '').trim();
        if (errorMsg && errorMsg.length > 10) {
          const normalizedError = errorMsg
            .replace(/at\s+.*?\(.*?\)/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 200);
          
          if (normalizedError) {
            const count = analysis.uniqueErrors.get(normalizedError) || 0;
            analysis.uniqueErrors.set(normalizedError, count + 1);
            
            if (count > 0) {
              analysis.repeatedErrors.set(normalizedError, count + 1);
            }
          }
        }
      }
      
      // Identificar erros críticos (padrões comuns)
      const criticalPatterns = [
        /Cannot find module/i,
        /is not a function/i,
        /Cannot read property/i,
        /TypeError/i,
        /ReferenceError/i,
        /SyntaxError/i,
        /Module not found/i,
      ];
      
      for (const pattern of criticalPatterns) {
        if (pattern.test(content)) {
          const matches = content.match(new RegExp(pattern.source, 'gi'));
          if (matches) {
            analysis.criticalErrors.push(...matches);
          }
        }
      }
    }
  }
  
  // Converter Maps para arrays ordenados
  analysis.repeatedErrorsArray = Array.from(analysis.repeatedErrors.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20); // Top 20 erros mais repetidos
  
  analysis.uniqueErrorsArray = Array.from(analysis.uniqueErrors.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30); // Top 30 erros únicos
  
  return analysis;
}

/**
 * Gera relatório final
 */
async function generateReport(results, analysis) {
  const reportPath = join(resultsDir, 'RELATORIO_TESTES_PARALELO.md');
  
  const report = `# Relatório de Execução de Testes Paralelos

**Data:** ${new Date().toLocaleString('pt-BR')}  
**Execução:** Paralela com até ${MAX_PARALLEL} grupos simultâneos

---

## 📊 Resumo Executivo

### Resultados por Grupo

- **Total de Grupos:** ${analysis.totalGroups}
- **Grupos com Sucesso:** ${analysis.successfulGroups} (${((analysis.successfulGroups / analysis.totalGroups) * 100).toFixed(1)}%)
- **Grupos com Falhas:** ${analysis.failedGroups} (${((analysis.failedGroups / analysis.totalGroups) * 100).toFixed(1)}%)

### Testes Falhados

- **Total de Testes Falhados Identificados:** ${analysis.failedTests.length}
${analysis.failedTests.length > 0 ? `
#### Lista de Testes Falhados:

${analysis.failedTests.map((test, idx) => `${idx + 1}. \`${test}\``).join('\n')}
` : ''}

---

## 🔍 Análise de Erros

### Erros Mais Repetidos (Top 20)

${analysis.repeatedErrorsArray.length > 0 ? analysis.repeatedErrorsArray.map(([error, count], idx) => 
  `${idx + 1}. **${count} ocorrência(s)**: \`${error.substring(0, 150)}${error.length > 150 ? '...' : ''}\``
).join('\n\n') : 'Nenhum erro repetido identificado.'}

### Erros Únicos/Críticos (Top 30)

${analysis.uniqueErrorsArray.length > 0 ? analysis.uniqueErrorsArray.slice(0, 30).map(([error, count], idx) => 
  `${idx + 1}. **${count} ocorrência(s)**: \`${error.substring(0, 150)}${error.length > 150 ? '...' : ''}\``
).join('\n\n') : 'Nenhum erro único identificado.'}

### Erros Críticos Identificados

${analysis.criticalErrors.length > 0 ? 
  analysis.criticalErrors.slice(0, 20).map((error, idx) => `${idx + 1}. ${error}`).join('\n') 
  : 'Nenhum erro crítico identificado.'}

---

## 📋 Detalhes por Grupo

${results.map(result => `
### Grupo ${result.groupIndex}

- **Status:** ${result.success ? '✅ Sucesso' : '❌ Falhou'}
- **Duração:** ${result.duration}s
- **Testes:** ${result.testFiles.length} arquivo(s)
- **Log Completo:** \`${relative(rootDir, result.logFile)}\`
${result.errorLogFile ? `- **Log de Erros:** \`${relative(rootDir, result.errorLogFile)}\`` : ''}
${result.error ? `- **Erro:** ${result.error.substring(0, 200)}${result.error.length > 200 ? '...' : ''}` : ''}

**Arquivos de Teste:**
${result.testFiles.map(file => `- \`${file}\``).join('\n')}
`).join('\n')}

---

## 📁 Arquivos de Log

Todos os logs foram salvos em \`tests/logs/\`:

${results.map(result => 
  `- **Grupo ${result.groupIndex}:** \`${relative(rootDir, result.logFile)}\`${result.errorLogFile ? ` (erros: \`${relative(rootDir, result.errorLogFile)}\`)` : ''}`
).join('\n')}

---

## 🎯 Recomendações

${analysis.failedGroups > 0 ? `
### Prioridade Alta 🔴

1. **Corrigir grupos com falhas:** ${analysis.failedGroups} grupo(s) falharam durante a execução
2. **Revisar erros repetidos:** ${analysis.repeatedErrorsArray.length} tipo(s) de erro se repetem, indicando problemas sistemáticos
3. **Investigar erros críticos:** ${analysis.criticalErrors.length} erro(s) crítico(s) identificado(s)

### Prioridade Média 🟡

1. **Analisar logs individuais:** Revisar logs em \`tests/logs/\` para detalhes específicos
2. **Executar testes falhados isoladamente:** Executar os ${analysis.failedTests.length} teste(s) falhado(s) para diagnóstico detalhado
` : '✅ Todos os grupos executaram com sucesso!'}

---

**Relatório gerado automaticamente**  
**Localização:** \`${relative(rootDir, reportPath)}\`
`;

  await writeFile(reportPath, report, 'utf-8');
  console.log(`\n📄 Relatório gerado: ${reportPath}`);
  
  return reportPath;
}

/**
 * Função principal
 */
async function main() {
  console.log('🔍 Buscando arquivos de teste...');
  
  // Criar diretórios necessários
  await mkdir(logsDir, { recursive: true });
  await mkdir(resultsDir, { recursive: true });
  
  // Encontrar todos os arquivos de teste
  const testFiles = await findTestFiles();
  console.log(`✅ Encontrados ${testFiles.length} arquivos de teste\n`);
  
  if (testFiles.length === 0) {
    console.log('⚠️  Nenhum arquivo de teste encontrado!');
    return;
  }
  
  // Dividir em grupos
  const chunkSize = Math.ceil(testFiles.length / MAX_PARALLEL);
  const groups = chunkArray(testFiles, chunkSize);
  
  console.log(`📦 Dividindo em ${groups.length} grupos (máximo ${MAX_PARALLEL} paralelos)...\n`);
  
  // Executar grupos em paralelo
  const startTime = Date.now();
  const promises = groups.map((group, index) => runTestGroup(index, group));
  const results = await Promise.all(promises);
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log(`\n⏱️  Tempo total de execução: ${totalDuration}s\n`);
  
  // Analisar resultados
  console.log('📊 Analisando resultados...');
  const analysis = await analyzeLogs(results);
  
  // Gerar relatório
  console.log('📝 Gerando relatório...');
  const reportPath = await generateReport(results, analysis);
  
  // Resumo final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO FINAL');
  console.log('='.repeat(60));
  console.log(`Total de Grupos: ${analysis.totalGroups}`);
  console.log(`✅ Sucesso: ${analysis.successfulGroups}`);
  console.log(`❌ Falhas: ${analysis.failedGroups}`);
  console.log(`📝 Testes Falhados: ${analysis.failedTests.length}`);
  console.log(`🔄 Erros Repetidos: ${analysis.repeatedErrorsArray.length}`);
  console.log(`⚠️  Erros Críticos: ${analysis.criticalErrors.length}`);
  console.log(`\n📄 Relatório completo: ${reportPath}`);
  console.log('='.repeat(60) + '\n');
}

// Executar
main().catch(error => {
  console.error('❌ Erro ao executar testes:', error);
  process.exit(1);
});

