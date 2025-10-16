# 🔧 Guia de Solução de Problemas (Troubleshooting)

## 📋 Índice

1. [Problemas de Instalação](#problemas-de-instalação)
2. [Erros de Build](#erros-de-build)
3. [Erros de Runtime](#erros-de-runtime)
4. [Problemas de Performance](#problemas-de-performance)
5. [Erros de TypeScript](#erros-de-typescript)
6. [Problemas com PWA](#problemas-com-pwa)
7. [SonarQube Issues](#sonarqube-issues)
8. [Deploy Issues](#deploy-issues)

---

## 🔧 Problemas de Instalação

### ❌ `npm install` falha

#### Erro: EACCES permission denied

**Causa**: Permissões insuficientes

**Solução**:

```bash
# Não use sudo! Fix de permissões npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Tente novamente
npm install
```

#### Erro: Cannot find module

**Causa**: node_modules corrompido

**Solução**:

```bash
# Limpar tudo
rm -rf node_modules
rm package-lock.json

# Reinstalar
npm install
```

#### Erro: peer dependency

**Causa**: Versões incompatíveis

**Solução**:

```bash
# Forçar instalação (use com cuidado)
npm install --legacy-peer-deps

# Ou atualizar package conflitante
npm install package@latest
```

---

### ❌ Node version incompatível

**Erro**: `The engine "node" is incompatible`

**Solução**:

```bash
# Verificar versão atual
node --version

# Instalar versão correta (18.x ou 20.x)
# Windows (nvm-windows)
nvm install 20
nvm use 20

# Linux/Mac (nvm)
nvm install 20
nvm use 20
```

---

## 🏗️ Erros de Build

### ❌ `npm run build` falha

#### Erro: Type error in file.tsx

**Causa**: Erro de tipagem TypeScript

**Solução**:

```bash
# 1. Verificar erros específicos
npm run type-check

# 2. Corrigir os erros mostrados
# 3. Rebuildar
npm run build
```

**Erros comuns**:

```typescript
// ❌ ERRO: Property 'x' does not exist
const value = obj.x

// ✅ SOLUÇÃO: Type guard ou optional chaining
const value = obj?.x
const value = 'x' in obj ? obj.x : undefined
```

#### Erro: Module not found

**Causa**: Import path incorreto

**Solução**:

```typescript
// ❌ ERRO
import { Button } from '../../../components/ui/button'

// ✅ SOLUÇÃO: Use alias @
import { Button } from '@/components/ui/button'
```

#### Erro: Cannot read property of undefined

**Causa**: Variável não inicializada

**Solução**:

```typescript
// ❌ ERRO
const name = user.name

// ✅ SOLUÇÃO: Optional chaining + nullish coalescing
const name = user?.name ?? 'Default'
```

---

### ❌ Build successful mas warnings

#### Warning: autoprefixer gradient

**Erro no console**:
```
autoprefixer: Gradient has outdated direction syntax
```

**Solução**: Atualizar sintaxe de gradientes em `globals.css`

```css
/* ❌ ANTIGO */
radial-gradient(0 0, closest-side, ...)

/* ✅ NOVO */
radial-gradient(closest-side at 0 0, ...)
```

#### Warning: Image with no alt

**Erro**: `Image missing alt attribute`

**Solução**:

```tsx
// ❌ ERRO
<Image src="/logo.png" />

// ✅ SOLUÇÃO
<Image src="/logo.png" alt="Logo Rainer Soft" />
```

---

## 🏃 Erros de Runtime

### ❌ Hydration Error

**Erro no console**:
```
Hydration failed because the initial UI does not match
```

**Causas comuns**:

1. **HTML inválido**:
```tsx
// ❌ ERRO: <p> dentro de <p>
<p><p>Text</p></p>

// ✅ SOLUÇÃO
<div><p>Text</p></div>
```

2. **useEffect sem check**:
```tsx
// ❌ ERRO
const value = localStorage.getItem('key')
return <div>{value}</div>

// ✅ SOLUÇÃO
const [value, setValue] = useState(null)
useEffect(() => {
  setValue(localStorage.getItem('key'))
}, [])
return <div>{value || 'Loading...'}</div>
```

3. **Date/Time sem formatação**:
```tsx
// ❌ ERRO (server e client diferem)
<div>{new Date().toString()}</div>

// ✅ SOLUÇÃO
const [date, setDate] = useState<string | null>(null)
useEffect(() => {
  setDate(new Date().toString())
}, [])
```

---

### ❌ Theme flash (FOIT)

**Problema**: Pisca branco antes de aplicar tema escuro

**Solução**: Usar script bloqueante no `<head>`

```tsx
// app/layout.tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          const theme = localStorage.getItem('theme')
          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          }
        })()
      `
    }}
  />
</head>
```

**Nota**: next-themes já faz isso, mas se problema persistir, verificar ordem de scripts.

---

### ❌ Cannot find module '@/...'

**Erro**: `Module not found: Can't resolve '@/components/...'`

**Solução**: Verificar `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## ⚡ Problemas de Performance

### ❌ Página lenta para carregar

#### Diagnóstico

```bash
# Build e analise bundle
npm run build

# Verificar tamanhos
# Output mostrará tamanhos de cada rota
```

**Verificar**:
- First Load JS < 200KB
- Rotas dinâmicas otimizadas

#### Soluções

**1. Dynamic imports**:

```typescript
// ❌ Ruim: Import estático de componente pesado
import HeavyComponent from './HeavyComponent'

// ✅ Bom: Dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />
})
```

**2. Image optimization**:

```tsx
// ✅ Sempre use next/image
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={aboveFold} // true para imagens above-the-fold
/>
```

**3. Memo components**:

```typescript
// ✅ Memo para componentes puros
export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // render lógica
}, (prevProps, nextProps) => {
  // custom comparison
  return prevProps.id === nextProps.id
})
```

---

### ❌ Re-renders excessivos

#### Diagnóstico

Use React DevTools Profiler:
1. Abra DevTools → Profiler
2. Clique em Record
3. Interaja com a página
4. Pare gravação
5. Analise flamegraph

#### Soluções

**useCallback para funções**:

```typescript
// ❌ Nova função a cada render
const handleClick = () => { ... }

// ✅ Memoizada
const handleClick = useCallback(() => { ... }, [deps])
```

**useMemo para valores computados**:

```typescript
// ❌ Recalcula a cada render
const filteredPosts = posts.filter(p => p.published)

// ✅ Memoizado
const filteredPosts = useMemo(
  () => posts.filter(p => p.published),
  [posts]
)
```

---

## 📝 Erros de TypeScript

### ❌ Type 'X' is not assignable to type 'Y'

**Exemplo**:
```typescript
interface Props {
  id: number
}

const props = { id: '123' } // string, não number
<Component {...props} /> // ERRO
```

**Solução**:

```typescript
// Opção 1: Converter
const props = { id: Number('123') }

// Opção 2: Ajustar interface
interface Props {
  id: string | number
}

// Opção 3: Parse no component
function Component({ id }: Props) {
  const numericId = Number(id)
}
```

---

### ❌ Property 'X' does not exist on type 'Y'

**Exemplo**:
```typescript
const user: User = getUser()
console.log(user.email) // ERRO se email não está em User
```

**Solução**:

```typescript
// Opção 1: Adicionar ao type
interface User {
  name: string
  email: string // Adicionar
}

// Opção 2: Type guard
if ('email' in user) {
  console.log(user.email) // OK
}

// Opção 3: Assertion (use com cuidado)
console.log((user as UserWithEmail).email)
```

---

### ❌ Cannot use JSX unless the '--jsx' flag is provided

**Causa**: Arquivo sem extensão `.tsx`

**Solução**:

```bash
# Renomear arquivo
mv file.ts file.tsx
```

---

## 📲 Problemas com PWA

### ❌ PWA não instala no iOS

**Checklist**:

- [ ] Metatag `apple-mobile-web-app-capable` presente?
- [ ] `apple-touch-icon` 180x180 presente?
- [ ] HTTPS habilitado?
- [ ] manifest.json válido?
- [ ] Service worker registrado?

**Verificar em**: `app/layout.tsx`

```tsx
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="/icon-180.png" />
```

---

### ❌ Service Worker não atualiza

**Problema**: Mudanças não aparecem

**Solução**:

```bash
# Chrome DevTools
# 1. Application tab
# 2. Service Workers
# 3. Click "Unregister"
# 4. Hard refresh (Ctrl+Shift+R)
```

**Ou no código**:

```javascript
// public/sw.js - Incrementar versão
const CACHE_VERSION = 'v2' // Era v1
```

---

### ❌ Manifest.json não carrega

**Erro 404 no manifest**

**Verificar**:

```tsx
// app/layout.tsx
<link rel="manifest" href="/manifest.json" />
```

**Confirmar arquivo**:
```bash
# Deve existir
ls public/manifest.json
```

---

## 🔍 SonarQube Issues

### ❌ Container não inicia

**Erro**: SonarQube unhealthy

**Verificar logs**:

```bash
docker-compose -f sonarqube/docker-compose.sonarqube.yml logs sonarqube
```

**Soluções comuns**:

**1. Memória insuficiente**:
```yaml
# docker-compose.sonarqube.yml
environment:
  - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
```

**2. Porta em uso**:
```yaml
# Mudar porta
ports:
  - "9001:9000"  # Era 9000:9000
```

**3. Volume permissions (Linux)**:
```bash
sudo chown -R 999:999 sonarqube-data/
```

---

### ❌ Análise falha

**Erro**: `Error during SonarQube Scanner execution`

**Verificar**:

```bash
# 1. Token correto?
echo $SONAR_TOKEN  # Linux/Mac
echo $env:SONAR_TOKEN  # Windows

# 2. SonarQube acessível?
curl http://localhost:9000/api/system/status

# 3. Projeto criado?
# Acessar http://localhost:9000 e verificar
```

**Solução**:

```bash
# Recriar token
# 1. http://localhost:9000/account/security
# 2. Generate new token
# 3. Update env var
$env:SONAR_TOKEN="novo-token"
```

---

## 🚀 Deploy Issues

### ❌ Vercel build fails

**Erro**: Build command failed

**Verificar**:

```bash
# Testar build localmente
npm run build

# Se falhar, verificar logs
# Corrigir erros
# Tentar novamente
```

**Erros comuns**:

1. **Environment variables ausentes**:
   - Configurar no Vercel Dashboard
   - Settings → Environment Variables

2. **Build timeout**:
   - Otimizar build
   - Reduzir bundle size
   - Code splitting

3. **Memory limit**:
   - Upgrade Vercel plan
   - Ou otimizar código

---

### ❌ 404 em produção mas funciona local

**Causa**: Routing issue

**Verificar**:

```bash
# Link paths corretos?
<Link href="/blog">  # ✅ Correto
<Link href="blog">   # ❌ Relativo (pode falhar)
```

**Solução**: Sempre usar paths absolutos com `/`

---

### ❌ Images não carregam em produção

**Causa**: Domain não configurado

**Solução**: `next.config.js`

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-cdn.com',
    }
  ]
}
```

---

## 🐛 Erros Comuns e Soluções Rápidas

### ❌ "React Hook called conditionally"

```typescript
// ❌ ERRO
if (condition) {
  const [state, setState] = useState()
}

// ✅ SOLUÇÃO
const [state, setState] = useState()
if (condition) {
  // use state here
}
```

---

### ❌ "Cannot update component while rendering"

```typescript
// ❌ ERRO
function Component() {
  setState(newValue) // Durante render
  return <div />
}

// ✅ SOLUÇÃO
function Component() {
  useEffect(() => {
    setState(newValue) // Em effect
  }, [])
  return <div />
}
```

---

### ❌ "Maximum update depth exceeded"

**Causa**: Loop infinito de state updates

```typescript
// ❌ ERRO
useEffect(() => {
  setState(value)
}) // Sem deps = roda sempre

// ✅ SOLUÇÃO
useEffect(() => {
  setState(value)
}, []) // Deps vazias = roda uma vez
```

---

### ❌ "Objects are not valid as React child"

```typescript
// ❌ ERRO
return <div>{objectValue}</div>

// ✅ SOLUÇÃO
return <div>{JSON.stringify(objectValue)}</div>
return <div>{objectValue.property}</div>
```

---

## 🎨 CSS Issues

### ❌ Tailwind classes não aplicam

**Causa**: Purge removeu classes

**Solução**:

```javascript
// tailwind.config.js
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

**Ou usar classe completa**:

```typescript
// ❌ Dinâmico (pode ser purgado)
className={`text-${color}-500`}

// ✅ Estático
className={color === 'red' ? 'text-red-500' : 'text-blue-500'}
```

---

### ❌ Dark mode não funciona

**Verificar**:

1. **ThemeProvider presente?**
```tsx
<ThemeProvider attribute="class">
  {children}
</ThemeProvider>
```

2. **Tailwind configurado?**
```javascript
// tailwind.config.js
darkMode: 'class',
```

3. **Classes dark: presentes?**
```tsx
className="bg-white dark:bg-black"
```

---

## 📱 Mobile Issues

### ❌ Zoom automático em inputs (iOS)

**Causa**: Font-size < 16px

**Solução**:

```css
/* globals.css */
@media screen and (max-width: 767px) {
  input, textarea, select {
    font-size: 16px; /* Mínimo 16px previne zoom */
  }
}
```

---

### ❌ Scroll não suave em iOS

**Solução**:

```css
body {
  -webkit-overflow-scrolling: touch;
}
```

---

### ❌ 100vh não funciona correto em mobile

**Causa**: Barra de endereço varia altura

**Solução**:

```css
/* Use dvh (dynamic viewport height) */
.full-height {
  height: 100dvh; /* Novo */
}

/* Ou CSS custom property */
.full-height {
  height: calc(var(--vh, 1vh) * 100);
}
```

```typescript
// Calcular --vh
useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  
  setVH()
  window.addEventListener('resize', setVH)
  return () => window.removeEventListener('resize', setVH)
}, [])
```

---

## 🔒 Problemas de Autenticação

### ❌ Login não persiste

**Causa**: localStorage não atualiza

**Verificar**:

```typescript
// lib/auth-local.ts
localStorage.setItem('auth_user', JSON.stringify(user))

