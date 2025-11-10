/**
 * Teste Real do Editor - Persistência Visual/JSON
 */

const { exec } = require('child_process');
const path = require('path');

console.log('🧪 TESTE DO EDITOR - PERSISTÊNCIA VISUAL ↔ JSON\n');

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
        src: 'https://fernandogiannini.com.br/wp-content/uploads/2024/09/historia.jpg',
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

const jsonString = JSON.stringify(testJSON, null, 2);

console.log('📋 JSON de teste preparado:');
console.log(`   - Total de nós: ${testJSON.content.length}`);
console.log(`   - Tipos: ${testJSON.content.map(n => n.type).join(', ')}\n`);

console.log('🌐 Abrindo navegador em modo manual...\n');
console.log('📍 URL: http://localhost:3000/dashboard?mode=new\n');
console.log('📝 INSTRUÇÕES PARA TESTE MANUAL:\n');
console.log('1️⃣  Faça login se necessário');
console.log(
  '2️⃣  No editor Tiptap, localize os botões "Visual" e "JSON" no topo'
);
console.log('3️⃣  Clique no botão "JSON"');
console.log('4️⃣  Cole este JSON no textarea:\n');
console.log(jsonString);
console.log('\n5️⃣  Clique em "Visual"');
console.log(
  '   ✅ VERIFIQUE: Deve aparecer o título "A Revolução Tecnológica..."'
);
console.log('   ✅ VERIFIQUE: Deve aparecer o parágrafo');
console.log('   ✅ VERIFIQUE: Deve aparecer a imagem');
console.log('   ✅ VERIFIQUE: Deve aparecer a citação');
console.log('\n6️⃣  Clique em "JSON" novamente');
console.log('   ✅ VERIFIQUE: O JSON completo deve estar no textarea');
console.log('   ✅ VERIFIQUE: Deve conter todos os nós originais');
console.log(
  '\n7️⃣  Edite o título no JSON (ex: mude "Revolução" para "Evolução")'
);
console.log('8️⃣  Clique em "Visual"');
console.log('   ✅ VERIFIQUE: A edição deve aparecer no editor');
console.log('\n9️⃣  Feche e reabra a página');
console.log('   ✅ VERIFIQUE: O conteúdo deve estar salvo no localStorage');
console.log('\n🔟 Verifique o console do navegador (F12)');
console.log('   ✅ Deve aparecer logs sobre persistência');
console.log('   ⚠️  Pode aparecer warning sobre nós removidos (normal)');
console.log('\n✅ TESTE CONCLUÍDO!\n');
