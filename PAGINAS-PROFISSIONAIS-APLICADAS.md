# 🎨 Páginas Profissionais - Dark Cyberpunk + Light Clean

**Data**: 18/11/2025  
**Status**: ✅ **EM PROGRESSO**

---

## 🎯 Objetivo

Aplicar design profissional em TODAS as páginas:
- ✅ **Dark Mode**: Visual cyberpunk futurista com efeitos neon
- ✅ **Light Mode**: Visual clean e profissional empresarial

---

## 📦 Estrutura Criada

### 1. CSS Global (`globals.css`)

#### Classes Cyberpunk (Dark Mode):
- `.section-title-dark` - Títulos com glow neon
- `.card-professional-dark` - Cards com borda cyan e backdrop blur
- `.badge-cyberpunk` - Badges com gradiente neon
- `.btn-cyberpunk` - Botões com efeito holográfico
- `.text-cyberpunk` - Texto com sombra cyan

#### Classes Profissionais (Light Mode):
- `.section-title-light` - Títulos clean com sombra sutil
- `.card-professional-light` - Cards brancos com sombra
- `.badge-professional` - Badges azul clean
- `.btn-professional` - Botões sólidos profissionais

---

### 2. Hook de Tema (`use-theme-classes.ts`)

```typescript
export function useThemeClasses() {
  return {
    isDark,
    sectionTitle: isDark ? 'section-title-dark' : 'section-title-light',
    card: isDark ? 'card-professional-dark' : 'card-professional-light',
    badge: isDark ? 'badge-cyberpunk' : 'badge-professional',
    // ...
  };
}
```

---

## 📄 Páginas a Atualizar

### Principais:
1. ⏳ `/blog` - Blog de artigos
2. ⏳ `/sobre` - Sobre mim
3. ⏳ `/contato` - Formulário de contato
4. ⏳ `/dashboard` - Dashboard admin

### Secundárias:
5. ⏳ `/privacidade` - Política de privacidade
6. ⏳ `/termos` - Termos de uso
7. ⏳ `/cookies` - Política de cookies

---

## 🚀 Como Usar

### Em qualquer página:

```tsx
import { useThemeClasses } from '@/lib/hooks/use-theme-classes';

export default function Page() {
  const theme = useThemeClasses();
  
  return (
    <div className="section-container">
      <h1 className={theme.sectionTitle}>
        Título da Página
      </h1>
      
      <div className={theme.card}>
        <p className={theme.textAccent}>
          Conteúdo profissional
        </p>
      </div>
    </div>
  );
}
```

---

## ✅ Checklist

### CSS Global
- [x] Classes cyberpunk criadas
- [x] Classes profissionais criadas
- [x] Animações neon adicionadas
- [x] Responsividade garantida

### Hooks/Utils
- [x] `use-theme-classes` criado
- [ ] Aplicado em todas páginas

### Páginas
- [ ] Blog atualizada
- [ ] Sobre atualizada
- [ ] Contato atualizada
- [ ] Dashboard atualizada
- [ ] Outras páginas

---

## 🎨 Design System

### Dark Mode (Cyberpunk)
**Cores**:
- Principal: Cyan (#22d3ee)
- Acento: Pink/Magenta
- Background: Preto com blur
- Bordas: Cyan com glow

**Efeitos**:
- Neon pulse
- Glitch ocasional
- Scan lines
- Backdrop blur

### Light Mode (Profissional)
**Cores**:
- Principal: Azul corporativo (#2563eb)
- Acento: Cinza escuro
- Background: Branco puro
- Bordas: Cinza claro

**Efeitos**:
- Sombras sutis
- Transições suaves
- Hover elevação
- Clean e minimalista

---

**STATUS**: Estrutura criada, aplicando em páginas...