// Verificar no console
localStorage.getItem('auth_user')
```

---

### ❌ Protected route não redireciona

**Verificar middleware**:

```typescript
// Componente deve verificar auth
const { isAuthenticated, isLoadingAuth } = useAuth()

if (isLoadingAuth) return <FullPageLoader />
if (!isAuthenticated) return redirect('/dashboard/login')
```

---

## 🎭 Animation Issues

### ❌ Framer Motion animations travando

**Causa**: Re-renders excessivos

**Solução**:

```typescript
// ✅ Extrair variants para constante
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
} as const

// ✅ Usar layoutId para persistent animations
<motion.div layoutId="unique-id">
```

---

### ❌ Animations não respeitam prefers-reduced-motion

**Solução**:

```typescript
// Verificar preferência
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// Desabilitar animations
<motion.div animate={prefersReducedMotion ? {} : { ... }}>
```

---

## 🔧 Desenvolvimento

### Limpar Cache Completo

```bash
# Next.js cache
rm -rf .next

# node_modules
rm -rf node_modules
npm install

# npm cache
npm cache clean --force

# TypeScript
rm -rf .tsbuildinfo

# Reinstalar tudo
npm install
npm run build
```

---

### Resetar Estado Completamente

```bash
# Parar servidor dev
Ctrl+C

