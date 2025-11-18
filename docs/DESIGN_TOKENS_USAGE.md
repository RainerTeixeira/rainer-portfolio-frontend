# Guia de Uso dos Design Tokens no Frontend

Este documento explica como usar os design tokens da biblioteca `@rainer/rainer-design-tokens` no frontend do portfólio.

## 📦 Instalação

Os tokens já estão configurados e disponíveis através do Tailwind CSS e variáveis CSS.

## 🎨 Estrutura dos Tokens

### Cores

Os tokens de cores seguem uma estrutura hierárquica com estados:

- **Primary, Secondary, Accent**: Cores principais com estados (`base`, `hover`, `active`, `disabled`, `focus`)
- **Background, Surface, Text, Border**: Cores semânticas para diferentes contextos
- **Status**: Cores de status (success, warning, error, info) com variações completas

### Tipografia

Tokens de tipografia incluem:

- `fontFamily`: Famílias de fontes (sans, serif, mono, display, body, code)
- `fontSize`: Tamanhos de fonte (xs até 9xl)
- `fontWeight`: Pesos de fonte (thin até black)
- `lineHeight`: Alturas de linha
- `letterSpacing`: Espaçamento entre letras

## 🚀 Como Usar

### 1. Via Tailwind CSS (Recomendado)

Os tokens estão disponíveis como classes utilitárias do Tailwind:

```tsx
// Cores primárias
<button className="bg-primary-base hover:bg-primary-hover active:bg-primary-active">
  Botão
</button>

// Cores de status
<div className="bg-status-success-background text-status-success-text-on-background">
  Sucesso
</div>

// Tipografia
<h1 className="font-display text-4xl font-bold leading-tight">
  Título
</h1>
```

### 2. Via Variáveis CSS

As variáveis CSS estão disponíveis globalmente:

```css
.custom-element {
  background-color: var(--color-primary-base);
  color: var(--color-text-primary);
  font-family: var(--font-display);
}
```

### 3. Via JavaScript/TypeScript

Importe os tokens diretamente:

```typescript
import { tokens } from '@rainer/rainer-design-tokens';

const primaryColor = tokens.colors.light.primary.base;
const fontSize = tokens.typography.fontSize.lg;
```

## 📋 Classes Disponíveis

### Cores Primárias

- `bg-primary-base`, `bg-primary-hover`, `bg-primary-active`
- `text-primary-text`, `text-primary-text-hover`
- `border-primary-border`, `border-primary-border-hover`

### Cores Secundárias

- `bg-secondary-base`, `bg-secondary-hover`, `bg-secondary-active`
- `text-secondary-text`, `text-secondary-text-hover`
- `border-secondary-border`, `border-secondary-border-hover`

### Cores de Accent

- `bg-accent-base`, `bg-accent-hover`, `bg-accent-active`
- `text-accent-text`, `text-accent-text-hover`
- `border-accent-border`, `border-accent-border-hover`

### Cores de Status

- `bg-status-success-base`, `text-status-success-text-on-background`
- `bg-status-warning-base`, `text-status-warning-text-on-background`
- `bg-status-error-base`, `text-status-error-text-on-background`
- `bg-status-info-base`, `text-status-info-text-on-background`

### Tipografia

- `font-display`, `font-body`, `font-code`
- `text-xs` até `text-9xl`
- `font-thin` até `font-black`
- `leading-none` até `leading-loose`
- `tracking-tighter` até `tracking-widest`

## 🌓 Dark Mode

O dark mode é suportado automaticamente através da classe `.dark`:

```tsx
<div className="bg-background-primary dark:bg-background-primary">Conteúdo</div>
```

As variáveis CSS também mudam automaticamente quando a classe `.dark` está presente.

## 📝 Exemplos Práticos

### Botão Primário

```tsx
<button
  className="
  bg-primary-base 
  hover:bg-primary-hover 
  active:bg-primary-active 
  disabled:bg-primary-disabled 
  disabled:text-primary-text-disabled
  text-primary-text 
  border border-primary-border
  px-4 py-2 rounded-md
  transition-colors
"
>
  Clique aqui
</button>
```

### Card com Status

```tsx
<div
  className="
  bg-status-success-background 
  border border-status-success-border 
  text-status-success-text-on-background
  p-4 rounded-lg
"
>
  Operação realizada com sucesso!
</div>
```

### Título com Tipografia

```tsx
<h1
  className="
  font-display 
  text-5xl 
  font-bold 
  leading-tight 
  tracking-tight
  text-text-primary
"
>
  Meu Título
</h1>
```

## 🔍 Verificação de Contraste WCAG

Os tokens incluem utilitários para validação de contraste:

```typescript
import { validateContrast, meetsWCAGAA } from '@rainer/rainer-design-tokens';

const isValid = validateContrast('#0891b2', '#ffffff');
const meetsAA = meetsWCAGAA('#0891b2', '#ffffff');
```

## 📚 Referência Completa

Para ver todos os tokens disponíveis, consulte:

- Storybook: Execute `pnpm run storybook` na pasta `@rainer-design-tokens`
- Documentação: `@rainer-design-tokens/docs/`

## 🎯 Boas Práticas

1. **Use classes Tailwind**: Prefira classes Tailwind sobre variáveis CSS inline
2. **Estados consistentes**: Use sempre os estados (`hover`, `active`, `disabled`) para interatividade
3. **Tipografia hierárquica**: Use os tokens de tipografia para manter hierarquia visual
4. **Dark mode**: Sempre teste em ambos os temas (light e dark)
5. **Acessibilidade**: Use os tokens de status para feedback visual adequado
