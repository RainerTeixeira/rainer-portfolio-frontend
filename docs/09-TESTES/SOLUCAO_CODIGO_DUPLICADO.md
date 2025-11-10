# ✅ Solução: Código OAuth Duplicado

## 🚨 Problema Identificado

Os logs mostraram **múltiplas requisições** com o **mesmo código OAuth**:

```
Code: 8497b223-4b42-4...
[Requisição 1] → 400 invalid_grant (código usado)
[Requisição 2] → 400 invalid_grant (código já usado)
[Requisição 3] → 400 invalid_grant (código já usado)
[Requisição 4] → 400 invalid_grant (código já usado)
[Requisição 5] → 400 invalid_grant (código já usado)
[Requisição 6] → 400 invalid_grant (código já usado)
```

### Por que aconteceu?

1. **OAuth code é single-use**: Pode ser usado apenas **UMA VEZ**
2. **React StrictMode**: Executa useEffect 2x em desenvolvimento
3. **Componente remonta**: Cada remontagem = nova chamada
4. **Múltiplas instâncias**: Possível navegação/reload causando múltiplos componentes

## 🔧 Soluções Implementadas

### Solução 1: Backend - Cache de Códigos (✅ IMPLEMENTADO)

Adicionado sistema de cache no backend para prevenir processamento duplicado:

```typescript
// auth.service.ts

export class AuthService {
  // Cache para prevenir uso duplicado de códigos OAuth
  private readonly processedCodes = new Map<string, { 
    timestamp: number; 
    processing: boolean 
  }>();

  constructor(...) {
    // Limpar códigos expirados a cada 60 segundos
    setInterval(() => {
      const now = Date.now();
      for (const [code, data] of this.processedCodes.entries()) {
        if (now - data.timestamp > 60000) {
          this.processedCodes.delete(code);
        }
      }
    }, 60000);
  }

  async handleOAuthCallback(provider, code, state, redirectUri) {
    // Verificar se código já está sendo processado
    const codeData = this.processedCodes.get(code);
    
    if (codeData?.processing) {
      throw new BadRequestException('Código já está sendo processado');
    }
    
    if (codeData && (Date.now() - codeData.timestamp) < 60000) {
      throw new BadRequestException('Código já foi usado');
    }

    // Marcar como "em processamento"
    this.processedCodes.set(code, { 
      timestamp: Date.now(), 
      processing: true 
    });

    try {
      // ... processar código ...
      
      // Marcar como processado com sucesso
      this.processedCodes.set(code, { 
        timestamp: Date.now(), 
        processing: false 
      });
      
      return result;
    } catch (error) {
      // Remover do cache em caso de erro para permitir retry
      this.processedCodes.delete(code);
      throw error;
    }
  }
}
```

**Comportamento:**
- ✅ Primeira requisição: Processa normalmente
- ⚠️  Requisições simultâneas: Retorna erro imediatamente
- ⚠️  Requisições após sucesso: Retorna erro (código já usado)
- ✅ Requisições após erro: Permite retry (código removido do cache)

### Solução 2: Frontend - useRef (✅ JÁ IMPLEMENTADO)

```typescript
// callback/page.tsx

const hasProcessed = useRef(false);

useEffect(() => {
  async function handleCallback() {
    // Prevenir execução duplicada
    if (hasProcessed.current) {
      console.log('Já processado, ignorando');
      return;
    }

    hasProcessed.current = true;
    
    // ... processar callback ...
  }

  handleCallback();
}, []); // Array vazio: executa apenas uma vez
```

### Solução 3: Frontend - Debounce Adicional

Para casos extremos, adicionar debounce na chamada:

```typescript
// hooks/useAuth.ts

const loginWithOAuthCode = useCallback(
  async (code: string, provider?: string, state?: string) => {
    // Prevenir chamadas rápidas demais
    const lastCall = sessionStorage.getItem('lastOAuthCall');
    if (lastCall && Date.now() - parseInt(lastCall) < 1000) {
      console.log('Chamada OAuth muito rápida, ignorando');
      return false;
    }
    
    sessionStorage.setItem('lastOAuthCall', Date.now().toString());
    
    // ... resto do código ...
  },
  []
);
```

## 📊 Fluxo Correto Após Correções

### Cenário 1: Primeira Requisição (Sucesso)

