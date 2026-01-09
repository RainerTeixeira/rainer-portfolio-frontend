import { ImageResponse } from 'next/og';
import { tokens } from '@rainersoft/design-tokens';

/**
 * Rota de metadados para gerar o favicon em /favicon.ico
 * 
 * Este arquivo utiliza a API de geração de imagens do Next.js (next/og)
 * para criar dinamicamente um ícone PNG para o site.
 * 
 * @module app/icon
 * @fileoverview Geração dinâmica do favicon do site
 * @author Rainer Teixeira
 * @version 2.1.0
 */

/**
 * Cores do ícone baseadas em tokens de design
 * Utiliza a paleta de cinzas do design system para consistência
 * 
 * @constant {Object}
 */
const ICON_COLORS = {
  /** Cor de fundo escura - gray.900 */
  backgroundDark: tokens.primitives?.color?.gray?.[900] ?? '#111827',
  /** Cor de fundo clara - gray.800 */
  backgroundLight: tokens.primitives?.color?.gray?.[800] ?? '#1f2937',
  /** Cor do texto - gray.200 */
  textColor: tokens.primitives?.color?.gray?.[200] ?? '#e5e7eb',
} as const;

/** Dimensões do ícone em pixels */
export const size = { width: 32, height: 32 };

/** Tipo de conteúdo da imagem gerada */
export const contentType = 'image/png';

/**
 * Componente que gera o ícone do site.
 * 
 * Renderiza a letra "R" centralizada com um fundo gradiente
 * usando cores do design system para consistência visual.
 * 
 * @returns {ImageResponse} Resposta de imagem PNG com o ícone gerado
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          // Ocupa todo o espaço disponível
          width: '100%',
          height: '100%',
          // Centraliza o conteúdo usando flexbox
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Gradiente de fundo diagonal usando tokens
          background: `linear-gradient(135deg, ${ICON_COLORS.backgroundDark}, ${ICON_COLORS.backgroundLight})`,
          // Cor do texto usando token
          color: ICON_COLORS.textColor,
          // Estilização da tipografia
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        R
      </div>
    ),
    // Passa as dimensões definidas para a resposta da imagem
    { ...size },
  );
}