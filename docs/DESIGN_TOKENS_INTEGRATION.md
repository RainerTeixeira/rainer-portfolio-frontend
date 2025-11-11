# Integração de Design Tokens

## 📋 Visão Geral

Este documento descreve a integração completa da biblioteca `@rainer/design-tokens` no frontend do portfólio. A integração garante consistência visual, escalabilidade e manutenibilidade do design system.

## 🎯 Objetivos Alcançados

- ✅ **Configuração Tailwind CSS** integrada com design tokens
- ✅ **Variáveis CSS** baseadas em tokens semânticos
- ✅ **Paletas de cores** primitivas disponíveis no Tailwind
- ✅ **Sistema de temas** (light/dark) profissional
- ✅ **Type-safety** completo com TypeScript
- ✅ **Tree-shaking** otimizado

## 🏗️ Arquitetura

### Estrutura de Tokens

```
@rainer/design-tokens
├── Primitivos (valores base)
│   ├── Cores (neutral, cyan, purple, pink, etc.)
│   ├── Espaçamentos (baseado em grid 8pt)
│   └── Tipografia (escala modular 1.25)
│
└── Semânticos (significado contextual)
    ├── Cores (background, text, border, brand, status)
    ├── Espaçamentos (component, section, container)
    └── Tipografia (heading, body, caption, label)
```

### Integração no Frontend

```
Frontend
├── tailwind.config.ts (configuração Tailwind + tokens)
├── app/globals.css (variáveis CSS baseadas em tokens)
└── lib/design-tokens-helpers.ts (utilitários)
```

## 🎨 Uso de Cores

### Cores Primitivas

As cores primitivas estão disponíveis diretamente no Tailwind:

```tsx
// Usando cores primitivas
<div className="bg-cyan-500 text-neutral-50">
  Conteúdo com cores primitivas
</div>

// Todas as paletas disponíveis:
// neutral, cyan, purple, pink, blue, green, orange, red, amber, emerald
```

### Cores Semânticas

As cores semânticas usam variáveis CSS e se adaptam ao tema:

```tsx
// Cores que mudam automaticamente com o tema
<div className="bg-background text-foreground">
  Adapta-se ao tema light/dark
</div>

<button className="bg-primary text-primary-foreground">
  Botão primário
</button>

<div className="bg-card text-card-foreground border border-border">
  Card com cores semânticas
</div>
```

### Mapeamento de Cores Semânticas

