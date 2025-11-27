# Guia de Uso das Bibliotecas - Zero Hardcode

> **Objetivo**: Garantir que todo o código use as bibliotecas oficiais do ecossistema Rainer Portfolio sem valores hardcoded.

## 📦 Bibliotecas do Ecossistema

### 1. @rainersoft/design-tokens

**Versão**: 2.0.0+  
**Responsabilidade**: Design tokens centralizados (cores, espaçamentos, animações, breakpoints, z-index)

#### ✅ Uso Correto

```typescript
// Importar tokens específicos
import { BACKGROUND, GRADIENT_DIRECTIONS, motionTokens } from '@rainersoft/design-tokens';

// Usar em className
<div className={cn(BACKGROUND.GRADIENT_OVERLAY, 'blur-3xl')} />

// Usar em estilos dinâmicos com Framer Motion
transition={{
  duration: Number(motionTokens.duration.normal.replace('ms', '')) / 1000,
  ease: motionTokens.easing.easeInOut as any
}}
```

#### ❌ NÃO Fazer

```typescript
// NÃO usar valores hardcoded
<div className="bg-gradient-to-r from-cyan-500 to-purple-600" />

// NÃO duplicar tokens
const MY_COLORS = {
  primary: '#0891b2', // Duplicação de token
}
```

#### 📚 Tokens Disponíveis

- **Cores**: Importar via Tailwind (automático via config)
- **Motion**: `motionTokens` (durations, easings, delays)
- **Breakpoints**: `breakpointTokens` (xs, sm, md, lg, xl, 2xl, 3xl)
- **Z-Index**: `zIndexTokens` (background, base, content, overlay, dropdown, modal, tooltip, notification)
- **Backgrounds**: `BACKGROUND` (GRADIENT_OVERLAY, PREMIUM_DIVIDER_LINE, etc.)
- **Gradientes**: `GRADIENT_DIRECTIONS` (TO_R, TO_BR, TO_B, etc.)

---

### 2. @rainersoft/ui

**Versão**: 1.0.0+  
**Responsabilidade**: Componentes UI reutilizáveis (shadcn/ui style)

#### ✅ Uso Correto

```bash
# Adicionar componentes via CLI
npx @rainersoft/ui add button card dialog avatar badge
```

```typescript
// Importar componentes copiados
import { Button } from '@rainersoft/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@rainersoft/ui';

// Usar normalmente
<Button variant="default" size="lg">
  Meu Botão
</Button>
```

#### ❌ NÃO Fazer

```typescript
// NÃO criar componentes duplicados
// Exemplo: components/ui/my-button.tsx se já existe Button no @rainersoft/ui

// NÃO hardcodar estilos que já existem nos componentes
<button className="px-4 py-2 bg-blue-500 rounded-md">
  Botão
</button>
```

#### 📚 Componentes Disponíveis

Execute `npx @rainersoft/ui list` para ver todos os componentes.

Principais:
- **Actions**: Button, IconButton
- **Data Display**: Card, Badge, Avatar, Table
- **Feedback**: Alert, Toast, Dialog, Drawer
- **Forms**: Input, Textarea, Select, Checkbox, Radio
- **Layout**: Container, Grid, Flex, Divider
- **Navigation**: Tabs, Breadcrumb, Pagination
- **Effects**: Tooltip, Popover, Dropdown

---

### 3. Auth Provider (Backend Cognito + API)

**Arquivo**: `components/providers/auth-context-provider.tsx`  
**Responsabilidade**: Backend cuida de toda lógica de auth

#### ✅ Uso Correto

```typescript
// Importar o hook correto
import { useAuthContext } from '@/components/providers/auth-context-provider';

function MyComponent() {
  const { user, isAuthenticated, loading, login, logout } = useAuthContext();

  // Acessar campos do UserProfile
  const displayName = user?.fullName || user?.nickname;
  const userId = user?.cognitoSub || user?.id;
  
  return <div>{displayName}</div>;
}
```

#### ❌ NÃO Fazer

```typescript
// NÃO criar lógica de auth duplicada
// NÃO usar localStorage direto para auth
// NÃO validar JWT no frontend

// NUNCA importar do provider antigo (removido):
import { useAuth } from '@/components/providers/auth-provider'; // ❌
```

#### 📚 Campos do UserProfile

```typescript
interface UserProfile {
  id: string;              // MongoDB ID
  cognitoSub: string;      // Cognito ID único (use para authorId, etc.)
  email: string;           // Email (Cognito)
  emailVerified: boolean;  // Status de verificação
  nickname: string;        // Nickname (Cognito)
  fullName: string;        // Nome completo
  avatar?: string;         // URL do avatar
  bio?: string;            // Biografia
  website?: string;        // Website pessoal
  role: UserRole;          // ADMIN | EDITOR | AUTHOR | SUBSCRIBER
  isActive: boolean;
  isBanned: boolean;
  postsCount: number;
  commentsCount: number;
}
```

---

## 🎯 Constantes Centralizadas

Toda string/conteúdo deve estar em `constants/`:

```typescript
// ✅ Correto
import { DESENVOLVEDOR, SITE_CONFIG } from '@/constants';
<h1>{SITE_CONFIG.name}</h1>

// ❌ Errado
<h1>Meu Portfolio</h1>
```

### Estrutura de Constantes

```
constants/
├── comum/
│   ├── desenvolvedor.ts  # DESENVOLVEDOR, BIO, METRICAS
│   ├── seo.ts            # PALAVRAS_CHAVE, META_PADRAO
│   ├── social.ts         # REDES_SOCIAIS, CONTATO
│   ├── navegacao.ts      # SECTION_IDS, NAVEGACAO
│   └── site.ts           # SITE_CONFIG, COPYRIGHT
├── home/
│   ├── hero.ts           # CONTEUDO_HERO
│   ├── servicos.ts       # SERVICOS, DIFERENCIAIS
│   └── portfolio.ts      # PROJETOS
├── blog/
│   └── categorias.ts     # CATEGORIAS, TAGS
└── contato/
    ├── formulario.ts     # CAMPOS_FORMULARIO
    └── faq.ts            # FAQ
```

---

## 🔍 Checklist Anti-Hardcode

Antes de fazer commit, verifique:

- [ ] Todas as cores vêm de `@rainersoft/design-tokens` ou Tailwind
- [ ] Todos os componentes UI vêm de `@rainersoft/ui`
- [ ] Nenhuma string de conteúdo está hardcoded (usar `constants/`)
- [ ] Auth usa `useAuthContext` do provider real
- [ ] Nenhum valor de spacing/sizing está hardcoded (usar tokens)
- [ ] Classes de gradiente usam `bg-linear-to-*` (não `bg-gradient-to-*`)

---

## 🚀 Comandos Úteis

```bash
# Ver tokens disponíveis
cat node_modules/@rainersoft/design-tokens/formats/tokens.json

# Ver componentes UI disponíveis
npx @rainersoft/ui list

# Adicionar componente UI
npx @rainersoft/ui add <component-name>

# Verificar imports incorretos
grep -r "from '@/components/providers/auth-provider'" --include="*.tsx" --include="*.ts"
```

---

## 📖 Documentação Adicional

- **Design Tokens**: `node_modules/@rainersoft/design-tokens/README.md`
- **Rainer UI**: `node_modules/@rainersoft/ui/README.md`
- **Auth Backend**: `../rainer-portfolio-backend/docs/GUIA_AUTH.md`

---

**Última atualização**: 25/11/2025  
**Autor**: Rainer Teixeira
