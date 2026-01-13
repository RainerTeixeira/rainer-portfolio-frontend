/**
 * Configuração do Prettier para formatação consistente de código.
 * 
 * Define regras de formatação para todo o projeto para garantir
 * estilo de código consistente entre todos os desenvolvedores e ferramentas.
 * 
 * @module prettier.config
 * @author Rainer Teixeira
 * @see {@link https://prettier.io/docs/en/configuration.html} Guia de Configuração do Prettier
 * @see {@link https://prettier.io/docs/en/options.html} Referência de Opções do Prettier
 * 
 * @example
 * // Formatar todos os arquivos
 * npm run format
 * 
 * // Verificar formatação sem alterações
 * npm run format:check
 * 
 * @type {import('prettier').Config}
 */
export default {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: false,
  endOfLine: 'lf',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
};