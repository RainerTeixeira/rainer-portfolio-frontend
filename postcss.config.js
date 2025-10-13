/**
 * Configuração do PostCSS
 * 
 * PostCSS é uma ferramenta para transformar CSS com plugins JavaScript.
 * Este arquivo define os plugins utilizados no pipeline de processamento do CSS.
 * 
 * @fileoverview Configuração dos plugins PostCSS para processamento de estilos
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @typedef {Object} PostCSSConfig
 * @property {Object} plugins - Objeto contendo os plugins PostCSS ativos
 */

/**
 * Exporta a configuração do PostCSS
 * 
 * Plugins configurados:
 * - @tailwindcss/postcss: Plugin oficial do Tailwind CSS v4 para processar classes utilitárias
 * - autoprefixer: Adiciona automaticamente prefixos de navegadores (-webkit-, -moz-, etc)
 *                 garantindo compatibilidade cross-browser baseado em browserslist
 * 
 * @type {PostCSSConfig}
 */
module.exports = {
  plugins: {
    /**
     * Plugin do Tailwind CSS v4
     * Processa todas as diretivas @tailwind e gera as classes utilitárias
     */
    '@tailwindcss/postcss': {},
    
    /**
     * Autoprefixer
     * Adiciona prefixos de fornecedores automaticamente com base no browserslist
     * Exemplo: transform -> -webkit-transform, -ms-transform, transform
     */
    autoprefixer: {},
  },
}
