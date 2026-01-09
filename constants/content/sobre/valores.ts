/**
 * @fileoverview Valores e missão da Rainer Soft
 * @module constants/content/sobre/valores
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Missão, visão, valores e cultura corporativa
 * da Rainer Soft.
 */

/**
 * Cores para valores (usando tokens)
 */
const VALUES_COLORS = {
  primary: '#00bcd4',
  secondary: '#9c27b0',
  accent: '#e91e63',
  success: '#10b981',
} as const;

/**
 * Missão, Visão e Propósito
 * @constant
 */
export const PROPOSITO = {
  missao: {
    titulo: 'Nossa Missão',
    texto: 'Democratizar o acesso à tecnologia de ponta, transformando ideias em soluções digitais ' +
           'que impulsionam negócios e criam impacto positivo na sociedade.',
    icone: 'Target',
  },
  visao: {
    titulo: 'Nossa Visão',
    texto: 'Ser reconhecida globalmente como a software house mais inovadora e confiável, ' +
           'referência em transformação digital e excelência tecnológica até 2030.',
    icone: 'Eye',
  },
  proposito: {
    titulo: 'Nosso Propósito',
    texto: 'Empoderar empresas com tecnologia que transforma, conecta e inspira, ' +
           'criando um futuro digital mais eficiente, seguro e acessível para todos.',
    icone: 'Heart',
  },
} as const;

/**
 * Valores corporativos da Rainer Soft
 * @constant
 */
export const VALORES = [
  {
    titulo: 'Inovação Constante',
    descricao: 'Buscamos sempre as tecnologias mais avançadas e metodologias disruptivas ' +
               'para entregar soluções que superam expectativas.',
    icone: 'Lightbulb',
    cor: VALUES_COLORS.primary,
  },
  {
    titulo: 'Excelência Técnica',
    descricao: 'Código limpo, arquitetura escalável e performance excepcional são ' +
               'padrões inegociáveis em todos os nossos projetos.',
    icone: 'Award',
    cor: VALUES_COLORS.secondary,
  },
  {
    titulo: 'Transparência Total',
    descricao: 'Comunicação clara, processos abertos e honestidade em todas as ' +
               'interações com clientes, parceiros e colaboradores.',
    icone: 'Eye',
    cor: VALUES_COLORS.accent,
  },
  {
    titulo: 'Foco no Cliente',
    descricao: 'O sucesso do cliente é nosso sucesso. Cada decisão é tomada ' +
               'pensando no impacto positivo para o negócio do cliente.',
    icone: 'Users',
    cor: VALUES_COLORS.success,
  },
  {
    titulo: 'Agilidade',
    descricao: 'Entregas rápidas e incrementais, adaptação constante e resposta ' +
               'imediata às mudanças do mercado e necessidades dos clientes.',
    icone: 'Zap',
    cor: VALUES_COLORS.primary,
  },
  {
    titulo: 'Sustentabilidade',
    descricao: 'Desenvolvemos soluções eco-eficientes, promovemos diversidade e ' +
               'contribuímos para os Objetivos de Desenvolvimento Sustentável da ONU.',
    icone: 'Leaf',
    cor: VALUES_COLORS.secondary,
  },
] as const;

/**
 * Cultura organizacional
 * @constant
 */
export const CULTURA = {
  titulo: 'Nossa Cultura',
  subtitulo: 'Um ambiente que inspira inovação e crescimento',
  aspectos: [
    {
      titulo: 'Work-Life Balance',
      descricao: 'Horário flexível, trabalho remoto e respeito ao tempo pessoal.',
      icone: 'Clock',
    },
    {
      titulo: 'Aprendizado Contínuo',
      descricao: 'Investimento em capacitação, certificações e participação em eventos.',
      icone: 'BookOpen',
    },
    {
      titulo: 'Diversidade & Inclusão',
      descricao: 'Time diverso com 40% de mulheres em posições de liderança.',
      icone: 'Users',
    },
    {
      titulo: 'Inovação Premiada',
      descricao: 'Hackathons internos, tempo para projetos pessoais e ideias incentivadas.',
      icone: 'Trophy',
    },
  ],
} as const;

/**
 * Compromissos com stakeholders
 * @constant
 */
export const COMPROMISSOS = {
  clientes: [
    'Entrega no prazo em 100% dos projetos',
    'Suporte 24/7 com SLA garantido',
    'Transparência total no desenvolvimento',
    'ROI mensurável e documentado',
  ],
  colaboradores: [
    'Ambiente seguro e inclusivo',
    'Crescimento profissional acelerado',
    'Remuneração acima do mercado',
    'Benefícios completos e flexíveis',
  ],
  sociedade: [
    'Projetos open source mensais',
    'Mentoria gratuita para iniciantes',
    '1% do faturamento para causas sociais',
    'Neutralidade de carbono até 2026',
  ],
  parceiros: [
    'Relações win-win duradouras',
    'Compartilhamento de conhecimento',
    'Ética e compliance rigorosos',
    'Crescimento mútuo sustentável',
  ],
} as const;

/**
 * Manifesto da Rainer Soft
 * @constant
 */
export const MANIFESTO = {
  titulo: 'Nosso Manifesto',
  itens: [
    'Acreditamos que tecnologia deve simplificar, não complicar',
    'Código é poesia - deve ser elegante, eficiente e compreensível',
    'O impossível é apenas uma questão de tempo e criatividade',
    'Cada linha de código é uma oportunidade de fazer a diferença',
    'Sucesso compartilhado é o único sucesso verdadeiro',
    'Inovação sem propósito é apenas entretenimento',
    'A melhor solução é aquela que o cliente nem percebe que existe',
    'Errar rápido, aprender mais rápido, evoluir sempre',
  ],
} as const;
