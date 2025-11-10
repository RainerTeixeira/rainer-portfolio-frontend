/**
 * TESTE AUTOMATIZADO REAL - Editor Completo
 *
 * Este script realmente testa todas as funcionalidades como um usuário faria
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const testJSON = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'fixtures', 'test-post.json'),
    'utf-8'
  )
);

async function testarEditorReal() {
  console.log('🧪 INICIANDO TESTE AUTOMATIZADO DO EDITOR...\n');

  let browser;
  let page;
  const resultados = {
    sucesso: [],
    falhas: [],
    total: 0,
  };

  try {
    // Lançar navegador
    console.log('🌐 Abrindo navegador...');
    browser = await puppeteer.launch({
      headless: false, // Mostrar navegador
      defaultViewport: { width: 1920, height: 1080 },
      slowMo: 250, // Mais lento para visualizar
    });

    page = await browser.newPage();

    // Navegar para dashboard
    console.log('📍 Navegando para dashboard...');
    await page.goto('http://localhost:3000/dashboard?mode=new', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Aguardar editor carregar
    console.log('⏳ Aguardando editor carregar...');
    await page.waitForSelector(
      'button:has-text("Visual"), button:has-text("JSON")',
      {
        timeout: 15000,
      }
    );

    console.log('✅ Editor carregado!\n');
    console.log(
      '═══════════════════════════════════════════════════════════════\n'
    );

    // TESTE 1: Verificar três botões
    console.log('📝 TESTE 1: Verificar três botões (Visual, JSON, Preview)\n');
    try {
      const visualBtn = await page.$('button:has-text("Visual")');
      const jsonBtn = await page.$('button:has-text("JSON")');
      const previewBtn = await page.$('button:has-text("Preview")');

      if (visualBtn && jsonBtn && previewBtn) {
        console.log('✅ PASS: Três botões encontrados\n');
        resultados.sucesso.push('Três botões encontrados');
      } else {
        throw new Error('Botões não encontrados');
      }
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Três botões: ' + error.message);
    }
    resultados.total++;

    // TESTE 2: Mudar para JSON
    console.log('📝 TESTE 2: Mudar para modo JSON\n');
    try {
      const jsonButton = await page.$('button:has-text("JSON")');
      if (!jsonButton) throw new Error('Botão JSON não encontrado');

      await jsonButton.click();
      await page.waitForTimeout(1000);

      const textarea = await page.$('textarea');
      if (!textarea) throw new Error('Textarea não apareceu');

      const isVisible = await textarea.isIntersectingViewport();
      if (!isVisible) throw new Error('Textarea não visível');

      console.log('✅ PASS: Modo JSON ativado\n');
      resultados.sucesso.push('Modo JSON funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Modo JSON: ' + error.message);
    }
    resultados.total++;

    // TESTE 3: Colar JSON completo
    console.log('📝 TESTE 3: Colar JSON completo\n');
    try {
      const textarea = await page.$('textarea');
      if (!textarea) throw new Error('Textarea não encontrado');

      const jsonString = JSON.stringify(testJSON, null, 2);

      await textarea.click();
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await page.keyboard.press('Delete');

      await textarea.type(jsonString, { delay: 0 });
      await page.waitForTimeout(1000);

      const textareaValue = await page.evaluate(el => el.value, textarea);
      if (!textareaValue.includes('A Revolução Tecnológica')) {
        throw new Error('JSON não foi colado');
      }

      console.log('✅ PASS: JSON colado com sucesso\n');
      resultados.sucesso.push('Colar JSON funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Colar JSON: ' + error.message);
    }
    resultados.total++;

    // TESTE 4: Voltar para Visual
    console.log('📝 TESTE 4: Voltar para modo Visual\n');
    try {
      const visualButton = await page.$('button:has-text("Visual")');
      if (!visualButton) throw new Error('Botão Visual não encontrado');

      await visualButton.click();
      await page.waitForTimeout(2000); // Aguardar renderização

      const editor = await page.$('.ProseMirror');
      if (!editor) throw new Error('Editor ProseMirror não encontrado');

      const editorText = await page.evaluate(el => el.textContent, editor);
      if (!editorText.includes('A Revolução Tecnológica')) {
        throw new Error('Conteúdo não apareceu no Visual');
      }

      console.log('✅ PASS: Conteúdo renderizado no Visual\n');
      resultados.sucesso.push('Visual renderiza conteúdo');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Visual: ' + error.message);
    }
    resultados.total++;

    // TESTE 5: Ir para Preview
    console.log('📝 TESTE 5: Ir para modo Preview\n');
    try {
      const previewButton = await page.$('button:has-text("Preview")');
      if (!previewButton) throw new Error('Botão Preview não encontrado');

      await previewButton.click();
      await page.waitForTimeout(1500);

      const preview = await page.$('.editor-preview-content');
      if (!preview) throw new Error('Preview não apareceu');

      const previewHtml = await page.evaluate(el => el.innerHTML, preview);
      if (!previewHtml || previewHtml.trim() === '') {
        throw new Error('Preview está vazio');
      }

      console.log('✅ PASS: Preview renderizado\n');
      resultados.sucesso.push('Preview funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Preview: ' + error.message);
    }
    resultados.total++;

    // TESTE 6: Voltar para JSON e verificar conteúdo
    console.log('📝 TESTE 6: Verificar JSON preservado\n');
    try {
      const jsonButton = await page.$('button:has-text("JSON")');
      await jsonButton.click();
      await page.waitForTimeout(1000);

      const textarea = await page.$('textarea');
      const jsonValue = await page.evaluate(el => el.value, textarea);

      if (!jsonValue.includes('A Revolução Tecnológica')) {
        throw new Error('JSON não foi preservado');
      }

      console.log('✅ PASS: JSON preservado após alternâncias\n');
      resultados.sucesso.push('JSON preservado');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('JSON preservado: ' + error.message);
    }
    resultados.total++;

    // TESTE 7: Editar JSON
    console.log('📝 TESTE 7: Editar JSON\n');
    try {
      const textarea = await page.$('textarea');
      let jsonValue = await page.evaluate(el => el.value, textarea);

      jsonValue = jsonValue.replace(
        'A Revolução Tecnológica',
        'A Evolução Tecnológica'
      );

      await textarea.click();
      await page.keyboard.down('Control');
      await page.keyboard.press('KeyA');
      await page.keyboard.up('Control');
      await textarea.type(jsonValue, { delay: 0 });
      await page.waitForTimeout(500);

      console.log('✅ PASS: JSON editado\n');
      resultados.sucesso.push('Editar JSON funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Editar JSON: ' + error.message);
    }
    resultados.total++;

    // TESTE 8: Aplicar edição no Visual
    console.log('📝 TESTE 8: Aplicar edição no Visual\n');
    try {
      const visualButton = await page.$('button:has-text("Visual")');
      await visualButton.click();
      await page.waitForTimeout(2000);

      const editor = await page.$('.ProseMirror');
      const editorText = await page.evaluate(el => el.textContent, editor);

      if (!editorText.includes('A Evolução Tecnológica')) {
        throw new Error('Edição do JSON não foi aplicada');
      }

      console.log('✅ PASS: Edição aplicada no Visual\n');
      resultados.sucesso.push('Edição JSON → Visual funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Aplicar edição: ' + error.message);
    }
    resultados.total++;

    // TESTE 9: Verificar localStorage
    console.log('📝 TESTE 9: Verificar localStorage\n');
    try {
      const storageData = await page.evaluate(() => {
        return {
          content: localStorage.getItem('editor-new-post-content'),
          json: localStorage.getItem('editor-new-post-json'),
          viewMode: localStorage.getItem('editor-new-post-viewMode'),
        };
      });

      if (!storageData.content && !storageData.json) {
        throw new Error('Nenhum dado no localStorage');
      }

      if (
        storageData.viewMode !== 'visual' &&
        storageData.viewMode !== 'json' &&
        storageData.viewMode !== 'preview'
      ) {
        throw new Error('viewMode inválido');
      }

      console.log('✅ PASS: localStorage funcionando\n');
      console.log(`   - Content: ${storageData.content ? 'Sim' : 'Não'}\n`);
      console.log(`   - JSON: ${storageData.json ? 'Sim' : 'Não'}\n`);
      console.log(`   - ViewMode: ${storageData.viewMode}\n`);
      resultados.sucesso.push('localStorage funciona');
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('localStorage: ' + error.message);
    }
    resultados.total++;

    // TESTE 10: Recarregar e verificar persistência
    console.log('📝 TESTE 10: Recarregar página e verificar persistência\n');
    try {
      await page.reload({ waitUntil: 'networkidle2' });
      await page.waitForTimeout(3000);

      const editor = await page.$('.ProseMirror');
      if (editor) {
        const editorText = await page.evaluate(el => el.textContent, editor);
        if (
          editorText.includes('Evolução') ||
          editorText.includes('Revolução')
        ) {
          console.log('✅ PASS: Conteúdo restaurado após recarregar\n');
          resultados.sucesso.push('Persistência funciona');
        } else {
          throw new Error('Conteúdo não restaurado');
        }
      } else {
        // Pode estar em modo JSON ou Preview
        const textarea = await page.$('textarea');
        const preview = await page.$('.editor-preview-content');
        if (textarea || preview) {
          console.log('✅ PASS: Modo restaurado após recarregar\n');
          resultados.sucesso.push('Modo restaurado');
        } else {
          throw new Error('Nenhum conteúdo restaurado');
        }
      }
    } catch (error) {
      console.log('❌ FAIL: ' + error.message + '\n');
      resultados.falhas.push('Persistência: ' + error.message);
    }
    resultados.total++;

    // RESULTADOS FINAIS
    console.log(
      '\n═══════════════════════════════════════════════════════════════\n'
    );
    console.log('📊 RESULTADOS FINAIS:\n');
    console.log(
      `✅ Sucessos: ${resultados.sucesso.length}/${resultados.total}\n`
    );
    console.log(`❌ Falhas: ${resultados.falhas.length}/${resultados.total}\n`);

    if (resultados.falhas.length > 0) {
      console.log('🔴 FALHAS DETALHADAS:\n');
      resultados.falhas.forEach((falha, index) => {
        console.log(`   ${index + 1}. ${falha}\n`);
      });
    }

    if (resultados.falhas.length === 0) {
      console.log('🎉 TODOS OS TESTES PASSARAM!\n');
    }

    console.log(
      '═══════════════════════════════════════════════════════════════\n'
    );

    // Manter navegador aberto por 5 segundos para visualização
    await page.waitForTimeout(5000);
  } catch (error) {
    console.error('\n❌ ERRO CRÍTICO NO TESTE:\n');
    console.error(error);
    resultados.falhas.push(`Erro crítico: ${error.message}`);
  } finally {
    if (browser) {
      console.log('🔒 Fechando navegador...\n');
      await browser.close();
    }
  }

  return resultados;
}

// Executar teste
if (require.main === module) {
  testarEditorReal()
    .then(resultados => {
      const exitCode = resultados.falhas.length > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Erro fatal:', error);
      process.exit(1);
    });
}

module.exports = { testarEditorReal };
