import { ImageResponse } from 'next/og';

/**
 * Rota de metadados para gerar o favicon em /favicon.ico
 * 
 * Este arquivo utiliza a API de geração de imagens do Next.js (next/og)
 * para criar dinamicamente um ícone PNG para o site.
 */

/** Dimensões do ícone em pixels */
export const size = { width: 32, height: 32 };

/** Tipo de conteúdo da imagem gerada */
export const contentType = 'image/png';

/**
 * Componente que gera o ícone do site.
 * 
 * Renderiza a letra "R" centralizada com um fundo gradiente
 * que vai do azul escuro (#0f172a) para um tom mais claro (#1e293b).
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
          // Gradiente de fundo diagonal (135 graus)
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          // Cor do texto em cinza claro
          color: '#e2e8f0',
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