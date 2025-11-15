# 🧪 Guia de Teste: Listagem de Posts do Usuário

## 📋 Objetivo

Verificar se a funcionalidade de listagem de todos os posts do usuário no dashboard está funcionando corretamente.

## 🎯 O que testar

### 1. **Listagem na Home do Dashboard**

**URL**: `http://localhost:3000/dashboard`

**Verificar:**

- ✅ Aparece seção "Posts Recentes" (últimos 5 posts)
- ✅ Mostra total de posts no `QuickStats`
- ✅ Botão "Ver Todos os Posts" funciona

### 2. **Listagem Completa (View All)**

**URL**: `http://localhost:3000/dashboard?view=all`

**Verificar:**

- ✅ Lista TODOS os posts do usuário logado
- ✅ Mostra posts com diferentes status:
  - `PUBLISHED` (badge verde "Publicado")
  - `DRAFT` (badge cinza "Rascunho")
  - `ARCHIVED` (se houver)
- ✅ Cada post exibe:
  - Título
  - Descrição (excerpt)
  - Data de criação/publicação
  - Categoria/Subcategoria
  - Imagem de capa (se houver)
  - Botões de ação (Editar, Deletar)

### 3. **Funcionalidades**

#### A. Carregamento Inicial

- ✅ Estado de loading aparece durante busca
- ✅ Loading desaparece quando posts são carregados
- ✅ Se não houver posts, mostra mensagem: "Nenhum post criado ainda"

#### B. Integração com API

- ✅ Faz requisição: `GET /api/posts` (sem filtros)
- ✅ Backend retorna apenas posts do usuário logado
- ✅ Token de autenticação é enviado corretamente

#### C. Ações nos Posts

- ✅ **Editar**: Abre editor com dados do post
- ✅ **Deletar**: Remove post após confirmação
- ✅ Após criar/editar/deletar, lista é atualizada

## 🔍 Como Testar

### Passo 1: Preparação

```bash
# 1. Inicie o servidor
npm run dev

# 2. Inicie o backend (se necessário)
cd ../rainer-portfolio-backend
npm run dev
```

### Passo 2: Executar Script de Teste

```bash
npm run test:posts
```

### Passo 3: Teste Manual

1. **Acesse o Dashboard**

   ```
   http://localhost:3000/dashboard
   ```

2. **Faça Login** (se necessário)
   - Use credenciais válidas
   - Aguarde redirecionamento

3. **Verifique a Home**
   - Confirme que posts recentes aparecem
   - Confirme que estatísticas estão corretas

4. **Acesse "Ver Todos os Posts"**
   - Clique no botão ou acesse: `/dashboard?view=all`
   - Confirme que todos os posts aparecem

5. **Abra DevTools (F12)**
   - Aba **Network**: Verifique requisição `GET /api/posts`
   - Aba **Console**: Verifique por erros
   - Aba **React DevTools**: Inspecione estado dos hooks

6. **Teste Ações**
   - Clique em "Editar" → Deve abrir editor
   - Clique em "Deletar" → Deve pedir confirmação e remover
   - Crie novo post → Deve aparecer na lista

## 📊 O que Esperar

### Requisição de API

```http
GET /api/posts HTTP/1.1
Authorization: Bearer <token>
```

### Resposta Esperada

```json
{
  "success": true,
  "data": [
    {
      "id": "post-1",
      "title": "Título do Post",
      "excerpt": "Descrição...",
      "status": "PUBLISHED",
      "authorId": "<user-id>",
      "createdAt": "2025-01-01T00:00:00Z",
      "publishedAt": "2025-01-01T00:00:00Z",
      "coverImage": "https://...",
      "subcategory": {
        "id": "subcat-1",
        "name": "Categoria"
      }
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### Componente React

```typescript
// Hook usado no dashboard
const { posts: allPosts = [], loading: isLoadingPosts } = usePosts();

// Renderização
{allPosts.map(post => (
  <PostItem key={post.id} post={post} />
))}
```

## ❌ Problemas Comuns

### 1. Posts não aparecem

**Sintomas:**

- Lista vazia mesmo tendo posts
- Loading infinito
- Erro no console

**Soluções:**

- ✅ Verificar autenticação (token válido)
- ✅ Verificar se backend está rodando
- ✅ Verificar console (F12) por erros
- ✅ Verificar Network tab na requisição
- ✅ Verificar se há posts no banco de dados

### 2. Erro 401 (Unauthorized)

**Sintomas:**

- Requisição falha com status 401
- Mensagem: "Unauthorized"

**Soluções:**

- ✅ Fazer login novamente
- ✅ Verificar se token não expirou
- ✅ Verificar se token é enviado no header

### 3. Erro 500 (Server Error)

**Sintomas:**

- Requisição falha com status 500
- Erro genérico no console

**Soluções:**

- ✅ Verificar logs do backend
- ✅ Verificar se há erro na query do banco
- ✅ Verificar se modelo de dados está correto

### 4. Apenas alguns posts aparecem

**Sintomas:**

- Lista mostra menos posts do que esperado
- Paginação pode estar ativa

**Soluções:**

- ✅ Verificar se há filtro de paginação
- ✅ Verificar se `limit` está correto
- ✅ Verificar se há filtro de status ativo

## ✅ Checklist de Validação

- [ ] Servidor rodando (`npm run dev`)
- [ ] Backend rodando (se necessário)
- [ ] Usuário autenticado
- [ ] Posts aparecem na home (últimos 5)
- [ ] Todos os posts aparecem em `?view=all`
- [ ] Status dos posts está correto (badges)
- [ ] Datas estão formatadas corretamente
- [ ] Imagens de capa aparecem
- [ ] Botão "Editar" funciona
- [ ] Botão "Deletar" funciona
- [ ] Após criar post, ele aparece na lista
- [ ] Após editar post, mudanças aparecem
- [ ] Após deletar post, ele desaparece
- [ ] Loading state funciona corretamente
- [ ] Mensagem "Nenhum post" aparece quando vazio
- [ ] Sem erros no console
- [ ] Requisição API bem-sucedida

## 📝 Notas

- O hook `usePosts()` usa `postsService.listPosts()` sem filtros
- O backend deve filtrar automaticamente por usuário logado
- Posts com diferentes status devem aparecer
- Paginação pode estar implementada (verificar)

## 🚀 Próximos Passos

Após validar que tudo funciona:

1. Testar com muitos posts (paginação)
2. Testar filtros (se implementados)
3. Testar ordenação (se implementada)
4. Testar busca (se implementada)
