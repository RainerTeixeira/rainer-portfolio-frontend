# Testes E2E do Sistema de Cookies - Produção

Este documento explica como executar os testes E2E do sistema de cookies que simulam o ambiente de produção real.

## Arquivos de Teste

### 1. `cookies.spec.ts`

Testes E2E completos do sistema de cookies:

- Banner de cookies
- Aceitar/rejeitar cookies
- Personalização
- Persistência
- Navegação entre páginas
- Páginas legais
- Integração com analytics
- Responsividade
- Acessibilidade
- Performance

### 2. `cookies-production.spec.ts`

Testes que simulam ambiente de produção real:

- Fluxo completo de produção
- Múltiplas abas
- Revogação de consentimento
- Eventos customizados
- Performance
- Acessibilidade
- Diferentes navegadores

### 3. `cookies-localstorage.spec.ts`

Testes específicos de localStorage:

- Estrutura dos dados
- Versionamento
- Timestamps
- Persistência
- Dados corrompidos
- Limpeza de dados

## Como Executar

### Desenvolvimento (Modo Dev)

```bash
# Executa testes em modo desenvolvimento
npm run test:e2e tests/e2e/cookies.spec.ts

# Executa todos os testes de cookies
npm run test:e2e tests/e2e/cookies*.spec.ts

# Executa com UI (modo interativo)
npm run test:e2e:ui tests/e2e/cookies.spec.ts

# Executa com navegador visível (headed)
npm run test:e2e:headed tests/e2e/cookies.spec.ts

# Executa em modo debug
npm run test:e2e:debug tests/e2e/cookies.spec.ts
```

### Produção (Build + Start)

```bash
# 1. Build da aplicação
npm run build

# 2. Inicia servidor de produção
npm run start

# 3. Em outro terminal, executa testes
NODE_ENV=production npm run test:e2e tests/e2e/cookies-production.spec.ts
```

Ou usando o script automatizado:

```bash
# Windows (PowerShell)
$env:NODE_ENV="production"; npm run test:e2e tests/e2e/cookies-production.spec.ts

# Linux/Mac
NODE_ENV=production npm run test:e2e tests/e2e/cookies-production.spec.ts
```

### Testes Específicos

```bash
# Apenas testes do banner
npm run test:e2e tests/e2e/cookies.spec.ts -g "Banner de Cookies"

# Apenas testes de produção
npm run test:e2e tests/e2e/cookies-production.spec.ts

# Apenas testes de localStorage
npm run test:e2e tests/e2e/cookies-localstorage.spec.ts

# Apenas testes de persistência
npm run test:e2e tests/e2e/cookies.spec.ts -g "Persistência"
```

## Configuração

### Variáveis de Ambiente

```bash
# URL base da aplicação
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Modo de produção
NODE_ENV=production

# Google Analytics ID (opcional, para testes de analytics)
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
```

### Playwright Config

O arquivo `playwright.config.ts` está configurado para:

- Executar servidor de desenvolvimento ou produção automaticamente
- Usar Chrome, Firefox e Safari
- Tirar screenshots em caso de falha
- Coletar trace em caso de retry
- Executar em paralelo (quando possível)

## Cobertura de Testes

### Cenários Testados

✅ **Banner de Cookies**

- Aparece na primeira visita
- Não aparece após aceitar
- Aceita todos os cookies
- Rejeita cookies opcionais
- Personalização
- Fechar banner

✅ **Personalização**

- Toggle de categorias
- Cookies essenciais não podem ser desativados
- Salvar preferências
- Lista de cookies por categoria

✅ **Página de Configurações**

- Acesso via URL
- Atualização de preferências
- Links para políticas

✅ **Persistência**

- Entre navegações
- Após reload
- Entre abas (mesmo contexto)

✅ **Integração com Analytics**

- Carrega scripts quando permitido
- Não carrega quando rejeitado
- Eventos customizados

✅ **Páginas Legais**

- Política de Cookies
- Política de Privacidade
- Termos de Uso

✅ **Responsividade**

- Mobile (375x667)
- Tablet (768x1024)
- Desktop

✅ **Acessibilidade**

- ARIA labels
- Navegação por teclado
- Contraste de cores

✅ **Performance**

- Banner aparece rapidamente
- Não bloqueia carregamento

✅ **Edge Cases**

- Dados corrompidos
- Revogação de consentimento
- Múltiplas abas
- Diferentes navegadores

## Debugging

### Ver logs do navegador

```bash
# Executa com console logs visíveis
npm run test:e2e:headed tests/e2e/cookies.spec.ts
```

### Screenshots

Screenshots são tirados automaticamente quando um teste falha. Eles são salvos em:

```
test-results/
```

### Trace Viewer

Para ver o trace de um teste falho:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

### Modo Debug

```bash
# Abre Playwright Inspector
npm run test:e2e:debug tests/e2e/cookies.spec.ts
```

## CI/CD

### GitHub Actions

```yaml
- name: Run E2E Tests
  run: |
    npm run build
    npm run start &
    npm run test:e2e tests/e2e/cookies*.spec.ts
```

### Variáveis de Ambiente no CI

Certifique-se de configurar:

- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_GA_ID` (opcional)

## Troubleshooting

### Banner não aparece

1. Verifica se há consentimento salvo no localStorage
2. Limpa o storage: `localStorage.clear()`
3. Verifica o delay do banner (500ms)

### Testes falham em produção

1. Verifica se o servidor está rodando
2. Verifica se a URL está correta
3. Verifica logs do servidor
4. Executa em modo headed para ver o que está acontecendo

### localStorage não persiste

1. Verifica se o contexto do Playwright está correto
2. Verifica se não há limpeza entre testes
3. Verifica se o storageState está configurado corretamente

## Estrutura dos Dados

### localStorage - cookie-consent

```json
{
  "version": "1.0.0",
  "consented": true,
  "timestamp": 1234567890,
  "preferences": {
    "essential": true,
    "performance": true,
    "functionality": true,
    "analytics": true
  }
}
```

### localStorage - cookie-preferences

```json
{
  "essential": true,
  "performance": true,
  "functionality": true,
  "analytics": true
}
```

## Próximos Passos

- [ ] Adicionar testes de performance (Lighthouse)
- [ ] Adicionar testes de acessibilidade (axe-core)
- [ ] Adicionar testes de diferentes idiomas
- [ ] Adicionar testes de diferentes temas (dark/light)
- [ ] Adicionar testes de diferentes resoluções
- [ ] Adicionar testes de diferentes navegadores mobile
