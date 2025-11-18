# Guia de Refatoração - Design Tokens

## 📋 Visão Geral

Este guia fornece padrões e exemplos para refatorar componentes existentes para usar os design tokens da biblioteca `@rainer/rainer-design-tokens`.

## 🎯 Objetivos

- Remover cores hardcoded
- Usar tokens semânticos para elementos que mudam com o tema
- Usar cores primitivas para elementos com cor fixa
- Manter consistência visual
- Melhorar manutenibilidade

## 🔄 Padrões de Refatoração

### 1. Cores de Background

#### ❌ Antes (Hardcoded)

```tsx
<div className="bg-[#0891b2]">
```

#### ✅ Depois (Tokens)

```tsx
// Opção 1: Cor primitiva (cor fixa)
<div className="bg-cyan-600">

// Opção 2: Cor semântica (adapta ao tema)
<div className="bg-primary">
```

### 2. Cores de Texto

#### ❌ Antes

```tsx
<p className="text-[#171717] dark:text-[#fafafa]">
```

#### ✅ Depois

```tsx
// Cor semântica que adapta automaticamente
<p className="text-foreground">
```

### 3. Cores de Borda

#### ❌ Antes

```tsx
<div className="border-[#e5e5e5] dark:border-[#262626]">
```

#### ✅ Depois

```tsx
<div className="border-border">
```

### 4. Gradientes

#### ❌ Antes

```tsx
<div className="bg-gradient-to-r from-[#0891b2] to-[#3b82f6]">
```

#### ✅ Depois

```tsx
// Opção 1: Usar cores primitivas
<div className="bg-gradient-to-r from-cyan-600 to-blue-500">

// Opção 2: Usar token de gradiente
import { GRADIENTS } from '@rainer/rainer-design-tokens';
<div className={GRADIENTS.PRIMARY}>
```

### 5. Sombras com Glow

#### ❌ Antes

```tsx
<div className="shadow-[0_0_20px_rgba(6,182,212,0.5)]">
```

#### ✅ Depois

```tsx
import { SHADOWS } from '@rainer/rainer-design-tokens';
<div className={cn(SHADOWS.LARGE, SHADOWS.GLOW_CYAN)}>
```

### 6. Espaçamentos

#### ❌ Antes

```tsx
<div className="p-[24px] m-[16px]">
```

#### ✅ Depois

```tsx
// Usar escala padrão do Tailwind (baseada em 0.25rem)
<div className="p-6 m-4">
```

### 7. Border Radius

#### ❌ Antes

```tsx
<div className="rounded-[12px]">
```

#### ✅ Depois

```tsx
import { BORDER_RADIUS } from '@rainer/rainer-design-tokens';
<div className={BORDER_RADIUS.XL}>
// ou
<div className="rounded-xl">
```

## 📦 Importações Comuns

```tsx
// Tokens legacy (classes Tailwind)
import {
  GRADIENTS,
  SHADOWS,
  BORDER_RADIUS,
  TRANSITIONS,
  BACKDROP_BLUR,
} from '@rainer/rainer-design-tokens';

// Cores primitivas (valores HEX)
import { COLOR_PRIMITIVES } from '@rainer/rainer-design-tokens';

// Cores semânticas (valores HEX)
import { SEMANTIC_COLORS } from '@rainer/rainer-design-tokens';

// Utilitário para combinar classes
import { cn } from '@/lib/utils';
```

## 🎨 Mapeamento de Cores

### Cores Semânticas (Adaptam ao Tema)

| Uso                  | Light Mode  | Dark Mode   | Classe Tailwind   |
| -------------------- | ----------- | ----------- | ----------------- |
| Background principal | neutral-50  | neutral-950 | `bg-background`   |
| Texto principal      | neutral-900 | neutral-50  | `text-foreground` |
| Cor primária         | cyan-600    | cyan-400    | `bg-primary`      |
| Card                 | white       | neutral-900 | `bg-card`         |
| Borda                | neutral-200 | neutral-800 | `border-border`   |
| Muted                | neutral-100 | neutral-800 | `bg-muted`        |

### Cores Primitivas (Cor Fixa)

| Paleta    | Uso Recomendado            | Exemplo          |
| --------- | -------------------------- | ---------------- |
| `cyan`    | Primária, links, destaques | `bg-cyan-500`    |
| `purple`  | Secundária, badges         | `bg-purple-500`  |
| `pink`    | Accent, CTAs               | `bg-pink-500`    |
| `blue`    | Informação                 | `bg-blue-500`    |
| `green`   | Sucesso                    | `bg-green-500`   |
| `red`     | Erro, destrutivo           | `bg-red-500`     |
| `amber`   | Aviso                      | `bg-amber-500`   |
| `orange`  | Destaque                   | `bg-orange-500`  |
| `emerald` | Sucesso alternativo        | `bg-emerald-500` |
| `neutral` | Cinzas                     | `bg-neutral-500` |

## 🔍 Exemplos Práticos

### Exemplo 1: Card com Glassmorphism

#### ❌ Antes

