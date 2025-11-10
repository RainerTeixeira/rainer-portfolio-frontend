# Guia de Uso - shadcn/ui

Este guia documenta como usar os componentes shadcn/ui no projeto, incluindo integração com design tokens e exemplos práticos.

## 📋 Índice

- [Componentes Disponíveis](#componentes-disponíveis)
- [Integração com Design Tokens](#integração-com-design-tokens)
- [Exemplos de Uso](#exemplos-de-uso)
- [Substituindo Código Customizado](#substituindo-código-customizado)
- [Boas Práticas](#boas-práticas)

## 🎯 Componentes Disponíveis

### Componentes Instalados (32/41 - 78%)

#### Componentes Básicos
- ✅ **Button** - Botões com variantes
- ✅ **Card** - Sistema de cards composable
- ✅ **Badge** - Etiquetas/tags
- ✅ **Avatar** - Imagens de perfil
- ✅ **Separator** - Linhas divisórias
- ✅ **Skeleton** - Loading placeholders

#### Formulários
- ✅ **Input** - Campos de texto
- ✅ **Textarea** - Áreas de texto
- ✅ **Label** - Labels de formulário
- ✅ **Checkbox** - Checkboxes
- ✅ **Select** - Dropdowns
- ✅ **Form** - Sistema de formulários com validação
- ✅ **Radio Group** - Grupos de opções radio

#### Navegação
- ✅ **Navigation Menu** - Menu de navegação avançado
- ✅ **Tabs** - Navegação em abas
- ✅ **Dropdown Menu** - Menus dropdown
- ✅ **Sheet** - Drawer lateral

#### Overlays
- ✅ **Dialog** - Modais
- ✅ **Alert Dialog** - Dialogs de confirmação
- ✅ **Popover** - Popovers contextuais
- ✅ **Tooltip** - Tooltips informativos
- ✅ **Hover Card** - Cards que aparecem no hover

#### Feedback
- ✅ **Alert** - Alertas e mensagens
- ✅ **Sonner (Toaster)** - Notificações toast modernas
- ✅ **Progress** - Barras de progresso
- ✅ **Skeleton** - Loading states

#### Dados
- ✅ **Table** - Tabelas responsivas
- ✅ **Carousel** - Carrosséis de imagens/conteúdo
- ✅ **Accordion** - Seções expansíveis/colapsáveis

#### Controles
- ✅ **Switch** - Toggle switches
- ✅ **Toggle** - Botões toggle
- ✅ **Command** - Command palette (Ctrl+K)

#### Utilitários
- ✅ **Scroll Area** - Área de scroll customizada

## 🎨 Integração com Design Tokens

Todos os componentes shadcn/ui foram integrados com os design tokens do projeto. Isso garante:

- ✅ **Consistência visual** - Todos usam os mesmos valores
- ✅ **Manutenção centralizada** - Mudanças em um lugar afetam tudo
- ✅ **Type-safety** - Autocomplete e validação de tipos

### Tokens Integrados

Os seguintes tokens foram integrados nos componentes:

- `BORDER_RADIUS` - Bordas arredondadas
- `SHADOWS` - Sombras
- `TRANSITIONS` - Transições e animações
- `FONT_WEIGHT` - Pesos de fonte
- `OPACITY` - Opacidade
- `Z_INDEX_CLASSES` - Camadas z-index
- `ANIMATION_DURATION` - Durações de animação

### Exemplo de Integração

```tsx
// ❌ ANTES (hardcoded)
<Button className="rounded-md transition-all duration-300 font-medium" />

// ✅ DEPOIS (com design tokens)
import { BORDER_RADIUS, TRANSITIONS, FONT_WEIGHT } from '@/constants/design-tokens'
<Button className={cn(BORDER_RADIUS.MD, TRANSITIONS.ALL_EASE_IN_OUT, FONT_WEIGHT.MEDIUM)} />
```

## 📚 Exemplos de Uso

### 1. Accordion - FAQs e Filtros

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui'

export function FAQSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona?</AccordionTrigger>
        <AccordionContent>
          Explicação detalhada aqui...
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### 2. Carousel - Galerias e Testimonials

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui'

export function TestimonialsCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>Testimonial 1</CarouselItem>
        <CarouselItem>Testimonial 2</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

### 3. Sonner - Notificações Toast

```tsx
import { toast } from 'sonner'

// Sucesso
toast.success('Operação realizada com sucesso!')

// Erro
toast.error('Erro ao processar')

// Info
toast.info('Informação importante')

// Loading
const toastId = toast.loading('Processando...')
// Depois: toast.success('Concluído!', { id: toastId })
```

### 4. Table - Dados Tabulares

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

export function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>João</TableCell>
          <TableCell>joao@email.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
```

### 5. Navigation Menu - Menu Principal

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui'

export function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Conteúdo do menu */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

### 6. Toggle - Botões Toggle

```tsx
import { Toggle } from '@/components/ui'

export function FilterToggle() {
  const [active, setActive] = useState(false)
  
  return (
    <Toggle pressed={active} onPressedChange={setActive}>
      Filtro Ativo
    </Toggle>
  )
}
```

### 7. Hover Card - Preview de Conteúdo

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui'

export function UserPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger>@username</HoverCardTrigger>
      <HoverCardContent>
        <p>Informações do usuário</p>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## 🔄 Substituindo Código Customizado

### Oportunidades de Substituição

#### 1. Carrosséis Customizados → Carousel

**Antes:**
```tsx
// components/home/carousel.tsx - Carousel customizado complexo
```

**Depois:**
```tsx
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui'
// Usar componente shadcn/ui
```

#### 2. Toasts Customizados → Sonner

**Antes:**
```tsx
// Sistema de toast customizado
```

**Depois:**
```tsx
import { toast } from 'sonner'
toast.success('Mensagem')
```

#### 3. Menus Customizados → Navigation Menu

**Antes:**
```tsx
// Menu customizado com dropdown-menu
```

**Depois:**
```tsx
import { NavigationMenu } from '@/components/ui'
// Menu mais robusto e acessível
```

#### 4. Tabelas Customizadas → Table

**Antes:**
```tsx
// Tabelas HTML customizadas
```

**Depois:**
```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui'
// Tabelas responsivas e acessíveis
```

#### 5. Accordions Customizados → Accordion

**Antes:**
```tsx
// Accordion customizado com useState
```

**Depois:**
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui'
// Accordion acessível e testado
```

## ✅ Boas Práticas

### 1. Sempre Use Design Tokens

```tsx
// ✅ BOM
import { BORDER_RADIUS, TRANSITIONS } from '@/constants/design-tokens'
<Button className={cn(BORDER_RADIUS.MD, TRANSITIONS.ALL_EASE_IN_OUT)} />

// ❌ EVITAR
<Button className="rounded-md transition-all duration-300" />
```

### 2. Use cn() para Combinar Classes

```tsx
import { cn } from '@/lib/utils'
import { BORDER_RADIUS } from '@/constants/design-tokens'

<Card className={cn(BORDER_RADIUS.LG, "custom-class")} />
```

### 3. Prefira Componentes shadcn/ui

Sempre que possível, use componentes shadcn/ui em vez de criar componentes customizados:

- ✅ Mais acessível
- ✅ Melhor testado
- ✅ Consistente com o design system
- ✅ Menos código para manter

### 4. Customize com Variantes

Use o sistema de variantes do shadcn/ui em vez de sobrescrever estilos:

```tsx
// ✅ BOM - Usar variantes
<Button variant="outline" size="lg" />

// ❌ EVITAR - Sobrescrever estilos
<Button className="border-2 p-6" />
```

### 5. Integre com Design Tokens

Ao criar novos componentes ou customizar existentes, sempre use design tokens:

```tsx
import {
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  FONT_WEIGHT,
} from '@/constants/design-tokens'

const customComponent = cn(
  BORDER_RADIUS.LG,
  SHADOWS.MEDIUM,
  TRANSITIONS.ALL_EASE_IN_OUT,
  FONT_WEIGHT.SEMIBOLD
)
```

## 📝 Checklist de Migração

Ao substituir código customizado:

- [ ] Identificar componente shadcn/ui equivalente
- [ ] Verificar se design tokens estão integrados
- [ ] Testar acessibilidade (keyboard navigation, screen readers)
- [ ] Verificar responsividade
- [ ] Atualizar testes se necessário
- [ ] Documentar mudanças

## 🔗 Recursos

- [Documentação shadcn/ui](https://ui.shadcn.com)
- [Design Tokens do Projeto](./design-tokens.ts)
- [Componentes UI](../components/ui/)

## 📊 Status de Integração

- ✅ **Button** - Design tokens integrados
- ✅ **Card** - Design tokens integrados
- ✅ **Accordion** - Design tokens integrados
- ✅ **Carousel** - Design tokens integrados
- ✅ **Table** - Design tokens integrados
- ✅ **Navigation Menu** - Design tokens integrados
- ✅ **Sonner** - Design tokens integrados
- ⏳ **Outros componentes** - Em progresso

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0.0

