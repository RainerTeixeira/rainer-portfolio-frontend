# 🔐 Configurar Login Social (Google/GitHub)

## 📋 Pré-requisitos

- AWS Cognito User Pool configurado
- Conta Google Cloud Platform (para Google)
- Conta GitHub (para GitHub)

---

## 🔴 Google Login

### 1️⃣ Criar Projeto no Google Cloud

1. Acesse: <https://console.cloud.google.com>
2. Crie novo projeto: "Rainer Portfolio"
3. Ative a **Google+ API**

### 2️⃣ Criar OAuth 2.0 Credentials

1. Vá em: **APIs & Services** → **Credentials**
2. Clique: **Create Credentials** → **OAuth client ID**
3. Tipo: **Web application**
4. Nome: `Rainer Portfolio Web`
5. **Authorized redirect URIs**:

   ```
   https://rainer-portfolio.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
   ```

6. Copie:
   - **Client ID**: `xxxxx.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-xxxxx`

### 3️⃣ Configurar no Cognito

1. AWS Console → Cognito → Seu User Pool
2. **Sign-in experience** → **Federated identity providers**
3. Clique **Add identity provider**
4. Selecione **Google**
5. Cole:
   - **Google app ID**: (Client ID do Google)
   - **Google app secret**: (Client Secret do Google)
6. **Authorized scopes**: `profile email openid`
7. **Attribute mapping**:
   - `email` → `email`
   - `fullName` → `fullName`
   - `sub` → `username`
8. Salve

### 4️⃣ Configurar App Client

1. **App integration** → **App clients**
2. Edite seu app client
3. **Hosted UI**:
   - **Allowed callback URLs**: `http://localhost:3000/dashboard/login/callback`
   - **Allowed sign-out URLs**: `http://localhost:3000`
4. **Identity providers**: ✅ Google
5. Salve

---

## ⚫ GitHub Login

### 1️⃣ Criar OAuth App no GitHub

1. Acesse: <https://github.com/settings/developers>
2. Clique: **New OAuth App**
3. Preencha:
   - **Application fullName**: `Rainer Portfolio`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**:

     ```
     https://rainer-portfolio.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     ```

4. Clique **Register application**
5. Copie:
   - **Client ID**: `Iv1.xxxxx`
   - **Client Secret**: (clique "Generate a new client secret")

### 2️⃣ Configurar no Cognito

1. AWS Console → Cognito → Seu User Pool
2. **Sign-in experience** → **Federated identity providers**
3. Clique **Add identity provider**
4. Selecione **GitHub** (ou configure como OIDC)
5. Cole:
   - **Client ID**: (do GitHub)
   - **Client Secret**: (do GitHub)
6. **Authorized scopes**: `user:email read:user`
7. **Attribute mapping**:
   - `email` → `email`
   - `fullName` → `fullName`
   - `sub` → `username`
8. Salve

---

## 💻 Implementar no Frontend

### 1️⃣ Instalar AWS Amplify (opcional)

```bash
npm install aws-amplify
```

### 2️⃣ Configurar Amplify

Crie `lib/amplify.ts`:

```typescript
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      loginWith: {
        oauth: {
          domain: 'rainer-portfolio.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['http://localhost:3000/dashboard/login/callback'],
          redirectSignOut: ['http://localhost:3000'],
          responseType: 'code',
        },
      },
    },
  },
});
```

### 3️⃣ Atualizar Página de Login

```typescript
import { signInWithRedirect } from 'aws-amplify/auth';

const handleSocialLogin = async (provider: 'Google' | 'GitHub') => {
  try {
    await signInWithRedirect({ provider });
  } catch (error) {
    console.error('Erro no login social:', error);
  }
};
```

### 4️⃣ Criar Página de Callback

Crie `app/dashboard/login/callback/page.tsx`:

```typescript
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from 'aws-amplify/auth'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    async function handleCallback() {
      try {
        const user = await getCurrentUser()
        if (user) {
          router.push('/dashboard')
        }
      } catch (error) {
        router.push('/dashboard/login')
      }
    }
    handleCallback()
  }, [router])

  return <div>Processando login...</div>
}
```

---

## 🧪 Testar

1. Acesse: <http://localhost:3000/dashboard/login>
2. Clique em "Google" ou "GitHub"
3. Autorize o acesso
4. Será redirecionado para `/dashboard/login/callback`
5. Depois para `/dashboard`

---

## ⚠️ Importante

### Produção

Quando fazer deploy, atualize:

1. **Google Cloud Console**:
   - Authorized redirect URIs: `https://seudominio.com/dashboard/login/callback`

2. **GitHub OAuth App**:
   - Authorization callback URL: `https://seudominio.com/dashboard/login/callback`

3. **Cognito App Client**:
   - Allowed callback URLs: `https://seudominio.com/dashboard/login/callback`
   - Allowed sign-out URLs: `https://seudominio.com`

### Domínio Cognito

Você precisa configurar um domínio no Cognito:

1. **App integration** → **Domain**
2. Escolha:
   - **Cognito domain**: `rainer-portfolio` (fica: `rainer-portfolio.auth.us-east-1.amazoncognito.com`)
   - Ou **Custom domain**: `auth.seudominio.com` (requer certificado SSL)

---

## 🎯 Status Atual

**Botões no frontend**: ✅ Prontos (mas não funcionam ainda)

**Para funcionar, você precisa**:

1. ✅ Configurar Google OAuth
2. ✅ Configurar GitHub OAuth
3. ✅ Configurar Cognito Federated Identity
4. ✅ Implementar callback handler
5. ✅ Testar fluxo completo

**Alternativa**: Use login com email/senha (já funciona!)

---

## 📚 Documentação

- [Cognito Federated Identity](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [AWS Amplify Auth](https://docs.amplify.aws/react/build-a-backend/auth/)
