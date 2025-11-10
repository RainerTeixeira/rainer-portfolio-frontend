# 🧪 Teste: Login Social com Verificação de Nickname

## 📋 Objetivo

Testar o fluxo completo de login social (Google/GitHub) verificando se:
1. ✅ Usuário novo cria conta automaticamente
2. ✅ Nickname é verificado no Cognito
3. ✅ Nickname é criado automaticamente se não existir
4. ✅ Login subsequente verifica se nickname existe
5. ✅ Login por email também verifica nickname

## 🔧 Funcionalidades Implementadas

### Backend (`auth.service.ts`)

1. **Verificação Automática de Nickname**
   - Após login OAuth, verifica se usuário tem nickname no Cognito
   - Se não tiver, gera automaticamente baseado no `fullName`
   - Formato: `nomesobrenome` (apenas letras e números)
   - Verifica disponibilidade antes de criar
   - Cria automaticamente no Cognito

2. **Geração de Nickname**
   - Remove acentos e caracteres especiais
   - Converte para minúsculas
   - Combina primeiro e último nome
   - Limita a 30 caracteres
   - Garante mínimo de 3 caracteres

3. **Verificação de Disponibilidade**
   - Busca por `preferred_username` e `nickname` separadamente
   - Se não disponível, adiciona sufixo único (sub do usuário)

### Frontend (`useAuth.ts`)

1. **Verificação Pós-Login**
   - Após login OAuth, verifica se `needsNickname` é `true`
   - Se sim, gera nickname e atualiza no Cognito
   - Busca perfil novamente para pegar nickname atualizado

## 🧪 Cenários de Teste

### Cenário 1: Usuário Novo - Primeiro Login Social

**Passos:**
1. Limpar localStorage (F12 → Application → Clear All)
2. Ir para: `http://localhost:3000/dashboard/login`
3. Clicar em "Login com Google"
4. Fazer login com conta Google que nunca usou o sistema

**Resultado Esperado:**
- ✅ Usuário criado no MongoDB
- ✅ Usuário criado no Cognito
- ✅ Nickname gerado automaticamente no backend
- ✅ Nickname salvo no Cognito
- ✅ `needsNickname: false` na resposta
- ✅ Redirecionado para `/dashboard`
- ✅ Perfil mostra nickname

**Logs Esperados (Backend):**
```
[AuthService] Usuário não existe, criando...
[AuthService] ✅ Usuário criado
[AuthService] Verificação de nickname: hasNickname=false, needsNickname=true
[AuthService] Nickname gerado automaticamente: raineroliveira
[AuthService] ✅ Nickname criado automaticamente: raineroliveira
```

### Cenário 2: Usuário Existente - Segundo Login Social

**Passos:**
1. Usuário já fez login anteriormente (Cenário 1)
2. Fazer logout
3. Limpar localStorage
4. Fazer login novamente com Google

**Resultado Esperado:**
- ✅ Usuário encontrado no MongoDB
- ✅ Nickname já existe no Cognito
- ✅ `needsNickname: false` na resposta
- ✅ Redirecionado para `/dashboard`
- ✅ Não tenta criar nickname novamente

**Logs Esperados (Backend):**
```
[AuthService] ✅ Usuário encontrado: raineroliveira94@hotmail.com
[AuthService] Verificação de nickname: hasNickname=true, needsNickname=false
```

### Cenário 3: Login por Email (Sem OAuth)

**Passos:**
1. Fazer login com email/senha
2. Verificar se nickname existe

**Resultado Esperado:**
- ✅ Login funciona normalmente
- ✅ Se não tiver nickname, frontend pode criar
- ✅ Backend não cria automaticamente (apenas OAuth)

### Cenário 4: Nickname Já em Uso

**Passos:**
1. Usuário A faz login → nickname: `raineroliveira`
2. Usuário B faz login → mesmo nome: `Rainer Oliveira`
3. Sistema tenta criar `raineroliveira`

