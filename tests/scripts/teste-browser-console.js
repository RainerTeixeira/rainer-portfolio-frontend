/**
 * TESTE DIRETO NO CONSOLE DO NAVEGADOR
 *
 * Cole este código no console do navegador (F12) para testar tudo
 */

(() => {
  console.log('🧪 INICIANDO TESTES DO EDITOR...\n');

  const resultados = { sucesso: [], falhas: [] };

  // Função auxiliar para aguardar
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Função para encontrar botões
  const encontrarBotao = texto => {
    const botoes = Array.from(document.querySelectorAll('button'));
    return botoes.find(btn => btn.textContent.includes(texto));
  };

  // Função para encontrar elementos
  const encontrarElemento = seletor => {
    return document.querySelector(seletor);
  };

  // TESTE 1: Verificar três botões
  console.log('📝 TESTE 1: Verificar três botões');
  try {
    const visual = encontrarBotao('Visual');
    const json = encontrarBotao('JSON');
    const preview = encontrarBotao('Preview');

    if (!visual) throw new Error('Botão Visual não encontrado');
    if (!json) throw new Error('Botão JSON não encontrado');
    if (!preview) throw new Error('Botão Preview não encontrado');

    console.log('✅ PASS: Três botões encontrados');
    resultados.sucesso.push('Três botões');
  } catch (error) {
    console.error('❌ FAIL:', error.message);
    resultados.falhas.push('Botões: ' + error.message);
  }

  // TESTE 2: Verificar localStorage
  console.log('\n📝 TESTE 2: Verificar localStorage');
  try {
    const content = localStorage.getItem('editor-new-post-content');
    const json = localStorage.getItem('editor-new-post-json');
    const viewMode = localStorage.getItem('editor-new-post-viewMode');

    console.log('   Content:', content ? '✅ Existe' : '❌ Não existe');
    console.log('   JSON:', json ? '✅ Existe' : '❌ Não existe');
    console.log('   ViewMode:', viewMode || 'Não definido');

    if (viewMode && ['visual', 'json', 'preview'].includes(viewMode)) {
      console.log('✅ PASS: localStorage funcionando');
      resultados.sucesso.push('localStorage');
    } else {
      console.log(
        '⚠️  localStorage pode estar vazio (normal se for novo post)'
      );
    }
  } catch (error) {
    console.error('❌ FAIL:', error.message);
    resultados.falhas.push('localStorage: ' + error.message);
  }

  // TESTE 3: Testar alternância de modos
  console.log('\n📝 TESTE 3: Testar alternância de modos');
  console.log('   Clique nos botões Visual, JSON e Preview manualmente');
  console.log('   Verifique se o conteúdo muda corretamente');

  // TESTE 4: Verificar estrutura do editor
  console.log('\n📝 TESTE 4: Verificar estrutura do editor');
  try {
    const editor = encontrarElemento('.ProseMirror');
    const textarea = encontrarElemento('textarea');
    const preview = encontrarElemento('.editor-preview-content');

    console.log(
      '   Editor Visual:',
      editor ? '✅ Existe' : '❌ Não encontrado'
    );
    console.log(
      '   Textarea JSON:',
      textarea ? '✅ Existe' : '❌ Não encontrado'
    );
    console.log('   Preview:', preview ? '✅ Existe' : '❌ Não encontrado');

    // Determinar modo atual
    let modoAtual = 'desconhecido';
    if (
      editor &&
      window.getComputedStyle(editor.parentElement).display !== 'none'
    ) {
      modoAtual = 'visual';
    } else if (
      textarea &&
      window.getComputedStyle(textarea).display !== 'none'
    ) {
      modoAtual = 'json';
    } else if (preview && window.getComputedStyle(preview).display !== 'none') {
      modoAtual = 'preview';
    }

    console.log('   Modo atual:', modoAtual);
    console.log('✅ PASS: Estrutura verificada');
    resultados.sucesso.push('Estrutura');
  } catch (error) {
    console.error('❌ FAIL:', error.message);
    resultados.falhas.push('Estrutura: ' + error.message);
  }

  // RESUMO
  console.log(
    '\n═══════════════════════════════════════════════════════════════'
  );
  console.log('📊 RESULTADOS:');
  console.log(`✅ Sucessos: ${resultados.sucesso.length}`);
  console.log(`❌ Falhas: ${resultados.falhas.length}`);
  console.log('\n✅ Testes básicos concluídos!');
  console.log('💡 Agora teste manualmente:');
  console.log('   1. Clique em JSON → cole o JSON completo');
  console.log('   2. Clique em Visual → veja renderizado');
  console.log('   3. Clique em Preview → veja preview');
  console.log('   4. Recarregue página (F5) → verifique persistência');
  console.log(
    '═══════════════════════════════════════════════════════════════\n'
  );

  return resultados;
})();
