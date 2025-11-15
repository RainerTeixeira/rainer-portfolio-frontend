# Configuração de Variáveis de Ambiente - OAuth

## 📋 Visão Geral

Este documento lista todas as variáveis de ambiente necessárias para o sistema de autenticação OAuth funcionar corretamente no frontend.

## 🔑 Variáveis Obrigatórias

### Backend API

```env
# URL do backend API
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Descrição:** URL base do backend que gerencia autenticação OAuth.

**Valores típicos:**

- Desenvolvimento: `http://localhost:4000`
- Staging: `https://api-staging.example.com`
- Produção: `https://api.example.com`

### AWS Cognito

```env
# Domínio do Cognito (sem https://)
NEXT_PUBLIC_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com

# Client ID do Cognito User Pool
NEXT_PUBLIC_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j

# User Pool ID
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
```

**Como obter:**

1. Acesse [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Selecione seu User Pool
3. **COGNITO_DOMAIN:** Em "App integration" → "Domain name"
4. **COGNITO_CLIENT_ID:** Em "App integration" → "App clients" → Selecione seu app → "Client ID"
5. **COGNITO_USER_POOL_ID:** Na página principal do User Pool, copie o "Pool Id"

### OAuth Redirect

```env
# URL de callback OAuth após autenticação
NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN=http://localhost:3000/dashboard/login/callback
```

**Descrição:** URL para onde o Cognito redireciona após login OAuth bem-sucedido.

**Valores típicos:**

- Desenvolvimento: `http://localhost:3000/dashboard/login/callback`
- Produção: `https://app.example.com/dashboard/login/callback`

**⚠️ IMPORTANTE:** Esta URL deve estar configurada no Cognito App Client como "Allowed callback URLs".

## 🔧 Configuração no AWS Cognito

### Passo 1: Criar User Pool (se ainda não existe)

1. Acesse AWS Cognito Console
2. Clique em "Create user pool"
3. Configure conforme necessário
4. Anote o **User Pool ID**

### Passo 2: Configurar App Client

1. No User Pool, vá para "App integration"
2. Clique em "Create app client"
3. Configure:
   - **App client name:** `rainer-portfolio-frontend`
   - **Authentication flows:** Marque "ALLOW_USER_PASSWORD_AUTH"
   - **OAuth 2.0 grant types:** Marque "Authorization code grant"
   - **OpenID Connect scopes:** Marque "openid", "email", "profile"

### Passo 3: Configurar Hosted UI

1. Em "App integration", clique em "Hosted UI"
2. Configure:
   - **Allowed callback URLs:**
     ```
     http://localhost:3000/dashboard/login/callback
     https://your-domain.com/dashboard/login/callback
     ```
   - **Allowed sign-out URLs:**
     ```
     http://localhost:3000
     https://your-domain.com
     ```

### Passo 4: Configurar Domain

1. Em "App integration", clique em "Domain name"
2. Escolha um domínio:
   - **Cognito domain:** `your-app.auth.us-east-1.amazoncognito.com` (Gratuito)
   - **Custom domain:** `auth.your-domain.com` (Requer certificado SSL)

### Passo 5: Configurar Identity Providers

#### Google

1. Vá para "Sign-in experience" → "Federated identity provider sign-in"
2. Clique em "Add identity provider" → "Google"
3. Você precisará:
   - **Google Client ID** (do Google Cloud Console)
   - **Google Client Secret**
   - **Authorized scopes:** `profile email openid`

**Como obter credenciais do Google:**

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione existente
3. Vá para "APIs & Services" → "Credentials"
4. Clique em "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure:
   - **Application type:** Web application
   - **Authorized redirect URIs:**
     ```
     https://your-domain.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     ```

#### GitHub

1. Vá para "Sign-in experience" → "Federated identity provider sign-in"
2. Clique em "Add identity provider" → "GitHub"
3. Você precisará:
   - **GitHub Client ID**
   - **GitHub Client Secret**

**Como obter credenciais do GitHub:**

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Configure:
   - **Application name:** `Rainer Portfolio`
   - **Homepage URL:** `http://localhost:3000` (ou sua URL de produção)
   - **Authorization callback URL:**
     ```
     https://your-domain.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     ```

## 📄 Arquivo .env.local Completo

Crie um arquivo `.env.local` na raiz do projeto:

```env
# ============================================================================
# Backend API
# ============================================================================
NEXT_PUBLIC_API_URL=http://localhost:4000

# ============================================================================
# AWS Cognito
# ============================================================================
NEXT_PUBLIC_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_COGNITO_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX

# ============================================================================
# OAuth Redirect
# ============================================================================
NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN=http://localhost:3000/dashboard/login/callback

# ============================================================================
# Opcional - Para testes
# ============================================================================
# NEXT_PUBLIC_ENABLE_OAUTH_MOCK=false
```

## ✅ Verificação de Configuração

### Script de Verificação

Crie um arquivo `scripts/check-oauth-config.ts`:

```typescript
#!/usr/bin/env tsx

/**
 * Script para verificar configuração OAuth
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_COGNITO_DOMAIN',
  'NEXT_PUBLIC_COGNITO_CLIENT_ID',
  'NEXT_PUBLIC_COGNITO_USER_POOL_ID',
  'NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN',
];

console.log('🔍 Verificando configuração OAuth...\n');

let hasErrors = false;

for (const envVar of requiredEnvVars) {
  const value = process.env[envVar];

  if (!value) {
    console.error(`❌ ${envVar} não está definida`);
    hasErrors = true;
  } else {
    console.log(`✅ ${envVar}: ${value.substring(0, 30)}...`);
  }
}

if (hasErrors) {
  console.error(
    '\n❌ Configuração incompleta. Verifique seu arquivo .env.local'
  );
  process.exit(1);
} else {
  console.log('\n✅ Todas as variáveis estão configuradas corretamente!');
}
```

Execute:

```bash
npm run tsx scripts/check-oauth-config.ts
```

### Teste Manual

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse `http://localhost:3000/dashboard/login`

3. Abra o Console do Navegador (F12)

4. Execute:

   ```javascript
   console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
   console.log('Cognito Domain:', process.env.NEXT_PUBLIC_COGNITO_DOMAIN);
   console.log('Client ID:', process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);
   ```

5. Clique no botão "Continuar com Google"

6. Verifique se redireciona para:
   ```
   http://localhost:4000/auth/oauth/google?redirect_uri=...
   ```

## 🐛 Troubleshooting

### Erro: "NEXT_PUBLIC_API_URL is undefined"

**Causa:** Variável não está definida ou servidor não foi reiniciado.

**Solução:**

```bash
# 1. Verificar se .env.local existe
ls -la .env.local

# 2. Reiniciar servidor Next.js
npm run dev
```

### Erro: "redirect_uri_mismatch"

**Causa:** URL de callback não está configurada no Cognito.

**Solução:**

1. Acesse AWS Cognito Console
2. Vá para seu App Client
3. Adicione a URL em "Allowed callback URLs"
4. Salve as alterações

### Erro: "Invalid OAuth domain"

**Causa:** Domínio do Cognito está incorreto.

**Solução:**

```env
# ❌ Incorreto (com https://)
NEXT_PUBLIC_COGNITO_DOMAIN=https://domain.auth.us-east-1.amazoncognito.com

# ✅ Correto (sem https://)
NEXT_PUBLIC_COGNITO_DOMAIN=domain.auth.us-east-1.amazoncognito.com
```

### Erro: "CORS policy"

**Causa:** Backend não está configurado para aceitar requisições do frontend.

**Solução no Backend:**

```typescript
// Backend (NestJS)
app.enableCors({
  origin: ['http://localhost:3000', 'https://your-domain.com'],
  credentials: true,
});
```

## 📝 Checklist de Configuração

### Frontend

- [ ] Arquivo `.env.local` criado
- [ ] `NEXT_PUBLIC_API_URL` definido
- [ ] `NEXT_PUBLIC_COGNITO_DOMAIN` definido
- [ ] `NEXT_PUBLIC_COGNITO_CLIENT_ID` definido
- [ ] `NEXT_PUBLIC_COGNITO_USER_POOL_ID` definido
- [ ] `NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN` definido
- [ ] Servidor Next.js reiniciado após mudanças

### AWS Cognito

- [ ] User Pool criado
- [ ] App Client criado
- [ ] Domínio configurado (Cognito ou custom)
- [ ] Callback URLs adicionadas
- [ ] Sign-out URLs adicionadas
- [ ] OAuth 2.0 grant types configurados
- [ ] OpenID Connect scopes configurados

### Google OAuth

- [ ] Projeto criado no Google Cloud Console
- [ ] OAuth 2.0 Client ID criado
- [ ] Redirect URI configurado no Google
- [ ] Credenciais adicionadas ao Cognito

### GitHub OAuth

- [ ] OAuth App criado no GitHub
- [ ] Callback URL configurado no GitHub
- [ ] Credenciais adicionadas ao Cognito

### Testes

- [ ] Login com Google funciona
- [ ] Login com GitHub funciona
- [ ] Callback processa código corretamente
- [ ] Tokens são salvos no localStorage
- [ ] Redirecionamento para dashboard funciona
- [ ] Sessão persiste após reload

## 🔐 Segurança

### Boas Práticas

1. **Nunca commite `.env.local`** no Git

   ```gitignore
   # .gitignore
   .env.local
   .env.*.local
   ```

2. **Use variáveis diferentes por ambiente**
   - `.env.development` - Desenvolvimento
   - `.env.staging` - Staging
   - `.env.production` - Produção

3. **Rotacione credenciais regularmente**
   - Client Secret do Google
   - Client Secret do GitHub
   - Chaves da AWS

4. **Limite scopes OAuth**
   - Solicite apenas permissões necessárias
   - Google: `profile email openid`
   - GitHub: `read:user user:email`

5. **Use HTTPS em produção**
   - Nunca use HTTP para OAuth em produção
   - Configure certificado SSL
   - Force HTTPS no Next.js

## 📚 Recursos

### Documentação Oficial

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [AWS Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)

### Ferramentas Úteis

- [JWT Debugger](https://jwt.io/) - Decodificar tokens JWT
- [OAuth Debugger](https://oauthdebugger.com/) - Testar fluxo OAuth
- [Postman](https://www.postman.com/) - Testar endpoints da API

---

**Versão:** 1.0.0  
**Última Atualização:** 2025-11-14  
**Autor:** Rainer Teixeira
