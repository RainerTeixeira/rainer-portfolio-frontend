# Usando Apenas Design Tokens (Sem Classes Tailwind)

Este guia mostra como usar **apenas os design tokens** em seus componentes, sem depender de classes do Tailwind CSS como `bg-gradient-to-r`.

## Por Que Usar Apenas Tokens?

✅ **Consistência**: Todos os valores vêm de uma única fonte de verdade  
✅ **Manutenibilidade**: Mudanças nos tokens se refletem automaticamente  
✅ **Type Safety**: TypeScript valida os valores usados  
✅ **Sem Avisos**: Não há sugestões incorretas do IntelliSense  
✅ **Flexibilidade**: Funciona com qualquer framework CSS

## Métodos Disponíveis

### 1. Usando Variáveis CSS Diretamente

As variáveis CSS dos tokens já estão disponíveis globalmente:

```tsx
function MyComponent() {
  return (
    <div
      style={{
        background: 'var(--gradient-primary)',
        color: 'var(--color-text-primary)',
        padding: '1rem',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      Conteúdo usando tokens
    </div>
  );
}
```

### 2. Usando o Hook `useTokenStyles`

O hook fornece funções utilitárias para criar estilos:

```tsx
'use client';

import { useTokenStyles } from '@/hooks/use-token-styles';

function MyComponent() {
  const { styles, tokens } = useTokenStyles();

  return (
    <div style={styles.gradient('primary')}>
      <p style={styles.text('primary')}>
        Texto usando tokens
      </p>
      <button
        style={{
          ...styles.background('primary'),
          ...styles.text('onPrimary'),
          ...styles.radius('md'),
          ...styles.shadow('md'),
          padding: '0.75rem 1.5rem',
        }}
      >
        Botão com tokens
      </button>
    </div>
  );
}
```

### 3. Usando Funções Utilitárias Diretas

Importe funções específicas do módulo `token-styles`:

```tsx
import {
  gradientStyle,
  backgroundStyle,
  textStyle,
  createTokenStyle,
} from '@/lib/utils/token-styles';

function MyComponent() {
  return (
    <div style={gradientStyle('primary')}>
      <p style={textStyle('primary')}>
        Conteúdo
      </p>
    </div>
  );
}
```

### 4. Usando `createTokenStyle` para Estilos Complexos

Combine múltiplos tokens em um único estilo:

```tsx
import { createTokenStyle } from '@/lib/utils/token-styles';

function MyComponent() {
  const cardStyle = createTokenStyle({
    gradient: 'primary',
    text: 'inverse',
    shadow: 'lg',
    radius: 'lg',
    padding: '2rem',
  });

  return <div style={cardStyle}>Card com tokens</div>;
}
```

## Tokens Disponíveis

### Cores de Background
```tsx
tokens.background.primary
tokens.background.secondary
tokens.background.tertiary
tokens.background.inverse
tokens.background.overlay
tokens.background.muted
```

### Cores de Texto
```tsx
tokens.text.primary
tokens.text.secondary
tokens.text.tertiary
tokens.text.inverse
tokens.text.link
tokens.text.linkHover
tokens.text.neonCyan // Dark theme
tokens.text.neonPink // Dark theme
```

### Gradientes
```tsx
tokens.gradient.primary
tokens.gradient.secondary
tokens.gradient.accent
tokens.gradient.background
```

### Sombras
```tsx
tokens.shadow.xs
tokens.shadow.sm
tokens.shadow.base
tokens.shadow.md
tokens.shadow.lg
tokens.shadow.xl
tokens.shadow.glowCyan // Dark theme
tokens.shadow.glowPink // Dark theme
```

### Bordas
```tsx
tokens.border.primary
tokens.border.secondary
tokens.border.focus
tokens.border.neon // Dark theme
```

### Raios de Borda
```tsx
tokens.radius.sm
tokens.radius.base
tokens.radius.md
tokens.radius.lg
tokens.radius.xl
tokens.radius.full
```

## Exemplos Práticos

### Hero Section com Gradiente

```tsx
'use client';

import { useTokenStyles } from '@/hooks/use-token-styles';

export function HeroSection() {
  const { styles } = useTokenStyles();

  return (
    <section
      style={{
        ...styles.gradient('primary'),
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={styles.text('inverse')}>
        Bem-vindo ao meu portfólio
      </h1>
    </section>
  );
}
```

### Card com Glassmorphism

```tsx
'use client';

import { createTokenStyle } from '@/lib/utils/token-styles';

export function GlassCard() {
  const cardStyle = createTokenStyle({
    background: 'glass',
    text: 'primary',
    shadow: 'glowCyan',
    radius: 'lg',
    border: 'neon',
  });

  return (
    <div
      style={{
        ...cardStyle,
        backdropFilter: 'blur(10px)',
        borderWidth: '1px',
        borderStyle: 'solid',
        padding: '2rem',
      }}
    >
      <h2>Card Glassmorphism</h2>
      <p>Usando apenas tokens</p>
    </div>
  );
}
```

### Botão com Estados

```tsx
'use client';

import { useTokenStyles } from '@/hooks/use-token-styles';
import { useState } from 'react';

export function TokenButton() {
  const { styles, tokens } = useTokenStyles();
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    ...styles.background('primary'),
    ...styles.text('onPrimary'),
    ...styles.radius('md'),
    ...styles.shadow(hovered ? 'lg' : 'base'),
    padding: '0.75rem 1.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Clique aqui
    </button>
  );
}
```

## Migrando de Classes Tailwind para Tokens

### Antes (Tailwind)
```tsx
<div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
  Conteúdo
</div>
```

### Depois (Tokens)
```tsx
import { createTokenStyle } from '@/lib/utils/token-styles';

<div
  style={createTokenStyle({
    gradient: 'primary',
    text: 'inverse',
    shadow: 'lg',
    radius: 'lg',
    padding: '1rem',
  })}
>
  Conteúdo
</div>
```

## Vantagens

1. **Sem Dependência do Tailwind**: Funciona mesmo se o Tailwind for removido
2. **Type Safety**: TypeScript valida todos os valores
3. **Consistência**: Todos os valores vêm dos tokens
4. **Manutenibilidade**: Mudanças nos tokens se refletem automaticamente
5. **Sem Avisos**: Não há sugestões incorretas do IntelliSense

## Notas Importantes

- As variáveis CSS são atualizadas automaticamente quando o tema muda
- Os tokens funcionam tanto em light quanto dark theme
- Use `useTokenStyles()` em componentes client-side
- Para componentes server-side, use as funções utilitárias diretamente

## Referências

- [Design Tokens Documentation](../../rainer-design-tokens/README.md)
- [Token Styles Utils](../../lib/utils/token-styles.ts)
- [useTokenStyles Hook](../../hooks/use-token-styles.ts)

