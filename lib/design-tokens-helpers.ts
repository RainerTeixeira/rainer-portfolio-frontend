/**
 * Design Tokens Helpers
 * 
 * Utilitários para trabalhar com design tokens da biblioteca @rainer/design-tokens.
 * Fornece funções para converter cores HEX para HSL e outras transformações necessárias.
 * 
 * @module lib/design-tokens-helpers
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Converte uma cor HEX para HSL no formato esperado pelo Tailwind CSS
 * 
 * @param hex - Cor em formato hexadecimal (#RRGGBB)
 * @returns String no formato "H S% L%" (sem hsl() wrapper)
 * 
 * @example
 * ```ts
 * hexToHSL('#0891b2') // "188 85.7% 53.3%"
 * ```
 */
export function hexToHSL(hex: string): string {
  // Remove o # se presente
  const cleanHex = hex.replace('#', '');
  
  // Converte para RGB
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  
  // Encontra o máximo e mínimo
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calcula luminosidade
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  // Converte para graus e porcentagem
  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100 * 10) / 10;
  const lPercent = Math.round(l * 100 * 10) / 10;
  
  return `${hDeg} ${sPercent}% ${lPercent}%`;
}

/**
 * Converte múltiplas cores HEX para HSL
 * 
 * @param colors - Objeto com cores em formato hexadecimal
 * @returns Objeto com cores em formato HSL
 * 
 * @example
 * ```ts
 * const colors = {
 *   primary: '#0891b2',
 *   secondary: '#9333ea'
 * };
 * 
 * hexColorsToHSL(colors)
 * // { primary: "188 85.7% 53.3%", secondary: "271 91.0% 55.3%" }
 * ```
 */
export function hexColorsToHSL<T extends Record<string, string>>(
  colors: T
): Record<keyof T, string> {
  const result: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(colors)) {
    result[key] = hexToHSL(value);
  }
  
  return result as Record<keyof T, string>;
}

