# 🚀 01-INICIO - Primeiros Passos

## 📋 Índice da Seção

- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Stack Tecnológica](#-stack-tecnológica)
- [Configuração do Ambiente](#-configuração-do-ambiente)
- [Instalação e Setup](#-instalação-e-setup)
- [Executando o Projeto](#-executando-o-projeto)

---

## 🎯 Visão Geral do Projeto

### O que é o Rainer Portfolio Frontend?

O **Rainer Portfolio Frontend** é uma aplicação web enterprise-grade desenvolvida para showcase profissional de Rainer Teixeira, Desenvolvedor Full-Stack. Construído com as tecnologias mais modernas e melhores práticas da indústria.

### 🌟 Principais Características

```
✨ ENTERPRISE EDITION v2.3.0
├─ 🎨 Design System Completo     (@rainersoft/design-tokens)
├─ 🧩 Component Library          (@rainersoft/ui)
├─ 🔧 Utility Functions           (@rainersoft/utils)
├─ 📱 PWA Universal               (iOS/Android/Desktop)
├─ 🚀 Performance Otimizada       (Lighthouse 95+)
├─ ♿ Acessibilidade WCAG 2.1 AA   (Screen readers)
├─ 🔐 Autenticação OAuth           (Google/GitHub)
├─ 📝 Blog com Editor Rich Text    (Tiptap)
├─ 📊 Dashboard Administrativo     (CRUD completo)
└─ 🧪 Testes Automatizados         (Jest + Playwright)
```

### 🏗️ Arquitetura

- **Monorepo Local**: 3 bibliotecas + frontend
- **Separação de Responsabilidades**: Domínio vs Genérico
- **Type-First**: TypeScript strict mode
- **Performance First**: Bundle otimizado, lazy loading
- **Enterprise Ready**: Logging, monitoring, error boundaries

---

## ⚡ Stack Tecnológica

### Frontend Core
```typescript
{
  "framework": "Next.js 15.5.5",
  "ui": "React 19.0.0",
  "language": "TypeScript 5.x",
  "styling": "Tailwind CSS 4.1.14",
  "state": "React Query + Context API",
  "forms": "React Hook Form + Zod",
  "routing": "Next.js App Router"
}
```

### Bibliotecas @rainersoft
```typescript
{
  "@rainersoft/design-tokens": "W3C DTCG compliant",
  "@rainersoft/ui": "56 componentes + hooks",
  "@rainersoft/utils": "String, date, number, validation, DOM"
}
```

### Features Enterprise
```typescript
{
  "editor": "Tiptap (rich text)",
  "auth": "AWS Cognito + OAuth",
  "drag_drop": "@dnd-kit",
  "charts": "Recharts",
  "animations": "Framer Motion",
  "pwa": "Web App Manifest",
  "testing": "Jest + Playwright E2E"
}
```

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos

```bash
# Node.js (versão mínima)
node --version  # >= 18.17.0

# Package Manager
pnpm --version  # >= 10.24.0

# Git (para controle de versão)
git --version
```

### Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

Configure as variáveis essenciais:
```env
# Aplicação
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AWS Cognito (OAuth)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id
COGNITO_CLIENT_SECRET=your_client_secret

# APIs (opcionais)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

---

## 📦 Instalação e Setup

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd rainer-portfolio-frontend
```

### 2. Instalar Dependências

```bash
# Instalação principal
pnpm install

# Preparar workspace das bibliotecas
pnpm run prebuild
```

### 3. Configurar Bibliotecas @rainersoft

As bibliotecas são linkadas localmente:
```bash
# Verificar se as bibliotecas estão linkadas
ls -la node_modules/@rainersoft/
# Deve mostrar: design-tokens, ui, utils
```

### 4. Validar Instalação

```bash
# Verificar tipos TypeScript
pnpm run type-check

# Validar design tokens
pnpm run validate:tokens
```

---

## 🚀 Executando o Projeto

### Modo Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm run dev

# Acessar aplicação
# Frontend: http://localhost:3000
# Storybook: http://localhost:6006 (se configurado)
```

### Build Produção

```bash
# Build completo
pnpm run build

# Iniciar servidor de produção
pnpm run start
```

### Testes

```bash
# Testes unitários
pnpm run test

# Testes E2E
pnpm run test:e2e

# Todos os testes
pnpm run test:all
```

---

## 🎯 Próximos Passos

1. **Explore a documentação**: Continue para [02-ARQUITETURA](../02-ARQUITETURA/)
2. **Conheça os componentes**: Veja [03-COMPONENTES](../03-COMPONENTES/)
3. **Entenda as constants**: Estude [04-CONSTANTS](../04-CONSTANTS/)
4. **Configure features**: Acesse [06-FEATURES](../06-FEATURES/)

---

## 🆘 Ajuda Rápida

### Problemas Comuns

**Build falha com erro de tipos:**
```bash
# Limpar e reinstalar
pnpm run clean:all
pnpm install
pnpm run prebuild
```

**Bibliotecas @rainersoft não encontradas:**
```bash
# Verificar links
pnpm run prebuild
ls node_modules/@rainersoft/
```

**OAuth não funciona:**
- Verifique variáveis `.env.local`
- Confirme Cognito configurado no AWS Console

### Links Úteis

- [Documentação Completa](../README.md)
- [Guia de Contribuição](../09-CONTRIBUICAO/)
- [Troubleshooting](../07-DEPLOY/TROUBLESHOOTING.md)
- [Changelog](../../CHANGELOG.md)
