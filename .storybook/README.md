# Storybook - Frontend Components

Este é o Storybook do **frontend** (`rainer-portfolio-frontend`), focado em **componentes UI reais** que usam os design tokens.

## 🎯 Objetivo

Documentar e visualizar os componentes de interface do usuário que **utilizam** os design tokens da biblioteca `@rainer/rainer-design-tokens`.

## 🚀 Como Usar

### Iniciar o Storybook

```bash
pnpm run storybook
```

O Storybook será aberto em `http://localhost:6007` (porta diferente da lib de tokens para evitar conflitos).

### Build para Produção

```bash
pnpm run build-storybook
```

## 📁 Estrutura

```
.storybook/
├── main.ts          # Configuração principal (Vite, addons, stories)
├── preview.tsx      # Configuração de preview (temas, decorators)
└── README.md        # Esta documentação

components/ui/
├── button.tsx
├── button.stories.tsx    # Story do Button
├── card.tsx
├── card.stories.tsx      # Story do Card
├── input.tsx
├── input.stories.tsx     # Story do Input
└── ...
```

## 📚 Stories Disponíveis

### Componentes Básicos

- **Button** - Botões com múltiplas variantes (default, destructive, outline, neon, glass, etc.)
- **Card** - Sistema de cards composable (Card, CardHeader, CardTitle, etc.)
- **Input** - Campos de entrada de texto com diferentes tipos
- **Badge** - Etiquetas/tags para destacar informações
- **Alert** - Alertas e notificações
- **Skeleton** - Placeholders de loading

### Componentes Avançados

- **Dialog** - Modais e diálogos
- **Dropdown** - Menus dropdown
- **Tabs** - Sistema de abas
- **Accordion** - Acordeões expansíveis
- E mais...

## 🎨 Integração com Design Tokens

Todos os componentes usam os design tokens através de:

1. **CSS Variables** - Importadas via `globals.css`
2. **Tailwind Config** - Configuração estendida dos tokens
3. **Classes Tailwind** - Usando cores, espaçamentos e tipografia dos tokens

### Exemplo

```tsx
// Button usa tokens através de classes Tailwind
<Button className="bg-primary text-primary-foreground">
  // primary e primary-foreground vêm dos design tokens
</Button>
```

## 🔄 Diferença do Storybook da Lib

| Aspecto     | Lib de Tokens                      | Frontend                  |
| ----------- | ---------------------------------- | ------------------------- |
| **Foco**    | Tokens (cores, espaçamentos, etc.) | Componentes UI reais      |
| **Porta**   | 6006                               | 6007                      |
| **Stories** | ColorPalette, Typography, etc.     | Button, Card, Input, etc. |
| **Uso**     | Visualizar tokens                  | Visualizar componentes    |

## 📝 Criar Nova Story

1. Crie o arquivo `ComponentName.stories.tsx` ao lado do componente
2. Use o template:

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './component-name';

const meta = {
  title: 'UI Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Descrição do componente',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props do componente
  },
};
```

## 🎭 Temas

O Storybook suporta temas light e dark através do `next-themes`:

- **Light** - Tema claro padrão
- **Dark** - Tema escuro cyberpunk

Use o seletor de background no Storybook para alternar entre temas.

## 🔗 Links Úteis

- [Documentação Storybook](https://storybook.js.org/)
- [Design Tokens Lib](../@rainer-design-tokens/README.md)
- [Componentes UI](../components/ui/)
