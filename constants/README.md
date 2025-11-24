# 📦 Módulo de Constantes

## Arquitetura limpa e modular organizada por contexto

## 📁 Estrutura Simplificada

```
constants/
├── comum/           # Constantes compartilhadas
│   ├── desenvolvedor.ts  # Informações do desenvolvedor
│   ├── seo.ts           # SEO e meta tags
│   └── social.ts        # Redes sociais e contato
│
├── home/            # Página inicial
│   ├── hero.ts          # Hero section
│   ├── servicos.ts      # Serviços oferecidos
│   └── portfolio.ts     # Projetos em destaque
│
├── sobre/           # Página sobre
│   └── experiencia.ts   # Experiência e habilidades
│
├── contato/         # Página contato
│   ├── formulario.ts    # Campos e validações
│   └── faq.ts          # Perguntas frequentes
│
├── blog/            # Blog
│   └── categorias.ts    # Categorias e tags
│
└── index.ts         # Export principal
```

## 🎯 Como Usar

### Import Direto

```typescript
import { 
  DESENVOLVEDOR, 
  SERVICOS, 
  FAQ 
} from '@/constants';
```

### Import por Namespace

```typescript
import { 
  Comum, 
  Hero, 
  Portfolio 
} from '@/constants';

// Uso
console.log(Comum.DESENVOLVEDOR);
console.log(Hero.CONTEUDO_HERO);
```

### Import Específico

```typescript
import { CONTEUDO_HERO } from '@/constants/home/hero';
import { DESENVOLVEDOR } from '@/constants/comum/desenvolvedor';
```

## 📋 Constantes Disponíveis

### Comum

- `DESENVOLVEDOR` - Informações do desenvolvedor
- `BIO` - Biografias em diferentes tamanhos
- `METRICAS` - Conquistas profissionais
- `PALAVRAS_CHAVE` - SEO keywords
- `META_PADRAO` - Meta tags padrão
- `REDES_SOCIAIS` - Links sociais
- `CONTATO` - Configuração de contato

### Home

- `CONTEUDO_HERO` - Títulos rotativos
- `ESTILOS_HERO` - Configuração visual
- `SERVICOS` - Lista de serviços
- `DIFERENCIAIS` - Vantagens competitivas
- `PROJETOS` - Portfolio de projetos

### Sobre

- `EXPERIENCIA` - Timeline profissional
- `HABILIDADES` - Stack tecnológica
- `FORMACAO` - Certificações

### Contato

- `CAMPOS_FORMULARIO` - Configuração do form
- `MENSAGENS` - Feedbacks do sistema
- `INFO_CONTATO` - Informações de contato
- `FAQ` - Perguntas frequentes

### Blog

- `CATEGORIAS` - Categorias de artigos
- `TAGS_POPULARES` - Tags mais usadas
- `CONFIG_BLOG` - Configurações

## ✅ Benefícios

- **Organização por Contexto**: Constantes agrupadas por página/funcionalidade
- **JSDoc em Português**: Documentação profissional em PT-BR
- **Integração com Design Tokens**: Usa `@rainersoft/design-tokens`
- **Zero Redundância**: Estrutura limpa e mínima
- **Type-Safe**: TypeScript em todos os arquivos
- **Manutenção Fácil**: Encontre rapidamente o que precisa

## � Notas Importantes

- Todos os comentários JSDoc estão em português
- Design tokens importados de `@rainersoft/design-tokens`
- Estrutura organizada por rotas do Next.js
- Apenas o necessário, sem arquivos redundantes
