/**
 * Token Example Component
 * 
 * Exemplo de como usar apenas design tokens, sem classes do Tailwind CSS.
 * 
 * @fileoverview Componente de exemplo usando tokens
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { useTokenStyles } from '@/hooks/use-token-styles';
import { createTokenStyle } from '@/lib/utils/token-styles';
import { useState } from 'react';

/**
 * Exemplo de Hero Section usando apenas tokens
 */
export function TokenHeroExample() {
  const { styles } = useTokenStyles();

  return (
    <section
      style={{
        ...styles.gradient('primary'),
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}
    >
      <h1
        style={{
          ...styles.text('inverse'),
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}
      >
        Hero Section com Tokens
      </h1>
      <p
        style={{
          ...styles.text('inverse'),
          fontSize: '1.25rem',
          opacity: 0.9,
        }}
      >
        Usando apenas design tokens, sem classes do Tailwind
      </p>
    </section>
  );
}

/**
 * Exemplo de Card usando apenas tokens
 */
export function TokenCardExample() {
  const { styles, tokens } = useTokenStyles();
  const [hovered, setHovered] = useState(false);

  const cardStyle = createTokenStyle({
    background: 'primary',
    text: 'onPrimary',
    shadow: hovered ? 'lg' : 'base',
    radius: 'lg',
    padding: '2rem',
  });

  return (
    <div
      style={{
        ...cardStyle,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        maxWidth: '400px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ marginBottom: '1rem' }}>Card com Tokens</h2>
      <p>
        Este card usa apenas design tokens. Passe o mouse para ver o efeito de
        hover.
      </p>
    </div>
  );
}

/**
 * Exemplo de Botão usando apenas tokens
 */
export function TokenButtonExample() {
  const { styles } = useTokenStyles();
  const [clicked, setClicked] = useState(false);

  const buttonStyle = createTokenStyle({
    background: 'primary',
    text: 'onPrimary',
    shadow: clicked ? 'inner' : 'md',
    radius: 'md',
    padding: '0.75rem 1.5rem',
  });

  return (
    <button
      style={{
        ...buttonStyle,
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.2s',
      }}
      onClick={() => setClicked(!clicked)}
    >
      Botão com Tokens
    </button>
  );
}

/**
 * Exemplo completo mostrando todos os métodos
 */
export function TokenCompleteExample() {
  const { styles, tokens } = useTokenStyles();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: tokens.background.secondary,
      }}
    >
      {/* Card 1: Usando createTokenStyle */}
      <div
        style={createTokenStyle({
          gradient: 'primary',
          text: 'inverse',
          shadow: 'lg',
          radius: 'lg',
          padding: '2rem',
        })}
      >
        <h3>Card com Gradiente</h3>
        <p>Usando createTokenStyle()</p>
      </div>

      {/* Card 2: Usando métodos do hook */}
      <div
        style={{
          ...styles.background('primary'),
          ...styles.text('primary'),
          ...styles.shadow('md'),
          ...styles.radius('lg'),
          padding: '2rem',
        }}
      >
        <h3>Card com Métodos</h3>
        <p>Usando métodos do useTokenStyles()</p>
      </div>

      {/* Card 3: Usando variáveis CSS diretamente */}
      <div
        style={{
          background: 'var(--gradient-accent)',
          color: 'var(--color-text-inverse)',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
        }}
      >
        <h3>Card com CSS Vars</h3>
        <p>Usando variáveis CSS diretamente</p>
      </div>
    </div>
  );
}

