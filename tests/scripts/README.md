# Scripts de Teste

Este diretório contém scripts auxiliares para execução de testes e validações.

## 📋 Scripts Disponíveis

### Execução de Testes

- **`run-all-tests.js`** - Executa todos os tipos de testes e gera relatório consolidado
- **`test-performance.js`** - Testes de performance usando Lighthouse

### Testes de UI

- **`testar-ui-chrome.js`** - Abre Chrome e verifica erros na UI
- **`teste-completo-ui.js`** - Teste completo da interface do usuário
- **`teste-browser-console.js`** - Verifica erros no console do navegador

### Testes de Editor

- **`testar-editor-automated.js`** - Testes automatizados do editor
- **`testar-editor-json.js`** - Testes do editor com JSON
- **`teste-editor-completo.js`** - Teste completo do editor
- **`teste-editor-real.js`** - Teste real do editor

### Testes de Funcionalidades

- **`testar-listagem-posts.js`** - Testa listagem de posts
- **`testar-todas-funcoes.js`** - Testa todas as funções do editor
- **`teste-automatizado-real.js`** - Teste automatizado real
- **`teste-manual-completo.js`** - Teste manual completo
- **`teste-persistencia-real.js`** - Teste de persistência real

### Documentação

- **`teste-rapido-funcoes.md`** - Guia rápido de funções de teste

## 🚀 Executando Scripts

Os scripts podem ser executados via NPM ou diretamente:

```bash
# Via NPM (recomendado)
npm run test:all
npm run test:chrome
npm run test:posts
npm run test:performance

# Diretamente
node tests/scripts/run-all-tests.js
node tests/scripts/testar-ui-chrome.js
```

## 📝 Notas

- Todos os scripts foram movidos de `scripts/` para `tests/scripts/` para manter a raiz limpa
- Os caminhos relativos foram ajustados para funcionar a partir da nova localização
- Fixtures estão em `tests/fixtures/` (ex: `test-post.json`)
- Resultados são salvos em `test-results/` na raiz do projeto
