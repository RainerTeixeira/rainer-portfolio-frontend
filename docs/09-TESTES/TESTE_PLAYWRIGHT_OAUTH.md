# 🔒 Teste OAuth com Playwright

## 📝 Sobre

Teste de login com Google e GitHub usando **Playwright** com configurações anti-detecção.

> **Nota:** Este documento foi atualizado. Os testes foram migrados de Puppeteer para Playwright.

## ✅ Vantagens do Playwright

- ✅ **Não detectado** - Configurações anti-detecção integradas
- ✅ **Simples** - Código TypeScript/JavaScript puro
- ✅ **Eficaz** - Funciona com Google, GitHub, etc
- ✅ **Flexível** - Fácil de customizar
- ✅ **Integrado** - Usa fixtures globais e console monitoring

## 🚀 Como Executar

### Pré-requisitos

1. ✅ Backend rodando em `http://localhost:4000`
2. ✅ Frontend rodando em `http://localhost:3000`
3. ✅ Dependências instaladas

### Executar Teste

```bash
# Google OAuth
npx playwright test google-oauth.spec.ts --project=chrome

# GitHub OAuth
npx playwright test github-oauth.spec.ts --project=chrome

# Ambos
npx playwright test *oauth.spec.ts --project=chrome
```

## 📋 Fluxo do Teste

```
1. Browser abre (não-headless, visível)
   ↓
2. Configurações anti-detecção aplicadas
   ↓
3. Navega para /dashboard/login
   ↓
4. Clica no botão Google/GitHub
   ↓
5. Redireciona para OAuth provider
   ↓
6. [AÇÃO MANUAL] Login no provider
   ↓
7. Callback recebido
   ↓
8. Tokens salvos no localStorage
   ↓
9. Redireciona para /dashboard
   ↓
10. Validação de tokens
```

## 🔧 Configurações Anti-Detecção

O Playwright aplica automaticamente configurações para evitar detecção:

```typescript
// Remove webdriver flag
Object.defineProperty(navigator, 'webdriver', {
  get: () => false,
});

// Adiciona Chrome object
(window as any).chrome = {
  runtime: {},
  loadTimes: function () {},
  csi: function () {},
  app: {},
};

// Adiciona plugins
Object.defineProperty(navigator, 'plugins', {
  get: () => [1, 2, 3, 4, 5],
});

// Adiciona languages
Object.defineProperty(navigator, 'languages', {
  get: () => ['pt-BR', 'pt', 'en-US', 'en'],
});
```

## 📊 Estrutura dos Testes

### Arquivos

- `tests/e2e/google-oauth.spec.ts` - Teste de OAuth Google
- `tests/e2e/github-oauth.spec.ts` - Teste de OAuth GitHub

### Características

- ✅ Usa fixtures globais (`consoleHelper`)
- ✅ Validação automática de erros
- ✅ Screenshots em cada etapa
- ✅ Timeout de 10 minutos (para login manual)
- ✅ Headless: false (visível para interação)

## ⚠️ Limitações

1. **Login Manual Necessário**: O Google/GitHub ainda requer login manual
2. **Timeout Longo**: Testes podem levar até 10 minutos
3. **Não Headless**: Browser deve estar visível para interação

## 🐛 Troubleshooting

### Erro: "This browser or app may not be secure"

**Causa**: Google detectou automação

**Solução**: 
- Verifique se as configurações anti-detecção estão aplicadas
- Tente usar Chrome real do sistema (`channel: 'chrome'`)
- Certifique-se de que `headless: false`

### Erro: Timeout ao aguardar callback

**Causa**: Login manual não foi completado a tempo

**Solução**:
- Aumente o timeout do teste
- Verifique se o callback está sendo processado corretamente
- Verifique logs do servidor

### Erro: Botão não encontrado

**Causa**: Página não carregou completamente

**Solução**:
- Aumente o timeout de `waitFor`
- Verifique se o servidor está rodando
- Verifique se a rota `/dashboard/login` existe

## 📝 Exemplo de Uso

```typescript
import { expect, test } from './fixtures';

test.describe('Google OAuth - Fluxo Completo', () => {
  test.use({
    channel: 'chrome',
    headless: false,
    viewport: { width: 1920, height: 1080 },
  });

  test('Login com Google - Fluxo Completo', async ({ page, consoleHelper }) => {
    test.setTimeout(600000); // 10 minutos

    await page.goto('/dashboard/login', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    const googleButton = page.locator(
      'button:has-text("Google"), button[aria-label*="Google" i]'
    );
    await googleButton.click();

    // ... resto do fluxo
  });
});
```

## 🔗 Referências

- [Playwright Documentation](https://playwright.dev/)
- [OAuth 2.0 Flow](https://oauth.net/2/)
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)

