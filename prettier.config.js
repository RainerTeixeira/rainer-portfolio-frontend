/**
 * @file prettier.config.js
 * @description Configuração do Prettier para formatação consistente de código.
 * 
 * @module prettier.config
 * @version 2.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 */

/** @type {import('prettier').Config} */
export default {
  // Semicolons
  semi: true,
  
  // Trailing commas (moderno: 'all' para ES2022+)
  trailingComma: 'all',
  
  // Quotes
  singleQuote: true,
  jsxSingleQuote: false,
  
  // Line width
  printWidth: 100,
  
  // Indentation
  tabWidth: 2,
  useTabs: false,
  
  // Arrow functions
  arrowParens: 'always',
  
  // Line endings
  endOfLine: 'lf',
  
  // Bracket spacing
  bracketSpacing: true,
  bracketSameLine: false,
  
  // Prose wrap
  proseWrap: 'preserve',
  
  // HTML whitespace
  htmlWhitespaceSensitivity: 'css',
  
  // Embedded languages
  embeddedLanguageFormatting: 'auto',
  
  // Single attribute per line
  singleAttributePerLine: false,
};