```tsx
<div className="bg-white/60 dark:bg-black/50 backdrop-blur-xl border border-gray-200/50 dark:border-cyan-400/20">
```

#### ✅ Depois

```tsx
import { CARD } from '@rainer/rainer-design-tokens';
<div className={cn(
  CARD.BACKGROUND,
  CARD.BACKDROP,
  CARD.BORDER
)}>
```

### Exemplo 2: Botão com Gradiente

#### ❌ Antes

```tsx
<button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl">
```

#### ✅ Depois

```tsx
import { GRADIENTS, SHADOWS, TRANSITIONS } from '@rainer/rainer-design-tokens';
<button className={cn(
  'bg-gradient-to-r from-cyan-500 to-blue-600',
  'text-white',
  SHADOWS.LARGE,
  'hover:shadow-xl',
  TRANSITIONS.NORMAL
)}>
```

### Exemplo 3: Texto com Gradiente

#### ❌ Antes

```tsx
<h1 className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
```

#### ✅ Depois

```tsx
import { GRADIENTS } from '@rainer/rainer-design-tokens';
<h1 className={cn(
  GRADIENTS.TEXT_PRIMARY,
  'bg-clip-text text-transparent'
)}>
```

### Exemplo 4: Badge

#### ❌ Antes

```tsx
<span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-300 rounded-full">
```

#### ✅ Depois

```tsx
import { BADGE } from '@rainer/rainer-design-tokens';
<span className={cn(
  BADGE.GRADIENTS.BRAND,
  BADGE.BORDERS.BRAND,
  BADGE.PADDING.INLINE,
  'rounded-full'
)}>
```

## 🛠️ Ferramentas de Refatoração

### Script de Busca

Use este comando para encontrar cores hardcoded:

```bash
# Buscar cores HEX
grep -r "#[0-9a-fA-F]\{6\}" components/

# Buscar valores RGB/RGBA
grep -r "rgb\|rgba" components/

# Buscar valores HSL
grep -r "hsl\|hsla" components/
```

### Regex para Substituição

```regex
# Encontrar cores HEX em className
className="[^"]*#[0-9a-fA-F]{6}[^"]*"

# Encontrar bg-[#...]
bg-\[#[0-9a-fA-F]{6}\]

# Encontrar text-[#...]
text-\[#[0-9a-fA-F]{6}\]
```

## ✅ Checklist de Refatoração

Para cada componente:

- [ ] Importar tokens necessários
- [ ] Substituir cores hardcoded por cores primitivas
- [ ] Substituir cores que mudam com tema por cores semânticas
- [ ] Substituir gradientes inline por tokens de gradiente
- [ ] Substituir sombras customizadas por tokens de sombra
- [ ] Substituir espaçamentos arbitrários por escala padrão
- [ ] Testar em light mode
- [ ] Testar em dark mode
- [ ] Verificar responsividade
- [ ] Atualizar documentação do componente

## 🎯 Priorização

### Alta Prioridade

1. Componentes de UI base (Button, Card, Input)
2. Layout components (Header, Footer, Sidebar)
3. Páginas principais (Home, About, Contact)

### Média Prioridade

4. Componentes de seção (Hero, Stats, Features)
5. Componentes de conteúdo (Blog, Projects)

### Baixa Prioridade

6. Componentes utilitários
7. Componentes de teste

## 📚 Recursos

- [Documentação da Biblioteca](../../@rainer-design-tokens/README.md)
- [Integração de Design Tokens](./DESIGN_TOKENS_INTEGRATION.md)
- [Exemplos de Uso](../../@rainer-design-tokens/EXAMPLES.md)

## 💡 Dicas

1. **Comece pelos componentes base**: Refatore primeiro os componentes mais reutilizados
2. **Teste incrementalmente**: Refatore um componente por vez e teste
3. **Use TypeScript**: Aproveite o autocomplete para descobrir tokens disponíveis
4. **Documente mudanças**: Adicione comentários explicando o mapeamento de cores
5. **Mantenha consistência**: Use o mesmo padrão em todos os componentes

## 🐛 Problemas Comuns

### Cor não muda com o tema

**Problema**: Usei cor primitiva onde deveria usar semântica

```tsx
<div className="bg-cyan-600"> // Sempre ciano
```

**Solução**: Use cor semântica

```tsx
<div className="bg-primary"> // Adapta ao tema
```

### Gradiente não funciona

**Problema**: Esqueci de adicionar direção do gradiente

```tsx
<div className={GRADIENTS.PRIMARY}> // Falta direção
```

**Solução**: Adicione direção

```tsx
import { GRADIENTS, GRADIENT_DIRECTIONS } from '@rainer/rainer-design-tokens';
<div className={cn(GRADIENT_DIRECTIONS.TO_RIGHT, GRADIENTS.PRIMARY)}>
```

### Sombra não aparece

**Problema**: Conflito de classes Tailwind

```tsx
<div className="shadow-lg shadow-cyan-500/20"> // Conflito
```

**Solução**: Use cn() para combinar

```tsx
import { cn } from '@/lib/utils';
<div className={cn('shadow-lg', 'shadow-cyan-500/20')}>
```
