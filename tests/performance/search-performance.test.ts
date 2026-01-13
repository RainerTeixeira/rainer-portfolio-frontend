/**
 * Performance Test for Global Search
 *
 * Teste de performance para validar o sistema de busca com grandes volumes de dados.
 * Testa diferentes cenários e tipos de busca.
 *
 * @module tests/performance/search-performance
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { performance } from 'perf_hooks';
import { searchContent, searchWithScore, fuzzySearch, type SearchOptions } from '@rainersoft/utils';

// Tipos para teste
interface TestItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
}

interface PerformanceResult {
  datasetSize: number;
  searchType: string;
  query: string;
  executionTime: number;
  resultsCount: number;
  memoryUsage?: number;
  cacheHit?: boolean;
}

// Gerador de dados de teste
function generateTestData(size: number): TestItem[] {
  const categories = ['Tecnologia', 'Design', 'Marketing', 'Negócios', 'Ciência', 'Arte', 'Esportes', 'Música'];
  const authors = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Ferreira', 'Luiza Pereira'];
  const tags = ['javascript', 'react', 'nodejs', 'design', 'ui', 'ux', 'startup', 'inovação', 'tecnologia', 'web'];

  return Array.from({ length: size }, (_, index) => ({
    id: `item-${index}`,
    title: `Artigo ${index}: ${categories[index % categories.length]} Avançado`,
    description: `Descrição detalhada do artigo ${index} sobre ${categories[index % categories.length]} com conceitos modernos e práticas recomendadas.`,
    content: `Conteúdo completo do artigo ${index} incluindo explicações detalhadas, exemplos práticos, estudos de caso e referências bibliográficas sobre ${categories[index % categories.length]} e suas aplicações no mundo real.`,
    category: categories[index % categories.length],
    author: authors[index % authors.length],
    tags: [
      tags[index % tags.length],
      tags[(index + 1) % tags.length],
      tags[(index + 2) % tags.length]
    ],
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }));
}

// Função de teste de performance
async function runPerformanceTest(
  dataset: TestItem[],
  query: string,
  searchType: 'simple' | 'scored' | 'fuzzy',
  options?: SearchOptions
): Promise<PerformanceResult> {
  const startTime = performance.now();
  let results: TestItem[] = [];

  switch (searchType) {
    case 'simple':
      results = searchContent(query, dataset, options);
      break;
    case 'scored':
      results = searchWithScore(query, dataset, options);
      break;
    case 'fuzzy':
      results = fuzzySearch(query, dataset, { ...options, threshold: 0.6 });
      break;
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return {
    datasetSize: dataset.length,
    searchType,
    query,
    executionTime,
    resultsCount: results.length,
    memoryUsage: process.memoryUsage().heapUsed
  };
}

// Testes de performance
class SearchPerformanceTester {
  private results: PerformanceResult[] = [];

  async runAllTests(): Promise<void> {
    console.log('🚀 Iniciando testes de performance do sistema de busca...\n');

    // Testar diferentes tamanhos de dataset
    const datasetSizes = [100, 500, 1000, 5000, 10000];
    const queries = [
      'tecnologia',
      'react',
      'design',
      'javascript',
      'nodejs',
      'inovação',
      'startup',
      'web'
    ];
    const searchTypes: ('simple' | 'scored' | 'fuzzy')[] = ['simple', 'scored', 'fuzzy'];

    for (const size of datasetSizes) {
      console.log(`📊 Testando com ${size.toLocaleString()} itens...`);
      const dataset = generateTestData(size);

      for (const searchType of searchTypes) {
        console.log(`  🔍 ${searchType.toUpperCase()} search...`);

        for (const query of queries) {
          const result = await runPerformanceTest(dataset, query, searchType, {
            fields: ['title', 'description', 'content', 'tags'],
            caseSensitive: false,
            exactMatch: false
          });

          this.results.push(result);
          
          // Log do resultado
          console.log(`    "${query}": ${result.executionTime.toFixed(2)}ms (${result.resultsCount} resultados)`);
        }
      }
      console.log('');
    }

    this.generateReport();
  }

  private generateReport(): void {
    console.log('📈 RELATÓRIO DE PERFORMANCE\n');
    console.log('=' .repeat(80));

    // Agrupar resultados por tamanho de dataset
    const groupedResults = this.results.reduce((acc, result) => {
      const key = result.datasetSize;
      if (!acc[key]) acc[key] = [];
      acc[key].push(result);
      return acc;
    }, {} as Record<number, PerformanceResult[]>);

    // Gerar relatório por tamanho
    Object.entries(groupedResults).forEach(([size, results]) => {
      console.log(`\n📊 Dataset: ${parseInt(size).toLocaleString()} itens`);
      console.log('-'.repeat(50));

      // Agrupar por tipo de busca
      const byType = results.reduce((acc, result) => {
        if (!acc[result.searchType]) acc[result.searchType] = [];
        acc[result.searchType].push(result);
        return acc;
      }, {} as Record<string, PerformanceResult[]>);

      Object.entries(byType).forEach(([searchType, typeResults]) => {
        const avgTime = typeResults.reduce((sum, r) => sum + r.executionTime, 0) / typeResults.length;
        const minTime = Math.min(...typeResults.map(r => r.executionTime));
        const maxTime = Math.max(...typeResults.map(r => r.executionTime));
        const avgResults = typeResults.reduce((sum, r) => sum + r.resultsCount, 0) / typeResults.length;

        console.log(`  ${searchType.toUpperCase()}:`);
        console.log(`    Tempo médio: ${avgTime.toFixed(2)}ms`);
        console.log(`    Tempo mínimo: ${minTime.toFixed(2)}ms`);
        console.log(`    Tempo máximo: ${maxTime.toFixed(2)}ms`);
        console.log(`    Resultados médios: ${avgResults.toFixed(0)}`);
      });
    });

    // Análise de escalabilidade
    console.log('\n📈 ANÁLISE DE ESCALABILIDADE');
    console.log('=' .repeat(50));

    const scalabilityData = this.analyzeScalability();
    scalabilityData.forEach(data => {
      console.log(`${data.searchType.toUpperCase()}:`);
      console.log(`  100 → 10.000: ${data.ratio.toFixed(2)}x mais lento`);
      console.log(`  Taxa de crescimento: ${data.growthRate.toFixed(2)}x por 1000 itens`);
    });

    // Recomendações
    console.log('\n💡 RECOMENDAÇÕES');
    console.log('=' .repeat(50));
    this.generateRecommendations();
  }

  private analyzeScalability() {
    const searchTypes = ['simple', 'scored', 'fuzzy'] as const;
    
    return searchTypes.map(searchType => {
      const smallResults = this.results.filter(r => r.datasetSize === 100 && r.searchType === searchType);
      const largeResults = this.results.filter(r => r.datasetSize === 10000 && r.searchType === searchType);

      const avgSmallTime = smallResults.reduce((sum, r) => sum + r.executionTime, 0) / smallResults.length;
      const avgLargeTime = largeResults.reduce((sum, r) => sum + r.executionTime, 0) / largeResults.length;

      const ratio = avgLargeTime / avgSmallTime;
      const growthRate = (ratio - 1) / 99; // (10.000 - 100) / 100 = 99

      return {
        searchType,
        ratio,
        growthRate
      };
    });
  }

  private generateRecommendations(): void {
    const simpleAvg = this.getAverageTime('simple', 10000);
    const scoredAvg = this.getAverageTime('scored', 10000);
    const fuzzyAvg = this.getAverageTime('fuzzy', 10000);

    console.log(`🎯 Para datasets de até 1.000 itens:`);
    console.log(`   ✅ Use 'simple' para buscas rápidas (${this.getAverageTime('simple', 1000).toFixed(2)}ms médio)`);
    console.log(`   ✅ Use 'scored' para relevância (${this.getAverageTime('scored', 1000).toFixed(2)}ms médio)`);
    console.log(`   ⚠️  Use 'fuzzy' apenas se necessário (${this.getAverageTime('fuzzy', 1000).toFixed(2)}ms médio)`);

    console.log(`\n🎯 Para datasets de 1.000-10.000 itens:`);
    console.log(`   ✅ 'simple' é mais eficiente (${simpleAvg.toFixed(2)}ms médio)`);
    console.log(`   ⚠️  'scored' é aceitável (${scoredAvg.toFixed(2)}ms médio)`);
    console.log(`   ❌ Evite 'fuzzy' para tempo real (${fuzzyAvg.toFixed(2)}ms médio)`);

    console.log(`\n🎯 Para datasets > 10.000 itens:`);
    console.log(`   ✅ Implemente cache obrigatório`);
    console.log(`   ✅ Use 'simple' com limites restritos`);
    console.log(`   ✅ Considere busca server-side`);
    console.log(`   ✅ Implemente paginação de resultados`);

    console.log(`\n🎯 Otimizações recomendadas:`);
    console.log(`   📦 Cache: 5-15 minutos para buscas frequentes`);
    console.log(`   🔍 Limites: 20-50 resultados por página`);
    console.log(`   📝 Campos: Especifique apenas campos necessários`);
    console.log(`   ⚡ Debounce: 300-500ms para inputs`);
    console.log(`   🗄️  Indexação: Para datasets > 50.000 itens`);
  }

  private getAverageTime(searchType: string, datasetSize: number): number {
    const results = this.results.filter(r => r.searchType === searchType && r.datasetSize === datasetSize);
    return results.reduce((sum, r) => sum + r.executionTime, 0) / results.length;
  }
}

// Teste de cache
class CachePerformanceTest {
  private cache = new Map<string, { results: TestItem[]; timestamp: number }>();
  private cacheTime = 5 * 60 * 1000; // 5 minutos

  async testCachePerformance(): Promise<void> {
    console.log('\n🗄️  TESTE DE PERFORMANCE DE CACHE');
    console.log('=' .repeat(50));

    const dataset = generateTestData(5000);
    const query = 'tecnologia';
    const iterations = 100;

    // Teste sem cache
    console.log('🔍 Testando SEM cache...');
    const startTimeNoCache = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      searchContent(query, dataset);
    }
    
    const endTimeNoCache = performance.now();
    const noCacheTime = endTimeNoCache - startTimeNoCache;

    // Teste com cache
    console.log('🗄️  Testando COM cache...');
    const startTimeWithCache = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      this.getCachedResult(query, dataset);
    }
    
    const endTimeWithCache = performance.now();
    const withCacheTime = endTimeWithCache - startTimeWithCache;

    // Resultados
    console.log(`\n📊 Resultados (${iterations} buscas):`);
    console.log(`  Sem cache: ${noCacheTime.toFixed(2)}ms total (${(noCacheTime / iterations).toFixed(2)}ms média)`);
    console.log(`  Com cache: ${withCacheTime.toFixed(2)}ms total (${(withCacheTime / iterations).toFixed(2)}ms média)`);
    console.log(`  Melhoria: ${(noCacheTime / withCacheTime).toFixed(2)}x mais rápido`);
    console.log(`  Economia: ${(noCacheTime - withCacheTime).toFixed(2)}ms (${((noCacheTime - withCacheTime) / noCacheTime * 100).toFixed(1)}%)`);
  }

  private getCachedResult(query: string, dataset: TestItem[]): TestItem[] {
    const cached = this.cache.get(query);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTime) {
      return cached.results;
    }

    const results = searchContent(query, dataset);
    this.cache.set(query, {
      results,
      timestamp: Date.now()
    });

    return results;
  }
}

// Teste de memória
class MemoryUsageTest {
  async testMemoryUsage(): Promise<void> {
    console.log('\n💾 TESTE DE USO DE MEMÓRIA');
    console.log('=' .repeat(50));

    const initialMemory = process.memoryUsage();
    console.log(`Memória inicial: ${(initialMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`);

    // Testar diferentes tamanhos
    const sizes = [1000, 5000, 10000, 20000];
    
    for (const size of sizes) {
      // Limpar garbage collection se disponível
      if (global.gc) global.gc();

      const beforeMemory = process.memoryUsage();
      
      // Criar dataset e executar buscas
      const dataset = generateTestData(size);
      searchContent('test', dataset);
      searchWithScore('test', dataset);
      fuzzySearch('test', dataset);
      
      const afterMemory = process.memoryUsage();
      const memoryIncrease = afterMemory.heapUsed - beforeMemory.heapUsed;
      
      console.log(`Dataset ${size.toLocaleString()}: +${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);
    }

    const finalMemory = process.memoryUsage();
    console.log(`Memória final: ${(finalMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Aumento total: +${((finalMemory.heapUsed - initialMemory.heapUsed) / 1024 / 1024).toFixed(2)} MB`);
  }
}

// Executar todos os testes
async function runAllPerformanceTests(): Promise<void> {
  console.log('🚀 INICIANDO SUITE DE TESTES DE PERFORMANCE');
  console.log('=' .repeat(80));
  console.log(`Node.js: ${process.version}`);
  console.log(`Plataforma: ${process.platform}`);
  console.log(`CPU: ${require('os').cpus().length} cores`);
  console.log(`Memória: ${(require('os').totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log('');

  try {
    // Teste principal
    const tester = new SearchPerformanceTester();
    await tester.runAllTests();

    // Teste de cache
    const cacheTest = new CachePerformanceTest();
    await cacheTest.testCachePerformance();

    // Teste de memória
    const memoryTest = new MemoryUsageTest();
    await memoryTest.testMemoryUsage();

    console.log('\n✅ Todos os testes concluídos com sucesso!');
    console.log('📊 Verifique os resultados acima para otimizações recomendadas.');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    process.exit(1);
  }
}

// Exportar para uso em outros arquivos
export {
  SearchPerformanceTester,
  CachePerformanceTest,
  MemoryUsageTest,
  generateTestData,
  runPerformanceTest,
  runAllPerformanceTests
};

// Executar se chamado diretamente
if (require.main === module) {
  runAllPerformanceTests();
}
