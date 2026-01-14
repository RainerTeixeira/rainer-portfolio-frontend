// Teste simples para verificar se o componente importa
try {
  const { CTASection } = require('./components/domain/home/cta-section.tsx');
  console.log('CTASection importado:', typeof CTASection);
  console.log('CTASection:', CTASection);
} catch (error) {
  console.error('Erro ao importar CTASection:', error);
}
