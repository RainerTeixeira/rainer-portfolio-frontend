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
    question: 'Quais tipos de projetos você desenvolve?',
    answer:
      'Desenvolvo aplicações web completas full-stack com foco em qualidade e resultados. ' +
      'Minha especialidade inclui: dashboards administrativos interativos, sistemas de autenticação ' +
      'seguros (JWT, OAuth2, AWS Cognito), Progressive Web Apps (PWA) com funcionalidades offline, ' +
      'APIs RESTful bem documentadas, integrações com serviços externos (pagamento, email, storage), ' +
      'sistemas de blog com editor WYSIWYG, e aplicações personalizadas sob medida. Trabalho com ' +
      'stack moderna: React 19, Next.js 15, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB, ' +
      'Prisma ORM, Docker e deploy em Vercel/AWS.',
  },
  {
    value: 'item-2',
    question: 'Qual o prazo médio de desenvolvimento?',
    answer:
      'O prazo varia de acordo com a complexidade e escopo do projeto. Landing pages e sites ' +
      'institucionais: 1-2 semanas. Aplicações web com funcionalidades básicas: 2-4 semanas. ' +
      'Sistemas completos com backend, autenticação e dashboard: 1-3 meses. Projetos enterprise ' +
      'complexos: 3-6 meses. Após entender seus requisitos, forneço uma estimativa detalhada com ' +
      'cronograma de entregas incrementais, permitindo que você acompanhe o progresso e valide ' +
      'funcionalidades ao longo do desenvolvimento.',
  },
  {
    value: 'item-3',
    question: 'Você oferece suporte após a entrega?',
    answer:
      'Sim! Todo projeto inclui período de garantia para correção de bugs (geralmente 30 dias). ' +
      'Além disso, ofereço planos de suporte contínuo que incluem: manutenção preventiva, ' +
      'atualizações de segurança, correção de bugs, melhorias de performance, adição de novas ' +
      'funcionalidades, monitoramento de uptime e backup de dados. Também forneço documentação ' +
      'técnica completa do código, guias de uso e treinamento para sua equipe, se necessário. ' +
      'O objetivo é garantir que sua aplicação continue funcionando perfeitamente a longo prazo.',
  },
  {
    value: 'item-4',
    question: 'Como funciona o processo de desenvolvimento?',
    answer:
      'Sigo um processo estruturado e transparente: (1) Reunião inicial para entender suas ' +
      'necessidades e objetivos, (2) Análise de requisitos e planejamento técnico detalhado, ' +
      '(3) Proposta com escopo, cronograma e orçamento claro, (4) Desenvolvimento em sprints ' +
      'semanais com entregas incrementais para validação, (5) Testes rigorosos (unitários, ' +
      'integração, E2E) e correções, (6) Deploy em ambiente de produção com monitoramento, ' +
      '(7) Treinamento e documentação, (8) Suporte pós-entrega. Mantenho comunicação constante ' +
      'via WhatsApp, email ou ferramentas como Slack/Discord, com reuniões semanais para ' +
      'alinhamento e demonstrações.',
  },
  {
    value: 'item-5',
    question: 'Você trabalha remotamente?',
    answer:
      'Sim! Trabalho 100% remotamente e tenho experiência comprovada com projetos e equipes ' +
      'distribuídas. Utilizo ferramentas profissionais de comunicação e colaboração: Git/GitHub ' +
      'para versionamento de código, Slack ou Discord para comunicação em tempo real, Google ' +
      'Meet ou Zoom para reuniões e demonstrações, Notion ou Trello para gestão de tarefas, ' +
      'e Figma para validação de design. Meu horário de trabalho é flexível (Seg-Sex, 9h-18h), ' +
      'mas estou disponível para reuniões em outros horários quando necessário. Respondo ' +
      'mensagens em até 24 horas.',
  },
  {
    value: 'item-6',
    question: 'Quais são as formas de pagamento?',
    answer:
      'Trabalho com pagamento parcelado vinculado a marcos de entrega do projeto, garantindo ' +
      'transparência e segurança para ambas as partes. Estrutura típica: entrada de 30% para ' +
      'início do desenvolvimento, 40% divididos em marcos intermediários (ex: conclusão do ' +
      'backend, conclusão do frontend), e 30% na entrega final após validação e deploy. ' +
      'Aceito transferência bancária, PIX (forma mais rápida), e outras modalidades a combinar. ' +
      'Para projetos menores, podemos negociar pagamento em menos parcelas. Emito recibos e ' +
      'notas fiscais quando solicitado.',
  },
] as const;
