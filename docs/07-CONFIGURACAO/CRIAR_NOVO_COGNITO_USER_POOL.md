# 🔧 (Movido) Criar Novo Cognito User Pool

Esta documentação foi movida para o backend, que agora é o responsável por toda a configuração e integração com o Cognito.

Consulte no backend:

- `docs/07-CONFIGURACAO/CRIAR_NOVO_COGNITO_USER_POOL.md`

### Passo 1: Criar User Pool no AWS Console

1. Acesse: <https://console.aws.amazon.com/cognito>
2. Clique em **"Create user pool"**

### Passo 2: Configure Sign-in Experience

**Sign-in options**:

- ✅ **Email** (marque APENAS email)
- ❌ Username (desmarque)
- ❌ Phone number (desmarque)

**User fullName requirements**:

- ⚪ Allow users to sign in with a preferred user fullName (desmarque)

Clique **Next**

### Passo 3: Configure Security Requirements

**Password policy**:

- ⚪ Cognito defaults (recomendado)
- Minimum length: **8**
- ✅ Contains at least 1 number
- ✅ Contains at least 1 special character
- ✅ Contains at least 1 uppercase letter
- ✅ Contains at least 1 lowercase letter

**Multi-factor authentication**:

- ⚪ No MFA (para desenvolvimento)

**User account recovery**:

- ✅ Enable self-service account recovery
- ✅ Email only

Clique **Next**

### Passo 4: Configure Sign-up Experience

**Self-service sign-up**:

- ✅ Enable self-registration

**Attribute verification and user account confirmation**:

- ✅ Allow Cognito to automatically send messages to verify and confirm
- ⚪ Send email message, verify email address

**Required attributes**:

- ✅ email
- ✅ fullName

**Custom attributes**: (deixe vazio)

Clique **Next**

### Passo 5: Configure Message Delivery

**Email**:

- ⚪ Send email with Cognito (para desenvolvimento)
- ⚪ Send email with Amazon SES (para produção)

Clique **Next**

### Passo 6: Integrate Your App

**User pool fullName**: `rainer-portfolio-users-v2`

**Hosted authentication pages**: (deixe desmarcado)

**Initial app client**:

- **App client fullName**: `rainer-portfolio-web`
- **Client secret**: ⚪ Don't generate a client secret
- **Authentication flows**:
  - ✅ ALLOW_USER_PASSWORD_AUTH
  - ✅ ALLOW_REFRESH_TOKEN_AUTH
  - ✅ ALLOW_USER_SRP_AUTH

Clique **Next**

### Passo 7: Review and Create

Revise todas as configurações e clique **Create user pool**

---

## 📝 Atualizar Variáveis de Ambiente

Após criar o User Pool, copie as credenciais:

No frontend, mantenha apenas `NEXT_PUBLIC_API_URL` para chamar o backend.

---

## 🔄 Reiniciar Serviços

```bash
# Backend
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run start:dev

# Frontend (em outro terminal)
cd C:\Desenvolvimento\rainer-portfolio-frontend
npm run dev
```

---

## 🧪 Testar Novamente

1. Acesse: <http://localhost:3000/dashboard/login/register>
2. Preencha:
   - **Nome**: `Teste Usuario`
   - **Email**: `savitom101@elygifts.com`
   - **Senha**: `R@iner98152749`
3. Clique **Criar Conta**
4. Verifique email e confirme código

**Deve funcionar!** ✅

---

## 📊 Diferença Entre Configurações

| Aspecto | User Pool Antigo (❌) | User Pool Novo (✅) |
|---------|----------------------|---------------------|
| **Sign-in** | Email como alias | Email como username principal |
| **Username** | Obrigatório (separado) | Não usado (email é o username) |
| **Erro** | "Cannot be email format" | Nenhum erro |
| **Código** | Precisa enviar username | Envia apenas email |

---

## ⚠️ Importante

- **User Pool antigo**: Pode deletar após migrar (ou manter para testes)
- **Usuários existentes**: Precisarão se registrar novamente no novo User Pool
- **Produção**: Use Amazon SES para envio de emails (Cognito tem limite de 50/dia)

---

## 🎯 Próximos Passos

Após criar o novo User Pool:

1. ✅ Atualizar `.env` do backend
2. ✅ Atualizar `.env.local` do frontend
3. ✅ Reiniciar ambos os serviços
4. ✅ Testar registro novamente
5. ✅ Deletar User Pool antigo (opcional)
