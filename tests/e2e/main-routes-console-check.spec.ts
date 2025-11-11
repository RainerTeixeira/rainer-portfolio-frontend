/**
 * Teste E2E para verificar erros no console nas principais rotas do site
 *
 * Este teste navega por todas as rotas principais e verifica se há erros
 * no console do navegador (F12), usando o sistema de monitoramento automático.
 *
 * Rotas testadas:
 * - / (Home)
 * - /sobre (About)
 * - /blog (Blog listing)
 * - /contato (Contact)
 * - /termos (Terms)
 * - /privacidade (Privacy)
 * - /cookies (Cookies)
 */

import { expect, test } from './fixtures';

/**
 * Rotas principais do site para testar
 */
const MAIN_ROUTES = [
  {
    path: '/',
    name: 'Home',
    description: 'Página inicial do portfólio',
  },
  {
    path: '/sobre',
    name: 'Sobre',
    description: 'Página sobre o desenvolvedor',
  },
  {
    path: '/blog',
    name: 'Blog',
    description: 'Listagem de posts do blog',
  },
  {
    path: '/contato',
    name: 'Contato',
    description: 'Página de contato',
  },
  {
    path: '/termos',
    name: 'Termos',
    description: 'Termos de uso',
  },
  {
    path: '/privacidade',
    name: 'Privacidade',
    description: 'Política de privacidade',
  },
  {
    path: '/cookies',
    name: 'Cookies',
    description: 'Política de cookies',
  },
] as const;

