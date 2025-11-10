/**
 * Teste Automatizado - Editor Tiptap
 *
 * Abre o navegador, cria novo post, cola JSON e testa alternância Visual/JSON
 */

const { chromium } = require('playwright');

const testJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'A Revolução Tecnológica e o Futuro da Inteligência Artificial em 2025',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'A tecnologia avança em um ritmo sem precedentes. Em 2025, a Inteligência Artificial (IA) está em todos os lugares — nas empresas, nas escolas, nos lares e até mesmo nas artes.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://fernandogiannini.com.br/wp-content/uploads/2024/09/historia.jpg',
        alt: 'A história da tecnologia e a revolução digital',
        title: 'História da tecnologia',
      },
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'text',
          text: '"A tecnologia é melhor quando conecta as pessoas." – Matt Mullenweg',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        { type: 'text', text: '📈 Tendências de IA e Tecnologia em 2025' },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [{ type: 'text', text: 'IA generativa em larga escala' }],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'text',
              text: 'Computação quântica aplicada a modelos de aprendizado',
            },
          ],
        },
      ],
    },
  ],
};

(async () => {
  console.log('🚀 Iniciando teste automatizado...\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500, // Aumenta delay entre ações para visualizar
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('📱 Navegando para o dashboard...');
    await page.goto('http://localhost:3000/dashboard?mode=new', {
      waitUntil: 'networkidle',
    });

    console.log('⏳ Aguardando página carregar...');
    await page.waitForTimeout(2000);

    // Verifica se precisa fazer login
    const loginForm = await page
      .locator('input[type="email"], input[name="email"]')
      .first();
    if (await loginForm.isVisible({ timeout: 3000 })) {
      console.log('🔐 Fazendo login...');
      await page.fill(
        'input[type="email"], input[name="email"]',
        'test@example.com'
      );
      await page.fill(
        'input[type="password"], input[name="password"]',
        'password123'
      );
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000);
    }

    console.log('📝 Procurando botão JSON no editor...');

    // Procura o botão JSON no editor
    const jsonButton = page
      .locator('button:has-text("JSON"), button[title*="JSON"]')
      .first();

    if (await jsonButton.isVisible({ timeout: 5000 })) {
      console.log('✅ Botão JSON encontrado! Clicando...');
      await jsonButton.click();
      await page.waitForTimeout(1000);

      console.log('📋 Procurando textarea do JSON...');
      const jsonTextarea = page
        .locator('textarea[placeholder*="JSON"], textarea')
        .last();

      if (await jsonTextarea.isVisible({ timeout: 5000 })) {
        console.log('✅ Textarea encontrado! Colando JSON...');

        const jsonString = JSON.stringify(testJSON, null, 2);
        await jsonTextarea.fill('');
        await jsonTextarea.fill(jsonString);
        await page.waitForTimeout(1000);

        console.log('✅ JSON colado!');
        console.log('👁️  Clicando em Visual para verificar...');

        // Procura botão Visual
        const visualButton = page
          .locator('button:has-text("Visual"), button[title*="Visual"]')
          .first();
        if (await visualButton.isVisible({ timeout: 5000 })) {
          await visualButton.click();
          await page.waitForTimeout(2000);

          console.log(
            '✅ Modo Visual ativado! Verificando se conteúdo aparece...'
          );

          // Verifica se o título aparece
          const hasHeading = await page
            .locator('text=/Revolução Tecnológica/')
            .isVisible({ timeout: 3000 })
            .catch(() => false);

          if (hasHeading) {
            console.log('✅ SUCESSO! Conteúdo apareceu no modo Visual!');
          } else {
            console.log(
              '⚠️  Aviso: Título não encontrado, mas pode estar carregando...'
            );
          }

          console.log('🔄 Voltando para JSON...');
          await jsonButton.click();
          await page.waitForTimeout(2000);

          // Verifica se JSON ainda está lá
          const jsonContent = await jsonTextarea.inputValue();
          if (jsonContent.includes('Revolução Tecnológica')) {
            console.log('✅ SUCESSO! JSON foi preservado após alternar!');
          } else {
            console.log('❌ ERRO: JSON não foi preservado!');
          }

          console.log('\n✅ Teste concluído!');
        } else {
          console.log('❌ Botão Visual não encontrado');
        }
      } else {
        console.log('❌ Textarea não encontrado');
      }
    } else {
      console.log(
        '⚠️  Botão JSON não encontrado. Pode já estar no modo JSON ou página diferente.'
      );
      console.log('📸 Tirando screenshot para debug...');
      await page.screenshot({ path: 'debug-dashboard.png', fullPage: true });
      console.log('💾 Screenshot salvo como debug-dashboard.png');
    }

    console.log('\n⏸️  Pausa de 5 segundos para você verificar manualmente...');
    await page.waitForTimeout(5000);
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    console.error(error.stack);
  } finally {
    console.log('\n🔚 Fechando navegador...');
    await browser.close();
  }
})();
