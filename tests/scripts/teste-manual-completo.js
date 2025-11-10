/**
 * TESTE MANUAL COMPLETO - Simulação de Usuário
 *
 * Abre o navegador e fornece instruções detalhadas para testar
 * TODAS as funcionalidades possíveis do editor.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const testJSON = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'fixtures', 'test-post.json'),
    'utf-8'
  )
);

console.log('\n');
console.log('═══════════════════════════════════════════════════════════════');
console.log('🧪 TESTE COMPLETO DO EDITOR - SIMULAÇÃO DE USUÁRIO');
console.log('═══════════════════════════════════════════════════════════════');
console.log('\n');

// Abrir navegador
const platform = os.platform();
if (platform === 'win32') {
  spawn('chrome.exe', ['http://localhost:3000/dashboard?mode=new'], {
    detached: true,
    stdio: 'ignore',
  });
  console.log('✅ Navegador aberto!\n');
} else if (platform === 'darwin') {
  spawn('open', [
    '-a',
    'Google Chrome',
    'http://localhost:3000/dashboard?mode=new',
  ]);
  console.log('✅ Navegador aberto!\n');
} else {
  spawn('google-chrome', ['http://localhost:3000/dashboard?mode=new'], {
    detached: true,
    stdio: 'ignore',
  });
  console.log('✅ Navegador aberto!\n');
}

console.log('📍 URL: http://localhost:3000/dashboard?mode=new\n');
console.log('⏳ Aguarde o editor carregar...\n');
console.log(
  '═══════════════════════════════════════════════════════════════\n'
);

console.log('📋 TESTE 1: VERIFICAR MODO INICIAL\n');
console.log('   1. Verifique se o botão "Visual" está destacado/ativo');
console.log('   2. O editor deve estar em modo visual (não textarea)\n');

console.log('📋 TESTE 2: MUDAR PARA MODO JSON\n');
console.log('   1. Clique no botão "JSON" no topo do editor');
console.log('   2. ✅ VERIFIQUE: Deve aparecer um textarea grande');
console.log(
  '   3. ✅ VERIFIQUE: O textarea deve estar vazio ou com JSON básico\n'
);

console.log('📋 TESTE 3: COLAR JSON COMPLETO\n');
console.log('   1. Clique dentro do textarea do modo JSON');
console.log('   2. Selecione todo o conteúdo (Ctrl+A ou Cmd+A)');
console.log('   3. Delete o conteúdo');
console.log('   4. Cole este JSON completo:\n');
console.log(JSON.stringify(testJSON, null, 2));
console.log('\n');
console.log('   5. ✅ VERIFIQUE: O JSON deve aparecer formatado no textarea');
console.log('   6. ✅ VERIFIQUE: Deve conter "A Revolução Tecnológica"\n');

console.log('📋 TESTE 4: VOLTAR PARA VISUAL\n');
console.log('   1. Clique no botão "Visual"');
console.log('   2. Aguarde 1-2 segundos para renderizar');
console.log(
  '   3. ✅ VERIFIQUE: Deve aparecer o título "A Revolução Tecnológica..."'
);
console.log('   4. ✅ VERIFIQUE: Deve aparecer o parágrafo sobre tecnologia');
console.log('   5. ✅ VERIFIQUE: Deve aparecer uma imagem');
console.log('   6. ✅ VERIFIQUE: Deve aparecer a citação entre aspas');
console.log(
  '   7. ✅ VERIFIQUE: Deve aparecer o texto "Este artigo explora..."\n'
);

console.log('📋 TESTE 5: ALTERNAR NOVAMENTE PARA JSON\n');
console.log('   1. Clique no botão "JSON" novamente');
console.log('   2. ✅ VERIFIQUE: O JSON completo deve estar no textarea');
console.log('   3. ✅ VERIFIQUE: Deve conter todos os nós originais');
console.log(
  '   4. ✅ VERIFIQUE: Deve começar com {"type":"doc","content":[...]}\n'
);

console.log('📋 TESTE 6: EDITAR JSON (MUDAR TÍTULO)\n');
console.log(
  '   1. No textarea JSON, localize o texto "A Revolução Tecnológica"'
);
console.log('   2. Substitua "Revolução" por "Evolução"');
console.log('   3. Ou seja, mude para: "A Evolução Tecnológica..."');
console.log('   4. ✅ VERIFIQUE: A edição deve aparecer no textarea\n');

console.log('📋 TESTE 7: APLICAR EDIÇÃO NO VISUAL\n');
console.log('   1. Clique no botão "Visual"');
console.log('   2. Aguarde renderizar');
console.log(
  '   3. ✅ VERIFIQUE: O título deve mostrar "A Evolução Tecnológica..."'
);
console.log('   4. ✅ VERIFIQUE: A mudança deve estar aplicada\n');

console.log('📋 TESTE 8: EDITAR NO MODO VISUAL\n');
console.log('   1. Ainda no modo Visual, clique no final do último parágrafo');
console.log('   2. Pressione Enter para criar um novo parágrafo');
console.log(
  '   3. Digite: "Este é um parágrafo adicionado pelo teste manual."'
);
console.log('   4. ✅ VERIFIQUE: O texto deve aparecer no editor\n');

console.log('📋 TESTE 9: VERIFICAR SE MUDANÇAS APARECEM NO JSON\n');
console.log('   1. Clique no botão "JSON"');
console.log('   2. Aguarde o JSON atualizar');
console.log('   3. ✅ VERIFIQUE: Deve conter o texto "teste manual"');
console.log('   4. ✅ VERIFIQUE: O novo parágrafo deve estar no JSON\n');

console.log('📋 TESTE 10: APAGAR TODO O CONTEÚDO\n');
console.log('   1. No modo JSON, selecione todo o conteúdo (Ctrl+A)');
console.log('   2. Delete tudo');
console.log('   3. Digite: {"type":"doc","content":[]}');
console.log('   4. ✅ VERIFIQUE: O textarea deve conter apenas o JSON vazio\n');

console.log('📋 TESTE 11: VERIFICAR SE EDITOR ESTÁ VAZIO\n');
console.log('   1. Clique no botão "Visual"');
console.log(
  '   2. ✅ VERIFIQUE: O editor deve estar vazio ou mostrar placeholder'
);
console.log('   3. ✅ VERIFIQUE: Não deve conter o conteúdo anterior\n');

console.log('📋 TESTE 12: RESTAURAR CONTEÚDO E TESTAR PERSISTÊNCIA\n');
console.log('   1. Volte para o modo JSON');
console.log('   2. Cole o JSON completo novamente (do TESTE 3)');
console.log('   3. Volte para Visual e aguarde renderizar');
console.log(
  '   4. Aguarde 2-3 segundos (para garantir que salvou no localStorage)'
);
console.log('   5. RECARREGUE A PÁGINA (F5 ou Ctrl+R)');
console.log(
  '   6. ✅ VERIFIQUE: O conteúdo deve estar restaurado após recarregar'
);
console.log(
  '   7. ✅ VERIFIQUE: O modo (Visual/JSON) deve ser o mesmo que estava antes\n'
);

console.log('📋 TESTE 13: ALTERNAR MÚLTIPLAS VEZES (STRESS TEST)\n');
console.log('   1. Clique rapidamente entre "Visual" e "JSON" 5 vezes');
console.log('   2. Finalize no modo "Visual"');
console.log('   3. ✅ VERIFIQUE: O conteúdo deve estar preservado');
console.log('   4. ✅ VERIFIQUE: Não deve haver erros no console (F12)\n');

console.log('📋 TESTE 14: VERIFICAR LOCALSTORAGE\n');
console.log('   1. Abra o Console do navegador (F12)');
console.log(
  '   2. Vá para a aba "Application" (Chrome) ou "Storage" (Firefox)'
);
console.log('   3. Expanda "Local Storage" → "http://localhost:3000"');
console.log('   4. ✅ VERIFIQUE: Deve haver estas chaves:');
console.log('      - editor-new-post-content');
console.log('      - editor-new-post-json');
console.log('      - editor-new-post-viewMode');
console.log('   5. ✅ VERIFIQUE: O conteúdo deve estar salvo em formato JSON');
console.log('   6. ✅ VERIFIQUE: viewMode deve ser "visual" ou "json"\n');

console.log('📋 TESTE 15: EDITAR APÓS RECARREGAR\n');
console.log('   1. Ainda na página recarregada, edite algo no Visual');
console.log('   2. Mude para JSON e verifique se as mudanças aparecem');
console.log('   3. Edite algo no JSON');
console.log('   4. Mude para Visual e verifique se a edição foi aplicada');
console.log(
  '   5. ✅ VERIFIQUE: Tudo deve funcionar normalmente após recarregar\n'
);

console.log('📋 TESTE 16: TESTAR COM NODOS NÃO SUPORTADOS\n');
console.log('   1. No modo JSON, localize o JSON completo');
console.log('   2. Se houver nós como "callout", "video", "accordion"');
console.log('   3. ✅ VERIFIQUE: No console (F12) pode aparecer um warning');
console.log('      "[Editor] Alguns nós foram removidos: X → Y"');
console.log(
  '   4. ✅ VERIFIQUE: Isso é NORMAL - esses nós não são suportados pelo Tiptap'
);
console.log(
  '   5. ✅ VERIFIQUE: Mas o JSON completo deve estar preservado no localStorage'
);
console.log(
  '   6. Volte para JSON e verifique: o JSON completo deve estar lá\n'
);

console.log(
  '═══════════════════════════════════════════════════════════════\n'
);
console.log('✅ CHECKLIST DE VERIFICAÇÕES:\n');
console.log('   [ ] JSON é colado corretamente');
console.log('   [ ] Conteúdo aparece no modo Visual');
console.log('   [ ] JSON é preservado ao alternar modos');
console.log('   [ ] Edições no JSON são aplicadas no Visual');
console.log('   [ ] Edições no Visual aparecem no JSON');
console.log('   [ ] Conteúdo é apagado corretamente');
console.log('   [ ] Conteúdo persiste após recarregar página');
console.log('   [ ] Modo (Visual/JSON) persiste após recarregar');
console.log('   [ ] Múltiplas alternâncias não perdem conteúdo');
console.log('   [ ] localStorage contém todas as chaves necessárias');
console.log('   [ ] Não há erros no console do navegador');
console.log(
  '\n═══════════════════════════════════════════════════════════════\n'
);
console.log('📊 REPORTE:\n');
console.log('   - ✅ Funcionalidades que funcionaram perfeitamente');
console.log('   - ❌ Funcionalidades que apresentaram problemas');
console.log('   - ⚠️  Comportamentos inesperados ou confusos');
console.log('   - 💡 Sugestões de melhoria');
console.log(
  '\n═══════════════════════════════════════════════════════════════\n'
);
console.log('✅ TESTE COMPLETO - SIGA TODOS OS PASSOS ACIMA\n');
console.log(
  '🔍 IMPORTANTE: Abra o Console (F12) para verificar logs e erros\n'
);
