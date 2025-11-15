# 🎯 Primeiro Acesso - Criar Usuário

## ✅ Backend está funcionando

O erro "Email ou senha incorretos" significa que a integração está **funcionando perfeitamente**!

O problema é que você ainda **não tem um usuário cadastrado**.

---

## 🚀 Como Criar Seu Primeiro Usuário

### Opção 1: Via Frontend (Recomendado)

1. **Acesse a página de registro**:

   ```
   http://localhost:3000/dashboard/login/register
   ```

2. **Preencha o formulário**:
   - Nome: Seu Nome
   - Username: seunome
   - Email: <seu@email.com>
   - Senha: SenhaForte123!

3. **Clique em "Criar conta"**

4. **Confirme o email**:
   - Verifique seu email
   - Copie o código de 6 dígitos
   - Cole na página de confirmação

5. **Faça login**:
   - Volte para <http://localhost:3000/dashboard/login>
   - Use o email e senha cadastrados

---

### Opção 2: Via Backend Swagger (Alternativa)

1. **Acesse o Swagger**:

   ```
   http://localhost:4000/docs
   ```

2. **Expanda "POST /auth/register"**

3. **Clique em "Try it out"**

4. **Cole este JSON**:

   ```json
   {
     "fullName": "Admin User",
     "username": "admin",
     "email": "admin@example.com",
     "password": "Admin123!"
   }
   ```

5. **Clique em "Execute"**

6. **Copie o código de confirmação do email**

7. **Expanda "POST /auth/confirm-email"**

8. **Cole este JSON** (substitua o código):

   ```json
   {
     "email": "admin@example.com",
     "code": "123456"
   }
   ```

9. **Agora faça login no frontend**:
   - Email: <admin@example.com>
   - Senha: Admin123!

---

## 🔐 Requisitos de Senha (Cognito)

A senha deve ter:

- ✅ Mínimo 8 caracteres
- ✅ Pelo menos 1 letra maiúscula
- ✅ Pelo menos 1 letra minúscula
- ✅ Pelo menos 1 número
- ✅ Pelo menos 1 caractere especial (!@#$%^&\*)

**Exemplos válidos**:

- `Admin123!`
- `SenhaForte@2025`
- `MyP@ssw0rd`

---

## 📧 Verificação de Email

### Desenvolvimento Local

O Cognito envia emails reais! Verifique:

1. **Caixa de entrada** do email cadastrado
2. **Spam/Lixo eletrônico**
3. **Promoções** (Gmail)

### Email de Teste

Se não quiser usar email real, configure um email de teste no Cognito:

1. Acesse AWS Console → Cognito
2. Selecione seu User Pool
3. Vá em "Messaging" → "Email"
4. Configure "Test email addresses"

---

## 🐛 Troubleshooting

### "Email já existe"

**Solução**: Use outro email ou delete o usuário existente no Cognito.

### "Código de confirmação inválido"

**Solução**:

- Verifique se copiou o código completo (6 dígitos)
- Código expira em 24 horas
- Solicite novo código via "Reenviar código"

### "Senha não atende aos requisitos"

**Solução**: Use uma senha com:

- Mínimo 8 caracteres
- Maiúsculas, minúsculas, números e símbolos

### "Não recebi o email"

**Solução**:

1. Verifique spam/lixo eletrônico
2. Aguarde até 5 minutos
3. Verifique se o email está correto
4. Tente com outro email

---

## ✅ Após Criar o Usuário

1. **Faça login**: <http://localhost:3000/dashboard/login>
2. **Acesse o dashboard**: <http://localhost:3000/dashboard>
3. **Crie seu primeiro post**
4. **Explore as funcionalidades**

---

## 🎉 Pronto

Agora você tem um usuário cadastrado e pode usar toda a aplicação!

**Credenciais de exemplo**:

- Email: <admin@example.com>
- Senha: Admin123!

**Próximos passos**:

- Criar posts
- Adicionar categorias
- Testar comentários
- Explorar o dashboard
