/**
 * @fileoverview Perguntas frequentes
 * @module constants/contato/faq
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de perguntas e respostas mais
 * comuns sobre os serviços.
 */

/**
 * Interface para item de FAQ
 * @interface
 */
export interface FAQItem {
  readonly value: string;
  readonly question: string;
  readonly answer: string;
}

/**
 * Perguntas frequentes
 * @constant
 * @description FAQ otimizado para SEO
 */
export const FAQ: ReadonlyArray<FAQItem> = [
  {
    value: 'item-1',
    question: 'Quanto tempo leva para desenvolver uma aplicação?',
    answer: 'Um MVP simples leva de 2-4 semanas. ' +
            'Aplicações completas com dashboard levam de 6-12 semanas. ' +
            'Faço entregas semanais para você acompanhar o progresso.',
  },
  {
    value: 'item-2',
    question: 'Oferece suporte após a entrega?',
    answer: 'Sim! 30 dias de suporte gratuito para correções. ' +
            'Depois ofereço planos de manutenção mensal.',
  },
  {
    value: 'item-3',
    question: 'Como garantir performance e SEO?',
    answer: 'Uso Next.js com SSR e otimizações automáticas. ' +
            'Garanto Lighthouse Score 95+ e Core Web Vitals excelentes.',
  },
  {
    value: 'item-4',
    question: 'Qual stack você usa?',
    answer: 'Frontend: React, Next.js, TypeScript. ' +
            'Backend: Node.js, NestJS. ' +
            'Banco: PostgreSQL ou MongoDB. ' +
            'Deploy: Vercel ou AWS.',
  },
  {
    value: 'item-5',
    question: 'Como funciona o processo?',
    answer: '1) Análise de requisitos ' +
            '2) Proposta e aprovação ' +
            '3) Desenvolvimento ágil ' +
            '4) Testes e otimizações ' +
            '5) Deploy e documentação',
  },
  {
    value: 'item-6',
    question: 'Desenvolve PWAs?',
    answer: 'Sim! PWAs instaláveis que funcionam offline. ' +
            'Com notificações push e experiência nativa.',
  },
] as const;
