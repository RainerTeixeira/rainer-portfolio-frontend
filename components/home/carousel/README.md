# Carousel Cyberpunk - Estrutura Modularizada

Sistema de carousel hero com tema cyberpunk/futurista, organizado em componentes modulares para melhor manutenção e performance.

## 📁 Estrutura de Arquivos

```
carousel/
├── Carousel.tsx              # Componente principal (background e orquestração)
├── HeroContent.tsx           # Conteúdo do hero (card, textos, botões)
├── HolographicBackground.tsx # Fundo holográfico com gradientes
├── MatrixRain.tsx            # Chuva de código binário (Matrix)
├── ParticlesSystem.tsx       # Sistema de partículas quânticas
├── ScrollIndicator.tsx       # Indicador de scroll animado
├── constants.ts              # Constantes (textos, padrões, etc)
├── types.ts                  # Tipos e interfaces TypeScript
├── index.ts                  # Exports do módulo
└── README.md                 # Esta documentação
```

## 🎨 Componentes

### `Carousel.tsx`
Componente principal que orquestra todo o sistema:
- Gerencia estado (slides, animações, responsividade)
- Controla Matrix Rain e Partículas
- Sistema de auto-play configurável
- Performance otimizada com memoização

### `HeroContent.tsx`
Conteúdo principal do hero:
- Card glassmorphism com efeitos visuais
- Textos animados com gradientes
- Botões de CTA
- Badge de sistema
- Efeitos de glitch e pulso

### `HolographicBackground.tsx`
Fundo holográfico:
- Gradientes multicamada
- Grade tática
- Scanlines animadas

### `MatrixRain.tsx`
Chuva de código binário:
- Bits de processador caindo
- Efeitos estilo Matrix
- Cores verde neon

### `ParticlesSystem.tsx`
Sistema de partículas:
- Partículas quânticas animadas
- 4 tipos: energy, data, quantum, neural
- Paletas de cores por tema

### `ScrollIndicator.tsx`
Indicador visual de scroll:
- Ícone de mouse animado
- Setas indicativas
- Efeitos de pulso

## 📝 Uso

```tsx
import Carousel from '@/components/home/carousel'

// Uso básico
<Carousel />

// Com configurações
<Carousel 
  autoPlayInterval={5000} 
  enableAutoPlay={true} 
/>
```

## 🎛️ Props

### Carousel
- `autoPlayInterval?: number` - Intervalo do auto-play em ms (padrão: 5000)
- `enableAutoPlay?: boolean` - Habilitar auto-play (padrão: true)

## 🔧 Customização

### Textos
Edite `constants.ts`:
```typescript
export const PRIMARY_TEXTS = [
  "SEU TEXTO AQUI",
  // ...
]
```

### Cores
Ajuste as paletas em `ParticlesSystem.tsx` ou os gradientes nos componentes

### Animações
Ajuste as durações e delays nas animações CSS dentro de cada componente

## ⚡ Performance

- Componentes memoizados
- GPU acceleration
- Redução de partículas em mobile
- RequestAnimationFrame para redimensionamento
- Respeita `prefers-reduced-motion`

## 📱 Responsividade

Otimizado para:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)
- Landscape modes

## 🎨 Temas

Suporta dark e light mode automaticamente via `next-themes`

---

**Autor:** Rainer Teixeira  
**Versão:** 1.0.0

