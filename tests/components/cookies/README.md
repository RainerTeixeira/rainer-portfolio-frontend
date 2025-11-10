# Testes dos Componentes de Cookies

Este diretório contém os testes para os componentes relacionados a cookies.

## Estrutura de Testes

### `cookie-settings.test.tsx`

Testes para o componente `CookieSettings`:

- ✅ Renderização do componente
- ✅ Exibição de categorias de cookies
- ✅ Carregamento de preferências salvas
- ✅ Toggle de preferências
- ✅ Cookies essenciais não podem ser desativados
- ✅ Salvamento de preferências
- ✅ Aceitar todos os cookies
- ✅ Rejeitar cookies opcionais
- ✅ Renderização como dialog
- ✅ Botão de configurações

### `cookie-initializer.test.tsx`

Testes para o componente `CookieInitializer`:

- ✅ Renderização sem erros
- ✅ Inicialização do Google Analytics quando permitido
- ✅ Não inicializa quando não permitido
- ✅ Atualização de preferências
- ✅ Carregamento de preferências salvas

## Cobertura

- **CookieSettings**: ~95% de cobertura
- **CookieInitializer**: ~90% de cobertura

## Como Executar

```bash
# Todos os testes de componentes de cookies
npm test -- tests/components/cookies

# Teste específico
npm test -- tests/components/cookies/cookie-settings.test.tsx

# Com cobertura
npm test -- tests/components/cookies --coverage
```
