# 🔧 Troubleshooting: Backend OAuth Callback

## 🚨 Sintoma

Erro persiste mesmo após correções no frontend:
```
[ii5dpyj] Erro na requisição: {}
ApiClient.request → exchangeOAuthCodeViaBackend
```

## 🔍 Diagnóstico

O erro vazio `{}` indica que o backend:
- ❌ Não está respondendo
- ❌ Retornou erro sem message
- ❌ Falhou antes de processar

## ✅ Checklist de Verificação

### 1. Backend está Rodando?

```bash
# Terminal 1
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev

# Deve mostrar:
# Server listening at http://127.0.0.1:4000
```

**Verificar:**
```bash
# Testar health endpoint
curl http://localhost:4000/health

# Deve retornar: {"status":"healthy"}
```

### 2. Endpoint OAuth está Registrado?

Procure nos logs do backend ao iniciar:
```
[RouterExplorer] Mapped {/auth/oauth/:provider/callback, POST}
```

Se **NÃO aparecer**, o endpoint não foi registrado!

### 3. CORS Está Permitindo?

Verifique se frontend pode chamar backend:

```bash
# No console do Chrome (F12)
fetch('http://localhost:4000/health')
  .then(r => r.json())
  .then(console.log)

# Se der erro de CORS:
# Access to fetch at 'http://localhost:4000' has been blocked by CORS
```

### 4. Variáveis de Ambiente Backend

Verifique se o backend tem:

```env
# .env no backend
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxx
COGNITO_CLIENT_SECRET=xxxxxxxxx
COGNITO_DOMAIN=your-domain-here
```

## 🧪 Testes Diretos

### Teste 1: Health Check

```bash
curl http://localhost:4000/health
```

**Esperado:**
```json
{"status":"healthy"}
```

**Se falhar:** Backend não está rodando

### Teste 2: OAuth Redirect (GET)

```bash
curl -v "http://localhost:4000/auth/oauth/google?redirect_uri=http://localhost:3000/callback"
```

**Esperado:** Redirect 302 para Cognito

**Se falhar:** Endpoint ou Cognito mal configurado

### Teste 3: OAuth Callback (POST) - Com código mock

```bash
curl -X POST http://localhost:4000/auth/oauth/google/callback \
  -H "Content-Type: application/json" \
  -d '{
    "code": "test-code-123",
    "redirectUri": "http://localhost:3000/dashboard/login/callback"
  }'
```

**Esperado:** Erro específico (código inválido) mas endpoint responde

**Se não responder:** Endpoint não está funcionando

## 📊 Análise de Logs

### Backend Logs Esperados

Quando callback chega, deve aparecer:

```
POST /auth/oauth/google/callback
Headers: {...}
Body: { code: "xxx", redirectUri: "..." }

[AuthService] handleOAuthCallback - provider: google
[AuthService] Trocando código por tokens no Cognito
```

### Se NÃO aparecer nada:

❌ Requisição não está chegando no backend

**Possíveis causas:**
1. Backend não rodando
2. URL errada no frontend
3. CORS bloqueando
4. Firewall/Antivírus bloqueando

### Se aparecer mas der erro:

```
[AuthService] Erro ao trocar código: InvalidAuthorizationMessageException
```

**Causa:** Código OAuth inválido/expirado ou configuração Cognito errada

## 🔧 Soluções

### Solução 1: Verificar URL do Backend no Frontend

```typescript
// frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Reinicie o frontend** após mudar!

### Solução 2: Adicionar Logs no Backend

```typescript
// backend/auth.controller.ts