```
1. Frontend: Usuário faz login com Google
2. Cognito: Redireciona com code=abc123
3. Frontend: useRef verifica (false) → permite
4. Frontend: Marca hasProcessed=true
5. Frontend: Chama backend com code=abc123
6. Backend: Cache verifica (vazio) → permite
7. Backend: Marca code como "processando"
8. Backend: Troca código por tokens no Cognito ✅
9. Backend: Marca code como "processado"
10. Frontend: Recebe tokens ✅
11. Frontend: Redireciona para dashboard ✅
```

### Cenário 2: Requisições Duplicadas (Prevenidas)

```
1. Frontend: Primeira requisição iniciada
2. Backend: Marca code como "processando"
3. Frontend: Segunda requisição (React StrictMode)
4. Frontend: useRef verifica (true) → BLOQUEIA ❌
5. OU
6. Backend: Cache verifica ("processando") → BLOQUEIA ❌
7. Backend: Retorna 400 "Código já está sendo processado"
```

### Cenário 3: Código Já Usado

```
1. Frontend: Requisição com código usado
2. Backend: Cache verifica (existe + timestamp < 60s) → BLOQUEIA ❌
3. Backend: Retorna 400 "Código já foi usado"
4. Frontend: Mostra erro + permite novo login
```

### Cenário 4: Erro + Retry

```
1. Frontend: Requisição com código válido
2. Backend: Marca como "processando"
3. Backend: Erro ao trocar código (Cognito timeout)
4. Backend: Remove código do cache ✅
5. Frontend: Pode tentar novamente
```

## 🧪 Teste Novamente

```bash
# 1. Backend com cache implementado
cd C:\Desenvolvimento\rainer-portfolio-backend
# (Já rodando com cache)

# 2. Frontend com useRef
cd C:\Desenvolvimento\rainer-portfolio-frontend
npm run dev

# 3. Teste
# F12 → Application → Clear Storage
# http://localhost:3000/dashboard/login
# Login com Google
```

## 📋 Logs Esperados (Sucesso)

### Backend:
```
═══════════════════════════════════════════════════════
[OAuth Callback Controller] Requisição recebida
Code: 8497b223-4b42-4...
═══════════════════════════════════════════════════════
[AuthService] handleOAuthCallback iniciado
[AuthService] ✅ Código marcado como em processamento
[AuthService] Trocando código por tokens no Cognito...
[AuthService] ✅ Tokens recebidos do Cognito
[AuthService] Decodificando ID token...
[AuthService] Buscando usuário no MongoDB...
[AuthService] ✅ Usuário encontrado: raineroliveira94@hotmail.com
[AuthService] ✅ Callback OAuth processado com sucesso!
[OAuth Callback Controller] ✅ Sucesso!
═══════════════════════════════════════════════════════
```

**NÃO deve aparecer mais requisições duplicadas!**

### Se Houver Requisição Duplicada:

```
[AuthService] ⚠️  Código já está sendo processado, ignorando requisição duplicada
[OAuth Callback Controller] ❌ Erro ao processar:
Mensagem: Código já está sendo processado. Aguarde a primeira requisição completar.
```

## ✅ Benefícios

1. **Previne uso duplicado**: Backend garante código usado apenas 1x
2. **Performance**: Requisições duplicadas retornam erro imediato
3. **Retry em caso de erro**: Se falhar, código pode ser usado novamente
4. **TTL automático**: Códigos expiram após 60 segundos
5. **Memória limpa**: Limpeza automática de códigos antigos

## 🎯 Resultado Esperado

- ✅ Login funciona normalmente
- ✅ Apenas UMA requisição processada
- ✅ Requisições duplicadas bloqueadas instantaneamente
- ✅ Erro claro se código já usado
- ✅ Permite retry em caso de falha real

## 🔍 Debug

Se ainda houver problemas:

1. **Verificar logs do backend**: Quantas requisições chegam?
2. **Verificar logs do frontend**: useRef está funcionando?
3. **Network tab**: Quantas requisições POST são feitas?
4. **Console**: Mensagens de bloqueio aparecem?

## 📝 Próximos Passos

1. Testar login com Google
2. Verificar se apenas 1 requisição é processada
3. Verificar se login funciona corretamente
4. Se funcionar, testar GitHub também
5. Remover logs excessivos para produção

