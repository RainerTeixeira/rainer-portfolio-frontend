# 🤝 Guia de Contribuição

## 👋 Bem-vindo

Obrigado pelo interesse em contribuir com o projeto! Este guia fornece todas as informações necessárias para contribuir de forma efetiva.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Processo de Desenvolvimento](#processo-de-desenvolvimento)
4. [Padrões de Código](#padrões-de-código)
5. [Commits e Pull Requests](#commits-e-pull-requests)
6. [Testes e Qualidade](#testes-e-qualidade)
7. [Documentação](#documentação)

---

## 📜 Código de Conduta

### Princípios

- ✅ Seja respeitoso e profissional
- ✅ Aceite feedback construtivo
- ✅ Foque no que é melhor para o projeto
- ✅ Mostre empatia com outros contribuidores

### Comportamentos Esperados

- Linguagem acolhedora e inclusiva
- Respeito a pontos de vista diferentes
- Aceitar críticas construtivas
- Foco no bem da comunidade

### Comportamentos Inaceitáveis

- Uso de linguagem sexualizada ou imagens
- Comentários depreciativos ou ataques pessoais
- Assédio público ou privado
- Publicar informações privadas de terceiros

---

## 🚀 Como Contribuir

### Tipos de Contribuição

| Tipo | Descrição | Dificuldade |
|------|-----------|-------------|
| **🐛 Bug Reports** | Reportar problemas encontrados | Fácil |
| **💡 Feature Requests** | Sugerir novas funcionalidades | Fácil |
| **📝 Documentação** | Melhorar docs e comentários | Fácil |
| **🎨 Design** | Melhorias visuais e UX | Média |
| **⚡ Performance** | Otimizações | Média |
| **🔧 Bug Fixes** | Corrigir bugs existentes | Média |
| **✨ Features** | Implementar novas features | Difícil |
| **🏗️ Refactoring** | Melhorias arquiteturais | Difícil |

---

## 🔄 Processo de Desenvolvimento

### 1. Setup do Ambiente

```bash
# 1. Fork o repositório no GitHub
# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/rainer-portfolio-frontend.git
cd rainer-portfolio-frontend

# 3. Adicione o repositório original como upstream
git remote add upstream https://github.com/rainerteixeira/rainer-portfolio-frontend.git

# 4. Instale dependências
npm install

# 5. Configure variáveis de ambiente
cp env.local .env.local

# 6. Inicie desenvolvimento
npm run dev
```

### 2. Sincronizar com Upstream

```bash
# Buscar mudanças do upstream
git fetch upstream

# Atualizar sua branch main
git checkout main
git merge upstream/main

# Push para seu fork
git push origin main
```

### 3. Criar Nova Branch

```bash
# Criar branch para feature/fix
git checkout -b tipo/nome-descritivo

# Exemplos:
git checkout -b feature/add-search-filter
git checkout -b fix/navbar-mobile-menu
git checkout -b docs/improve-readme
git checkout -b refactor/extract-constants
```

**Convenção de nomes**:

- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Documentação
- `refactor/` - Refatoração
- `perf/` - Performance
- `test/` - Testes
- `chore/` - Manutenção

### 4. Fazer Alterações

```bash
# Editar arquivos
# Seguir padrões de código (ver seção abaixo)

# Verificar mudanças
git status
git diff

# Adicionar arquivos
git add .

# Commit (ver seção de commits)
git commit -m "tipo: descrição"
```

### 5. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-descritivo

# Abrir Pull Request no GitHub
# - Ir para seu fork no GitHub
# - Clicar em "Compare & pull request"
# - Preencher template de PR
# - Aguardar review
```

---

## 🎨 Padrões de Código

### Estrutura de Componente

**SEMPRE seguir esta estrutura**:

```typescript
/**
 * Component Name
 * 
 * Descrição do componente
 * 
 * @fileoverview Descrição curta
 * @author Seu Nome
 * @version 1.0.0
 */

'use client' // Se necessário

// ============================================================================
// React & Next.js
// ============================================================================

import { useState } from 'react'
import Link from 'next/link'

// ============================================================================
// Third-party Libraries
// ============================================================================

import { motion } from 'framer-motion'

// ============================================================================
// Components
// ============================================================================

import { Button } from '@/components/ui/button'

// ============================================================================
// Hooks & Utils
// ============================================================================

import { useAnalytics } from '@/hooks/use-analytics'
import { cn } from '@/lib/utils'

// ============================================================================
// Constants
// ============================================================================

import { FEATURE_FLAGS } from '@/constants/design-tokens'

const LOCAL_CONSTANT = 10 as const

// ============================================================================
// Types
// ============================================================================

interface ComponentProps {
  readonly prop: string
}

// ============================================================================
// Main Component
// ============================================================================

export function Component({ prop }: ComponentProps) {
  // Hooks
  // State
  // Effects
  // Handler Functions
  // Computed Values
  // Render Guards
  // Render
  
  return <div>{prop}</div>
}
```

### Nomenclatura

#### Variáveis

```typescript
// ✅ Boolean
const isLoading = true
const hasError = false
const shouldShow = true
const canEdit = false

// ✅ Arrays
const allPosts = []
const filteredItems = []
const sortedData = []

// ✅ Objetos
const currentUser = {}
const selectedItem = {}
const activePost = {}
```

#### Funções

```typescript
// ✅ Event handlers
const handleClick = () => {}
const handleSubmit = () => {}

// ✅ Async operations
const loadData = async () => {}
const fetchPosts = async () => {}

// ✅ Pure functions
const calculateTotal = () => {}
const formatDate = () => {}

// ✅ State changers
const startLoading = () => {}
const stopEditing = () => {}
```

#### Constantes

```typescript
// ✅ UPPERCASE_SNAKE_CASE
const MAX_ITEMS = 10
const API_ENDPOINT = '/api/data'
const DEFAULT_THEME = 'dark'
```

### TypeScript

```typescript
// ✅ Sempre usar interfaces com readonly
interface Props {
  readonly id: string
  readonly optional?: number
}

// ✅ Usar types para unions
type Status = 'idle' | 'loading' | 'success' | 'error'

// ✅ Usar as const
const OPTIONS = ['a', 'b', 'c'] as const

// ❌ Nunca usar any
const data: any = {}  // NUNCA FAZER ISSO

// ✅ Usar unknown + type guard
const data: unknown = {}
if (isValidData(data)) {
  // TypeScript sabe que é válido
}
```

### Design Tokens

```typescript
// ✅ SEMPRE usar design tokens
import { SCROLL_THRESHOLDS, Z_INDEX } from '@/constants/design-tokens'
const threshold = SCROLL_THRESHOLDS.BACK_TO_TOP

// ❌ NUNCA hardcode
const threshold = 300  // NÃO FAZER
```

---

## 📝 Commits e Pull Requests

### Conventional Commits

**Formato**: `tipo(escopo): descrição`

#### Tipos

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(blog): adiciona sistema de likes` |
| `fix` | Correção de bug | `fix(navbar): corrige menu mobile` |
| `docs` | Documentação | `docs(readme): atualiza instruções` |
| `style` | Formatação | `style(button): ajusta espaçamento` |
| `refactor` | Refatoração | `refactor(auth): extrai constantes` |
| `perf` | Performance | `perf(images): otimiza lazy loading` |
| `test` | Testes | `test(utils): adiciona testes unitários` |
| `chore` | Manutenção | `chore(deps): atualiza dependências` |

#### Exemplos de Commits

```bash
# ✅ BOM
git commit -m "feat(dashboard): adiciona gráfico de views"
git commit -m "fix(contact): valida email corretamente"
git commit -m "docs(api): documenta endpoints REST"
git commit -m "refactor(hero): extrai constantes hardcoded"

# ❌ RUIM
git commit -m "updates"
git commit -m "fixed stuff"
git commit -m "WIP"
git commit -m "asdf"
```

### Template de Pull Request

```markdown
## 📝 Descrição

Breve descrição do que foi alterado e por quê.

## 🎯 Tipo de Mudança

- [ ] 🐛 Bug fix (mudança não-destrutiva que corrige um problema)
- [ ] ✨ Nova feature (mudança não-destrutiva que adiciona funcionalidade)
- [ ] 💥 Breaking change (fix ou feature que quebra funcionalidade existente)
- [ ] 📝 Documentação (mudança apenas em documentação)

## ✅ Checklist

- [ ] Código segue style guide do projeto
- [ ] Realizei self-review do código
- [ ] Comentei código em áreas complexas
- [ ] Atualizei documentação correspondente
- [ ] Minhas mudanças não geram warnings
- [ ] Adicionei testes que provam que meu fix funciona
- [ ] Testes novos e existentes passam localmente
- [ ] `npm run lint` passa sem erros
- [ ] `npm run type-check` passa sem erros
- [ ] `npm run build` completa com sucesso

## 📸 Screenshots (se aplicável)

Adicione screenshots antes/depois para mudanças visuais.

## 🧪 Como Testar

1. Passo 1
2. Passo 2
3. Resultado esperado

## 📚 Contexto Adicional

Informações adicionais relevantes.
```

---

## 🧪 Testes e Qualidade

### Antes de Submeter PR

#### 1. Linting

```bash
# Verificar erros
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

**Target**: Zero erros

#### 2. Type Checking

```bash
npm run type-check
```

**Target**: Zero erros de tipo

#### 3. Build

```bash
npm run build
```

**Target**: Build successful

#### 4. Formatação

```bash
# Verificar
npm run format:check

# Corrigir
npm run format
```

#### 5. SonarQube (Opcional mas recomendado)

```bash
# Análise local
npm run sonar:local
```

**Target**:

- Rating A ou B
- Zero vulnerabilidades críticas
- Zero bugs críticos

---

## 📚 Documentação

### JSDoc Obrigatório

**Para componentes**:

```typescript
/**
 * My Component
 * 
 * Descrição do que o componente faz.
 * 
 * Características:
 * - Feature 1
 * - Feature 2
 * 
 * @param {Props} props - Propriedades do componente
 * @returns {JSX.Element} Componente renderizado
 * 
 * @example
 * ```tsx
 * <MyComponent prop="value" />
 * ```
 */
export function MyComponent({ prop }: Props) {
  // ...
}
```

**Para hooks**:

```typescript
/**
 * Hook customizado para [propósito]
 * 
 * @param {string} param - Descrição do parâmetro
 * @returns {Object} Estado e funções
 * 
 * @example
 * ```tsx
 * const { state, action } = useMyHook('value')
 * ```
 */
export function useMyHook(param: string) {
  // ...
}
```

**Para funções**:

```typescript
/**
 * Calcula algo importante
 * 
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} Resultado do cálculo
 */
export function calculate(a: number, b: number): number {
  return a + b
}
```

---

## 🎯 Checklist de Qualidade

### Para Cada Contribuição

- [ ] ✅ Código segue estrutura padrão
- [ ] ✅ Imports organizados em seções
- [ ] ✅ Constantes extraídas (design tokens)
- [ ] ✅ Types com `readonly`
- [ ] ✅ JSDoc completo
- [ ] ✅ Nomes semânticos
- [ ] ✅ Error handling
- [ ] ✅ Loading states
- [ ] ✅ Analytics tracking (se aplicável)
- [ ] ✅ Validation (se form)
- [ ] ✅ Acessibilidade (ARIA)
- [ ] ✅ Comentários em português
- [ ] ✅ Zero erros de lint
- [ ] ✅ Zero erros de tipo
- [ ] ✅ Build successful
- [ ] ✅ Testado light/dark mode
- [ ] ✅ Testado mobile/desktop

---

## 🐛 Reportando Bugs

### Template de Issue

```markdown
**Descrição do Bug**
Descrição clara e concisa do que é o bug.

**Como Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Scroll até '...'
4. Veja o erro

**Comportamento Esperado**
Descrição do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 120]
 - Versão: [e.g. 1.0.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

---

## 💡 Sugerindo Features

### Template de Feature Request

```markdown
**Problema que resolve**
Descrição clara do problema ou necessidade.

**Solução proposta**
Como você gostaria que fosse implementado.

**Alternativas consideradas**
Outras soluções que você considerou.

**Contexto adicional**
Screenshots, mockups, referências.
```

---

## 🔍 Code Review Process

### O que revisamos

1. **Funcionalidade**
   - Feature funciona como esperado?
   - Edge cases tratados?
   - Sem bugs óbvios?

2. **Código**
   - Segue padrões do projeto?
   - Legível e manutenível?
   - Sem duplicação?

3. **Performance**
   - Otimizado?
   - Sem memory leaks?
   - Lazy loading quando apropriado?

4. **Testes**
   - Cobertura adequada?
   - Casos de uso testados?

5. **Documentação**
   - JSDoc presente?
   - README atualizado?
   - Exemplos claros?

### Tempo de Review

- **Simple changes**: 1-2 dias
- **Medium changes**: 3-5 dias
- **Complex changes**: 1 semana+

---

## 🎓 Recursos para Contribuidores

### Documentação do Projeto

| Documento | Propósito |
|-----------|-----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Entender arquitetura |
| [DEVELOPER-GUIDE.md](./DEVELOPER-GUIDE.md) | Como desenvolver |
| [TECH-STACK.md](./TECH-STACK.md) | Tecnologias usadas |
| [ENTERPRISE-FEATURES.md](./ENTERPRISE-FEATURES.md) | Features avançadas |

### External Resources

| Recurso | Link |
|---------|------|
| Next.js Docs | <https://nextjs.org/docs> |
| React Docs | <https://react.dev/learn> |
| TypeScript Handbook | <https://www.typescriptlang.org/docs/handbook/> |
| Tailwind Docs | <https://tailwindcss.com/docs> |
| Conventional Commits | <https://www.conventionalcommits.org/> |

---

## ❓ Dúvidas?

### Onde Pedir Ajuda

1. **GitHub Issues** - Para bugs e features
2. **GitHub Discussions** - Para perguntas gerais
3. **Email** - <suporte@rainersoft.com.br>

### FAQ

**P: Posso trabalhar em múltiplas features ao mesmo tempo?**
R: Recomendamos uma feature por vez, uma branch por feature.

**P: Quanto tempo leva para review?**
R: Depende da complexidade, mas geralmente 1-5 dias.

**P: E se meu PR for rejeitado?**
R: Feedback será fornecido. Faça ajustes e resubmeta.

**P: Posso refatorar código existente?**
R: Sim, mas abra issue primeiro para discutir.

**P: Preciso adicionar testes?**
R: Altamente recomendado, especialmente para features novas.

---

## 🏆 Reconhecimento

Contribuidores serão:

- ✅ Listados no README
- ✅ Mencionados no CHANGELOG
- ✅ Creditados nos commits

---

## 📞 Contato

- **Email**: <suporte@rainersoft.com.br>
- **GitHub**: [@rainerteixeira](https://github.com/rainerteixeira)

---

**Obrigado por contribuir! 🎉**

_Última atualização: Outubro 2025_
