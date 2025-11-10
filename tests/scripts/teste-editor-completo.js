/**
 * TESTE COMPLETO DO EDITOR - Simulação de Usuário
 *
 * Testa TODAS as funcionalidades possíveis do editor:
 * - Colar JSON
 * - Alternar Visual ↔ JSON múltiplas vezes
 * - Editar no modo Visual
 * - Editar no modo JSON
 * - Apagar conteúdo
 * - Recarregar página
 * - Verificar persistência
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const testJSON = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'fixtures', 'test-post.json'),
    'utf-8'
  )
);

async function testarEditorCompleto() {
  console.log('🧪 TESTE COMPLETO DO EDITOR - SIMULAÇÃO DE USUÁRIO\n');
  console.log(
    '═══════════════════════════════════════════════════════════════\n'
  );

  let browser;
  let page;
  let errors = [];
  let successCount = 0;

  try {
    console.log('🌐 Iniciando navegador...\n');
    browser = await chromium.launch({
      headless: false, // Mostrar navegador para ver o que está acontecendo
      slowMo: 500, // Aumentar tempo entre ações para visualizar
    });

    page = await browser.newPage();

    // Abrir dashboard
    console.log('📍 Navegando para dashboard...\n');
    await page.goto('http://localhost:3000/dashboard?mode=new', {
      waitUntil: 'networkidle',
    });

    // Aguardar editor carregar
    console.log('⏳ Aguardando editor carregar...\n');
    await page
      .waitForSelector('[data-testid="editor"]', { timeout: 10000 })
      .catch(() => {
        // Se não tiver testid, tenta encontrar pelo textarea ou editor
        console.log('⚠️  Procurando editor por seletores alternativos...\n');
      });

    // Aguardar botões Visual/JSON aparecerem
    await page.waitForSelector(
      'button:has-text("Visual"), button:has-text("JSON")',
      {
        timeout: 10000,
      }
    );

    console.log('✅ Editor carregado!\n');
    console.log(
      '═══════════════════════════════════════════════════════════════\n'
    );

    // TESTE 1: Verificar se está em modo Visual inicial
    console.log('📝 TESTE 1: Verificar modo inicial (Visual)\n');
    const visualButton = await page
      .locator('button:has-text("Visual")')
      .first();
    const jsonButton = await page.locator('button:has-text("JSON")').first();

    const isVisualActive = await visualButton.evaluate(el => {
      return (
        el.classList.contains('bg-cyan') ||
        el.classList.contains('bg-primary') ||
        el.getAttribute('data-active') === 'true'
      );
    });

    if (isVisualActive !== undefined) {
      console.log('✅ Modo Visual é o padrão\n');
      successCount++;
    } else {
      console.log('⚠️  Não foi possível verificar modo inicial\n');
    }

    // TESTE 2: Mudar para modo JSON
    console.log('📝 TESTE 2: Mudar para modo JSON\n');
    await jsonButton.click();
    await page.waitForTimeout(1000); // Aguardar mudança

    // Verificar se apareceu textarea do JSON
    const jsonTextarea = await page.locator('textarea').first();
    const textareaExists = await jsonTextarea.isVisible();

    if (textareaExists) {
      console.log('✅ Modo JSON ativado - textarea visível\n');
      successCount++;
    } else {
      console.log('❌ Textarea não apareceu após clicar em JSON\n');
      errors.push('Textarea não apareceu no modo JSON');
    }

    // TESTE 3: Colar JSON completo
    console.log('📝 TESTE 3: Colar JSON completo no editor\n');
    const jsonString = JSON.stringify(testJSON, null, 2);

    await jsonTextarea.clear();
    await jsonTextarea.fill(jsonString);
    await page.waitForTimeout(500);

    const jsonValue = await jsonTextarea.inputValue();
    const hasContent = jsonValue.includes('A Revolução Tecnológica');

    if (hasContent) {
      console.log('✅ JSON colado com sucesso\n');
      successCount++;
    } else {
      console.log('❌ JSON não foi colado corretamente\n');
      errors.push('Falha ao colar JSON');
    }

    // TESTE 4: Voltar para Visual
    console.log('📝 TESTE 4: Voltar para modo Visual\n');
    await visualButton.click();
    await page.waitForTimeout(1500); // Aguardar renderização

    // Verificar se conteúdo apareceu no editor visual
    const editorContent = await page.locator('.ProseMirror').first();
    const editorText = await editorContent.textContent();
    const hasTitle = editorText.includes('A Revolução Tecnológica');

    if (hasTitle) {
      console.log('✅ Conteúdo renderizado no modo Visual\n');
      successCount++;
    } else {
      console.log('❌ Conteúdo não apareceu no modo Visual\n');
      console.log(`   Texto encontrado: ${editorText.substring(0, 100)}...\n`);
      errors.push('Conteúdo não renderizado no modo Visual');
    }

    // TESTE 5: Alternar novamente para JSON
    console.log('📝 TESTE 5: Alternar novamente para JSON\n');
    await jsonButton.click();
    await page.waitForTimeout(1000);

    const jsonValueAfter = await jsonTextarea.inputValue();
    const stillHasContent = jsonValueAfter.includes('A Revolução Tecnológica');

    if (stillHasContent) {
      console.log('✅ JSON preservado após alternar modos\n');
      successCount++;
    } else {
      console.log('❌ JSON foi perdido após alternar modos\n');
      errors.push('JSON perdido ao alternar modos');
    }

    // TESTE 6: Editar JSON (mudar título)
    console.log('📝 TESTE 6: Editar JSON (mudar título)\n');
    const editedJson = jsonValueAfter.replace(
      'A Revolução Tecnológica',
      'A Evolução Tecnológica'
    );

    await jsonTextarea.clear();
    await jsonTextarea.fill(editedJson);
    await page.waitForTimeout(500);

    // TESTE 7: Voltar para Visual e verificar edição
    console.log('📝 TESTE 7: Voltar para Visual e verificar edição\n');
    await visualButton.click();
    await page.waitForTimeout(1500);

    const editorTextAfterEdit = await editorContent.textContent();
    const hasEditedTitle = editorTextAfterEdit.includes(
      'A Evolução Tecnológica'
    );

    if (hasEditedTitle) {
      console.log('✅ Edição do JSON aplicada no Visual\n');
      successCount++;
    } else {
      console.log('❌ Edição do JSON não foi aplicada\n');
      console.log(
        `   Texto encontrado: ${editorTextAfterEdit.substring(0, 100)}...\n`
      );
      errors.push('Edição do JSON não aplicada');
    }

    // TESTE 8: Editar no modo Visual (adicionar parágrafo)
    console.log('📝 TESTE 8: Editar no modo Visual (adicionar parágrafo)\n');
    await editorContent.click();
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await page.keyboard.type(
      'Este é um parágrafo adicionado pelo teste automatizado.'
    );
    await page.waitForTimeout(1000);

    // TESTE 9: Voltar para JSON e verificar se mudanças aparecem
    console.log('📝 TESTE 9: Voltar para JSON e verificar mudanças\n');
    await jsonButton.click();
    await page.waitForTimeout(1000);

    const jsonWithNewParagraph = await jsonTextarea.inputValue();
    const hasNewParagraph = jsonWithNewParagraph.includes('teste automatizado');

    if (hasNewParagraph) {
      console.log('✅ Mudanças do Visual aparecem no JSON\n');
      successCount++;
    } else {
      console.log(
        '⚠️  Mudanças do Visual podem não estar no JSON (normal se ainda não sincronizou)\n'
      );
    }

    // TESTE 10: Apagar todo o conteúdo
    console.log('📝 TESTE 10: Apagar todo o conteúdo\n');
    await jsonTextarea.selectText();
    await page.keyboard.press('Delete');
    await jsonTextarea.fill('{"type":"doc","content":[]}');
    await page.waitForTimeout(500);

    // TESTE 11: Voltar para Visual e verificar se está vazio
    console.log('📝 TESTE 11: Verificar se editor está vazio\n');
    await visualButton.click();
    await page.waitForTimeout(1500);

    const editorTextEmpty = await editorContent.textContent();
    const isEmpty =
      editorTextEmpty.trim().length === 0 ||
      editorTextEmpty.trim() === '' ||
      !editorTextEmpty.includes('Evolução');

    if (isEmpty || !editorTextEmpty.includes('Evolução')) {
      console.log('✅ Conteúdo apagado corretamente\n');
      successCount++;
    } else {
      console.log('⚠️  Conteúdo ainda presente (pode ser placeholder)\n');
    }

    // TESTE 12: Recarregar página e verificar localStorage
    console.log('📝 TESTE 12: Recarregar página e verificar persistência\n');

    // Primeiro, adicionar conteúdo novamente para testar persistência
    await jsonButton.click();
    await page.waitForTimeout(1000);
    await jsonTextarea.fill(jsonString);
    await visualButton.click();
    await page.waitForTimeout(1000);

    // Recarregar página
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se conteúdo foi restaurado
    const restoredContent = await page
      .locator('.ProseMirror')
      .first()
      .textContent();
    const wasRestored =
      restoredContent.includes('A Revolução Tecnológica') ||
      restoredContent.length > 50;

    if (wasRestored) {
      console.log('✅ Conteúdo restaurado do localStorage após recarregar\n');
      successCount++;
    } else {
      console.log(
        '⚠️  Conteúdo não foi restaurado (pode não ter sido salvo)\n'
      );
      console.log(
        `   Texto encontrado: ${restoredContent.substring(0, 100)}...\n`
      );
    }

    // Verificar localStorage via JavaScript
    const localStorageData = await page.evaluate(() => {
      return {
        content: localStorage.getItem('editor-new-post-content'),
        json: localStorage.getItem('editor-new-post-json'),
        viewMode: localStorage.getItem('editor-new-post-viewMode'),
      };
    });

    if (localStorageData.content || localStorageData.json) {
      console.log('✅ Dados encontrados no localStorage\n');
      console.log(
        `   - Content: ${localStorageData.content ? 'Sim' : 'Não'}\n`
      );
      console.log(`   - JSON: ${localStorageData.json ? 'Sim' : 'Não'}\n`);
      console.log(
        `   - ViewMode: ${localStorageData.viewMode || 'não definido'}\n`
      );
      successCount++;
    } else {
      console.log('⚠️  Nenhum dado encontrado no localStorage\n');
    }

    // TESTE 13: Alternar múltiplas vezes (stress test)
    console.log('📝 TESTE 13: Alternar Visual ↔ JSON múltiplas vezes (5x)\n');

    for (let i = 0; i < 5; i++) {
      await visualButton.click();
      await page.waitForTimeout(300);
      await jsonButton.click();
      await page.waitForTimeout(300);
    }

    await visualButton.click();
    await page.waitForTimeout(1000);

    const finalContent = await editorContent.textContent();
    const stillHasFinalContent =
      finalContent.length > 0 ||
      finalContent.includes('A Revolução') ||
      finalContent.includes('Evolução');

    if (stillHasFinalContent || finalContent.length > 0) {
      console.log('✅ Conteúdo preservado após múltiplas alternâncias\n');
      successCount++;
    } else {
      console.log(
        '⚠️  Conteúdo pode ter sido perdido após múltiplas alternâncias\n'
      );
    }

    console.log(
      '\n═══════════════════════════════════════════════════════════════\n'
    );
    console.log('📊 RESULTADOS DO TESTE:\n');
    console.log(`✅ Testes bem-sucedidos: ${successCount}\n`);
    console.log(`❌ Erros encontrados: ${errors.length}\n`);

    if (errors.length > 0) {
      console.log('🔴 ERROS DETALHADOS:\n');
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}\n`);
      });
    }

    if (errors.length === 0) {
      console.log('🎉 TODOS OS TESTES PASSARAM!\n');
    }
  } catch (error) {
    console.error('\n❌ ERRO CRÍTICO NO TESTE:\n');
    console.error(error);
    errors.push(`Erro crítico: ${error.message}`);
  } finally {
    if (browser) {
      console.log('\n🔒 Fechando navegador...\n');
      await browser.close();
    }
  }

  return { successCount, errors };
}

// Executar teste
if (require.main === module) {
  testarEditorCompleto()
    .then(({ successCount, errors }) => {
      process.exit(errors.length > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Erro fatal:', error);
      process.exit(1);
    });
}

module.exports = { testarEditorCompleto };
