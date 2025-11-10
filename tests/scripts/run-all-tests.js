/**
 * Script para Executar Todos os Testes
 *
 * Executa todos os tipos de testes e gera relatório consolidado
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

const TEST_RESULTS_DIR = path.join(__dirname, '..', '..', 'test-results');
const REPORT_DIR = path.join(TEST_RESULTS_DIR, 'reports');

// Criar diretórios se não existirem
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

async function runCommand(command, description) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 ${description}`);
  console.log(`${'='.repeat(60)}\n`);

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: path.join(__dirname, '..', '..'),
      maxBuffer: 10 * 1024 * 1024, // 10MB
    });

    return {
      success: true,
      stdout,
      stderr,
    };
  } catch (error) {
    return {
      success: false,
      stdout: error.stdout || '',
      stderr: error.stderr || '',
      error: error.message,
    };
  }
}

async function generateReport(results) {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(REPORT_DIR, `test-report-${Date.now()}.json`);

  const report = {
    timestamp,
    summary: {
      total: Object.keys(results).length,
      passed: Object.values(results).filter(r => r.success).length,
      failed: Object.values(results).filter(r => !r.success).length,
    },
    results,
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Gerar relatório em Markdown
  const markdownReport = generateMarkdownReport(report);
  const markdownPath = path.join(REPORT_DIR, `test-report-${Date.now()}.md`);
  fs.writeFileSync(markdownPath, markdownReport);

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 RELATÓRIO FINAL DE TESTES');
  console.log(`${'='.repeat(60)}\n`);
  console.log(markdownReport);
  console.log(`\n📁 Relatórios salvos em: ${REPORT_DIR}`);

  return report;
}

function generateMarkdownReport(report) {
  const { summary, results } = report;

  let markdown = `# Relatório de Testes - Frontend\n\n`;
  markdown += `**Data:** ${new Date(report.timestamp).toLocaleString('pt-BR')}\n\n`;
  markdown += `## Resumo\n\n`;
  markdown += `- ✅ **Passou:** ${summary.passed}/${summary.total}\n`;
  markdown += `- ❌ **Falhou:** ${summary.failed}/${summary.total}\n`;
  markdown += `- 📊 **Taxa de Sucesso:** ${((summary.passed / summary.total) * 100).toFixed(1)}%\n\n`;

  markdown += `## Detalhes dos Testes\n\n`;

  for (const [testName, result] of Object.entries(results)) {
    const status = result.success ? '✅' : '❌';
    markdown += `### ${status} ${testName}\n\n`;

    if (result.success) {
      markdown += `**Status:** Passou\n\n`;
    } else {
      markdown += `**Status:** Falhou\n\n`;
      if (result.error) {
        markdown += `**Erro:** ${result.error}\n\n`;
      }
    }

    if (result.stdout) {
      const output = result.stdout.substring(0, 500);
      markdown += `<details>\n<summary>Saída (primeiros 500 caracteres)</summary>\n\n\`\`\`\n${output}\n\`\`\`\n\n</details>\n\n`;
    }
  }

  return markdown;
}

async function main() {
  console.log('🚀 Iniciando execução completa de testes...\n');

  const results = {};

  // 1. Testes Unitários
  results['Testes Unitários'] = await runCommand(
    'npx jest tests/app tests/lib tests/utils --passWithNoTests --coverage --maxWorkers=2',
    'Executando Testes Unitários'
  );

  // 2. Testes de Integração
  results['Testes de Integração'] = await runCommand(
    'npx jest tests/integration --passWithNoTests --coverage --maxWorkers=2',
    'Executando Testes de Integração'
  );

  // 3. Build de Produção (pode falhar por lint, mas vamos tentar)
  results['Build de Produção'] = await runCommand(
    'npm run build',
    'Executando Build de Produção'
  );

  // 4. Testes E2E (com Playwright)
  results['Testes E2E'] = await runCommand(
    'npx playwright test --reporter=list',
    'Executando Testes E2E'
  );

  // 5. Testes de Acessibilidade
  results['Testes de Acessibilidade'] = await runCommand(
    'npx playwright test tests/e2e/accessibility.spec.ts --reporter=list',
    'Executando Testes de Acessibilidade (WCAG)'
  );

  // 6. Lint
  results['Lint'] = await runCommand('npm run lint', 'Executando Lint');

  // 7. Type Check
  results['Type Check'] = await runCommand(
    'npm run type-check',
    'Executando Type Check'
  );

  // Gerar relatório
  const report = await generateReport(results);

  // Exit code baseado no sucesso
  const allPassed = report.summary.failed === 0;
  process.exit(allPassed ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Erro ao executar testes:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests: main };
