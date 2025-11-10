# 🎨 Como Cadastrar pela Interface

## ✅ Passo a Passo

### 1️⃣ Certifique-se que ambos estão rodando

**Terminal 1 - Backend**:

```bash
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev
```

✅ Backend: <http://localhost:4000>

**Terminal 2 - Frontend**:

```bash
cd C:\Desenvolvimento\rainer-portfolio-frontend
npm run dev
```

✅ Frontend: <http://localhost:3000>

---

### 2️⃣ Acesse a página de registro

```
http://localhost:3000/dashboard/login/register
```

---

### 3️⃣ Preencha o formulário

```
Nome:     Seu Nome Completo
Username: seunome (sem espaços)
Email:    seu@email.com
Senha:    SenhaForte123!
```

**⚠️ Requisitos da senha**:

- Mínimo 8 caracteres
- 1 letra maiúscula
- 1 letra minúscula
- 1 número
- 1 caractere especial (!@#$%^&*)

---

### 4️⃣ Clique em "Criar Conta"

O sistema vai:

1. Enviar dados para o backend
2. Backend cria usuário no Cognito
3. Backend cria perfil no MongoDB
4. Cognito envia email de confirmação

---

### 5️⃣ Confirme seu email

1. Verifique seu email (pode estar no spam)
2. Copie o código de 6 dígitos
3. Acesse: <http://localhost:3000/dashboard/login/confirm-email>
4. Cole o código
5. Clique em "Confirmar"

---

### 6️⃣ Faça login

1. Acesse: <http://localhost:3000/dashboard/login>
2. Digite seu email e senha
3. Clique em "Entrar"

---

## ✨ Pronto

Agora você está logado e pode usar o dashboard! 🎉

**Próximos passos**:

- Criar posts
- Gerenciar categorias
- Visualizar analytics
- Explorar funcionalidades

---

## 🐛 Problemas Comuns

### "Email já existe"

**Solução**: Use outro email ou delete o usuário no Cognito

### "Senha fraca"

**Solução**: Use senha com maiúsculas, minúsculas, números e símbolos
**Exemplo**: `SenhaForte123!`

### "Não recebi o email"

**Solução**:

- Verifique spam/lixo eletrônico
- Aguarde até 5 minutos
- Tente com outro email

### "Backend não responde"

**Solução**: Verifique se o backend está rodando em <http://localhost:4000>
