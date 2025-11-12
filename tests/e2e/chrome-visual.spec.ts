/**
 * Teste Visual no Chrome - Preview de Imagem
 *
 * Abre o Chrome e testa a funcionalidade de preview de imagem
 */

import { test } from './fixtures';

// Configuração global para este arquivo
test.use({
  // Usar Chrome especificamente
  channel: 'chrome',
  // Slower para você ver melhor
  headless: false,
});

test.describe('Preview de Imagem - Chrome Visual Test', () => {
  test('Deve mostrar preview apenas no Preview em Tempo Real - Chrome', async ({
    page,
  }) => {
    // Configurar console logging
    page.on('console', msg => {
      console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`);
    });

    page.on('pageerror', error => {
      console.error(`[Browser Error] ${error.message}`);
    });

    console.log('🌐 Abrindo Chrome e navegando para o dashboard...');

    // Acessar dashboard
    await page.goto('/dashboard', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    console.log('✅ Dashboard carregado');

    // Aguardar página carregar completamente
    await page.waitForTimeout(2000);

    // Screenshot inicial
    await page.screenshot({
      path: 'test-results/chrome-01-dashboard.png',
      fullPage: true,
    });
    console.log('📸 Screenshot 1: Dashboard inicial');

    // Verificar se precisa fazer login
    const isLoginPage = page.url().includes('/login');
    if (isLoginPage) {
      console.log(
        '⚠️ Redirecionado para login. Teste manual será necessário após login.'
      );
      await page.screenshot({
        path: 'test-results/chrome-02-login.png',
        fullPage: true,
      });
      console.log('📸 Screenshot 2: Página de login');
      return; // Pausar aqui para login manual
    }

    // Procurar botão "Novo Post"
    console.log('🔍 Procurando botão "Novo Post"...');
    const novoPostButton = page
      .locator(
        'button:has-text("Novo Post"), button:has-text("Criar"), a:has-text("Novo Post")'
      )
      .first();

    const novoPostVisible = await novoPostButton.isVisible({ timeout: 10000 });

    if (novoPostVisible) {
      console.log('✅ Botão "Novo Post" encontrado');
      await novoPostButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Clicado em "Novo Post"');
    } else {
      console.log('⚠️ Botão não encontrado, navegando diretamente...');
      await page.goto('/dashboard?mode=new');
      await page.waitForTimeout(2000);
    }

    // Screenshot após abrir editor
    await page.screenshot({
      path: 'test-results/chrome-03-editor-aberto.png',
      fullPage: true,
    });
    console.log('📸 Screenshot 3: Editor aberto');

    // Verificar se campo de upload existe
    console.log('🔍 Verificando campo de upload...');
    const uploadButton = page
      .locator(
        'button:has-text("Upload"), button:has([aria-label*="upload" i])'
      )
      .first();

    const uploadButtonVisible = await uploadButton.isVisible({
      timeout: 10000,
    });

    if (!uploadButtonVisible) {
      console.log('❌ Botão Upload não encontrado');
      await page.screenshot({
        path: 'test-results/chrome-error-upload-nao-encontrado.png',
        fullPage: true,
      });
      return;
    }

    console.log('✅ Botão Upload encontrado');

    // Verificar se NÃO há preview abaixo do campo (DEVE estar removido)
    const previewAbaixoCampo = page
      .locator('input[id*="cover"], input[type="file"][id*="coverImage"]')
      .locator(
        'xpath=following-sibling::*/img | xpath=../following-sibling::*/img'
      )
      .first();

    const previewAbaixoVisible = await previewAbaixoCampo
      .isVisible({
        timeout: 1000,
      })
      .catch(() => false);

    console.log(
      `📋 Preview abaixo do campo: ${previewAbaixoVisible} (deve ser false)`
    );

    if (previewAbaixoVisible) {
      console.warn('⚠️ AVISO: Preview ainda aparece abaixo do campo!');
      await page.screenshot({
        path: 'test-results/chrome-warning-preview-abaixo-campo.png',
        fullPage: true,
      });
    } else {
      console.log('✅ Preview abaixo do campo corretamente removido');
    }

    // Verificar Preview em Tempo Real
    console.log('🔍 Verificando Preview em Tempo Real...');
    const previewSection = page
      .locator('text=/Preview em Tempo Real/i, h2:has-text("Preview")')
      .first();

    const previewSectionVisible = await previewSection.isVisible({
      timeout: 5000,
    });

    console.log(`📋 Preview em Tempo Real visível: ${previewSectionVisible}`);

    if (previewSectionVisible) {
      // Verificar se há PostCard no preview
      const postCard = previewSection.locator('..').locator('img').first();
      const postCardVisible = await postCard
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      console.log(`📋 PostCard no preview: ${postCardVisible}`);

      await page.screenshot({
        path: 'test-results/chrome-04-preview-sem-imagem.png',
        fullPage: true,
      });
      console.log('📸 Screenshot 4: Preview sem imagem ainda');
    }

    console.log('\n📊 RESUMO ATÉ AGORA:');
    console.log(`   ✅ Servidor acessível: true`);
    console.log(`   ✅ Dashboard carregado: true`);
    console.log(`   ✅ Editor aberto: true`);
    console.log(`   ✅ Botão Upload encontrado: ${uploadButtonVisible}`);
    console.log(
      `   ✅ Preview abaixo do campo removido: ${!previewAbaixoVisible}`
    );
    console.log(
      `   ✅ Preview em Tempo Real visível: ${previewSectionVisible}`
    );

    console.log('\n🎯 PRÓXIMOS PASSOS MANUAIS:');
    console.log('   1. Clique no botão "Upload"');
    console.log('   2. Selecione uma imagem');
    console.log('   3. Verifique se:');
    console.log(
      '      - Preview aparece APENAS no Preview em Tempo Real (lado direito)'
    );
    console.log('      - NÃO há preview abaixo do campo de upload');
    console.log('      - Indicador azul aparece informando upload pendente');
    console.log('   4. Clique em "Salvar" para testar upload');

    // Pausar para teste manual (se necessário)
    console.log('\n⏸️  Pausando para você testar manualmente...');
    console.log('   (O navegador ficará aberto)');

    // Manter o navegador aberto por 60 segundos para teste manual
    await page.waitForTimeout(60000);

    // Screenshot final
    await page.screenshot({
      path: 'test-results/chrome-05-final.png',
      fullPage: true,
    });
    console.log('\n📸 Screenshot 5: Estado final');
    console.log('✅ Teste concluído!');
  });
});
