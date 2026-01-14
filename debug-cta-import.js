// Teste para depurar o import do CTASection
console.log('Iniciando debug do CTASection...');

try {
  // Verificar se o arquivo existe
  const fs = require('fs');
  const path = './components/domain/home/cta-section.tsx';
  
  if (fs.existsSync(path)) {
    console.log('✅ Arquivo CTASection existe');
  } else {
    console.log('❌ Arquivo CTASection não encontrado');
  }
  
  // Tentar importar o módulo
  console.log('Tentando importar CTASection...');
  const ctaModule = require('./components/domain/home/cta-section.tsx');
  console.log('Módulo importado:', Object.keys(ctaModule));
  
  // Verificar se CTASection existe
  if (ctaSection.CTASection) {
    console.log('✅ CTASection encontrado, tipo:', typeof ctaSection.CTASection);
  } else {
    console.log('❌ CTASection não encontrado no módulo');
    console.log('Exports disponíveis:', Object.keys(ctaModule));
  }
  
} catch (error) {
  console.error('❌ Erro ao importar CTASection:', error.message);
  console.error('Stack:', error.stack);
}
