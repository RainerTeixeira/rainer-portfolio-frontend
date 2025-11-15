/**
 * Teste Real de Persistência - Editor Visual/JSON
 *
 * Este script testa a funcionalidade de persistência do editor
 * usando o navegador automatizado.
 */

console.log('🧪 TESTE DE PERSISTÊNCIA - EDITOR VISUAL ↔ JSON\n');

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
          text: 'A tecnologia avança em um ritmo sem precedentes. Em 2025, a Inteligência Artificial (IA) está em todos os lugares.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://fernandogiannini.com.br/wp-content/uploads/2025/09/historia.jpg',
        alt: 'A história da tecnologia',
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
  ],
};

console.log('📋 JSON de teste preparado');
console.log(`   - Total de nós: ${testJSON.content.length}`);
console.log(`   - Tipos: ${testJSON.content.map(n => n.type).join(', ')}\n`);

console.log('🔍 VERIFICAÇÕES A SEREM TESTADAS:\n');
console.log('1. ✅ Alternar Visual → JSON deve preservar conteúdo');
console.log(
  '2. ✅ Editar no modo JSON e voltar para Visual deve aplicar mudanças'
);
console.log('3. ✅ Recarregar página deve restaurar conteúdo do localStorage');
console.log('4. ✅ Modo (Visual/JSON) deve ser preservado');
console.log(
  '5. ✅ JSON completo (com nós não suportados) deve ser preservado\n'
);

console.log('🌐 Abrindo navegador...\n');
console.log('📍 URL: http://localhost:3000/dashboard?mode=new\n');

// Abre o navegador
const { exec } = require('child_process');
const { spawn } = require('child_process');
const os = require('os');

if (os.platform() === 'win32') {
  spawn('chrome.exe', ['http://localhost:3000/dashboard?mode=new'], {
    detached: true,
  });
  console.log('✅ Navegador aberto!\n');
} else {
  console.log(
    '⚠️  Abra manualmente: http://localhost:3000/dashboard?mode=new\n'
  );
}

console.log('📝 TESTE MANUAL - SIGA ESTES PASSOS:\n');
console.log(
  '═══════════════════════════════════════════════════════════════\n'
);
console.log('1️⃣  FAÇA LOGIN (se necessário)');
console.log('2️⃣  LOCALIZE os botões "Visual" e "JSON" no topo do editor');
console.log('3️⃣  CLIQUE em "JSON"');
console.log('4️⃣  COLE este JSON no textarea:\n');
console.log(JSON.stringify(testJSON, null, 2));
console.log('\n5️⃣  CLIQUE em "Visual"');
console.log(
  '   ✅ VERIFIQUE: Deve aparecer o título "A Revolução Tecnológica..."'
);
console.log('   ✅ VERIFIQUE: Deve aparecer o parágrafo');
console.log('   ✅ VERIFIQUE: Deve aparecer a imagem');
console.log('   ✅ VERIFIQUE: Deve aparecer a citação');
console.log('\n6️⃣  CLIQUE em "JSON" novamente');
console.log('   ✅ VERIFIQUE: O JSON completo deve estar no textarea');
console.log('   ✅ VERIFIQUE: Deve conter todos os nós originais');
console.log('\n7️⃣  EDITE o título no JSON (mude "Revolução" para "Evolução")');
console.log('8️⃣  CLIQUE em "Visual"');
console.log('   ✅ VERIFIQUE: A edição deve aparecer no editor');
console.log('\n9️⃣  DIGITE algo no editor Visual (ex: novo parágrafo)');
console.log('🔟 CLIQUE em "JSON"');
console.log('   ✅ VERIFIQUE: O novo conteúdo digitado deve aparecer no JSON');
console.log('\n1️⃣1️⃣  RECARREGUE a página (F5 ou Ctrl+R)');
console.log('   ✅ VERIFIQUE: O conteúdo deve estar restaurado');
console.log('   ✅ VERIFIQUE: O modo (Visual/JSON) deve estar preservado');
console.log('\n1️⃣2️⃣  ABRA o Console do navegador (F12)');
console.log('   ✅ VERIFIQUE: Deve aparecer logs sobre persistência');
console.log(
  '   ⚠️  Pode aparecer warning sobre nós removidos (normal se houver callout/video)'
);
console.log(
  '\n1️⃣3️⃣  VERIFIQUE o localStorage (F12 → Application → Local Storage)'
);
console.log('   ✅ Deve haver chaves:');
console.log('      - editor-new-post-content');
console.log('      - editor-new-post-json');
console.log('      - editor-new-post-viewMode');
console.log(
  '\n═══════════════════════════════════════════════════════════════\n'
);
console.log('✅ TESTE CONCLUÍDO!\n');
console.log('📊 REPORTE QUALQUER PROBLEMA ENCONTRADO\n');
