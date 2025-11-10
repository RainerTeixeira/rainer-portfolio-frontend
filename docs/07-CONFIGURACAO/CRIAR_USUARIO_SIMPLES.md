# ✅ Criar Usuário - Método Simples

## 🎯 Use Email/Senha (Sem OAuth)

Esqueça Google/GitHub por enquanto. Use o método tradicional que **já funciona**!

---

## 🚀 Passo a Passo (2 minutos)

### 1️⃣ Acesse a página de registro

```
http://localhost:3000/dashboard/login/register
```

### 2️⃣ Preencha o formulário

```
Nome:     Rainer Teixeira
Username: rainer (SEM @, apenas letras/números)
Email:    seu@email.com
Senha:    Teste123!
```

**⚠️ Requisitos da senha**:

- Mínimo 8 caracteres
- 1 maiúscula (T)
- 1 minúscula (este)
- 1 número (123)
- 1 especial (!)

**⚠️ Username**:

- SEM @ (Cognito não permite)
- Apenas: letras, números, - e _

### 3️⃣ Clique "Criar Conta"

O sistema vai:

1. Criar usuário no Cognito
2. Criar perfil no MongoDB (via backend)
3. Enviar email de confirmação

### 4️⃣ Confirme o email

1. Verifique seu email (pode estar no spam)
2. Copie o código de 6 dígitos
3. Acesse: <http://localhost:3000/dashboard/login/confirm-email>
4. Cole o código
5. Confirme

### 5️⃣ Faça login

1. Acesse: <http://localhost:3000/dashboard/login>
2. Email: `seu@email.com`
3. Senha: `Teste123!`
4. Clique "Entrar"

---

## ✅ Pronto

Agora você está logado e pode usar o dashboard! 🎉

---

## 🐛 Problemas Comuns

### "Username cannot be of email format"

**Solução**: Use username SEM @

- ✅ Correto: `rainer`, `teste123`, `user_name`
- ❌ Errado: `teste@algo`, `user@123`

### "Senha fraca"

**Solução**: Use `Teste123!` ou similar

### "Não recebi o email"

**Solução**:

- Verifique spam/lixo eletrônico
- Aguarde até 5 minutos
- Use outro email

---

## 🎯 Ignore OAuth por enquanto

Login com Google/GitHub requer:

- Configuração no Google Cloud
- Configuração no Cognito
- Código adicional no frontend
- ~30 minutos de setup

**Use email/senha que já funciona!** ✅
