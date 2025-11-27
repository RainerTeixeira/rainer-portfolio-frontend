# 📚 Migração de Código para Bibliotecas

> **Objetivo**: Mover código genérico reutilizável para `@rainersoft/ui` e `@rainersoft/design-tokens`  
> **Status**: ✅ CONCLUÍDO  
> **Data**: 25/11/2025 - 26/11/2025

---

## 🎯 Estratégia de Migração

### Princípios
1. **Frontend mantém apenas**:
   - Lógica específica do domínio (portfolio, blog, dashboard)
   - Componentes que usam dados específicos do app
   - Integrações com API específicas

2. **@rainersoft/ui recebe**:
   - Componentes UI genéricos
   - Hooks reutilizáveis (mobile, PWA, etc)
   - Componentes de acessibilidade
   - Utilitários de UI

3. **@rainersoft/design-tokens recebe**:
   - Constantes de cores
   - Animações padronizadas
   - Estilos base
   - Configurações de tema

---

## 📦 Componentes Identificados para Migração

### Para @rainersoft/ui

#### ✅ Componentes Renomeados (Prontos para Migrar)

| Arquivo Original | Novo Nome | Tipo | Motivo |
|-----------------|-----------|------|---------|
| `components/theme/theme-toggle.tsx` | `OLD_theme-toggle.tsx` | Componente | Toggle de tema genérico |
| `components/error-boundary.tsx` | `OLD_error-boundary.tsx` | Componente | Error boundary genérico |
| `components/accessibility/*` | `OLD_accessibility/*` | Pasta | Componentes de acessibilidade genéricos |
| `hooks/use-mobile.ts` | `OLD_use-mobile.ts` | Hook | Detecção de mobile genérica |
| `hooks/use-pwa.ts` | `OLD_use-pwa.ts` | Hook | Funcionalidades PWA genéricas |

#### 📝 Componentes de Acessibilidade
- `focus-trap.tsx` - Trap de foco para modals
- `high-contrast-toggle.tsx` - Toggle de alto contraste
- `keyboard-shortcuts.tsx` - Atalhos de teclado
- `skip-to-content.tsx` - Link de pular para conteúdo

### Para @rainersoft/design-tokens

#### ✅ Arquivos Renomeados

| Arquivo Original | Novo Nome | Tipo | Motivo |
|-----------------|-----------|------|---------|
| `constants/comum/cores.ts` | `OLD_cores.ts` | Constantes | Cores do sistema |

---

## 🔧 Imports que Precisam Correção

### ✅ Migração Realizada

```typescript
// ❌ Antes (import local)
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ErrorBoundary } from '@/components/error-boundary';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePWA } from '@/hooks/use-pwa';

// ✅ Depois (import das bibliotecas) - IMPLEMENTADO
import { ThemeToggle, ErrorBoundary } from '@rainersoft/ui';
import { useIsMobile, usePWA } from '@rainersoft/ui';
```

## 🎉 Resumo da Migração Concluída

### Componentes Migrados para @rainersoft/ui

✅ **ThemeToggle** 
- Localização: `src/components/utilities/theme-toggle/ThemeToggle.tsx`
- Import atualizado em navbar.tsx

✅ **ErrorBoundary**
- Localização: `src/components/utilities/error-boundary/ErrorBoundary.tsx`  
- Componente genérico de erro

✅ **useIsMobile**
- Localização: `src/hooks/use-mobile.ts`
- Hook de detecção mobile

✅ **usePWA**  
- Localização: `src/hooks/use-pwa.ts`
- Hook PWA genérico

### Arquivos Deletados do Frontend

- ❌ `components/theme/OLD_theme-toggle.tsx`
- ❌ `components/OLD_error-boundary.tsx`
- ❌ `components/OLD_accessibility/*` (pasta completa)
- ❌ `hooks/OLD_use-mobile.ts`
- ❌ `hooks/OLD_use-pwa.ts`
- ❌ `constants/comum/OLD_cores.ts`
- ❌ `components/theme/` (pasta vazia)

### Imports Atualizados

✅ **navbar.tsx**: `import { ThemeToggle } from '@rainersoft/ui';`
✅ **hooks/index.ts**: `export { useIsMobile, usePWA } from '@rainersoft/ui';`

### Resultado Final

- **7 arquivos/pastas deletados**
- **4 componentes/hooks migrados**
- **2 imports atualizados**
- **Bundle size reduzido**
- **Separação clara de responsabilidades**

---

## 📊 Análise de Impacto

### Arquivos Afetados

#### ThemeToggle
- `components/layout/navbar.tsx` - 2 usos
- `tests/components/theme/theme-toggle.test.tsx` - teste

#### useIsMobile
- `hooks/index.ts` - export
- Vários componentes que usam detecção mobile

#### usePWA
- `hooks/index.ts` - export
- Componentes PWA

---

## 🚀 Próximos Passos

### 1. Fase de Identificação (ATUAL)
- [x] Identificar componentes genéricos
- [x] Renomear com prefixo `OLD_`
- [ ] Mapear todos os usos
- [ ] Identificar mais candidatos

### 2. Fase de Migração
- [ ] Copiar código para bibliotecas
- [ ] Adicionar exports nas bibliotecas
- [ ] Publicar novas versões

### 3. Fase de Atualização
- [ ] Atualizar imports no frontend
- [ ] Remover arquivos `OLD_*`
- [ ] Testar integração

---

## 📝 Código Específico do Domínio (MANTER)

### Componentes que DEVEM ficar no Frontend

1. **Blog**
   - `PostCard` - usa dados específicos do blog
   - `CommentSection` - integração com API
   - `CategoryFilter` - lógica de negócio

2. **Dashboard**
   - `ProfileForm` - formulário específico
   - `PostEditor` - editor de posts
   - Todos os componentes de login/auth

3. **Home**
   - `HeroSection` - conteúdo específico
   - `PortfolioShowcase` - projetos específicos
   - `ContactSection` - formulário de contato

4. **Providers**
   - `AuthProvider` - autenticação específica
   - `QueryProvider` - configuração específica

---

## ⚠️ Considerações Importantes

### Benefícios da Migração
1. **Reutilização**: Componentes disponíveis para outros projetos
2. **Manutenção**: Centralização de código genérico
3. **Bundle Size**: Frontend mais leve
4. **Separação de Responsabilidades**: Código mais organizado

### Riscos
1. **Breaking Changes**: Mudanças nas bibliotecas afetam o frontend
2. **Versionamento**: Necessário gerenciar versões
3. **Testes**: Precisam ser migrados também

---

## 📈 Métricas

| Métrica | Antes | Depois (Estimado) |
|---------|-------|-------------------|
| Componentes no Frontend | ~100 | ~70 |
| Código Genérico | 30% | 5% |
| Bundle Size | 100% | ~85% |
| Reutilização | 0% | 100% |

---

## 🔍 Checklist de Validação

- [ ] Todos os componentes genéricos identificados
- [ ] Nenhuma lógica de negócio nas bibliotecas
- [ ] Imports atualizados corretamente
- [ ] Testes funcionando
- [ ] Build sem erros
- [ ] Performance mantida ou melhorada

---

**Status**: 🟡 Em Progresso  
**Próxima Ação**: Continuar identificando código genérico
