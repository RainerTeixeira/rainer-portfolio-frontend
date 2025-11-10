/**
 * Configuração do Tailwind CSS v4
 *
 * Este arquivo centraliza todas as customizações do Tailwind CSS para o projeto,
 * incluindo modo escuro, sistema de cores baseado em variáveis CSS, e configurações
 * responsivas otimizadas para o portfólio profissional.
 *
 * @fileoverview Arquivo de configuração do Tailwind CSS com tema customizado
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 *
 * @type {import('tailwindcss').Config}
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * Configuração do modo escuro
   * Utiliza a estratégia 'class' para permitir alternância manual via classe CSS
   * ao invés de depender apenas da preferência do sistema operacional
   */
  darkMode: ['class'],

  /**
   * Define os caminhos de arquivos que o Tailwind deve escanear
   * para gerar as classes CSS utilizadas no projeto
   *
   * @property {string[]} content - Globs de arquivos para análise
   */
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Páginas do Next.js (se existirem)
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Todos os componentes React
    './app/**/*.{js,ts,jsx,tsx,mdx}', // App Router do Next.js 13+
  ],

  /**
   * Configurações do tema visual
   * Extende o tema padrão do Tailwind com customizações específicas do projeto
   */
  theme: {
    /**
     * Extensões do tema padrão
     * Adiciona novas propriedades sem substituir as existentes
     */
    extend: {
      /**
       * Sistema de cores customizado
       * Utiliza variáveis CSS (--color-*) definidas em globals.css
       * para permitir temas dinâmicos e modo escuro fluido
       *
       * Todas as cores usam o formato HSL para melhor manipulação
       * e suporte a transparência via Tailwind
       */
      colors: {
        /** Cor das bordas dos elementos */
        border: 'hsl(var(--color-border) / <alpha-value>)',

        /** Cor de fundo dos inputs e campos de formulário */
        input: 'hsl(var(--color-input) / <alpha-value>)',

        /** Cor do anel de foco (outline) dos elementos interativos */
        ring: 'hsl(var(--color-ring) / <alpha-value>)',

        /** Cor de fundo principal da aplicação */
        background: 'hsl(var(--color-background) / <alpha-value>)',

        /** Cor do texto principal (foreground) */
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',

        /**
         * Cores primárias do tema
         * Usadas em botões principais, links importantes e elementos de destaque
         */
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)', // Cor primária base
          foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)', // Texto sobre fundo primário
        },

        /**
         * Cores secundárias do tema
         * Usadas em elementos de suporte e alternativas visuais
         */
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)', // Cor secundária base
          foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)', // Texto sobre fundo secundário
        },

        /**
         * Cores para ações destrutivas
         * Usadas em botões de exclusão, alertas de erro e ações irreversíveis
         */
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)', // Cor destrutiva base (vermelho)
          foreground:
            'hsl(var(--color-destructive-foreground) / <alpha-value>)', // Texto sobre fundo destrutivo
        },

        /**
         * Cores suavizadas/atenuadas
         * Usadas em elementos secundários, placeholders e conteúdo desabilitado
         */
        muted: {
          DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)', // Cor atenuada base
          foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)', // Texto sobre fundo atenuado
        },

        /**
         * Cores de destaque/acento
         * Usadas para chamar atenção em elementos específicos sem ser primário
         */
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)', // Cor de acento base
          foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)', // Texto sobre fundo de acento
        },

        /**
         * Cores para popovers e tooltips
         * Elementos flutuantes que aparecem sobre o conteúdo principal
         */
        popover: {
          DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)', // Fundo do popover
          foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)', // Texto do popover
        },

        /**
         * Cores para cards e painéis
         * Containers de conteúdo com elevação visual
         */
        card: {
          DEFAULT: 'hsl(var(--color-card) / <alpha-value>)', // Fundo do card
          foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)', // Texto do card
        },

        /**
         * Cores da sidebar/barra lateral
         * Sistema completo de cores para navegação lateral
         */
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar) / <alpha-value>)', // Fundo da sidebar
          foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)', // Texto da sidebar
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)', // Itens primários da sidebar
          'primary-foreground':
            'hsl(var(--sidebar-primary-foreground) / <alpha-value>)', // Texto sobre primário
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)', // Cor de acento da sidebar
          'accent-foreground':
            'hsl(var(--sidebar-accent-foreground) / <alpha-value>)', // Texto sobre acento
          border: 'hsl(var(--sidebar-border) / <alpha-value>)', // Bordas da sidebar
          ring: 'hsl(var(--sidebar-ring) / <alpha-value>)', // Anel de foco da sidebar
        },
      },

      /**
       * Raios de borda customizados
       * Define arredondamentos padrão baseados na variável --radius
       * permitindo ajuste global do arredondamento dos elementos
       */
      borderRadius: {
        lg: 'var(--radius)', // Raio grande (padrão: 8px)
        md: 'calc(var(--radius) - 2px)', // Raio médio (padrão: 6px)
        sm: 'calc(var(--radius) - 4px)', // Raio pequeno (padrão: 4px)
      },

      /**
       * Breakpoints customizados para responsividade completa
       * Adiciona breakpoint xs para dispositivos muito pequenos
       * Inclui todos os breakpoints padrão do Tailwind
       */
      screens: {
        xs: '475px', // Extra small devices (smartphones menores)
        sm: '640px', // Small devices
        md: '768px', // Medium devices
        lg: '1024px', // Large devices
        xl: '1280px', // Extra large devices
        '2xl': '1536px', // 2X Extra large devices
      },
    },
  },

  /**
   * Plugins do Tailwind CSS
   * Array vazio - plugins adicionais podem ser incluídos aqui
   * (ex: @tailwindcss/forms, @tailwindcss/typography)
   */
  plugins: [],
};
