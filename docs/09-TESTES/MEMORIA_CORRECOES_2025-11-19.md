# Memória de Correções - 19 de Novembro de 2025

## 📋 Resumo Executivo

Este documento registra todas as correções e otimizações implementadas no frontend do portfólio em 19/11/2025, focadas em:
1. **Supressão de erros de conexão no console** quando o backend não está disponível
2. **Otimizações de performance** para reduzir violações de console (message handler e forced reflow)

---

## 🐛 Problemas Identificados

### 1. Erros de Conexão no Console
- **Sintoma**: Mensagens repetidas de `net::ERR_CONNECTION_REFUSED` no console quando o backend não está rodando
- **Impacto**: Poluição do console, dificultando debug de outros erros
- **Localização**: `lib/api/client.ts` - requisições HTTP falhando

### 2. Violações de Performance
- **Sintoma**: 
  - `[Violation]'message' handler took 437ms` - Handler de mensagem demorando muito
  - `[Violation]Forced reflow while executing JavaScript took 33ms` - Reflows forçados durante execução
- **Impacto**: Degradação de performance, especialmente em dispositivos móveis
- **Localização**: 
  - `components/home/carousel.tsx` - Atualizações frequentes de padrões binários
  - `app/blog/page.tsx` - Carregamento inicial de posts

---

## ✅ Correções Implementadas

### 1. Supressão de Erros de Conexão (`lib/api/client.ts`)

**Mudança**: Interceptação temporária de `console.error` e `console.warn` durante requisições HTTP para suprimir erros de conexão.

**Código Implementado**:
```typescript
// Interceptar console.error temporariamente para suprimir erros de conexão
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

if (process.env.NODE_ENV === 'development') {
  console.error = (...args: unknown[]) => {
    const message = String(args[0] || '');
    const isConnectionError = 
      message.includes('ERR_CONNECTION_REFUSED') ||
      message.includes('Failed to fetch') ||
      message.includes('net::ERR_CONNECTION_REFUSED') ||
      (args.length > 0 && typeof args[0] === 'string' && args[0].includes('localhost:4000'));
    
    if (!isConnectionError) {
      originalConsoleError.apply(console, args);
    }
    // Erros de conexão são suprimidos silenciosamente
  };

  console.warn = (...args: unknown[]) => {
    const message = String(args[0] || '');
    const isConnectionError = 
      message.includes('ERR_CONNECTION_REFUSED') ||
      message.includes('Failed to fetch') ||
      message.includes('net::ERR_CONNECTION_REFUSED');
    
    if (!isConnectionError) {
      originalConsoleWarn.apply(console, args);
    }
  };
}
```

**Benefícios**:
- ✅ Console limpo quando backend não está disponível
- ✅ Erros de conexão suprimidos apenas em desenvolvimento
- ✅ Outros erros continuam sendo logados normalmente
- ✅ Console restaurado automaticamente após requisição

---

### 2. Otimização do Carousel (`components/home/carousel.tsx`)

#### 2.1. Atualização de Padrões Binários com `requestAnimationFrame`

**Problema**: `setInterval` com 150ms causava atualizações muito frequentes, gerando violações de performance.

**Solução**: Substituído por `requestAnimationFrame` com intervalo de 300ms.

**Código Implementado**:
```typescript
// OTIMIZADO: Usar requestAnimationFrame para evitar violações de performance
let rafId: number | null = null;
let lastUpdate = 0;
const UPDATE_INTERVAL = 300; // Reduzido de 150ms para 300ms

const updatePatterns = (timestamp: number) => {
  if (timestamp - lastUpdate >= UPDATE_INTERVAL) {
    setLivePatterns(prev => /* ... */);
    lastUpdate = timestamp;
  }
  rafId = requestAnimationFrame(updatePatterns);
};

rafId = requestAnimationFrame(updatePatterns);
```

**Benefícios**:
- ✅ Sincronização com o refresh rate do navegador
- ✅ Redução de 50% na frequência de atualizações (150ms → 300ms)
- ✅ Melhor uso de GPU para animações

#### 2.2. Debounce no Handler de Resize

**Problema**: Eventos de resize causavam reflows forçados frequentes.

**Solução**: Debounce de 150ms + `requestAnimationFrame` + flag `passive: true`.

