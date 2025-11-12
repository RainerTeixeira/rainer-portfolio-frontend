# 🔐 Testes OAuth - Google & GitHub

## ⚠️ Problema: Google Detecta Automação

O Google tem proteções anti-bot extremamente avançadas que detectam **TODOS** os frameworks de automação:
- ❌ Playwright (sem configurações especiais)
- ❌ Selenium

> **Nota:** Os testes foram migrados para Playwright com configurações anti-detecção.

**Mensagem de erro típica:**
```
"This browser or app may not be secure"
```

## ✅ Solução: Usar Chrome REAL do Sistema

### Opção 1: Teste com Playwright (RECOMENDADO)

```bash
# Google OAuth
npx playwright test google-oauth.spec.ts --project=chrome

# GitHub OAuth
npx playwright test github-oauth.spec.ts --project=chrome
```

**Arquivos:**
- `tests/e2e/google-oauth.spec.ts`
- `tests/e2e/github-oauth.spec.ts`

**Como funciona:**
1. Usa SEU perfil Chrome (não o do Playwright)
2. Usa suas sessões já logadas
3. Google não detecta como automação
4. Se já estiver logado, só seleciona a conta

### Opção 2: Teste Manual

1. Abra Chrome normalmente
2. Vá para `http://localhost:3000/dashboard/login`
3. Clique em "Login com Google"
4. Faça login
5. Verifique tokens no DevTools → Application → Local Storage

## 📊 Testes Automatizados Recomendados

Para CI/CD e testes automatizados, **NÃO teste o login com Google diretamente**. Em vez disso:

### 1. Teste o Callback (sem OAuth real)

```typescript
test('processa callback do Google', async () => {
  // Mock do código OAuth
  const mockCode = 'mock-oauth-code-123';
  const mockState = btoa(JSON.stringify({ p: 'google' }));
  
  // Testa o processamento do callback
  const tokens = await authService.exchangeOAuthCodeViaBackend(
    'google',
    mockCode,
    mockState
  );
  
  expect(tokens.accessToken).toBeDefined();
});
```

### 2. Teste a UI (sem backend real)

```typescript
test('redireciona para Google OAuth', async ({ page }) => {
  // Mock do backend
  await page.route('**/auth/oauth/google', route => {
    route.fulfill({
      status: 302,
      headers: {
        Location: 'https://mock-google.com/oauth',
      },
    });
  });
  
  await page.goto('/dashboard/login');
  await page.click('button:has-text("Google")');
  
  // Valida que tentou redirecionar
  await expect(page).toHaveURL(/mock-google/);
});
```

### 3. Teste de Integração com Usuário de Teste

Se o Cognito permitir, crie usuários de teste:

```typescript
test('login com usuário de teste do Cognito', async () => {
  const testUser = {
    email: 'test-google@example.com',
    password: 'Test123!@#',
  };
  
  // Usa API do Cognito diretamente
  const tokens = await cognitoService.authenticateUser(testUser);
  
  expect(tokens.accessToken).toBeDefined();
});
```

## 📁 Arquivos Disponíveis

```
scripts/
  └── test-google-real-chrome.js      # Chrome REAL (✅ FUNCIONA!)

tests/e2e/
  ├── google-oauth.spec.ts            # Playwright OAuth Google
  ├── github-oauth.spec.ts            # Playwright OAuth GitHub
  ├── google-signup-flow.spec.ts      # Playwright com mocks
  └── github-signup-flow.spec.ts      # Playwright com mocks

docs/09-TESTES/
  ├── README_TESTES_OAUTH.md          # Este arquivo
  ├── TESTE_PLAYWRIGHT_OAUTH.md      # Documentação OAuth Playwright
  └── ANALISE_ERRO_GOOGLE.md          # Análise de detecção
```

## 🎯 Recomendação Final

**Para desenvolvimento:**
```bash
# Use Chrome real
node scripts/test-google-real-chrome.js
```

**Para CI/CD:**
```bash
# Use testes com mocks
npx playwright test tests/e2e/google-signup-flow.spec.ts
```

**Para validação manual:**
1. Abra Chrome normalmente
2. Teste manualmente
3. Não tente automatizar 100%

## 💡 Lições Aprendidas

1. **Google é impossível de enganar** com automação normal
2. **Use mocks para CI/CD** ao invés de OAuth real
3. **Testes E2E com OAuth** devem ser manuais ou semi-manuais
4. **Perfil real do Chrome** é a única forma de evitar detecção
5. **GitHub é mais permissivo** que Google

## 🔗 Links Úteis

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Mock API](https://playwright.dev/docs/mock)
- [AWS Cognito Testing](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-testing.html)

