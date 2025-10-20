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
module.exports = {
  /**
   * Configuração do modo escuro
   * Utiliza a estratégia 'class' para permitir alternância manual via classe CSS
   * ao invés de depender apenas da preferência do sistema operacional
   */
  darkMode: ["class"],
  
  /**
   * Define os caminhos de arquivos que o Tailwind deve escanear
   * para gerar as classes CSS utilizadas no projeto
   * 
   * @property {string[]} content - Globs de arquivos para análise
   */
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // Páginas do Next.js (se existirem)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Todos os componentes React
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // App Router do Next.js 13+
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
        border: "hsl(var(--color-border))",
        
        /** Cor de fundo dos inputs e campos de formulário */
        input: "hsl(var(--color-input))",
        
        /** Cor do anel de foco (outline) dos elementos interativos */
        ring: "hsl(var(--color-ring))",
        
        /** Cor de fundo principal da aplicação */
        background: "hsl(var(--color-background))",
        
        /** Cor do texto principal (foreground) */
        foreground: "hsl(var(--color-foreground))",
        
        /**
         * Cores primárias do tema
         * Usadas em botões principais, links importantes e elementos de destaque
         */
        primary: {
          DEFAULT: "hsl(var(--color-primary))",              // Cor primária base
          foreground: "hsl(var(--color-primary-foreground))", // Texto sobre fundo primário
        },
        
        /**
         * Cores secundárias do tema
         * Usadas em elementos de suporte e alternativas visuais
         */
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",              // Cor secundária base
          foreground: "hsl(var(--color-secondary-foreground))", // Texto sobre fundo secundário
        },
        
        /**
         * Cores para ações destrutivas
         * Usadas em botões de exclusão, alertas de erro e ações irreversíveis
         */
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",              // Cor destrutiva base (vermelho)
          foreground: "hsl(var(--color-destructive-foreground))", // Texto sobre fundo destrutivo
        },
        
        /**
         * Cores suavizadas/atenuadas
         * Usadas em elementos secundários, placeholders e conteúdo desabilitado
         */
        muted: {
          DEFAULT: "hsl(var(--color-muted))",              // Cor atenuada base
          foreground: "hsl(var(--color-muted-foreground))", // Texto sobre fundo atenuado
        },
        
        /**
         * Cores de destaque/acento
         * Usadas para chamar atenção em elementos específicos sem ser primário
         */
        accent: {
          DEFAULT: "hsl(var(--color-accent))",              // Cor de acento base
          foreground: "hsl(var(--color-accent-foreground))", // Texto sobre fundo de acento
        },
        
        /**
         * Cores para popovers e tooltips
         * Elementos flutuantes que aparecem sobre o conteúdo principal
         */
        popover: {
          DEFAULT: "hsl(var(--color-popover))",              // Fundo do popover
          foreground: "hsl(var(--color-popover-foreground))", // Texto do popover
        },
        
        /**
         * Cores para cards e painéis
         * Containers de conteúdo com elevação visual
         */
        card: {
          DEFAULT: "hsl(var(--color-card))",              // Fundo do card
          foreground: "hsl(var(--color-card-foreground))", // Texto do card
        },
        
        /**
         * Cores da sidebar/barra lateral
         * Sistema completo de cores para navegação lateral
         */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",                           // Fundo da sidebar
          foreground: "hsl(var(--sidebar-foreground))",             // Texto da sidebar
          primary: "hsl(var(--sidebar-primary))",                   // Itens primários da sidebar
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))", // Texto sobre primário
          accent: "hsl(var(--sidebar-accent))",                     // Cor de acento da sidebar
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))", // Texto sobre acento
          border: "hsl(var(--sidebar-border))",                     // Bordas da sidebar
          ring: "hsl(var(--sidebar-ring))",                         // Anel de foco da sidebar
        },
      },
      
      /**
       * Raios de borda customizados
       * Define arredondamentos padrão baseados na variável --radius
       * permitindo ajuste global do arredondamento dos elementos
       */
      borderRadius: {
        lg: "var(--radius)",                 // Raio grande (padrão: 8px)
        md: "calc(var(--radius) - 2px)",    // Raio médio (padrão: 6px)
        sm: "calc(var(--radius) - 4px)",    // Raio pequeno (padrão: 4px)
      },
    },
  },
  
  /**
   * Plugins do Tailwind CSS
   * Array vazio - plugins adicionais podem ser incluídos aqui
   * (ex: @tailwindcss/forms, @tailwindcss/typography)
   */
  plugins: [],
}