test.describe('Verificação de Erros no Console - Rotas Principais', () => {
  // Verificar se o servidor está rodando antes de todos os testes
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      await page.goto('/', { timeout: 5000 });
      await page.close();
    } catch (error) {
      await page.close();
      throw new Error(
        'Servidor não está rodando! Por favor, inicie o servidor com "npm run dev" antes de executar os testes.'
      );
    }
  });

  for (const route of MAIN_ROUTES) {
    test(`deve carregar ${route.name} (${route.path}) sem erros no console`, async ({
      page,
      consoleHelper,
    }) => {
      // Navegar para a rota
      await page.goto(route.path, {
        waitUntil: 'domcontentloaded', // Mais tolerante que networkidle
        timeout: 60000,
      });

      // Aguardar um pouco para garantir que tudo carregou
      await page.waitForTimeout(2000);

      // Verificar se a página carregou corretamente
      await expect(page).toHaveURL(new RegExp(`${route.path}(/)?$`), {
        timeout: 10000,
      });

      // Aguardar um pouco mais para garantir que tudo carregou
      await page
        .waitForLoadState('networkidle', { timeout: 10000 })
        .catch(() => {
          // Ignorar se networkidle não for alcançado, mas continuar
        });

      // Verificar se há erros no console
      // Filtrar erros de requisições que falharam (podem ser esperados em alguns casos)
      const allErrors = consoleHelper.getErrors();
      const criticalErrors = allErrors.filter(
        error =>
          !error.text.includes('Request failed') && // Ignorar erros de rede genéricos
          !error.text.includes('net::ERR_') // Ignorar erros de conexão
      );
      const hasErrors = criticalErrors.length > 0;
      const hasWarnings = consoleHelper.hasWarnings();

      // Se houver erros, gerar relatório detalhado
      if (hasErrors) {
        const report = consoleHelper.generateReport();
        console.error(
          `\n❌ ERROS CRÍTICOS ENCONTRADOS EM ${route.name.toUpperCase()}:`
        );
        console.error(report);

        // Listar apenas erros críticos
        console.error('\n📋 Detalhes dos erros críticos:');
        criticalErrors.forEach((error, index) => {
          console.error(`\n${index + 1}. ${error.text}`);
          if (error.location) {
            console.error(`   URL: ${error.location.url}`);
            if (error.location.lineNumber) {
              console.error(
                `   Linha: ${error.location.lineNumber}:${error.location.columnNumber || 0}`
              );
            }
          }
        });
      }

      // Se houver warnings, reportar (mas não falhar o teste)
      if (hasWarnings) {
        const warnings = consoleHelper.getWarningMessages();
        console.warn(
          `\n⚠️  WARNINGS ENCONTRADOS EM ${route.name.toUpperCase()}:`
        );
        warnings.forEach((warning, index) => {
          console.warn(`${index + 1}. ${warning}`);
        });
      }

      // Verificar que não há erros críticos
      // O fixture já valida automaticamente, mas vamos garantir
      expect(hasErrors).toBe(false);
    });
  }

  test('deve verificar todas as rotas em sequência', async ({
    page,
    consoleHelper,
  }) => {
    const results: Array<{
      route: string;
      name: string;
      hasErrors: boolean;
      hasWarnings: boolean;
      errorCount: number;
      warningCount: number;
      errors: string[];
      warnings: string[];
    }> = [];

    // Navegar por todas as rotas
    for (const route of MAIN_ROUTES) {
      console.log(`\n🔍 Testando rota: ${route.name} (${route.path})`);

      // Limpar logs anteriores
      consoleHelper.clear();

      // Navegar para a rota
      await page.goto(route.path, {
        waitUntil: 'domcontentloaded', // Mais tolerante que networkidle
        timeout: 60000,
      });

      // Aguardar carregamento completo
      await page.waitForTimeout(2000);

      // Aguardar um pouco mais para garantir que tudo carregou
      await page
        .waitForLoadState('networkidle', { timeout: 10000 })
        .catch(() => {
          // Ignorar se networkidle não for alcançado
        });

      // Coletar resultados (filtrar erros de rede)
      const allErrors = consoleHelper.getErrors();
      const criticalErrors = allErrors.filter(
        error =>
          !error.text.includes('Request failed') &&
          !error.text.includes('net::ERR_')
      );
      const hasErrors = criticalErrors.length > 0;
      const hasWarnings = consoleHelper.hasWarnings();
      const errors = criticalErrors.map(e => e.text);
      const warnings = consoleHelper.getWarningMessages();

      results.push({
        route: route.path,
        name: route.name,
        hasErrors,
        hasWarnings,
        errorCount: errors.length,
        warningCount: warnings.length,
        errors,
        warnings,
      });

      // Log resumido
      if (hasErrors) {
        console.error(`❌ ${route.name}: ${errors.length} erro(s)`);
      } else if (hasWarnings) {
        console.warn(`⚠️  ${route.name}: ${warnings.length} warning(s)`);
      } else {
        console.log(`✅ ${route.name}: Sem erros ou warnings`);
      }
    }

    // Gerar relatório final
    console.log('\n' + '='.repeat(80));
    console.log('📊 RELATÓRIO FINAL - VERIFICAÇÃO DE CONSOLE');
    console.log('='.repeat(80));

    const routesWithErrors = results.filter(r => r.hasErrors);
    const routesWithWarnings = results.filter(r => r.hasWarnings);
    const totalErrors = results.reduce((sum, r) => sum + r.errorCount, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warningCount, 0);

    console.log(`\nTotal de rotas testadas: ${results.length}`);
    console.log(`Rotas com erros: ${routesWithErrors.length}`);
    console.log(`Rotas com warnings: ${routesWithWarnings.length}`);
    console.log(`Total de erros: ${totalErrors}`);
    console.log(`Total de warnings: ${totalWarnings}`);

    if (routesWithErrors.length > 0) {
      console.log('\n❌ ROTAS COM ERROS:');
      routesWithErrors.forEach(r => {
        console.log(`\n  ${r.name} (${r.route}):`);
        r.errors.forEach((error, i) => {
          console.log(`    ${i + 1}. ${error}`);
        });
      });
    }

    if (routesWithWarnings.length > 0) {
      console.log('\n⚠️  ROTAS COM WARNINGS:');
      routesWithWarnings.forEach(r => {
        console.log(`\n  ${r.name} (${r.route}):`);
        r.warnings.forEach((warning, i) => {
          console.log(`    ${i + 1}. ${warning}`);
        });
      });
    }

    if (routesWithErrors.length === 0 && routesWithWarnings.length === 0) {
      console.log('\n✅ Todas as rotas estão sem erros ou warnings!');
    }

    console.log('\n' + '='.repeat(80));

    // Falhar o teste se houver erros
    expect(routesWithErrors.length).toBe(0);
  });
});
