# Changelog - Rainer Portfolio Frontend

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.3.0] - 2024-11-24

### 🚀 Melhorias de Arquitetura

#### Adicionado
- **CI/CD Pipeline Completo**: GitHub Actions workflow para validação automática
- **Validação de Build Order**: Garantia de build sequencial (tokens → ui → frontend)
- **Checks de Hardcode**: Validação automática contra valores hardcoded
- **Scripts de Validação**: Novos scripts para validar integridade dos tokens

#### Modificado
- **Dependências Atualizadas**: 
  - `@rainersoft/design-tokens` → v2.2.0
  - `@rainersoft/ui` → v1.2.0
- **Imports Otimizados**: Uso direto das libs sem fallbacks

#### Removido
- **Fallbacks Desnecessários**: Removidos todos os fallbacks de componentes
- **Código Redundante**: Limpeza de imports não utilizados

### 📝 Documentação
- README atualizado com instruções de CI/CD
- Adicionado guia de contribuição
- Documentação de scripts atualizada

---

## [2.2.0] - 2024-11-23

### 🎨 Refatoração de Constantes

#### Adicionado
- **Estrutura de Constantes**: Nova organização em `constants/`
  - `comum/`: Constantes compartilhadas
  - `home/`: Constantes da página inicial
  - `sobre/`: Constantes da página sobre
  - `contato/`: Constantes de contato
  - `blog/`: Constantes do blog

#### Modificado
- **Zero Hardcode**: Todos os valores movidos para constantes
- **JSDoc em Português**: Toda documentação interna em PT-BR
- **Imports Organizados**: Por contexto e funcionalidade

---

## [2.1.0] - 2024-11-22

### 🔧 Integração com Design System

#### Adicionado
- **Design Tokens Integration**: Integração completa com `@rainersoft/design-tokens`
- **UI Library**: Adoção de `@rainersoft/ui` para componentes

#### Modificado
- **Componentes Migrados**: Todos os componentes agora usam a biblioteca UI
- **Temas Dinâmicos**: Suporte completo a light/dark theme via CSS vars

---

## [2.0.0] - 2024-11-20

### 💥 Breaking Changes

#### Mudanças Arquiteturais
- **Next.js 14**: Migração para App Router
- **TypeScript Strict**: Modo strict habilitado
- **Monorepo Structure**: Integração com workspace pnpm

#### Removido
- Pages Router do Next.js
- Componentes inline (movidos para biblioteca)
- Estilos CSS modules (substituídos por Tailwind)

---

## [1.0.0] - 2024-11-15

### 🎉 Lançamento Inicial

#### Features
- Portfolio responsivo
- Blog com MDX
- Animações com Framer Motion
- SEO otimizado
- PWA support
- Analytics integrado

---

## Convenções

- **Added**: Funcionalidades adicionadas
- **Changed**: Mudanças em funcionalidades existentes
- **Deprecated**: Funcionalidades que serão removidas
- **Removed**: Funcionalidades removidas
- **Fixed**: Correções de bugs
- **Security**: Correções de vulnerabilidades

---

Mantido por [Rainer Teixeira](https://github.com/RainerTeixeira)
