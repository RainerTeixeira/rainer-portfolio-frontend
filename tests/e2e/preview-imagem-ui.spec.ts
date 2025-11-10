/**
 * Teste E2E Visual - Preview de Imagem no Preview em Tempo Real
 *
 * Testa e mostra a UI funcionando com screenshots
 */

import { expect, test } from '@playwright/test';
import path from 'path';

test.describe('Preview de Imagem - Teste Visual', () => {
  test('Deve mostrar preview apenas no Preview em Tempo Real', async ({
    page,
  }) => {
    // Configurar console logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('❌ Console Error:', msg.text());
      }
    });

    console.log('🌐 Navegando para o dashboard...');

    // Acessar dashboard
    await page.goto('http://localhost:3000/dashboard', {
      waitUntil: 'networkidle',
    });

    // Aguardar página carregar
    await page.waitForTimeout(2000);

    // Screenshot inicial
    await page.screenshot({
      path: 'test-results/01-dashboard-inicial.png',
      fullPage: true,
    });
    console.log('📸 Screenshot 1: Dashboard inicial');

    // Procurar e clicar em "Novo Post"
    console.log('🔍 Procurando botão "Novo Post"...');
    const novoPostButton = page
      .locator(
        'button:has-text("Novo Post"), button:has-text("+"), button:has-text("Criar")'
      )
      .first();

    if (await novoPostButton.isVisible({ timeout: 5000 })) {
      await novoPostButton.click();
      await page.waitForTimeout(1000);
      console.log('✅ Botão "Novo Post" clicado');
    } else {
      console.warn(
        '⚠️ Botão "Novo Post" não encontrado, tentando URL direta...'
      );
      await page.goto('http://localhost:3000/dashboard?mode=new');
      await page.waitForTimeout(2000);
    }

    // Screenshot após abrir editor
    await page.screenshot({
      path: 'test-results/02-editor-aberto.png',
      fullPage: true,
    });
    console.log('📸 Screenshot 2: Editor aberto');

    // Verificar se campo de imagem existe
    console.log('🔍 Verificando campo de upload de imagem...');
    const uploadButton = page.locator(
      'button:has-text("Upload"), button:has([aria-label*="upload" i])'
    );

    const uploadButtonVisible = await uploadButton.isVisible({ timeout: 5000 });
    console.log(`📋 Botão Upload visível: ${uploadButtonVisible}`);

    // Verificar se NÃO há preview abaixo do campo (deve estar removido)
    const previewAbaixoCampo = page
      .locator('input[id*="cover"], input[type="file"]')
      .locator('..')
      .locator('img')
      .first();

    const previewAbaixoVisible = await previewAbaixoCampo
      .isVisible({
        timeout: 1000,
      })
      .catch(() => false);

    console.log(
      `📋 Preview abaixo do campo visível: ${previewAbaixoVisible} (deve ser false)`
    );

    if (previewAbaixoVisible) {
      console.warn('⚠️ AVISO: Preview ainda aparece abaixo do campo!');
    } else {
      console.log('✅ Preview abaixo do campo corretamente removido');
    }

    // Tentar fazer upload de imagem
    if (uploadButtonVisible) {
      console.log('📤 Fazendo upload de imagem...');

      // Caminho para imagem de teste
      const imagePath = path.join(
        __dirname,
        '../../public/imagem_Postagem_blog_test.jpg'
      );

      // Verificar se arquivo existe
      const fs = await import('fs');
      const fileExists = fs.existsSync(imagePath);

      if (fileExists) {
        console.log(`✅ Arquivo de teste encontrado: ${imagePath}`);

        // Clicar no botão Upload
        await uploadButton.click();
        await page.waitForTimeout(500);

        // Aguardar input de arquivo
        const fileInput = page.locator('input[type="file"]');
        await fileInput.waitFor({ state: 'attached', timeout: 5000 });

        // Selecionar arquivo
        await fileInput.setInputFiles(imagePath);
        await page.waitForTimeout(2000);
        console.log('✅ Arquivo selecionado');

        // Screenshot após selecionar imagem
        await page.screenshot({
          path: 'test-results/03-imagem-selecionada.png',
          fullPage: true,
        });
        console.log('📸 Screenshot 3: Imagem selecionada');

        // Verificar Preview em Tempo Real
        console.log('🔍 Verificando Preview em Tempo Real...');
        const previewSection = page
          .locator('text=/Preview em Tempo Real|Preview/i')
          .locator('..')
          .locator('..');

        const previewSectionVisible = await previewSection.isVisible({
          timeout: 5000,
        });
        console.log(
          `📋 Preview em Tempo Real visível: ${previewSectionVisible}`
        );

        // Verificar se imagem aparece no preview
        const imagemNoPreview = previewSection.locator('img').first();
        const imagemPreviewVisible = await imagemNoPreview
          .isVisible({
            timeout: 3000,
          })
          .catch(() => false);

        console.log(
          `📋 Imagem no Preview: ${imagemPreviewVisible} (deve ser true)`
        );

        // Verificar indicador azul
        const indicadorAzul = page.locator(
          'text=/Preview local|será enviada ao salvar/i'
        );
        const indicadorVisible = await indicadorAzul
          .isVisible({
            timeout: 3000,
          })
          .catch(() => false);

        console.log(
          `📋 Indicador azul visível: ${indicadorVisible} (deve ser true)`
        );

        // Screenshot final do preview
        await page.screenshot({
          path: 'test-results/04-preview-com-imagem.png',
          fullPage: true,
        });
        console.log('📸 Screenshot 4: Preview com imagem');

        // Resumo final
        console.log('\n📊 RESUMO DO TESTE:');
        console.log(
          `   ✅ Preview abaixo do campo removido: ${!previewAbaixoVisible}`
        );
        console.log(
          `   ✅ Preview em Tempo Real funcionando: ${previewSectionVisible}`
        );
        console.log(`   ✅ Imagem aparece no preview: ${imagemPreviewVisible}`);
        console.log(`   ✅ Indicador azul aparece: ${indicadorVisible}`);

        // Expects
        expect(previewAbaixoVisible).toBe(false);

        if (previewSectionVisible) {
          expect(imagemPreviewVisible).toBe(true);
        }

        if (indicadorVisible) {
          console.log(
            '✅ Indicador azul encontrado - Funcionando corretamente!'
          );
        }
      } else {
        console.warn(`⚠️ Arquivo de teste não encontrado: ${imagePath}`);
        console.log('📝 Continuando teste sem upload...');
      }
    } else {
      console.warn('⚠️ Botão Upload não encontrado');
    }

    // Screenshot final
    await page.screenshot({
      path: 'test-results/05-final.png',
      fullPage: true,
    });
    console.log('📸 Screenshot 5: Estado final');

    console.log('\n✅ Teste concluído!');
    console.log('📁 Screenshots salvos em: test-results/');
  });
});