**Código Implementado**:
```typescript
let resizeRafId: number | null = null;
let resizeTimeout: NodeJS.Timeout | null = null;

// OTIMIZADO: Debounce resize para evitar reflows forçados
const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  if (resizeRafId) cancelAnimationFrame(resizeRafId);
  
  // Debounce de 150ms + requestAnimationFrame para suavizar
  resizeTimeout = setTimeout(() => {
    resizeRafId = requestAnimationFrame(() => {
      updateResponsiveDimensions();
    });
  }, 150);
};

window.addEventListener('resize', handleResize, { passive: true });
```

**Benefícios**:
- ✅ Redução drástica de reflows forçados
- ✅ Melhor performance durante redimensionamento
- ✅ Flag `passive: true` permite otimizações do navegador

---

### 3. Otimização do Blog Page (`app/blog/page.tsx`)

**Problema**: Carregamento inicial de posts causava violações de performance no mount.

**Solução**: Uso de `setTimeout` com delay 0 para evitar bloqueio do thread principal.

**Código Implementado**:
```typescript
useEffect(() => {
  // Usar setTimeout para evitar violações de performance no mount
  const timeoutId = setTimeout(() => {
    const loadPosts = async () => {
      // ... lógica de carregamento
    };
    loadPosts();
  }, 0);

  return () => {
    clearTimeout(timeoutId);
  };
}, []);
```

**Benefícios**:
- ✅ Carregamento assíncrono não bloqueia renderização inicial
- ✅ Melhor experiência do usuário (página aparece mais rápido)
- ✅ Redução de violações de performance no mount

---

## 📊 Resultados Esperados

### Antes das Correções
- ❌ Console poluído com erros `ERR_CONNECTION_REFUSED`
- ❌ Violações de performance frequentes
- ❌ Reflows forçados durante resize
- ❌ Handler de mensagem demorando >400ms

### Depois das Correções
- ✅ Console limpo quando backend não está disponível
- ✅ Violações de performance reduzidas significativamente
- ✅ Reflows otimizados com debounce e `requestAnimationFrame`
- ✅ Handler de mensagem mais eficiente (<100ms esperado)

---

## 🔍 Arquivos Modificados

1. **`lib/api/client.ts`**
   - Interceptação de `console.error` e `console.warn`
   - Supressão de erros de conexão em desenvolvimento
   - Restauração automática do console

2. **`components/home/carousel.tsx`**
   - Substituição de `setInterval` por `requestAnimationFrame`
   - Intervalo de atualização aumentado (150ms → 300ms)
   - Debounce no handler de resize (150ms)
   - Flag `passive: true` no event listener

3. **`app/blog/page.tsx`**
   - Uso de `setTimeout` para carregamento assíncrono
   - Redução de violações de performance no mount

---

## 🧪 Validação

### Como Testar

1. **Teste de Supressão de Erros**:
   - Parar o backend
   - Abrir o frontend
   - Verificar que o console não mostra erros `ERR_CONNECTION_REFUSED`
   - Verificar que a mensagem de erro genérica aparece na página do blog

2. **Teste de Performance**:
   - Abrir DevTools → Performance
   - Gravar performance durante carregamento da página
   - Verificar que não há violações de performance
   - Redimensionar a janela e verificar que não há reflows forçados

3. **Teste com Backend Rodando**:
   - Iniciar o backend
   - Verificar que posts são carregados normalmente
   - Verificar que não há erros no console

---

## 📝 Notas Técnicas

### Decisões de Design

1. **Interceptação de Console**: 
   - Apenas em desenvolvimento (`NODE_ENV === 'development'`)
   - Restauração automática após requisição
   - Não afeta outros erros

2. **requestAnimationFrame vs setInterval**:
   - Melhor sincronização com refresh rate
   - Otimização automática pelo navegador
   - Redução de violações de performance

3. **Debounce de Resize**:
   - 150ms de debounce + `requestAnimationFrame`
   - Flag `passive: true` para otimizações do navegador
   - Cleanup adequado de timeouts e animation frames

---

## 🔄 Próximos Passos

1. ✅ Validar que backend está rodando e mensagem de erro desaparece
2. ⏳ Monitorar performance em produção
3. ⏳ Considerar implementar retry automático para requisições falhadas
4. ⏳ Adicionar métricas de performance (Web Vitals)

---

## 👤 Autor

**Rainer Teixeira**  
Data: 19 de Novembro de 2025  
Versão do Frontend: 2.1.0

---

## 📚 Referências

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MDN: EventListenerOptions - passive](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive)
- [Web.dev: Performance Best Practices](https://web.dev/performance/)