@Post('oauth/:provider/callback')
async handleOAuthCallback(
  @Body() data: { code: string; state?: string; redirectUri?: string },
  @Param('provider') provider: string,
) {
  // ADICIONE ESTES LOGS
  console.log('═══════════════════════════════════════');
  console.log('[OAuth Callback] Requisição recebida');
  console.log('Provider:', provider);
  console.log('Code:', data.code?.substring(0, 10) + '...');
  console.log('RedirectUri:', data.redirectUri);
  console.log('═══════════════════════════════════════');

  try {
    const result = await this.authService.handleOAuthCallback(
      provider as 'google' | 'github',
      data.code,
      data.state,
      data.redirectUri,
    );

    console.log('[OAuth Callback] Sucesso!');
    return result;
  } catch (error) {
    console.error('[OAuth Callback] Erro:', error);
    throw error;
  }
}
```

### Solução 3: Verificar Network Tab

```
F12 → Network → Filtrar por "callback"

Procure: POST /auth/oauth/google/callback

Verifique:
- Status: 200? 400? 500? Sem resposta?
- Request URL: http://localhost:4000/... correto?
- Request Headers: Content-Type: application/json?
- Request Payload: { code, redirectUri } presente?
- Response: Qual mensagem de erro?
```

### Solução 4: Testar com Código Real

1. Capture um código OAuth real:
   - Faça login com Google
   - Quando chegar no callback, pegue o `code=` da URL
   - Use imediatamente (expira em segundos)

2. Teste direto no backend:
```bash
curl -X POST http://localhost:4000/auth/oauth/google/callback \
  -H "Content-Type: application/json" \
  -d '{
    "code": "CÓDIGO_REAL_AQUI",
    "redirectUri": "http://localhost:3000/dashboard/login/callback"
  }'
```

3. Veja o que backend retorna

## 🎯 Comandos de Debug Rápido

```bash
# 1. Backend rodando?
curl http://localhost:4000/health

# 2. Endpoint existe?
curl -v http://localhost:4000/auth/oauth/google/callback

# 3. Frontend consegue acessar?
# No console do Chrome:
fetch('http://localhost:4000/health').then(r => r.text()).then(console.log)

# 4. Ver logs do backend
cd C:\Desenvolvimento\rainer-portfolio-backend
# Nos logs, procure por POST /auth/oauth

# 5. Ver variáveis de ambiente
cd C:\Desenvolvimento\rainer-portfolio-backend
# Verifique se .env existe e tem COGNITO_*
```

## 📝 Checklist Completo

### Backend
- [ ] `npm run dev` rodando
- [ ] Porta 4000 livre
- [ ] Health endpoint responde
- [ ] `/auth/oauth/:provider/callback` mapeado nos logs
- [ ] Variáveis COGNITO_* configuradas
- [ ] AWS credentials válidas

### Frontend
- [ ] `npm run dev` rodando
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:4000` em `.env.local`
- [ ] Frontend reiniciado após mudar .env
- [ ] Network tab mostra requisição POST
- [ ] Sem erros de CORS

### Cognito
- [ ] User Pool criado
- [ ] App Client configurado
- [ ] Google como Identity Provider
- [ ] Callback URLs registradas
- [ ] OAuth flows habilitados

## ✅ Próximos Passos

1. **Adicione os logs** no backend (Solução 2)
2. **Reinicie backend e frontend**
3. **Tente login novamente**
4. **Veja logs do backend** no terminal
5. **Veja Network tab** no Chrome

Se logs do backend **NÃO aparecerem**:
→ Requisição não está chegando (problema de rede/URL)

Se logs aparecerem mas **der erro**:
→ Problema na troca do código com Cognito (configuração/código expirado)

## 🆘 Se Nada Funcionar

Execute este script de diagnóstico completo:

```bash
# Windows PowerShell
cd C:\Desenvolvimento\rainer-portfolio-backend
Write-Host "Backend Health:" -ForegroundColor Cyan
curl.exe http://localhost:4000/health 2>&1
Write-Host "`nBackend Logs (últimas 50 linhas):" -ForegroundColor Cyan
Get-Content -Path logs/* -Tail 50 -ErrorAction SilentlyContinue
Write-Host "`nVariáveis Cognito:" -ForegroundColor Cyan
Get-Content .env | Select-String "COGNITO"
```

E me envie os resultados!