**Resultado Esperado:**
- ✅ Sistema detecta que nickname já está em uso
- ✅ Adiciona sufixo único: `raineroliveiraf4787478`
- ✅ Cria nickname único no Cognito

**Logs Esperados (Backend):**
```
[AuthService] Nickname gerado automaticamente: raineroliveira
[checkNicknameAvailability] Nickname já está em uso por outro usuário
[AuthService] Nickname ajustado (não disponível): raineroliveiraf4787478
[AuthService] ✅ Nickname criado automaticamente: raineroliveiraf4787478
```

## 📊 Checklist de Validação

### Backend
- [ ] Usuário novo cria conta automaticamente
- [ ] Verifica nickname no Cognito após login OAuth
- [ ] Gera nickname automaticamente se não existir
- [ ] Verifica disponibilidade antes de criar
- [ ] Cria nickname no Cognito automaticamente
- [ ] Logs detalhados de cada etapa
- [ ] Tratamento de erros adequado

### Frontend
- [ ] Recebe `needsNickname` na resposta do login
- [ ] Se `needsNickname: true`, gera e atualiza nickname
- [ ] Busca perfil novamente após atualizar
- [ ] Exibe nickname no perfil do usuário
- [ ] Não tenta criar se já existe

### Cognito
- [ ] Nickname salvo no atributo `nickname`
- [ ] Nickname visível no User Pool
- [ ] Nickname aparece no ID token após atualização

## 🔍 Como Verificar

### 1. Verificar no Backend (Logs)

```bash
# Terminal do backend
# Procure por:
[AuthService] Verificação de nickname: hasNickname=...
[AuthService] Nickname gerado automaticamente: ...
[AuthService] ✅ Nickname criado automaticamente: ...
```

### 2. Verificar no Cognito (AWS Console)

1. Acesse AWS Console → Cognito
2. Selecione seu User Pool
3. Vá em "Users"
4. Encontre o usuário
5. Verifique atributo `nickname`

### 3. Verificar no Frontend (Console)

```javascript
// F12 → Console
// Após login, verifique:
localStorage.getItem('user')
// Deve conter nickname se foi criado
```

### 4. Verificar no MongoDB

```bash
# Conecte ao MongoDB
# Busque usuário:
db.users.findOne({ cognitoSub: "..." })
// Verifique se usuário foi criado
```

## 🐛 Troubleshooting

### Problema: Nickname não é criado automaticamente

**Possíveis Causas:**
1. Erro ao buscar usuário no Cognito
2. Erro ao atualizar atributo
3. Permissões IAM insuficientes

**Solução:**
- Verificar logs do backend
- Verificar permissões do IAM role
- Verificar se `COGNITO_USER_POOL_ID` está correto

### Problema: Nickname duplicado

**Possíveis Causas:**
1. Verificação de disponibilidade falhou
2. Race condition (dois usuários simultâneos)

**Solução:**
- Backend já trata com sufixo único
- Verificar logs de `checkNicknameAvailability`

### Problema: Frontend tenta criar mesmo após backend criar

**Possíveis Causas:**
1. `needsNickname` ainda retorna `true`
2. Cache de token não atualizado

**Solução:**
- Backend já cria automaticamente
- Frontend só cria se `needsNickname: true`
- Verificar se token foi atualizado

## ✅ Resultado Esperado Final

Após implementação:
- ✅ Login social cria nickname automaticamente
- ✅ Login subsequente não tenta criar novamente
- ✅ Nickname sempre presente após primeiro login
- ✅ Sem necessidade de intervenção manual
- ✅ Funciona para Google e GitHub

## 📝 Notas

- **Login Social**: Backend cria nickname automaticamente
- **Login Email**: Frontend pode criar se necessário
- **Nickname**: Apenas letras e números, 3-30 caracteres
- **Formato**: `nomesobrenome` (sem separadores)