#### Light Mode
- `background`: neutral-50 (#fafafa)
- `foreground`: neutral-900 (#171717)
- `primary`: cyan-600 (#0891b2)
- `card`: white (#ffffff)
- `border`: neutral-200 (#e5e5e5)

#### Dark Mode
- `background`: neutral-950 (#0a0a0a)
- `foreground`: neutral-50 (#fafafa)
- `primary`: cyan-400 (#22d3ee)
- `card`: neutral-900 (#171717)
- `border`: neutral-800 (#262626)

## 📦 Importando Tokens

### Tokens Legacy (Classes Tailwind)

```tsx
import { 
  GRADIENTS, 
  SHADOWS, 
  ANIMATION_DURATION_MS,
  BORDER_RADIUS,
  TRANSITIONS
} from '@rainer/design-tokens';

// Uso em componentes
<div className={cn(
  GRADIENTS.TEXT_PRIMARY,
  SHADOWS.LARGE,
  BORDER_RADIUS.LG,
  TRANSITIONS.NORMAL
)}>
  Conteúdo estilizado
</div>
```

### Tokens Primitivos

```tsx
import { 
  COLOR_PRIMITIVES,
  SPACING_PRIMITIVES,
  TYPOGRAPHY_PRIMITIVES
} from '@rainer/design-tokens';

// Uso em estilos inline ou CSS-in-JS
const styles = {
  color: COLOR_PRIMITIVES.cyan[600],
  padding: SPACING_PRIMITIVES.rem[4],
  fontSize: TYPOGRAPHY_PRIMITIVES.fontSize.rem.lg
};
```

### Tokens Semânticos

```tsx
import { 
  SEMANTIC_COLORS,
  SEMANTIC_SPACING,
  SEMANTIC_TYPOGRAPHY
} from '@rainer/design-tokens';

// Uso em componentes
const buttonStyle = {
  backgroundColor: SEMANTIC_COLORS.light.brand.primary,
  color: SEMANTIC_COLORS.light.text.inverse,
  padding: SEMANTIC_SPACING.component.paddingMd,
  fontSize: SEMANTIC_TYPOGRAPHY.body.base.fontSize
};
```

## 🔧 Utilitários

### Conversão HEX para HSL

```tsx
import { hexToHSL, hexColorsToHSL } from '@/lib/design-tokens-helpers';

// Converter uma cor
const hslColor = hexToHSL('#0891b2'); // "188 85.7% 53.3%"

// Converter múltiplas cores
const colors = hexColorsToHSL({
  primary: '#0891b2',
  secondary: '#9333ea'
});
```

## 🎯 Padrões de Uso

### ✅ Boas Práticas

```tsx
// 1. Use cores semânticas para elementos que mudam com o tema
<div className="bg-background text-foreground border-border">
  Conteúdo adaptável
</div>

// 2. Use cores primitivas para elementos com cor fixa
<div className="bg-cyan-500 text-white">
  Sempre ciano, independente do tema
</div>

// 3. Combine tokens para criar componentes consistentes
import { CARD, TRANSITIONS } from '@rainer/design-tokens';

<div className={cn(
  CARD.BACKGROUND,
  CARD.BORDER,
  CARD.RADIUS,
  TRANSITIONS.SLOW
)}>
  Card padronizado
</div>
```

### ❌ Evitar

```tsx
// ❌ Não use cores hardcoded
<div className="bg-[#0891b2]">Evitar</div>
<div style={{ color: '#0891b2' }}>Evitar</div>

// ❌ Não use valores mágicos
<div className="p-[17px]">Evitar</div>

// ✅ Use tokens
<div className="bg-cyan-600">Correto</div>
<div className="p-4">Correto</div>
```

## 🔄 Migração de Código Existente

### Substituir Cores Hardcoded

```tsx
// Antes
<div className="bg-[#0891b2] text-white">

// Depois
<div className="bg-cyan-600 text-white">
// ou
<div className="bg-primary text-primary-foreground">
```

### Substituir Valores de Espaçamento

```tsx
// Antes
<div className="p-[24px] m-[16px]">

// Depois
<div className="p-6 m-4">
```

### Substituir Gradientes Inline

```tsx
// Antes
<div className="bg-gradient-to-r from-cyan-500 to-blue-500">

// Depois
import { GRADIENTS } from '@rainer/design-tokens';
<div className={GRADIENTS.PRIMARY}>
```

## 📚 Recursos Adicionais

- [Documentação da Biblioteca](../../@rainer-design-tokens/README.md)
- [Guia de Tokens Semânticos](../../@rainer-design-tokens/docs/SEMANTIC.md)
- [Exemplos de Uso](../../@rainer-design-tokens/EXAMPLES.md)
- [Arquitetura](../../@rainer-design-tokens/docs/ARCHITECTURE.md)

## 🚀 Próximos Passos

1. ✅ Configuração Tailwind integrada
2. ✅ Variáveis CSS atualizadas
3. 🔄 Refatoração de componentes (em andamento)
4. ⏳ Testes de integração
5. ⏳ Documentação de componentes

## 💡 Dicas

- Use `cn()` do `@/lib/utils` para combinar classes
- Prefira tokens semânticos para elementos que mudam com o tema
- Use tokens primitivos para elementos com cor fixa
- Consulte a documentação da biblioteca para tokens disponíveis
- Use TypeScript para autocomplete e type-safety

## 🐛 Troubleshooting

### Cores não aparecem

Verifique se a biblioteca está instalada:
```bash
npm list @rainer/design-tokens
```

### Autocomplete não funciona

Reinicie o TypeScript server no VS Code:
`Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Build falha

Certifique-se de que a biblioteca está compilada:
```bash
cd ../\@rainer-design-tokens
npm run build
```

