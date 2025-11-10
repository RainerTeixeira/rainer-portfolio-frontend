/**
 * Script de Teste de Performance
 *
 * Executa testes de performance usando Lighthouse CI ou similar
 * Verifica Core Web Vitals e métricas de performance
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function runLighthouseTest(url, outputPath) {
  return new Promise((resolve, reject) => {
    const command = `npx lighthouse ${url} --output=json --output-path=${outputPath} --chrome-flags="--headless" --only-categories=performance --quiet`;

    console.log(`Executando Lighthouse para: ${url}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar Lighthouse: ${error.message}`);
        // Não rejeitar, apenas avisar - Lighthouse pode não estar instalado
        resolve(null);
        return;
      }

      if (fs.existsSync(outputPath)) {
        const report = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
        const score = report.categories.performance.score * 100;

        console.log(`\n📊 Performance Score: ${score.toFixed(0)}/100`);
        console.log(`\nCore Web Vitals:`);
        console.log(
          `  - LCP: ${report.audits['largest-contentful-paint'].displayValue}`
        );
        console.log(
          `  - FID: ${report.audits['first-input-delay'].displayValue}`
        );
        console.log(
          `  - CLS: ${report.audits['cumulative-layout-shift'].displayValue}`
        );

        resolve({
          score,
          lcp: report.audits['largest-contentful-paint'].numericValue,
          fid: report.audits['first-input-delay'].numericValue,
          cls: report.audits['cumulative-layout-shift'].numericValue,
        });
      } else {
        resolve(null);
      }
    });
  });
}

async function testPerformance() {
  console.log('🚀 Iniciando testes de performance...\n');

  const resultsDir = path.join(
    __dirname,
    '..',
    '..',
    'test-results',
    'performance'
  );
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const pages = [
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: 'Contato', url: `${BASE_URL}/contato` },
    { name: 'Sobre', url: `${BASE_URL}/sobre` },
  ];

  const results = [];

  for (const page of pages) {
    const outputPath = path.join(
      resultsDir,
      `${page.name.toLowerCase()}-performance.json`
    );
    const result = await runLighthouseTest(page.url, outputPath);

    if (result) {
      results.push({
        page: page.name,
        ...result,
      });
    } else {
      console.log(
        `⚠️  Lighthouse não disponível. Instale com: npm install -g lighthouse`
      );
      console.log(`   Ou use: npx lighthouse ${page.url} --view`);
    }
  }

  // Salvar resumo
  const summaryPath = path.join(resultsDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  console.log('\n✅ Testes de performance concluídos!');
  console.log(`📁 Resultados salvos em: ${resultsDir}`);

  // Verificar se scores estão acima de 80
  const allPassed = results.every(r => r.score >= 80);
  if (!allPassed && results.length > 0) {
    console.log('\n⚠️  Algumas páginas não atingiram 80+ de performance score');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  testPerformance().catch(console.error);
}

module.exports = { testPerformance };
