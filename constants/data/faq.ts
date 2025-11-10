/**
 * FAQ Data
 *
 * Perguntas frequentes (FAQ) do site.
 *
 * @module constants/data/faq
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Item de FAQ (Perguntas Frequentes)
 */
export interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

/**
 * Lista de perguntas frequentes (FAQ)
 *
 * Array contendo todas as perguntas e respostas da seção FAQ.
 * Organizado por categorias: serviços, prazos, suporte, processo, remoto, pagamento.
 */
export const FAQ_ITEMS: ReadonlyArray<FAQItem> = [
  {
    value: 'item-1',
    question: 'Quais tipos de projetos vocês desenvolvem?',
    answer:
      'Desenvolvemos aplicações web completas full-stack, incluindo: ' +
      'dashboards administrativos, sistemas de autenticação, PWAs ' +
      '(Progressive Web Apps), APIs REST, integrações com serviços ' +
      'externos, e aplicações sob medida. Trabalhamos com React, ' +
      'Next.js, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB e ' +
      'outras tecnologias modernas.',
  },
  {
    value: 'item-2',
    question: 'Qual o prazo médio para desenvolvimento de um projeto?',
    answer:
      'O prazo varia conforme a complexidade do projeto. Projetos ' +
      'simples podem levar de 1 a 2 semanas, enquanto projetos mais ' +
      'complexos podem levar de 1 a 3 meses. Sempre fornecemos uma ' +
      'estimativa detalhada após análise dos requisitos.',
  },
  {
    value: 'item-3',
    question: 'Vocês oferecem suporte pós-entrega?',
    answer:
      'Sim! Oferecemos suporte técnico pós-entrega, manutenção ' +
      'preventiva, correção de bugs, e atualizações. Também ' +
      'fornecemos documentação completa do código e treinamento se ' +
      'necessário.',
  },
  {
    value: 'item-4',
    question: 'Como funciona o processo de desenvolvimento?',
    answer:
      'Nosso processo inclui: (1) Análise de requisitos e ' +
      'planejamento, (2) Proposta técnica e orçamento, (3) ' +
      'Desenvolvimento em sprints com entregas incrementais, (4) ' +
      'Testes e validação, (5) Deploy e entrega, (6) Suporte ' +
      'pós-entrega. Mantemos comunicação constante durante todo o ' +
      'processo.',
  },
  {
    value: 'item-5',
    question: 'Vocês trabalham com projetos remotos?',
    answer:
      'Sim! Trabalhamos 100% remotamente e temos experiência com ' +
      'equipes distribuídas. Utilizamos ferramentas de comunicação ' +
      'como Slack, Discord, e reuniões por videoconferência para ' +
      'manter contato constante com clientes.',
  },
  {
    value: 'item-6',
    question: 'Qual a forma de pagamento?',
    answer:
      'Trabalhamos com pagamento parcelado conforme marcos do ' +
      'projeto. Geralmente dividimos em: entrada (30%), marcos ' +
      'intermediários (40%), e entrega final (30%). Aceitamos ' +
      'transferência bancária, PIX, e outras formas de pagamento ' +
      'acordadas.',
  },
] as const;
