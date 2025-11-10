# Constants - Estrutura DDD (Domain-Driven Design)

Estrutura modular e profissional de constantes seguindo Domain-Driven Design (DDD).

## 📁 Estrutura

```
constants/
├── site/                    # Configurações do site
│   ├── config.ts           # Configurações globais (SITE_CONFIG, AUTHOR)
│   ├── meta.ts             # SEO, meta tags, CONTACT_CONFIG
│   ├── navigation.ts       # Menu e links (NAVIGATION)
│   ├── social.ts           # Redes sociais (SOCIAL_LINKS)
│   ├── sections.ts         # IDs de seções e classes CSS (SECTION_IDS, DIVIDER_CLASSES)
│   └── index.ts            # Barrel export
│
├── data/                    # Dados estáticos
│   ├── skills.ts           # Skills/Tecnologias (SKILLS_DATA)
│   ├── services.ts         # Serviços (SERVICES_DATA, FOOTER_CONFIG)
│   ├── experience.ts       # Experiência profissional (EXPERIENCE)
│   ├── faq.ts              # Perguntas frequentes (FAQ_ITEMS)
│   ├── contact-info.ts     # Cards de informações de contato (CONTACT_INFO_CARDS)
│   ├── metrics.ts          # Métricas profissionais (PROFESSIONAL_METRICS)
│   ├── tech-layers.ts      # Tecnologias por camada (TECH_BY_LAYER)
│   └── index.ts            # Barrel export
│
└── index.ts                 # Export central de tudo
```

## 🎯 Uso

### Importar do barrel central

```typescript
import {
  SITE_CONFIG,
  NAVIGATION,
  SOCIAL_LINKS,
  SKILLS_DATA,
  EXPERIENCE,
  FAQ_ITEMS,
  CONTACT_INFO_CARDS,
  PROFESSIONAL_METRICS,
  TECH_BY_LAYER,
  SECTION_IDS,
  DIVIDER_CLASSES,
} from '@/constants';
```

### Importar tipos

```typescript
import type {
  NavigationItem,
  SkillItemData,
  ExperienceItem,
  FAQItem,
  ContactInfoCardConfig,
  ProfessionalMetric,
} from '@/constants';
```

### Skills com ícones React

```typescript
import { SKILLS } from '@/components/icons/skills/skills-with-icons';
```

## 📋 Arquivos e Responsabilidades

### `constants/site/`

#### `config.ts`

- `SITE_CONFIG` - Configurações globais do site
- `AUTHOR` - Informações do autor
- `createDefaultSEO()` - Helper para criar configuração de SEO

#### `meta.ts`

- `CONTACT_CONFIG` - Configuração de contato (horários, localização, telefone, email)
- `SEO_KEYWORDS` - Keywords para SEO
- `DEFAULT_SEO` - Configuração padrão de SEO
- Interfaces: `WorkingHours`, `Location`, `Phone`, `Email`, `ContactConfig`

#### `navigation.ts`

- `NAVIGATION` - Itens do menu principal
- Interface: `NavigationItem`

#### `social.ts`

- `SOCIAL_LINKS` - Links de redes sociais (GitHub, LinkedIn, Instagram)

#### `sections.ts`

- `SECTION_IDS` - IDs das seções para navegação
- `DIVIDER_CLASSES` - Classes CSS para divisores de seção

### `constants/data/`

#### `skills.ts`

- `SKILLS_DATA` - Dados das tecnologias (sem ícones)
- Interface: `SkillItemData`

#### `services.ts`

- `SERVICES_DATA` - Serviços oferecidos
- `FOOTER_CONFIG` - Configuração do footer
- Interfaces: `ServiceItem`, `IconConfig`

#### `experience.ts`

- `EXPERIENCE` - Histórico de experiência profissional
- Interface: `ExperienceItem`

#### `faq.ts`

- `FAQ_ITEMS` - Perguntas frequentes
- Interface: `FAQItem`

#### `contact-info.ts`

- `CONTACT_INFO_CARDS` - Cards de informações de contato
- Interface: `ContactInfoCardConfig`

#### `metrics.ts`

- `PROFESSIONAL_METRICS` - Métricas profissionais
- Interface: `ProfessionalMetric`

#### `tech-layers.ts`

- `TECH_BY_LAYER` - Tecnologias organizadas por camada (frontend, backend, database, devops)

## ✅ Benefícios

- **Modular**: Cada arquivo com responsabilidade única
- **Escalável**: Fácil adicionar novos dados/serviços
- **Type-safe**: Tipos TypeScript em todos os arquivos
- **Sem redundâncias**: Dados centralizados e reutilizados
- **DDD**: Estrutura orientada a domínios
- **Separação de concerns**: Dados (.ts) separados de componentes (.tsx)
- **Barrel exports**: Imports simplificados

## 🔄 Atualizações

Para adicionar novos dados:

1. Criar arquivo em `constants/data/` ou `constants/site/`
2. Exportar do barrel (`index.ts`)
3. Importar no componente/página via `@/constants`

## 📝 Notas

- Design tokens devem ser importados diretamente de `@rainer/design-tokens`
- Ícones React estão em `components/icons/skills/`
- `SKILLS` com ícones está em `components/icons/skills/skills-with-icons.tsx`
