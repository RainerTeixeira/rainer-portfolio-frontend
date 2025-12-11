/**
 * @fileoverview Planos e pacotes de serviços
 * @module constants/content/home/planos
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Planos de serviços e modelos de contratação
 * oferecidos pela Rainer Soft.
 */

import { GRADIENTS } from '@rainersoft/design-tokens';

/**
 * Interface para plano de serviço
 * @interface
 */
export interface PlanoServico {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly preco: string;
  readonly periodo?: string;
  readonly ideal: string;
  readonly recursos: ReadonlyArray<string>;
  readonly destaque?: boolean;
  readonly badge?: string;
  readonly gradiente?: string;
  readonly cta: {
    readonly texto: string;
    readonly link: string;
  };
}

/**
 * Planos de serviços da Rainer Soft
 * @constant
 * @description Modelos de contratação disponíveis
 */
export const PLANOS: ReadonlyArray<PlanoServico> = [
  {
    id: 'mvp-express',
    nome: 'MVP Express',
    descricao: 'Desenvolvimento rápido de MVP para validação de mercado',
    preco: 'R$ 25.000',
    periodo: '30-45 dias',
    ideal: 'Startups e empreendedores',
    recursos: [
      'Prototipagem rápida',
      'Frontend responsivo',
      'Backend essencial',
      'Deploy na nuvem',
      'Documentação básica',
      '30 dias de suporte',
      '2 revisões inclusas',
      'Código-fonte completo',
    ],
    cta: {
      texto: 'Iniciar MVP',
      link: '#contato',
    },
  },
  {
    id: 'growth',
    nome: 'Growth',
    descricao: 'Solução completa para empresas em crescimento',
    preco: 'R$ 45.000',
    periodo: '2-3 meses',
    ideal: 'Scale-ups e PMEs',
    destaque: true,
    badge: 'Mais Popular',
    gradiente: GRADIENTS.TEXT_PRIMARY,
    recursos: [
      'Sistema completo personalizado',
      'Dashboard administrativo',
      'Integração com APIs',
      'Autenticação avançada',
      'Testes automatizados',
      'CI/CD configurado',
      '90 dias de garantia',
      'Treinamento da equipe',
      'Documentação completa',
      'Suporte prioritário',
    ],
    cta: {
      texto: 'Escolher Growth',
      link: '#contato',
    },
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    descricao: 'Transformação digital completa para grandes corporações',
    preco: 'Sob consulta',
    periodo: '3-12 meses',
    ideal: 'Grandes empresas',
    badge: 'Premium',
    recursos: [
      'Arquitetura enterprise',
      'Microserviços escaláveis',
      'Alta disponibilidade 99.9%',
      'Segurança ISO 27001',
      'Machine Learning/AI',
      'DevOps completo',
      'Migração de legado',
      'Integrações complexas',
      'SLA personalizado',
      'Suporte 24/7 dedicado',
      'Consultoria estratégica',
      'Time exclusivo',
    ],
    cta: {
      texto: 'Falar com Consultor',
      link: '#contato',
    },
  },
] as const;

/**
 * Modelos de contratação alternativos
 * @constant
 */
export const MODELOS_CONTRATACAO = [
  {
    nome: 'Time Dedicado',
    descricao: 'Alocação exclusiva de profissionais para seu projeto',
    valor: 'R$ 25.000/mês por profissional',
    beneficios: [
      'Flexibilidade total',
      'Gestão direta do time',
      'Escalabilidade rápida',
      'Conhecimento retido',
    ],
  },
  {
    nome: 'Consultoria',
    descricao: 'Horas de consultoria técnica e estratégica',
    valor: 'R$ 500/hora',
    beneficios: [
      'Expertise sob demanda',
      'Sem compromisso longo',
      'Múltiplas especialidades',
      'Mentoria incluída',
    ],
  },
  {
    nome: 'Parceria Estratégica',
    descricao: 'Parceiro de tecnologia de longo prazo',
    valor: 'Modelo personalizado',
    beneficios: [
      'Equity ou revenue share',
      'Investimento conjunto',
      'Roadmap compartilhado',
      'Crescimento mútuo',
    ],
  },
] as const;

/**
 * Benefícios inclusos em todos os planos
 * @constant
 */
export const BENEFICIOS_PADRAO = [
  {
    titulo: 'Código Proprietário',
    descricao: 'Você é dono de 100% do código desenvolvido',
    icone: 'Code',
  },
  {
    titulo: 'Metodologia Ágil',
    descricao: 'Sprints quinzenais com entregas incrementais',
    icone: 'Repeat',
  },
  {
    titulo: 'Stack Moderna',
    descricao: 'Tecnologias atualizadas e melhores práticas',
    icone: 'Layers',
  },
  {
    titulo: 'Garantia de Qualidade',
    descricao: 'Testes rigorosos e code review em cada entrega',
    icone: 'Shield',
  },
  {
    titulo: 'Documentação',
    descricao: 'Código documentado e manual de uso completo',
    icone: 'FileText',
  },
  {
    titulo: 'Suporte Pós-Entrega',
    descricao: 'Assistência técnica após conclusão do projeto',
    icone: 'Headphones',
  },
] as const;

/**
 * Comparativo de planos
 * @constant
 */
export const COMPARATIVO_RECURSOS = {
  categorias: [
    'Desenvolvimento',
    'Infraestrutura',
    'Segurança',
    'Suporte',
    'Extras',
  ],
  recursos: [
    { nome: 'Frontend Responsivo', mvp: true, growth: true, enterprise: true },
    { nome: 'Backend Robusto', mvp: true, growth: true, enterprise: true },
    { nome: 'Banco de Dados', mvp: true, growth: true, enterprise: true },
    { nome: 'APIs RESTful', mvp: false, growth: true, enterprise: true },
    { nome: 'Microserviços', mvp: false, growth: false, enterprise: true },
    { nome: 'Machine Learning', mvp: false, growth: false, enterprise: true },
    { nome: 'DevOps/CI/CD', mvp: false, growth: true, enterprise: true },
    { nome: 'Testes Automatizados', mvp: false, growth: true, enterprise: true },
    { nome: 'Monitoramento 24/7', mvp: false, growth: false, enterprise: true },
    { nome: 'Alta Disponibilidade', mvp: false, growth: false, enterprise: true },
    { nome: 'Backup Automático', mvp: true, growth: true, enterprise: true },
    { nome: 'SSL/HTTPS', mvp: true, growth: true, enterprise: true },
    { nome: 'Autenticação 2FA', mvp: false, growth: true, enterprise: true },
    { nome: 'Compliance LGPD', mvp: false, growth: true, enterprise: true },
    { nome: 'Pentest', mvp: false, growth: false, enterprise: true },
    { nome: 'Suporte Email', mvp: true, growth: true, enterprise: true },
    { nome: 'Suporte Telefone', mvp: false, growth: true, enterprise: true },
    { nome: 'Suporte 24/7', mvp: false, growth: false, enterprise: true },
    { nome: 'SLA Garantido', mvp: false, growth: false, enterprise: true },
    { nome: 'Treinamento', mvp: false, growth: true, enterprise: true },
  ],
} as const;
