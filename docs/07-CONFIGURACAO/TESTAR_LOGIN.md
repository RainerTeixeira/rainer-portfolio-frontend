# 🧪 Testar Login

## ✅ Usuário Criado no Cognito

- **Username**: `savitom101333256`
- **Email**: `savitom101@elygifts.com`
- **Cognito Sub**: `048864d8-4051-703c-addc-54d1aeb03d12`
- **Status**: Confirmado ✅

## 🔧 Passo 1: Criar Usuário no MongoDB

O usuário existe no Cognito mas não no MongoDB. Precisamos criar.

**Opção A: Via API (Recomendado)**

Abra o terminal e execute:

```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "cognitoSub": "048864d8-4051-703c-addc-54d1aeb03d12",
    "email": "savitom101@elygifts.com",
    "username": "savitom101333256",
    "fullName": "Teste Usuario"
  }'
```

**Opção B: Via MongoDB Compass**

1. Abra MongoDB Compass
2. Conecte em: `mongodb://localhost:27017`
3. Database: `rainer-portfolio`
4. Collection: `users`
5. Clique em **"ADD DATA"** → **"Insert Document"**
6. Cole:

```json
{
  "cognitoSub": "048864d8-4051-703c-addc-54d1aeb03d12",
  "email": "savitom101@elygifts.com",
  "username": "savitom101333256",
  "fullName": "Teste Usuario",
  "role": "AUTHOR",
  "isActive": true,
  "isBanned": false,
  "postsCount": 0,
  "commentsCount": 0,
  "createdAt": { "$date": "2025-10-21T03:28:00.000Z" },
  "updatedAt": { "$date": "2025-10-21T03:28:00.000Z" }
}
```

## 🧪 Passo 2: Testar Login

1. Acesse: <http://localhost:3000/dashboard/login>
2. Preencha:
   - **Usuário**: `savitom101@elygifts.com` (pode usar email)
   - **Senha**: `R@iner98152749` (a senha que você usou no registro)
3. Clique **"Entrar"**

## ✅ Resultado Esperado

- ✅ Login bem-sucedido
- ✅ Redirecionado para `/dashboard`
- ✅ Nome do usuário aparece no dashboard

## ❌ Se Der Erro

### Erro: "Usuário não encontrado"

Significa que o usuário não está no MongoDB. Execute o Passo 1.

### Erro: "Email ou senha incorretos"

Possíveis causas:

1. Senha incorreta (tente resetar no Cognito)
2. Username errado no backend

**Solução**: Vou ajustar o código para aceitar email diretamente no login.

---

## 🚀 Solução Automática

Vou criar um endpoint que sincroniza automaticamente usuários do Cognito para o MongoDB no primeiro login.
