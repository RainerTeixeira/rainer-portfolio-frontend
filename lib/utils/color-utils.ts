/**
 * Color Utilities
 * 
 * Funções puras de conversão de cores sem dependências externas.
 * Usado por componentes que precisam converter cores sem importar design tokens.
 */

/**
 * Converte HEX para RGB
 */
export function hexToRGB(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/**
 * Converte HEX para RGBA
 */
export function hexToRGBA(hex: string, alpha: number): string {
  const rgb = hexToRGB(hex);
  return `rgba(${rgb}, ${alpha})`;
}

/**
 * Converte HEX para HSL
 */
export function hexToHSL(hex: string): string {
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

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

  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100 * 10) / 10;
  const lPercent = Math.round(l * 100 * 10) / 10;

  return `${hDeg} ${sPercent}% ${lPercent}%`;
}
