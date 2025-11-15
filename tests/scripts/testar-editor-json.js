/**
 * Script de Teste - Editor JSON Persistence
 *
 * Testa se o conteúdo persiste ao alternar entre Visual e JSON
 */

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
        src: 'https://fernandogiannini.com.br/wp-content/uploads/2025/09/historia.jpg',
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
  ],
};

console.log('✅ JSON de teste carregado:');
console.log('- Total de nós:', testJSON.content.length);
console.log(
  '- Tipos encontrados:',
  testJSON.content.map(n => n.type).join(', ')
);
console.log('\n📋 INSTRUÇÕES PARA TESTE MANUAL:');
console.log(
  '\n1. Abra o navegador em: http://localhost:3000/dashboard?mode=new'
);
console.log('2. Faça login se necessário');
console.log('3. No editor Tiptap, clique no botão "JSON" (modo JSON)');
console.log('4. Cole o seguinte JSON no textarea:');
console.log('\n' + JSON.stringify(testJSON, null, 2));
console.log('\n5. Clique no botão "Visual" para voltar ao modo visual');
console.log(
  '6. VERIFIQUE: O conteúdo deve aparecer no editor (título, parágrafo, imagem, citação)'
);
console.log('7. Clique em "JSON" novamente');
console.log('8. VERIFIQUE: O JSON completo deve estar no textarea');
console.log('9. Edite algo no JSON e volte para Visual');
console.log('10. VERIFIQUE: As alterações devem aparecer no editor');
console.log('\n⚠️  NÓS NÃO SUPORTADOS (serão ignorados na visualização):');
console.log('   - callout');
console.log('   - video');
console.log('   - accordion');
console.log(
  '\n✅ Esses nós serão ignorados pelo Tiptap, mas o JSON original será preservado!'
);
