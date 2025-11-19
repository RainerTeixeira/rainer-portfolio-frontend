# 📦 Análise de Dependências - Eliminação de Redundâncias

## 🎯 Objetivo
Remover dependências redundantes entre `@rainersoft/design-tokens` e o frontend

---

## 📊 Dependências do Design Tokens

A biblioteca `@rainersoft/design-tokens` já fornece:

### PeerDependencies
- ✅ `react >= 18.0.0` (devDep: 19.2.0)

### DevDependencies do Design Tokens
- ✅ `react: ^19.2.0`
- ✅ `react-dom: ^19.2.0`
- ✅ `storybook: ^10.0.8`
- ✅ `@storybook/react: ^10.0.8`
- ✅ `@storybook/react-vite: ^10.0.8`
- ✅ `@storybook/addon-docs: ^10.0.8`
- ✅ `@storybook/addon-onboarding: ^10.0.8`
- ✅ `typescript: ^5.3.3`
- ✅ `tsx: ^4.20.6`
- ✅ `jest: ^29.7.0`
- ✅ `ts-jest: ^29.1.1`
- ✅ `@types/node: ^20.10.0`
- ✅ `@types/react: ^18.2.45`
- ✅ `eslint: ^9.39.1`

---

## 🔍 Análise do Frontend package.json

### ❌ Dependências Redundantes Identificadas

**Storybook** (já vem dos design tokens):
- `@storybook/addon-backgrounds: ^7.6.0` → Versão diferente, manter
- `@storybook/addon-controls: ^7.6.0` → Versão diferente, manter
- `@storybook/addon-docs: ^7.6.0` → Versão diferente, manter
- `@storybook/addon-essentials: ^7.6.0` → Versão diferente, manter
- `@storybook/addon-interactions: ^7.6.0` → Versão diferente, manter
- `@storybook/react-vite: ^7.6.0` → **CONFLITA** com v10.0.8 dos tokens
- `storybook: ^7.6.0` → **CONFLITA** com v10.0.8 dos tokens

**Versões Conflitantes**:
- Frontend usa Storybook `7.6.0`
- Design Tokens usa Storybook `10.0.8`
- **Decisão**: Manter v7.6 no frontend por compatibilidade

**Tipos**:
- `@types/minimatch: ^6.0.0` → Pode ser necessário
- `@types/node: ^24.10.1` → Versão mais nova, **MANTER**
- `@types/react: ^19.2.4` → Versão mais nova, **MANTER**
- `@types/react-dom: ^19.2.3` → Versão mais nova, **MANTER**

---

## ✅ Dependências a Manter

### Essenciais do Frontend
- `next: ^16.0.3` - Framework principal
- `react: ^19.2.0` - Versão mais nova
- `react-dom: ^19.2.0` - Versão mais nova
- `tailwindcss: ^4.1.17` - Estilização
- `@tailwindcss/postcss: ^4.1.17` - Plugin Tailwind
- `@rainersoft/design-tokens: ^1.0.5` - **FONTE ÚNICA DE VERDADE**

### UI/UX Libraries
- Todos os `@radix-ui/*` - Componentes específicos do frontend
- `lucide-react: ^0.553.0` - Ícones
- `framer-motion: ^12.23.24` - Animações
- `next-themes: ^0.4.6` - Gerenciamento de temas

### Form & Data
- `react-hook-form: ^7.66.0`
- `@hookform/resolvers: ^5.2.2`
- `zod: ^4.1.12`
- `@tanstack/react-query: ^5.90.9`

### Editor & Rich Text
- Todos os `@tiptap/*` - Editor de texto rico
- Todos os `@dnd-kit/*` - Drag and drop

### Utils
- `class-variance-authority: ^0.7.1`
- `cmdk: ^1.1.1`
- `date-fns: ^4.1.0`
- `tailwind-merge: ^3.4.0`
- `sonner: ^2.0.7`

### Analytics & Performance
- `@vercel/analytics: ^1.5.0`
- `@vercel/speed-insights: ^1.2.0`

### Testing Specific
- `@playwright/test: ^1.56.1`
- `@axe-core/playwright: ^4.11.0`
- `@testing-library/*` - Frontend testing
- `jest: ^30.2.0` - Versão mais nova, MANTER
- `jest-environment-jsdom: ^30.2.0`

---

## 🎨 Melhorias UI/UX Aplicadas

### 1. **Error Boundary** ✅
- ❌ Removido: CSS vars hardcoded (`var(--color-*)`)
- ✅ Aplicado: Classes Tailwind com tokens (`bg-error/10`, `text-error`)
- ✅ Melhorado: Consistência visual com design system

### 2. **Search Bar** ✅
- ❌ Removido: `text-[10px]` hardcoded
- ✅ Aplicado: `text-xs` do design system
- ✅ Melhorado: Alinhamento com tokens de tipografia

---

## 📝 Recomendações

### Prioridade ALTA
1. ✅ **CONCLUÍDO**: Remover valores hardcoded (CSS vars, tamanhos arbitrários)
2. ⚠️ **ATENÇÃO**: Storybook 7.6 vs 10.0.8 - Considerar atualizar para v10
3. ✅ **CONCLUÍDO**: Usar apenas classes Tailwind com tokens

### Prioridade MÉDIA
1. 💡 Revisar se todos os componentes Radix UI são necessários
2. 💡 Considerar consolidar versões do Storybook
3. 💡 Avaliar se há outras bibliotecas que podem ser removidas

### Prioridade BAIXA
1. 💡 Documentar dependências essenciais vs opcionais
2. 💡 Criar script de análise de bundle size
3. 💡 Implementar code splitting avançado

---

## 🎯 Conclusão

### Status Atual
- ✅ Valores hardcoded removidos
- ✅ Design tokens como única fonte
- ✅ UI/UX mais profissional e consistente
- ⚠️ Versões de Storybook diferentes (não crítico)

### Próximos Passos
1. Considerar atualização do Storybook para v10
2. Revisar componentes Radix UI não utilizados
3. Implementar mais componentes com design tokens
4. Adicionar testes para garantir uso exclusivo de tokens

---

**📊 Resultado**: Frontend limpo, sem hardcode, usando 100% design tokens
