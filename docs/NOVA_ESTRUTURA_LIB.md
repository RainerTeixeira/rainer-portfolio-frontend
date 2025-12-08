# 📚 Nova Estrutura lib/ - Profissional e Intuitiva

> **Data**: 26/11/2025  
> **Status**: Planejamento

---

## 🎯 Objetivo

Reorganizar `lib/` com nomes intuitivos e estrutura clara, agrupando por funcionalidade.

---

## 📊 Estrutura Atual

```
lib/
├── api/              # Cliente HTTP e services (34 itens)
├── content/          # Tiptap utils (3 arquivos)
├── cookies/          # Cookie management (3 arquivos)
├── monitoring/       # Analytics, logger, performance (4 arquivos)
├── seo/              # SEO utilities (4 arquivos)
├── utils/            # Utils gerais (7 arquivos)
├── hooks/            # Hooks (1 arquivo)
├── env.ts            # Configuração de ambiente
└── index.ts          # Barrel export
```

---

## 🎯 Nova Estrutura Proposta

```
lib/
├── api/                    # ✅ MANTER - Cliente HTTP
│   ├── client/             # Cliente HTTP base
│   ├── services/           # Services organizados
│   ├── types/              # Tipos da API
│   ├── helpers/            # Helpers de dados
│   └── utils/              # Utils internos (debug)
│
├── blog/                   # 🆕 RENOMEAR de content/
│   ├── tiptap.ts           # Utils do editor Tiptap
│   ├── reading-time.ts     # Cálculo de tempo de leitura
│   └── index.ts
│
├── portfolio/              # 🆕 RENOMEAR de utils/
│   ├── css.ts              # 🆕 RENOMEAR de constants.ts (cn, SECTION_CLASSES)
│   ├── images.ts           # 🆕 RENOMEAR de image-optimizer.ts
│   ├── posts.ts            # 🆕 RENOMEAR de post-compressor.ts
│   ├── search.ts           # Busca de posts
│   ├── tokens.ts           # 🆕 RENOMEAR de safe-design-tokens.ts
│   ├── validation.ts       # Validações
│   └── index.ts
│
├── tracking/               # 🆕 RENOMEAR de monitoring/
│   ├── analytics.ts        # Google Analytics
│   ├── logger.ts           # Sistema de logs
│   ├── performance.ts      # Web Vitals
│   └── index.ts
│
├── metadata/               # 🆕 RENOMEAR de seo/
│   ├── page-metadata.ts    # 🆕 RENOMEAR de metadata.ts
│   ├── sitemap.ts          # Geração de sitemap
│   ├── structured-data.ts  # JSON-LD
│   └── index.ts
│
├── privacy/                # 🆕 RENOMEAR de cookies/
│   ├── analytics.ts        # Google Analytics cookies
│   ├── manager.ts          # 🆕 RENOMEAR de cookie-manager.ts
│   └── index.ts
│
├── config/                 # 🆕 NOVO - Configurações
│   ├── env.ts              # Variáveis de ambiente
│   └── index.ts
│
└── index.ts                # Barrel export principal
```

---

## 🔄 Mudanças de Nomes

### Pastas Renomeadas

| Antes | Depois | Motivo |
|-------|--------|--------|
| `content/` | `blog/` | Mais específico e claro |
| `utils/` | `portfolio/` | Indica que é específico do portfolio |
| `monitoring/` | `tracking/` | Nome mais intuitivo |
| `seo/` | `metadata/` | Mais descritivo |
| `cookies/` | `privacy/` | Contexto mais amplo |

### Arquivos Renomeados

| Antes | Depois | Motivo |
|-------|--------|--------|
| `constants.ts` | `css.ts` | Indica que são classes CSS |
| `image-optimizer.ts` | `images.ts` | Mais simples |
| `post-compressor.ts` | `posts.ts` | Mais direto |
| `safe-design-tokens.ts` | `tokens.ts` | Mais simples |
| `metadata.ts` | `page-metadata.ts` | Evita confusão |
| `cookie-manager.ts` | `manager.ts` | Contexto já dado pela pasta |
| `env.ts` (raiz) | `config/env.ts` | Organizado em pasta |

---

## 📝 Imports Antes vs Depois

### Antes
```typescript
import { cn } from '@/lib/utils';
import { calculateReadingTime } from '@/lib/content';
import { analytics } from '@/lib/tracking';
import { generateMetadata } from '@/lib/seo';
```

### Depois
```typescript
import { cn } from '@/lib/portfolio';
import { calculateReadingTime } from '@/lib/blog';
import { analytics } from '@/lib/tracking';
import { generateMetadata } from '@/lib/metadata';
```

---

## ✅ Benefícios

1. **Nomes Intuitivos**: Fica claro o que cada pasta contém
2. **Agrupamento Lógico**: Funcionalidades relacionadas juntas
3. **Fácil Navegação**: Desenvolvedores encontram código rapidamente
4. **Manutenção**: Mais fácil adicionar novos arquivos
5. **Profissional**: Estrutura enterprise-grade

---

## 🚀 Plano de Execução

1. ✅ Criar nova estrutura de pastas
2. ✅ Mover arquivos para novos locais
3. ✅ Renomear arquivos conforme tabela
4. ✅ Atualizar barrel exports
5. ✅ Atualizar imports em todo o projeto
6. ✅ Testar build
7. ✅ Validar que tudo funciona

---

**Status**: 📋 **PLANEJAMENTO COMPLETO**  
**Próximo**: Executar reorganização
