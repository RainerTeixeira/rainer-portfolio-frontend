# 🔒 Teste Google OAuth com Puppeteer Stealth

## 📝 Sobre

Teste de login com Google usando **Puppeteer** + **Stealth Plugin** para evitar detecção de automação.

## ✅ Vantagens do Puppeteer Stealth

- ✅ **Não detectado** - Plugin stealth remove flags de automação
- ✅ **Simples** - Código TypeScript/JavaScript puro
- ✅ **Eficaz** - Funciona com Google, GitHub, etc
- ✅ **Flexível** - Fácil de customizar

## 🚀 Como Executar

### Pré-requisitos

1. ✅ Backend rodando em `http://localhost:4000`
2. ✅ Frontend rodando em `http://localhost:3000`
3. ✅ Dependências instaladas

### Instalar Dependências

```bash
npm install --save-dev puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
```

### Executar Teste

```bash
# Google OAuth
npx ts-node scripts/test-google-stealth.ts

# GitHub OAuth
npx ts-node scripts/test-github-stealth.ts

# Com Jest (Google)
npx jest tests/e2e/google-stealth.test.ts

# Com Jest (GitHub)
npx jest tests/e2e/github-stealth.test.ts
```

## 📋 Fluxo do Teste

```
1. Browser abre (não-headless, visível)
   ↓
2. Stealth plugin remove detecção de automação
   ↓
3. Navega para /dashboard/login
   ↓
4. Clica no botão "Login com Google"
   ↓
5. Redireciona para Cognito → Google
   ↓
6. PAUSA - Você faz login manualmente
   ↓
7. Google redireciona de volta com código
   ↓
8. Frontend processa callback
   ↓
9. Valida tokens no localStorage
   ↓
10. ✅ Teste passa!
```

## 🔧 Diferenças: Playwright vs Puppeteer Stealth

| Aspecto | Playwright | Puppeteer Stealth |
|---------|-----------|-------------------|
| **Detecção** | ❌ Detectado pelo Google | ✅ Não detectado |
| **Configuração** | Simples | Requer plugin |
| **Flexibilidade** | Multi-browser | Só Chrome/Chromium |
| **Performance** | Mais rápido | Levemente mais lento |
| **Uso** | Testes E2E gerais | Contornar anti-bot |

## 🎯 O que o Stealth Plugin faz

```typescript
// Remove detecção de automação
✅ navigator.webdriver = false
✅ window.chrome = { runtime: {} }
✅ navigator.plugins = [...]
✅ navigator.languages = ['pt-BR', 'pt', 'en-US']
✅ Remove Chrome DevTools Protocol flags
✅ Mascara propriedades de automação
```

## 📊 Resultado Esperado

### Console Output

```
═══════════════════════════════════════════════════════
  🔒 Teste Google OAuth com Puppeteer Stealth
═══════════════════════════════════════════════════════

✅ Browser iniciado com Stealth Plugin
📧 Email: raineroliveira94@hotmail.com

──────────────────────────────────────────────────────
ETAPA 1: Navegando para página de login

✅ Página carregada

──────────────────────────────────────────────────────
ETAPA 2: Clicando no botão Google

✅ Botão Google clicado

──────────────────────────────────────────────────────
ETAPA 3: Aguardando redirecionamento

📍 URL atual: https://accounts.google.com/...

═══════════════════════════════════════════════════════
👤 FAÇA LOGIN MANUALMENTE NO NAVEGADOR
═══════════════════════════════════════════════════════
📧 Email: raineroliveira94@hotmail.com
⏱️  Aguardando... (até 5 minutos)

──────────────────────────────────────────────────────
ETAPA 4: Callback recebido

📍 URL: http://localhost:3000/dashboard/login/callback?code=...

──────────────────────────────────────────────────────
ETAPA 5: Validando autenticação

🔍 Resultado:
   Access Token: ✅
   Refresh Token: ✅
   User: ✅

👤 Usuário autenticado:
   Email: raineroliveira94@hotmail.com
   Nome: Rainer Oliveira

═══════════════════════════════════════════════════════
✅ TESTE CONCLUÍDO COM SUCESSO!
═══════════════════════════════════════════════════════
```

## 🐛 Troubleshooting

### Erro: "Código de autorização inválido ou expirado"

**Causa:** O código OAuth expira em alguns segundos.

**Solução:**
- Frontend tenta reusar código já usado
- Limpe localStorage antes de testar
- Use navegação anônima

### Erro: "Failed to launch browser"

**Causa:** Puppeteer não encontrou Chrome.

**Solução:**
```bash
# Windows
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
npm install puppeteer

# Ou use Chrome do sistema
executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
```

### Google ainda detecta automação

**Causa:** Stealth plugin não é 100% perfeito.

**Soluções adicionais:**
1. Use perfil Chrome real do usuário
2. Adicione delays humanos (`await page.waitForTimeout(random(1000, 3000))`)
3. Mova mouse de forma humana
4. Use proxy residencial

## 📁 Arquivos Criados

```
tests/e2e/
  ├── google-stealth.test.ts          # Teste Google com Jest
  ├── github-stealth.test.ts          # Teste GitHub com Jest ✨
  └── run-stealth-test.sh             # Script bash

scripts/
  ├── test-google-stealth.ts          # Script Google executável
  └── test-github-stealth.ts          # Script GitHub executável ✨

docs/09-TESTES/
  ├── TESTE_PUPPETEER_STEALTH.md      # Esta documentação
  └── ANALISE_ERRO_GOOGLE.md          # Análise de erros
```

## 🎓 Próximos Passos

### 1. Automatizar Login (Avançado)

```typescript
// Preencher automaticamente (não recomendado para produção)
await page.type('input[type="email"]', 'seu-email@gmail.com');
await page.click('button[type="submit"]');
await page.waitForTimeout(2000);
await page.type('input[type="password"]', 'sua-senha');
await page.click('button[type="submit"]');
```

⚠️ **CUIDADO**: Armazenar credenciais é risco de segurança!

### 2. Teste GitHub (✅ Já Criado!)

Execute:
```bash
npx ts-node scripts/test-github-stealth.ts
```

O teste do GitHub funciona exatamente como o do Google.

### 3. Integrar com CI/CD

Use variáveis de ambiente seguras e perfis de teste.

## 📚 Referências

- [Puppeteer Docs](https://pptr.dev/)
- [Puppeteer Extra](https://github.com/berstend/puppeteer-extra)
- [Stealth Plugin](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)

## ✅ Conclusão

**Puppeteer Stealth é a melhor solução** para testes E2E que precisam interagir com provedores OAuth que detectam automação (Google, GitHub, Facebook, etc).

**Use quando:**
- ✅ Playwright é bloqueado
- ✅ Precisa contornar detecção de bot
- ✅ Teste manual é inviável

**Não use quando:**
- ❌ Testes internos (use mocks)
- ❌ CI/CD sem interface gráfica
- ❌ Testes unitários (use mocks de API)

