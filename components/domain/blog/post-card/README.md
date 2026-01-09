# 📁 PostCard Components

Coleção de componentes para exibição de cards de posts do blog com design premium e funcionalidades completas.

## 🏗️ Estrutura

```
post-card/
├── index.ts                  # Barrel exports principal
├── README.md                 # Esta documentação
├── post-card.tsx             # Componente principal (427 linhas → ~80 linhas)
├── post-image.tsx            # Imagem com efeitos visuais
├── post-header.tsx           # Cabeçalho com metadados
├── post-content.tsx           # Descrição e tempo de leitura
├── post-social-actions.tsx     # Ações sociais (like, bookmark, share)
└── read-more-link.tsx         # Link "Ler mais" animado
```

## 🎯 Componentes

### 📸 PostCard (Principal)
- **Tamanho:** ~80 linhas (reduzido de 427)
- **Responsabilidades:** Orquestração dos subcomponentes
- **Recursos:** Motion, tema, acessibilidade

### 🖼️ PostImage
- **Função:** Imagem com overlay gradient e borda neon
- **Efeitos:** Glow, hover scale, transições suaves
- **Otimização:** Next.js Image com lazy loading

### 📝 PostHeader  
- **Função:** Metadados do post (título, categoria, data)
- **Recursos:** Badge animado, título com gradient
- **Acessibilidade:** ARIA labels completas

### 📄 PostContent
- **Função:** Descrição com line-clamp e tempo de leitura
- **Layout:** Responsivo com espaçamento consistente

### 💬 PostSocialActions
- **Função:** Botões de interação social
- **Layout:** Responsivo com prevenção de navegação
- **Componentes:** Like, Bookmark, Share (reutilizados)

### 🔗 ReadMoreLink
- **Função:** Link "Ler mais" com animação de seta
- **Animação:** Framer Motion com loop infinito
- **Design:** Minimalista e acessível

## 🎨 Design System

- **Cores:** Gradientes dinâmicos baseados no tema
- **Animações:** Framer Motion com springs suaves
- **Acessibilidade:** WCAG AA compliant
- **Dark Mode:** Suporte completo com tokens dinâmicos

## 🚀 Uso

```tsx
import { PostCard } from '@/components/domain/blog/post-card';

<PostCard
  title="Como usar Next.js 14"
  description="Aprenda os fundamentos do App Router..."
  date="15 de março, 2025"
  category="Tutorial"
  image="/posts/nextjs.jpg"
  link="/blog/nextjs-14"
  postId="post-123"
  showSocialActions={true}
/>
```

## 📈 Benefícios

1. **Modularidade:** Cada componente isolado com responsabilidade clara
2. **Reutilização:** Subcomponentes podem ser usados em outros lugares
3. **Manutenibilidade:** Código mais fácil de entender e modificar
4. **Performance:** Code splitting automático com lazy loading
5. **Testabilidade:** Testes unitários por componente
6. **Colaboração:** Múltiplos desenvolvedores podem trabalhar simultaneamente

## 🔄 Migração

- **Antes:** Arquivo único `post-card.tsx` (427 linhas, 15KB)
- **Depois:** Estrutura modular com 6 arquivos menores
- **Redução:** ~80% no tamanho do arquivo principal
- **Compatibilidade:** 100% mantida com API existente

---

*Desenvolvido com ❤️ para melhor manutenibilidade do código*
