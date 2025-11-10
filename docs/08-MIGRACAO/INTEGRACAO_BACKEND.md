# 🔗 (Movido) Integração Frontend ↔ Backend

## ✅ Status Atual

Esta documentação foi movida para o backend, que agora centraliza o fluxo OAuth com Cognito (Google/GitHub).

Consulte no backend:

- `docs/08-MIGRACAO/INTEGRACAO_BACKEND.md`

---

## 🚀 Integração em 3 Passos

No frontend, mantenha apenas `NEXT_PUBLIC_API_URL` para chamar o backend.

### 2️⃣ Iniciar Backend

```bash
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev
```

✅ Backend rodando em: <http://localhost:4000>
✅ Swagger disponível em: <http://localhost:4000/docs>

### 3️⃣ Iniciar Frontend

```bash
cd C:\Desenvolvimento\rainer-portfolio-frontend
npm run dev
```

✅ Frontend rodando em: <http://localhost:3000>

---

## 🎯 Testando a Integração

### 1. Testar Health Check

Abra o navegador em <http://localhost:3000> e verifique se a API está respondendo.

O frontend já está configurado para chamar:

- `GET http://localhost:4000/health`

### 2. Testar Autenticação

1. Acesse: <http://localhost:3000/dashboard/login>
2. Clique em "Criar conta" (se não tiver usuário)
3. Preencha o formulário de registro
4. O frontend vai chamar: `POST http://localhost:4000/auth/register`
5. Confirme o email (código enviado pelo Cognito)
6. Faça login

### 3. Testar Posts

1. Após login, acesse: <http://localhost:3000/blog>
2. O frontend vai chamar: `GET http://localhost:4000/posts`
3. Você verá os posts do backend

---

## 📡 Endpoints Integrados

### ✅ Já Funcionando (sem alteração)

| Frontend Service | Backend Endpoint | Status |
|------------------|------------------|--------|
| `authService.register()` | `POST /auth/register` | ✅ |
| `authService.login()` | `POST /auth/login` | ✅ |
| `authService.refreshToken()` | `POST /auth/refresh` | ✅ |
| `postsService.listPosts()` | `GET /posts` | ✅ |
| `postsService.getPostBySlug()` | `GET /posts/slug/:slug` | ✅ |
| `usersService.getUserById()` | `GET /users/:id` | ✅ |
| `categoriesService.listCategories()` | `GET /categories` | ✅ |
| `commentsService.getCommentsByPost()` | `GET /comments/post/:postId` | ✅ |
| `likesService.createLike()` | `POST /likes` | ✅ |
| `bookmarksService.createBookmark()` | `POST /bookmarks` | ✅ |

---

## 🔧 Configurações Importantes

### CORS no Backend

O backend já está configurado para aceitar requisições do frontend:

```typescript
// src/main.ts (backend)
app.enableCors({
  origin: env.CORS_ORIGIN || '*',
  credentials: true,
});
```

Se precisar restringir, adicione no backend `.env`:

```env
CORS_ORIGIN=http://localhost:3000
```

### Headers Automáticos

O API Client do frontend já injeta automaticamente:

```typescript
// lib/api/client.ts
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}` // Quando autenticado
}
```

---

## ✅ CORREÇÃO APLICADA

**Problema**: Código duplicado em `auth.service.ts` causando erro de build

**Solução**: Arquivo corrigido! Agora todos os métodos de autenticação chamam o backend diretamente.

---

## 🐛 Troubleshooting

### Erro: "Network Error"

**Causa**: Backend não está rodando ou URL errada

**Solução**:

```bash
# Verificar se backend está rodando
curl http://localhost:4000/health

# Se não estiver, iniciar:
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev
```

### Erro: "CORS Policy"

**Causa**: CORS não configurado no backend

**Solução**: Já está configurado! Se persistir, adicione no backend `.env`:

```env
CORS_ORIGIN=http://localhost:3000
```

### Erro: "401 Unauthorized"

**Causa**: Token expirado ou inválido

**Solução**: Faça logout e login novamente. O frontend vai renovar o token automaticamente.

### Erro: "Cognito User Not Found"

**Causa**: Usuário não existe no Cognito

**Solução**: Registre um novo usuário em <http://localhost:3000/dashboard/login/register>

---

## 📊 Fluxo de Autenticação

```mermaid
Frontend                Backend                 Cognito
   |                       |                       |
   |-- POST /auth/register ----------------------->|
   |                       |<-- User Created ------|
   |<-- userId + message --|                       |
   |                       |                       |
   |-- POST /auth/login --------------------------->|
   |                       |<-- JWT Tokens --------|
   |<-- tokens + user -----|                       |
   |                       |                       |
   | (salva tokens)        |                       |
   |                       |                       |
   |-- GET /posts (+ token) ------------------->   |
   |                       |-- Valida JWT -------->|
   |                       |<-- Valid -------------|
   |<-- posts -------------|                       |
```

---

## 🎨 Componentes Prontos para Usar

### AuthProvider

```tsx
// Já configurado em app/layout.tsx
import { AuthProvider } from '@/components/providers/auth-context-provider'

<AuthProvider>
  {children}
</AuthProvider>
```

### useAuthContext Hook

```tsx
import { useAuthContext } from '@/components/providers/auth-context-provider'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthContext()
  
  if (!isAuthenticated) {
    return <LoginButton />
  }
  
  return <div>Olá, {user?.fullName}</div>
}
```

### API Services

```tsx
import { postsService } from '@/lib/api'

async function loadPosts() {
  const response = await postsService.listPosts({
    page: 1,
    limit: 10,
    status: 'PUBLISHED'
  })
  
  console.log(response.posts)
}
```

---

## 📚 Documentação Adicional

- **Backend Swagger**: <http://localhost:4000/docs>
- **Frontend API Client**: `lib/api/client.ts`
- **Backend README**: `C:\Desenvolvimento\rainer-portfolio-backend\README.md`
- **Cognito Setup**: `COGNITO-SETUP.md`

---

## ✨ Próximos Passos

1. ✅ **Testar registro de usuário**
2. ✅ **Testar login**
3. ✅ **Testar listagem de posts**
4. ✅ **Testar criação de post** (dashboard)
5. ✅ **Testar comentários**
6. ✅ **Testar likes/bookmarks**

---

**Tudo pronto! Basta iniciar os dois servidores e começar a usar! 🚀**

**Frontend**: <http://localhost:3000>
**Backend**: <http://localhost:4000>
**Swagger**: <http://localhost:4000/docs>
