# ⚠️ Problema: Login com Email não Funciona

## 🔴 Situação Atual

- **Registro**: Usa `username` único (ex: `savitom101684523`)
- **Login**: Usuário tenta usar `email` (ex: `savitom101@elygifts.com`)
- **Erro**: Cognito não encontra usuário porque está buscando por username

## 💡 Soluções

### Solução 1: Configurar Email como Alias no Cognito ✅ (Recomendado)

Permite login com email OU username.

**No AWS Console:**

1. Cognito → User Pools → `RainerSoftCognito`
2. **Autenticação** → **Métodos de autenticação**
3. Clique em **"Edit"**
4. Em **"User fullName requirements"**, marque:
   - ✅ **Also allow sign in with verified email address**
5. Salve

**Problema**: Isso pode não estar disponível se o User Pool já foi criado com configuração diferente.

---

### Solução 2: Criar Endpoint de Busca de Username por Email 🔧

Adicionar endpoint no backend que busca username pelo email antes de fazer login.

**Backend** (`auth.service.ts`):

```typescript
async getUsernameByEmail(email: string): Promise<string> {
  const user = await this.usersService.getUserByEmail(email);
  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }
  return user.username;
}
```

**Frontend** (antes do login):

```typescript
// Busca username pelo email
const { username } = await authService.getUsernameByEmail(email);
// Faz login com username
await authService.login({ username, password });
```

---

### Solução 3: Aceitar Username no Formulário de Login 📝 (Mais Simples)

Mudar o formulário para pedir username ao invés de email.

**Vantagens:**

- ✅ Funciona imediatamente
- ✅ Não precisa alterar Cognito
- ✅ Não precisa criar endpoint extra

**Desvantagens:**

- ❌ Usuário precisa lembrar do username
- ❌ Menos user-friendly

---

### Solução 4: Salvar Username no LocalStorage após Registro 💾

Após registro bem-sucedido, salvar username e preencher automaticamente no login.

```typescript
// Após registro
localStorage.setItem('lastUsername', username);

// No login
const savedUsername = localStorage.getItem('lastUsername');
```

---

## 🎯 Solução Recomendada: Híbrida

Combinar Solução 2 + 4:

1. **Após registro**: Salvar username no localStorage
2. **No login**:
   - Se usuário digitar email → buscar username no backend
   - Se usuário digitar username → usar direto
   - Se tiver username salvo → sugerir

**Implementação:**

```typescript
async function handleLogin(emailOrUsername: string, password: string) {
  let username = emailOrUsername;
  
  // Se parece com email, busca username
  if (emailOrUsername.includes('@')) {
    const user = await api.get(`/users/by-email/${emailOrUsername}`);
    username = user.username;
  }
  
  // Faz login com username
  await authService.login({ username, password });
}
```

---

## 🚀 Implementação Rápida (5 minutos)

Vou implementar a **Solução 2** agora:

1. ✅ Criar endpoint no backend para buscar username por email
2. ✅ Atualizar frontend para buscar username antes do login
3. ✅ Manter UX: usuário continua digitando email

**Quer que eu implemente?** Digite "sim" para continuar.
