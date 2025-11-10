# 🔍 Debug: Erro no Callback OAuth

## 🚨 Problema Identificado

Erro ocorrendo mesmo em teste manual:
```
[u6xeadz] Erro na requisição: {}
Falha ao processar login
```

## 📊 Análise

### O que está acontecendo:

1. ✅ Google faz login com sucesso
2. ✅ Cognito redireciona com código
3. ✅ Frontend recebe callback: `/dashboard/login/callback?code=xxx`
4. ❌ Frontend chama: `POST /auth/oauth/google/callback`
5. ❌ Backend retorna erro (objeto vazio `{}`)

### Possíveis Causas:

#### 1. Código OAuth Usado/Expirado

**Sintoma:** Código OAuth só pode ser usado UMA vez e expira em 10 minutos.

**Como acontece:**
```
1. Google → Cognito → Frontend (com código)
2. Frontend carrega página callback
3. useEffect executa e chama backend (usa código)
4. React StrictMode executa useEffect 2x em DEV
5. Segunda chamada falha: código já foi usado!
```

**Solução:** Prevenir chamadas duplicadas

#### 2. redirectUri Incorreto

**Sintoma:** Backend rejeita porque redirectUri não corresponde.

**Como acontece:**
- Frontend envia: `http://localhost:3000/dashboard/login/callback`
- Cognito espera exatamente o mesmo usado na autorização
- Qualquer diferença = erro

**Solução:** Garantir redirectUri consistente

#### 3. Backend Não Está Processando

**Sintoma:** Endpoint não existe ou erro interno.

**Solução:** Verificar logs do backend

## 🔧 Soluções

### Solução 1: Prevenir Chamadas Duplicadas (useEffect)

Adicione flag para executar apenas uma vez:

```typescript
// app/dashboard/login/callback/page.tsx

useEffect(() => {
  let executed = false; // Flag para prevenir duplicação
  
  async function handleCallback() {
    if (executed) return; // Já executou
    executed = true;
    
    try {
      // ... resto do código
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      
      // Trocar código por tokens
      const success = await loginFn(code, provider, state);
      
      // ...
    } catch (err) {
      // ...
    }
  }

  handleCallback();
}, [searchParams, authContext, router]);
```

### Solução 2: Usar useRef para Controle

```typescript
// app/dashboard/login/callback/page.tsx

const hasProcessed = useRef(false);

useEffect(() => {
  async function handleCallback() {
    if (hasProcessed.current) {
      console.log('[OAuth Callback] Já processado, ignorando');
      return;
    }
    
    hasProcessed.current = true;
    console.log('[OAuth Callback] Processando primeira vez');
    
    // ... resto do código
  }

  handleCallback();
}, [searchParams]);
```

### Solução 3: Desabilitar StrictMode (Temporário)

```typescript
// app/layout.tsx ou next.config.js

// Desabilita React StrictMode em desenvolvimento
export default function RootLayout({ children }) {
  // Remove <React.StrictMode>
  return children;
}
```

⚠️ **Não recomendado para produção!** StrictMode é útil para debug.

### Solução 4: Adicionar Retry Logic no Backend

No backend, verificar se o código já foi usado e retornar erro específico:

```typescript
// Backend: auth.controller.ts

@Post('oauth/:provider/callback')
async handleOAuthCallback(
  @Param('provider') provider: string,
  @Body() body: { code: string; state?: string; redirectUri?: string },
) {
  try {
    const tokens = await this.authService.exchangeOAuthCode(
      provider,
      body.code,
      body.redirectUri,
    );
    
    return {
      success: true,
      data: { tokens },
    };
  } catch (error) {
    // Verificar se é código inválido/expirado
    if (error.message.includes('authorization code')) {
      return {
        success: false,
        message: 'Código de autorização inválido ou expirado',
        error: 'OAUTH_CODE_INVALID',
      };
    }
    
    throw error;
  }
}
```

## 🧪 Como Testar

### Teste 1: Verificar Chamadas Duplicadas

```typescript
// Adicione logs no callback
console.log('[OAuth Callback] Iniciando processamento');
console.log('[OAuth Callback] Código:', code);
console.log('[OAuth Callback] Estado:', state);

// Antes de chamar backend
console.log('[OAuth Callback] Chamando backend...');
const success = await loginFn(code, provider, state);
console.log('[OAuth Callback] Resultado:', success);
```

### Teste 2: Verificar Backend

```bash
# Terminal 1 - Backend logs
cd C:\Desenvolvimento\rainer-portfolio-backend
npm run dev

# Procure por:
# POST /auth/oauth/google/callback
# Status: 200/400/500
```

### Teste 3: Network Tab

```
1. F12 → Network
2. Faça login
3. Procure por /auth/oauth/google/callback
4. Veja:
   - Request Headers
   - Request Payload
   - Response Status
   - Response Body
```

## 📋 Checklist de Debug

### Frontend
- [ ] console.log no início do useEffect
- [ ] Verificar se useEffect executa 2x
- [ ] Verificar código no searchParams
- [ ] Verificar redirectUri enviado
- [ ] Network tab mostra requisição

### Backend
- [ ] Endpoint existe e responde
- [ ] Logs mostram requisição chegando
- [ ] redirectUri correto no Cognito
- [ ] Credenciais AWS corretas
- [ ] Cognito User Pool ID correto

### Cognito
- [ ] Callback URL registrado
- [ ] OAuth flows habilitados
- [ ] Google configurado como provider
- [ ] Client ID/Secret corretos

## 🎯 Próximos Passos

1. **Adicionar logs detalhados** no callback do frontend
2. **Verificar logs** do backend quando callback chega
3. **Implementar flag** para prevenir chamadas duplicadas
4. **Adicionar tratamento** específico para código usado/expirado
5. **Testar novamente** com logs ativos

## 📝 Template de Log para Debug

```typescript
// Cole no callback do frontend para debug completo

console.log('═══════════════════════════════════════════════');
console.log('  DEBUG: OAuth Callback');
console.log('═══════════════════════════════════════════════');
console.log('URL:', window.location.href);
console.log('Código:', searchParams.get('code'));
console.log('State:', searchParams.get('state'));
console.log('Provider:', provider);
console.log('hasProcessed:', hasProcessed.current);
console.log('AuthContext:', !!authContext);
console.log('loginFn:', typeof loginFn);
console.log('═══════════════════════════════════════════════');
```

## ✅ Solução Recomendada

**Implementar Solução 2 (useRef)** + **Logs detalhados**:

1. Adicionar useRef para controlar execução única
2. Adicionar logs para debug
3. Testar e verificar logs do backend
4. Se ainda falhar, investigar Cognito

Isso vai resolver o problema de chamadas duplicadas em desenvolvimento!

