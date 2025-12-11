# 📚 05-LIBRARIES - Bibliotecas do Ecossistema

## 📋 Índice da Seção

- [Visão Geral das Bibliotecas](#-visão-geral-das-bibliotecas)
- [@rainersoft/design-tokens](#rainersoftdesign-tokens)
- [@rainersoft/ui](#rainersoftui)
- [@rainersoft/utils](#rainersoftutils)
- [Arquitetura do Monorepo](#-arquitetura-do-monorepo)
- [Integração com Frontend](#-integração-com-frontend)

---

## 🎯 Visão Geral das Bibliotecas

### Ecossistema @rainersoft

O projeto utiliza um **ecossistema de 3 bibliotecas** open source desenvolvidas e mantidas por Rainer Teixeira:

```
📚 RAINER ECOSYSTEM
├─ 🎨 @rainersoft/design-tokens     # Sistema de design
├─ 🧩 @rainersoft/ui                 # Componentes UI
└─ 🔧 @rainersoft/utils              # Utilitários universais
```

### Benefícios do Ecossistema

- **Código Reutilizável**: Bibliotecas usadas em múltiplos projetos
- **Consistência Visual**: Design system compartilhado
- **Manutenção Centralizada**: Updates em um lugar afetam todos
- **Type-First**: TypeScript em todas as bibliotecas
- **Open Source**: Código disponível e contribuído pela comunidade
- **Performance**: Bundle size otimizado com tree-shaking

---

## 🎨 @rainersoft/design-tokens

### Visão Geral

Sistema de **design tokens W3C DTCG compliant** com editor visual e exportação múltipla.

```typescript
// Estrutura dos tokens
{
  "colors": { "light": {...}, "dark": {...} },
  "typography": { "fontSizes": {...}, "fontWeights": {...} },
  "spacing": { "scale": {...} },
  "shadows": { "elevation": {...} },
  "borderRadius": { "scale": {...} },
  "motion": { "duration": {...}, "easing": {...} },
  "breakpoints": { "values": {...} },
  "zIndex": { "layers": {...} }
}
```

### Tokens Disponíveis

#### Cores
```typescript
// Cores light theme
const lightColors = {
  primary: {
    50: '#ecfeff',
    500: '#0891b2',    // cyan-600
    900: '#164e63'
  },
  semantic: {
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f8fafc',
    border: '#e2e8f0'
  }
} as const;

// Cores dark theme
const darkColors = {
  primary: {
    50: '#ecfeff',
    500: '#22d3ee',    // cyan-400
    900: '#f0f9ff'
  },
  semantic: {
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#1e293b',
    border: '#334155'
  }
} as const;
```

#### Tipografia
```typescript
const typography = {
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  }
} as const;
```

#### Espaçamento
```typescript
const spacing = {
  scale: {
    0: '0',
    1: '0.25rem',      // 4px
    2: '0.5rem',       // 8px
    3: '0.75rem',      // 12px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    8: '2rem',         // 32px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    32: '8rem',        // 128px
  }
} as const;
```

#### Motion
```typescript
const motion = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '800ms'
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  delays: {
    none: '0ms',
    short: '150ms',
    medium: '300ms',
    long: '500ms'
  }
} as const;
```

### Uso no Frontend

```typescript
// Import de tokens
import { tokens, getLightColors, getDarkColors } from '@rainersoft/design-tokens';

// Acesso direto aos tokens
const primaryColor = tokens.colors.light.primary[500];
const fontSize = tokens.typography.fontSizes.xl;

// Helpers de tema
const lightTheme = getLightColors();
const darkTheme = getDarkColors();

// Em componentes
export const Button: React.FC = () => {
  return (
    <button 
      style={{
        backgroundColor: tokens.colors.light.primary[500],
        color: tokens.colors.light.semantic.foreground,
        padding: tokens.spacing.scale[4],
        borderRadius: tokens.borderRadius.scale.md
      }}
    >
      Button
    </button>
  );
};
```

### Token Editor

Interface visual para editar e preview tokens:

```typescript
// Editor de tokens (browser-based)
const TokenEditor = () => {
  return (
    <div>
      <ColorTokenEditor />
      <TypographyTokenEditor />
      <SpacingTokenEditor />
      <ExportPanel formats={['json', 'css', 'scss', 'ts']} />
    </div>
  );
};
```

---

## 🧩 @rainersoft/ui

### Visão Geral

Biblioteca de **56 componentes React** acessíveis e reutilizáveis baseados em Radix UI.

```typescript
// Categorias de componentes
{
  "forms": ["Button", "Input", "Select", "Checkbox"],
  "layout": ["Card", "Container", "Grid", "Flex"],
  "feedback": ["Toast", "Alert", "Badge", "Spinner"],
  "navigation": ["Navigation", "Breadcrumb", "Tabs"],
  "display": ["Avatar", "Image", "Video"],
  "overlays": ["Modal", "Dialog", "Drawer", "Tooltip"],
  "data": ["Table", "List", "Pagination"]
}
```

### Componentes Principais

#### Form Components
```typescript
// Button
import { Button } from '@rainersoft/ui';

<Button 
  variant="primary" 
  size="lg"
  disabled={isLoading}
  onClick={handleClick}
>
  Enviar
</Button>

// Input com validação
import { Input } from '@rainersoft/ui';

<Input
  type="email"
  placeholder="Seu email"
  error={errors.email}
  required
  {...register('email')}
/>

// Formulário completo
import { Form, FormField, FormLabel, FormControl } from '@rainersoft/ui';

<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormLabel>Email</FormLabel>
    <FormControl asChild>
      <Input type="email" required />
    </FormControl>
  </FormField>
</Form>
```

#### Layout Components
```typescript
// Card
import { Card, CardHeader, CardContent, CardFooter } from '@rainersoft/ui';

<Card>
  <CardHeader>
    <h3>Título do Card</h3>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>

// Grid responsivo
import { Grid, GridItem } from '@rainersoft/ui';

<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>
```

#### Feedback Components
```typescript
// Toast notifications
import { useToast, Toast } from '@rainersoft/ui';

const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Dados salvos com sucesso",
  variant: "success",
  duration: 5000
});

// Alert messages
import { Alert } from '@rainersoft/ui';

<Alert variant="warning" icon>
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription>
    Esta ação não pode ser desfeita
  </AlertDescription>
</Alert>
```

### Hooks Disponíveis

```typescript
// Hooks de utilidade
import {
  useIsMobile,      // < 768px
  usePWA,           // PWA features
  useLocalStorage,  // LocalStorage com SSR
  useDebounce,      // Debounce de valores
  useClickOutside,  // Click outside detector
  useKeyboard,      // Keyboard shortcuts
  useScroll,        // Scroll position
  useTheme,         // Theme management
  useMediaQuery     // Media query listener
} from '@rainersoft/ui';

// Exemplo de uso
const Component = () => {
  const isMobile = useIsMobile();
  const [value, setValue] = useLocalStorage('key', 'default');
  const debouncedValue = useDebounce(value, 300);
  
  return (
    <div>
      {isMobile ? 'Mobile' : 'Desktop'}
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
```

### Utilitários

```typescript
// Utilitários de cor
import { hexToRGB, hexToRGBA, getContrast } from '@rainersoft/ui';

const rgb = hexToRGB('#0891b2');     // { r: 8, g: 145, b: 178 }
const rgba = hexToRGBA('#0891b2', 0.5); // 'rgba(8, 145, 178, 0.5)'
const contrast = getContrast('#ffffff', '#000000'); // 21

// Utilitários de scroll
import { smoothScrollTo, scrollToTop, scrollToElement } from '@rainersoft/ui';

smoothScrollTo({ x: 0, y: 500, duration: 300 });
scrollToTop();
scrollToElement('#section-id');
```

---

## 🔧 @rainersoft/utils

### Visão Geral

Biblioteca de **funções puras universais** com suporte a i18n para pt-BR, en-US e es-ES.

```typescript
// Categorias de funções
{
  "string": ["textToSlug", "capitalize", "truncate", "removeAccents"],
  "date": ["formatDate", "formatDateTime", "getRelativeDate"],
  "number": ["formatCurrency", "formatNumber", "formatPercentage"],
  "validation": ["validateEmail", "validatePhone", "validateCPF"],
  "status": ["translateStatus", "getStatusColor"]
}
```

### String Utils

```typescript
import { 
  textToSlug, 
  capitalize, 
  truncate, 
  removeAccents,
  getInitials,
  isEmpty,
  countWords
} from '@rainersoft/utils';

// Slugificação
textToSlug('Desenvolvedor Full-Stack'); // 'desenvolvedor-full-stack'
textToSlug('Criação de APIs REST');     // 'criacao-de-apis-rest'

// Capitalização
capitalize('rainer teixeira');          // 'Rainer Teixeira'
capitalize('desenvolvedor full-stack'); // 'Desenvolvedor Full-Stack'

// Truncamento
truncate('Texto muito longo...', 20);   // 'Texto muito longo...'

// Remoção de acentos
removeAccents('Criação');               // 'Criacao'

// Iniciais
getInitials('Rainer Teixeira');         // 'RT'
getInitials('John Doe');                // 'JD'
```

### Date Utils (com i18n)

```typescript
import { 
  formatDate, 
  formatDateTime, 
  getRelativeDate,
  isValidDate,
  parseDate
} from '@rainersoft/utils';

// Formatação (pt-BR padrão)
formatDate('2025-12-11');              // '11 de dezembro de 2025'
formatDate(new Date());                // '11 de dezembro de 2025'

// Com hora
formatDateTime('2025-12-11T14:30:00');  // '11 de dezembro de 2025 às 14:30'

// Relativo
getRelativeDate('2025-12-10');          // 'Ontem'
getRelativeDate('2025-12-09');          // 'Há 2 dias'

// Com locale específico
formatDate('2025-12-11', 'en-US');     // 'December 11, 2025'
formatDate('2025-12-11', 'es-ES');     // '11 de diciembre de 2025'

// Helpers pré-configurados
import { ptBR } from '@rainersoft/utils';
ptBR.formatDate('2025-12-11');         // '11 de dezembro de 2025'
ptBR.formatCurrency(1234.56);          // 'R$ 1.234,56'
```

### Number Utils (com i18n)

```typescript
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage,
  formatFileSize,
  parseNumber
} from '@rainersoft/utils';

// Moeda (BRL padrão)
formatCurrency(1234.56);                // 'R$ 1.234,56'
formatCurrency(1234.56, 'en-US', 'USD'); // '$1,234.56'
formatCurrency(1234.56, 'es-ES', 'EUR'); // '1.234,56 €'

// Número
formatNumber(1234567.89);               // '1.234.567,89'
formatNumber(1234567.89, 'en-US');      // '1,234,567.89'

// Percentual
formatPercentage(0.85);                 // '85%'
formatPercentage(0.1234, 2);           // '12,34%'

// Tamanho de arquivo
formatFileSize(1024);                   // '1 KB'
formatFileSize(1048576);                // '1 MB'
formatFileSize(1073741824);             // '1 GB'
```

### Validation Utils

```typescript
import { 
  validateEmail, 
  validatePhone, 
  validateCPF,
  validateCNPJ,
  validateURL,
  validateUsername,
  validatePassword
} from '@rainersoft/utils';

// Email
validateEmail('user@example.com');      // { isValid: true }
validateEmail('invalid-email');         // { isValid: false, errors: ['Email inválido'] }

// Telefone (BR)
validatePhone('(11) 99999-9999');       // { isValid: true }
validatePhone('11999999999');           // { isValid: true }

// CPF
validateCPF('123.456.789-09');          // { isValid: false, errors: ['CPF inválido'] }

// Password
validatePassword('senha123', {
  minLength: 8,
  requireUppercase: true,
  requireNumbers: true
}); // { isValid: false, errors: ['Senha deve conter letras maiúsculas'] }
```

### Status Utils (com i18n)

```typescript
import { 
  translateStatus, 
  getStatusColor,
  getStatusIcon
} from '@rainersoft/utils';

// Tradução de status
translateStatus('active', 'pt-BR');     // 'Ativo'
translateStatus('pending', 'en-US');    // 'Pending'
translateStatus('error', 'es-ES');      // 'Error'

// Cor do status
getStatusColor('success');              // '#059669' (emerald-600)
getStatusColor('warning');              // '#f97316' (orange-500)
getStatusColor('error');                // '#dc2626' (red-600)

// Ícone do status
getStatusIcon('loading');               // 'spinner'
getStatusIcon('success');               // 'check-circle'
getStatusIcon('error');                 // 'x-circle'
```

---

## 🏗️ Arquitetura do Monorepo

### Estrutura Local

```
rainer-ecosystem/
├── rainer-design-tokens/               # Biblioteca de tokens
│   ├── src/tokens/                     # JSON schemas
│   ├── src/utils/                      # Helpers TS
│   ├── dist/                           # Build output
│   └── package.json
├── rainer-ui/                          # Biblioteca de UI
│   ├── src/components/                 # Componentes React
│   ├── src/hooks/                      # Custom hooks
│   ├── src/utils/                      # Utilitários
│   ├── dist/                           # Build output
│   └── package.json
├── rainer-utils/                       # Biblioteca de utils
│   ├── src/string/                     # Funções de string
│   ├── src/date/                       # Funções de data
│   ├── src/number/                     # Funções de número
│   ├── src/validation/                 # Funções de validação
│   ├── src/status/                     # Funções de status
│   ├── dist/                           # Build output
│   └── package.json
└── rainer-portfolio-frontend/          # Aplicação principal
    ├── package.json                    # Dependências linkadas
    └── node_modules/@rainersoft/       # Links locais
```

### Link Local

```json
// rainer-portfolio-frontend/package.json
{
  "dependencies": {
    "@rainersoft/design-tokens": "link:../rainer-design-tokens",
    "@rainersoft/ui": "link:../rainer-ui",
    "@rainersoft/utils": "file:../rainer-utils"
  }
}
```

### Scripts de Desenvolvimento

```json
{
  "scripts": {
    "dev": "pnpm run dev:tokens && pnpm run dev:ui && pnpm run dev:utils",
    "dev:tokens": "cd ../rainer-design-tokens && pnpm run dev",
    "dev:ui": "cd ../rainer-ui && pnpm run dev",
    "dev:utils": "cd ../rainer-utils && pnpm run dev",
    "build:all": "pnpm run build:tokens && pnpm run build:ui && pnpm run build:utils",
    "build:tokens": "cd ../rainer-design-tokens && pnpm run build",
    "build:ui": "cd ../rainer-ui && pnpm run build",
    "build:utils": "cd ../rainer-utils && pnpm run build"
  }
}
```

---

## 🔗 Integração com Frontend

### Configuração do Tailwind

```typescript
// tailwind.config.ts
import { tokens } from '@rainersoft/design-tokens';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.light.primary,
        semantic: tokens.colors.light.semantic
      },
      fontFamily: tokens.typography.fontFamilies,
      fontSize: tokens.typography.fontSizes,
      spacing: tokens.spacing.scale,
      borderRadius: tokens.borderRadius.scale,
      boxShadow: tokens.shadows.elevation,
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-up': 'slideUp 300ms ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  }
};
```

### Providers Configurados

```typescript
// app/layout.tsx
import { ThemeProvider } from '@rainersoft/ui';
import { AnalyticsProvider } from '@/components/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Imports Otimizados

```typescript
// Barrel exports para imports organizados
// lib/index.ts
export * from './api';
export * from './utils';
export * from './config';

// constants/index.ts
export * from './metadata';
export * from './content';

// Uso em componentes
import { 
  Button,           // @rainersoft/ui
  formatDate,       // @rainersoft/utils
  tokens           // @rainersoft/design-tokens
} from '@/lib';

import { 
  DESENVOLVEDOR,    // constants/metadata
  SERVICOS         // constants/content
} from '@/constants';
```

### Performance com Tree-shaking

```typescript
// ✅ Import específico (tree-shaking)
import { Button } from '@rainersoft/ui';
import { formatDate } from '@rainersoft/utils';

// ❌ Import completo (bundle maior)
import * as UI from '@rainersoft/ui';
import * as Utils from '@rainersoft/utils';

// ✅ Dynamic imports para código pesado
const HeavyComponent = dynamic(
  () => import('@rainersoft/ui').then(mod => mod.HeavyComponent),
  { ssr: false }
);
```

---

## 🎯 Próximos Passos

1. **Features**: Explore [06-FEATURES](../06-FEATURES/)
2. **Deploy**: Configure [07-DEPLOY](../07-DEPLOY/)
3. **Testes**: Veja [08-TESTES](../08-TESTES/)

---

## 📚 Referências

- [@rainersoft/design-tokens](https://github.com/rainersoft/rainer-design-tokens)
- [@rainersoft/ui](https://github.com/rainersoft/rainer-ui)
- [@rainersoft/utils](https://github.com/rainersoft/rainer-utils)
- [W3C Design Tokens](https://www.w3.org/TR/design-tokens/)
- [Radix UI](https://www.radix-ui.com/)
