# ✅ Checklist de Testes - Autenticação

## 🎯 Objetivo

Validar que o sistema de autenticação está funcionando corretamente.

---

## 📋 Testes a Realizar

### 1️⃣ Teste de Registro

**URL**: <http://localhost:3000/dashboard/login/register>

**Passos**:

1. [ ] Preencha o formulário:
   - **Username**: `testuser` (SEM @, apenas letras/números)
   - **Email**: `seu-email@gmail.com`
   - **Password**: `Teste123!` (mínimo 8 chars, 1 maiúscula, 1 número, 1 especial)
   - **Confirm Password**: `Teste123!`

2. [ ] Clique em **"Criar Conta"**

3. [ ] Verifique se foi redirecionado para `/dashboard/login/confirm-email`

4. [ ] Abra seu email e copie o código de confirmação (6 dígitos)

5. [ ] Cole o código e clique em **"Confirmar Email"**

6. [ ] Verifique se apareceu mensagem de sucesso

**✅ Resultado Esperado**: Conta criada e email confirmado com sucesso

---

### 2️⃣ Teste de Login

**URL**: <http://localhost:3000/dashboard/login>

**Passos**:

1. [ ] Preencha o formulário:
   - **Username**: `testuser` (o mesmo que registrou)
   - **Password**: `Teste123!`

2. [ ] Clique em **"Entrar"**

3. [ ] Verifique se foi redirecionado para `/dashboard`

4. [ ] Verifique se o nome do usuário aparece no dashboard

**✅ Resultado Esperado**: Login bem-sucedido e acesso ao dashboard

---

### 3️⃣ Teste de Sessão Persistente

**Passos**:

1. [ ] Com o usuário logado, feche o navegador

2. [ ] Abra novamente e acesse: <http://localhost:3000/dashboard>

3. [ ] Verifique se continua logado (não pediu login novamente)

**✅ Resultado Esperado**: Sessão mantida após fechar navegador

---

### 4️⃣ Teste de Logout

**Passos**:

1. [ ] No dashboard, clique no botão de **Logout**

2. [ ] Verifique se foi redirecionado para `/dashboard/login`

3. [ ] Tente acessar: <http://localhost:3000/dashboard>

4. [ ] Verifique se foi redirecionado de volta para login

**✅ Resultado Esperado**: Logout funcional e proteção de rotas ativa

---

### 5️⃣ Teste de Validações

**URL**: <http://localhost:3000/dashboard/login/register>

**Teste A - Username com @**:

1. [ ] Username: `test@user`
2. [ ] Verifique se aparece erro: "Username não pode conter @"

**Teste B - Senha Fraca**:

1. [ ] Password: `123456`
2. [ ] Verifique se aparece erro de senha fraca

**Teste C - Senhas Diferentes**:

1. [ ] Password: `Teste123!`
2. [ ] Confirm: `Teste456!`
3. [ ] Verifique se aparece erro de senhas não conferem

**✅ Resultado Esperado**: Todas as validações funcionando

---

### 6️⃣ Teste de Esqueci Senha (Opcional)

**URL**: <http://localhost:3000/dashboard/login>

**Passos**:

1. [ ] Clique em **"Esqueci minha senha"**

2. [ ] Digite seu email e envie

3. [ ] Verifique email com código de recuperação

4. [ ] Digite código + nova senha

5. [ ] Faça login com a nova senha

**✅ Resultado Esperado**: Recuperação de senha funcional

---

## 🔍 Verificações Técnicas

### Console do Navegador (F12)

**Verificar**:

- [ ] Nenhum erro vermelho no console
- [ ] Requisições para `http://localhost:4000/api/auth/*` com status 200/201
- [ ] Token JWT salvo no localStorage (`authToken`)

### Network Tab (F12 → Network)

**Verificar chamadas API**:

- [ ] `POST /api/auth/register` → 201 Created
- [ ] `POST /api/auth/confirm-email` → 200 OK
- [ ] `POST /api/auth/login` → 200 OK (retorna accessToken)
- [ ] `POST /api/auth/logout` → 200 OK

---

## 🐛 Problemas Comuns

### ❌ Erro: "Username cannot contain @ symbol"

**Solução**: Use username sem @. Exemplo: `testuser` ao invés de `test@user`

### ❌ Erro: "Password does not meet requirements"

**Solução**: Use senha forte. Exemplo: `Teste123!`

### ❌ Erro: "Network Error"

**Solução**: Verifique se o backend está rodando em `http://localhost:4000`

### ❌ Erro: "Invalid verification code"

**Solução**:

- Verifique se copiou o código correto do email
- Código expira em 24h, solicite novo se necessário

---

## 📊 Resultado Final

**Testes Passados**: ___/6

**Status**:

- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Alguns testes falharam (ver seção de problemas)
- [ ] ❌ Sistema não está funcionando

---

## 🎉 Próximos Passos

Se todos os testes passaram:

1. ✅ Sistema de autenticação está 100% funcional
2. ✅ Pode começar a usar o dashboard
3. ✅ OAuth (GitHub/Google) é opcional - pode implementar depois

Se houver problemas:

1. Verifique os logs do backend
2. Verifique o console do navegador (F12)
3. Consulte `CRIAR_USUARIO_SIMPLES.md` para troubleshooting
