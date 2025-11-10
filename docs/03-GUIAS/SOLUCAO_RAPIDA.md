# ⚡ Solução Rápida - Criar Usuário

## 🎯 Problema

"Email ou senha incorretos" = **Você não tem usuário cadastrado ainda**

## ✅ Solução em 3 Comandos

### 1️⃣ Certifique-se que o backend está rodando

```bash
# Terminal 1
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev
```

### 2️⃣ Crie o usuário via script

```bash
# Terminal 2 (na pasta do frontend)
cd C:\Desenvolvimento\rainer-portfolio-frontend
node scripts/criar-usuario.js
```

### 3️⃣ Faça login

```
Email: admin@example.com
Senha: Admin123!
```

Acesse: <http://localhost:3000/dashboard/login>

---

## 🔄 Alternativa: Via Interface

1. Acesse: <http://localhost:3000/dashboard/login/register>
2. Preencha:
   - Nome: Admin User
   - Username: admin
   - Email: <admin@example.com>
   - Senha: Admin123!
3. Confirme o email
4. Faça login

---

## 📧 Confirmação de Email

Após criar o usuário, você receberá um email com código de 6 dígitos.

**Confirme via**:

- Frontend: <http://localhost:3000/dashboard/login/confirm-email>
- Ou Swagger: <http://localhost:4000/docs> → POST /auth/confirm-email

---

## ✨ Pronto

Agora você pode fazer login e usar toda a aplicação! 🚀