# Limpar tudo
rm -rf .next node_modules
rm package-lock.json

# Reinstalar
npm install

# Reiniciar
npm run dev
```

---

## 📞 Quando Pedir Ajuda

### Informações para Incluir

Ao reportar um problema, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**
3. **Comportamento esperado**
4. **Comportamento atual**
5. **Screenshots** (se aplicável)
6. **Environment**:
   - OS e versão
   - Node version (`node --version`)
   - npm version (`npm --version`)
   - Browser e versão
7. **Logs de erro** completos
8. **Código relevante**

### Onde Pedir Ajuda

1. **GitHub Issues** - Para bugs
2. **GitHub Discussions** - Para dúvidas
3. **Email** - suporte@rainersoft.com.br

---

## 🛠️ Ferramentas de Debug

### React DevTools

**Instalar**: Chrome/Firefox extension

**Features**:
- Inspect components
- View props/state
- Profiler para performance
- Highlight updates

### Redux DevTools

**Se usar Redux/Zustand**

### Network Tab

**Chrome DevTools → Network**

- Verificar requests
- Tempo de resposta
- Headers
- Payload

### Lighthouse

**Chrome DevTools → Lighthouse**

- Performance
- Accessibility
- Best Practices
- SEO
- PWA

---

## ✅ Checklist de Debug

Antes de pedir ajuda, verificar:

- [ ] Reiniciei servidor dev?
- [ ] Limpei cache (.next)?
- [ ] `npm install` está atualizado?
- [ ] Erros no console do browser?
- [ ] `npm run lint` passa?
- [ ] `npm run type-check` passa?
- [ ] `npm run build` funciona?
- [ ] Li documentação relevante?
- [ ] Procurei erro no Google/StackOverflow?
- [ ] Verifiquei GitHub issues similares?

---

## 📚 Recursos Úteis

### Documentação

- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [React Common Errors](https://react.dev/learn/troubleshooting)
- [TypeScript FAQ](https://www.typescriptlang.org/docs/handbook/faq)

### Communities

- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

**Ainda com problemas? Entre em contato!**

📧 **Email**: suporte@rainersoft.com.br

---

_Última atualização: Outubro 2025_

