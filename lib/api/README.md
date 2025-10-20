# 🔌 API Integration - Backend Communication

Esta pasta centraliza toda a comunicação com o backend, mantendo uma estrutura organizada e type-safe.

## 📁 Estrutura

```typescript
lib/api/
├── README.md                    # Este arquivo
├── index.ts                     # Exportações principais
├── client.ts                    # Cliente HTTP base
├── config.ts                    # Configurações centralizadas
├── types.ts                     # Tipos base
├── types/                       # Tipos específicos por domínio
│   ├── auth.ts
│   ├── categories.ts
│   ├── comments.ts
│   ├── likes.ts
│   ├── bookmarks.ts
│   └── users.ts
├── services/                    # Serviços específicos
│   ├── auth.service.ts
│   ├── posts.service.ts
│   ├── categories.service.ts
│   ├── comments.service.ts
│   ├── likes.service.ts
│   ├── bookmarks.service.ts
│   └── users.service.ts
└── examples/                    # Exemplos de uso
    └── api-usage.example.ts
```typescript

## 🎯 Características

- ✅ **Type-safe**: Todos os tipos TypeScript definidos
- ✅ **Centralizado**: Toda comunicação com backend em um local
- ✅ **Configurável**: Configurações centralizadas em `config.ts`
- ✅ **Tratamento de Erros**: Sistema robusto de tratamento de erros
- ✅ **Timeout**: Controle de timeout para requisições
- ✅ **Logging**: Logs detalhados para debugging
- ✅ **Cache**: Suporte a cache do Next.js
- ✅ **Retry**: Sistema de retry automático (preparado)

## 🚀 Como Usar

### Importação Básica

```typescript
import { api, postsService, authService } from '@/lib/api';
```typescript

### Cliente HTTP Direto

```typescript
// GET request
const response = await api.get<ApiResponse<Post>>('/posts');

// POST request
const newPost = await api.post<Post>('/posts', {
  title: 'Meu Post',
  content: 'Conteúdo do post'
});
```typescript

### Serviços Específicos

```typescript
// Usar serviço de posts
const posts = await postsService.getPosts({
  page: 1,
  limit: 10,
  status: 'PUBLISHED'
});

// Usar serviço de autenticação
const user = await authService.getCurrentUser();
```typescript

## ⚙️ Configuração

### Variáveis de Ambiente

```typescriptenv
# URL do backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Outras configurações são definidas em config.ts
```typescript

### Configurações Disponíveis

```typescript
import { API_CONFIG, API_ENDPOINTS } from '@/lib/api';

console.log(API_CONFIG.BASE_URL);        // URL base
console.log(API_CONFIG.TIMEOUT);         // Timeout padrão
console.log(API_ENDPOINTS.POSTS.LIST);   // Endpoint de posts
```typescript

## 🔧 Serviços Disponíveis

### AuthService

- `login(credentials)` - Fazer login
- `register(userData)` - Registrar usuário
- `logout()` - Fazer logout
- `getCurrentUser()` - Obter usuário atual
- `isAuthenticated()` - Verificar se está autenticado
- `updateProfile(data)` - Atualizar perfil

### PostsService

- `getPosts(filters)` - Listar posts
- `getPostById(id)` - Buscar post por ID
- `getPostBySlug(slug)` - Buscar post por slug
- `createPost(data)` - Criar post
- `updatePost(data)` - Atualizar post
- `deletePost(id)` - Deletar post
- `publishPost(id)` - Publicar post
- `incrementViewCount(id)` - Incrementar visualizações

### CategoriesService

- `getCategories()` - Listar categorias
- `getCategoryById(id)` - Buscar categoria por ID
- `createCategory(data)` - Criar categoria
- `updateCategory(data)` - Atualizar categoria
- `deleteCategory(id)` - Deletar categoria

## 📝 Exemplos

Ver `examples/api-usage.example.ts` para exemplos completos de uso.

## 🐛 Tratamento de Erros

```typescript
try {
  const posts = await postsService.getPosts();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Erro da API:', error.status, error.message);
  } else {
    console.error('Erro de rede:', error);
  }
}
```typescript

## 🔍 Debugging

### Logs Automáticos

- Erros de API são logados automaticamente
- Inclui status, URL e dados do erro
- Logs de rede para problemas de conectividade

### Verificar Configuração

```typescript
import { validateApiConfig } from '@/lib/api';

if (!validateApiConfig()) {
  console.error('Configuração da API inválida');
}
```typescript

## 📊 Performance

### Cache

```typescript
// Com cache (1 hora)
const posts = await api.get('/posts', {
  cache: 'force-cache',
  next: { revalidate: 3600 }
});

// Sem cache
const freshPosts = await api.get('/posts', {
  cache: 'no-store'
});
```typescript

### Timeout

```typescript
// Timeout personalizado
const posts = await api.get('/posts', {
  timeout: 5000 // 5 segundos
});
```typescript

## 🔒 Segurança

- Headers de segurança configurados
- Validação de URLs
- Sanitização de parâmetros
- Tratamento seguro de erros

## 📚 Documentação Adicional

- [Exemplos de Uso](examples/api-usage.example.ts)
- [Configurações](config.ts)
- [Tipos TypeScript](types.ts)

---

**Última atualização**: Outubro 2025  
**Versão**: 1.0.0  
**Status**: ✅ Pronto para Uso
