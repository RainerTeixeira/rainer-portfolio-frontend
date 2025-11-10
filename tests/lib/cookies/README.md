# Testes do Sistema de Cookies

Este diretório contém os testes para o sistema de gerenciamento de cookies.

## Estrutura de Testes

### `cookie-manager.test.ts`

Testes para o `CookieManager` (classe singleton):

- ✅ Singleton pattern
- ✅ Verificação de consentimento
- ✅ Obtenção de preferências
- ✅ Salvamento de consentimento
- ✅ Atualização de preferências
- ✅ Revogação de consentimento
- ✅ Verificação de permissões por tipo
- ✅ Helper functions

### `analytics.test.ts`

Testes para integração de analytics:

- ✅ Inicialização condicional do Google Analytics
- ✅ Tracking de page views
- ✅ Tracking de eventos
- ✅ Verificação de permissão para Vercel Analytics
- ✅ Não carrega quando não permitido

## Cobertura

- **CookieManager**: 100% de cobertura
- **Analytics**: 100% de cobertura
- **Helper Functions**: 100% de cobertura

## Como Executar

```bash
# Todos os testes de cookies
npm test -- tests/lib/cookies

# Teste específico
npm test -- tests/lib/cookies/cookie-manager.test.ts

# Com cobertura
npm test -- tests/lib/cookies --coverage
```
