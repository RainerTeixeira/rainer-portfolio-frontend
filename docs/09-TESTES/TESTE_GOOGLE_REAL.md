# Teste Real de Google Signup

## ❌ Problema Identificado

O teste falhou com **"Falha ao processar login"** porque:

1. ✅ Login com Google funcionou
2. ✅ Cognito redirecionou com código
3. ✅ Frontend recebeu callback
4. ❌ **Backend não está rodando** - requisição falhou

## 🔧 Solução

### Passo 1: Criar arquivo `.env.local` no frontend

Crie o arquivo `C:\Desenvolvimento\rainer-portfolio-frontend\.env.local`:

```env
# API Backend URL
NEXT_PUBLIC_API_URL=http://localhost:4000

# OAuth Redirect URI (deve estar registrado no Cognito)
NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN=http://localhost:3000/dashboard/login/callback
```

### Passo 2: Iniciar o Backend

Em um terminal separado:

```bash
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev
```

Aguarde até ver:
```
🚀 Backend rodando em http://localhost:4000
```

### Passo 3: Executar o Teste

Em outro terminal:

```bash
cd C:\Desenvolvimento\rainer-portfolio-frontend
npx playwright test tests/e2e/google-real-manual.spec.ts --project=chrome
```

## 📋 Checklist

- [ ] Arquivo `.env.local` criado no frontend
- [ ] Backend rodando em `http://localhost:4000`
- [ ] Frontend rodando em `http://localhost:3000`
- [ ] Chrome vai abrir automaticamente
- [ ] Fazer login com: `raineroliveira94@hotmail.com`

## 🔍 Logs Aprimorados

O teste agora captura:
- ✅ Mensagens de erro do console do navegador
- ✅ Falhas de requisições HTTP
- ✅ Status da resposta do backend callback
- ✅ URL do backend configurado

## 📊 Fluxo Completo

```
1. Frontend → Clica "Login com Google"
   ↓
2. Frontend → GET /auth/oauth/google (backend)
   ↓
3. Backend → Redireciona para Cognito Hosted UI
   ↓
4. Cognito → Redireciona para Google
   ↓
5. Google → Usuário faz login
   ↓
6. Google → Redireciona para Cognito com autorização
   ↓
7. Cognito → Redireciona para /dashboard/login/callback?code=xxx
   ↓
8. Frontend → POST /auth/oauth/google/callback (backend) ⚠️ FALHANDO AQUI!
   ↓
9. Backend → Troca código por tokens no Cognito
   ↓
10. Backend → Retorna tokens ao frontend
    ↓
11. Frontend → Salva tokens e redireciona para /dashboard
```

## ⚠️ Problema Atual

O passo 8 está falhando porque:
- Backend não está respondendo em `http://localhost:4000`
- Ou variável `NEXT_PUBLIC_API_URL` não está configurada

## ✅ Como Validar que Está Funcionando

Após executar o teste com backend rodando, você deve ver:

```
✅ Botão Google encontrado
✅ Página de login carregada
🔍 Backend URL: http://localhost:4000
📍 URL atual: https://accounts.google.com/...
👤 AGUARDANDO LOGIN MANUAL COM GOOGLE
   📧 Email: raineroliveira94@hotmail.com
✅ Callback recebido!
📡 Resposta do backend callback: 200  ← IMPORTANTE!
✅ Dashboard alcançado!
🔍 Verificando autenticação:
   Access Token: ✅ Presente
   Refresh Token: ✅ Presente
   ID Token: ✅ Presente
✅ Teste concluído com sucesso!
```

## 🐛 Debugging

Se continuar falhando:

1. Verifique se backend está rodando:
   ```bash
   curl http://localhost:4000/health
   ```

2. Verifique variável de ambiente:
   ```bash
   # No terminal do teste
   echo $env:NEXT_PUBLIC_API_URL
   ```

3. Verifique logs do navegador no teste (agora capturados automaticamente)

4. Verifique logs do backend para ver requisições chegando

