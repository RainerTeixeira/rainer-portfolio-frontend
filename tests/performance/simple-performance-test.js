/**
 * Simple Performance Test Runner
 *
 * Script simplificado para testar performance do sistema de busca
 * sem dependências externas.
 */

// Simulação das funções de busca (sem dependência de @rainersoft/utils)
function searchContent(query: string, content: any[]): any[] {
  if (!query.trim()) return content;
  
  return content.filter(item => {
    const searchQuery = query.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchQuery) ||
      item.description?.toLowerCase().includes(searchQuery) ||
      item.content?.toLowerCase().includes(searchQuery) ||
      item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery))
    );
  });
}

function searchWithScore(query: string, content: any[]): any[] {
  if (!query.trim()) return content;
  
  const searchQuery = query.toLowerCase();
  const scored = content.map(item => {
    let score = 0;
    
    if (item.title?.toLowerCase().includes(searchQuery)) score += 3;
    if (item.description?.toLowerCase().includes(searchQuery)) score += 2;
    if (item.content?.toLowerCase().includes(searchQuery)) score += 1;
    if (item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery))) score += 1;
    
    return { item, score };
  });
  
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

// Gerador de dados de teste
function generateTestData(size: number): any[] {
  const categories = ['Tecnologia', 'Design', 'Marketing', 'Negócios', 'Ciência', 'Arte'];
  const tags = ['javascript', 'react', 'nodejs', 'design', 'ui', 'ux', 'startup', 'inovação'];

  return Array.from({ length: size }, (_, index) => ({
    id: `item-${index}`,
    title: `Artigo ${index}: ${categories[index % categories.length]} Avançado`,
    description: `Descrição do artigo ${index} sobre ${categories[index % categories.length]}`,
    content: `Conteúdo completo do artigo ${index} incluindo ${categories[index % categories.length]}`,
    category: categories[index % categories.length],
    tags: [tags[index % tags.length], tags[(index + 1) % tags.length]]
  }));
}

// Teste de performance
function runPerformanceTest(dataset: any[], query: string, searchType: 'simple' | 'scored'): number {
  const startTime = performance.now();
  
  switch (searchType) {
    case 'simple':
      searchContent(query, dataset);
      break;
    case 'scored':
      searchWithScore(query, dataset);
      break;
  }
  
  const endTime = performance.now();
  return endTime - startTime;
}

// Executar testes
function runTests(): void {
  console.log('🚀 Teste de Performance - Sistema de Busca');
  console.log('=' .repeat(50));

  const datasetSizes = [100, 500, 1000, 5000, 10000];
  const queries = ['tecnologia', 'react', 'design', 'javascript'];
  const searchTypes: ('simple' | 'scored')[] = ['simple', 'scored'];

  const results: any[] = [];

  datasetSizes.forEach(size => {
    console.log(`\n📊 Dataset: ${size.toLocaleString()} itens`);
    const dataset = generateTestData(size);

    searchTypes.forEach(searchType => {
      const times: number[] = [];
      
      queries.forEach(query => {
        const time = runPerformanceTest(dataset, query, searchType);
        times.push(time);
      });

      const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);

      console.log(`  ${searchType.toUpperCase()}: ${avgTime.toFixed(2)}ms (min: ${minTime.toFixed(2)}ms, max: ${maxTime.toFixed(2)}ms)`);
      
      results.push({
        datasetSize: size,
        searchType,
        avgTime,
        minTime,
        maxTime
      });
    });
  });

  // Análise de escalabilidade
  console.log('\n📈 Análise de Escalabilidade');
  console.log('=' .repeat(50));

  const simple100 = results.find(r => r.datasetSize === 100 && r.searchType === 'simple')?.avgTime || 0;
  const simple10000 = results.find(r => r.datasetSize === 10000 && r.searchType === 'simple')?.avgTime || 0;
  const scored100 = results.find(r => r.datasetSize === 100 && r.searchType === 'scored')?.avgTime || 0;
  const scored10000 = results.find(r => r.datasetSize === 10000 && r.searchType === 'scored')?.avgTime || 0;

  const simpleRatio = simple10000 / simple100;
  const scoredRatio = scored10000 / scored100;

  console.log(`Simple Search: 100 → 10.000 itens = ${simpleRatio.toFixed(2)}x mais lento`);
  console.log(`Scored Search: 100 → 10.000 itens = ${scoredRatio.toFixed(2)}x mais lento`);

  // Recomendações
  console.log('\n💡 Recomendações');
  console.log('=' .repeat(50));
  
  if (simple10000 < 50) {
    console.log('✅ Simple search é eficiente para até 10.000 itens');
  } else {
    console.log('⚠️  Considerar cache para datasets > 5.000 itens');
  }

  if (scored10000 < 100) {
    console.log('✅ Scored search é aceitável para até 10.000 itens');
  } else {
    console.log('⚠️  Considerar paginação para scored search > 5.000 itens');
  }

  console.log('\n🎯 Para produção:');
  console.log('  • Use cache para buscas frequentes');
  console.log('  • Implemente limites de resultados (20-50)');
  console.log('  • Use debouncing para inputs (300ms)');
  console.log('  • Considere busca server-side > 20.000 itens');

  console.log('\n✅ Teste concluído!');
}

// Executar se estiver no browser
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).runSearchPerformanceTest = runTests;
  console.log('🌐 Execute runSearchPerformanceTest() no console para testar');
} else {
  // Node.js environment
  runTests();
}
