# 🧠 Sistema de Memórias do Projeto - Frontend

Este diretório contém a configuração e os scripts para o sistema de memórias do projeto `rainer-portfolio-frontend`. O objetivo é fornecer um contexto rico e atualizado para ferramentas de IA, como o Cursor, e para qualquer desenvolvedor que precise entender rapidamente a arquitetura, as decisões técnicas e o estado atual do projeto.

## 📁 Estrutura

- `memory-loader.mjs`: Script principal para carregar, consolidar e formatar as memórias.
- `mcp-memory-server.mjs`: Servidor MCP aprimorado com busca e contexto inteligente.
- `memory-config.json`: Arquivo de configuração para o sistema de memórias, incluindo caminhos e instruções para o MCP (Model Context Protocol).
- `README.md`: Este arquivo, explicando o sistema.

## 🚀 Como Funciona

### 1. Carregamento Básico

```bash
# Gerar memória consolidada (JSON)
npm run memory:load

# Ver memória em formato texto
npm run memory:load:text
```

### 2. Servidor MCP

O servidor MCP (`mcp-memory-server.mjs`) fornece funcionalidades avançadas:

- **load_memory**: Carrega memória consolidada completa
- **search_entities**: Busca entidades por nome ou tipo
- **get_entity**: Obtém entidade específica com suas relações
- **get_context**: Obtém contexto completo do projeto
- **get_technical_details**: Obtém detalhes técnicos
- **search_by_tag**: Busca por tags

### 3. Integração com Cursor AI

O Cursor AI usa automaticamente o arquivo `.cursorrules` na raiz do projeto, que referencia os arquivos de memória.

## 📋 Comandos Úteis

Adicionados ao `package.json`:

- `npm run memory:load`: Executa o `memory-loader.mjs` para consolidar as memórias e salvar `consolidated-memory.json` em `docs/.memories/`.
- `npm run memory:load:text`: Executa o `memory-loader.mjs` e exibe a memória consolidada em formato de texto no console.

## 🎯 Benefícios

- **Contexto Completo**: Ferramentas de IA e desenvolvedores têm acesso a um panorama completo e atualizado do projeto.
- **Busca Inteligente**: Sistema de busca avançado para encontrar informações rapidamente.
- **Consistência**: Garante que todos trabalhem com a mesma base de conhecimento.
- **Eficiência**: Reduz o tempo de onboarding e a necessidade de buscar informações em múltiplos locais.
- **Qualidade**: Ajuda a manter a conformidade com padrões e decisões arquiteturais.

## 🔄 Atualização das Memórias

É crucial manter os arquivos em `docs/.memories/` atualizados. Isso pode ser feito:

- **Manualmente**: Editando os arquivos JSON diretamente.
- **Automaticamente**: Integrando `npm run memory:load` em hooks de Git (ex: `post-commit`) ou em scripts de build (`prebuild`).

## 💡 Dicas para o Cursor AI

- Sempre que precisar de contexto sobre o projeto, o Cursor consultará automaticamente essas memórias.
- Se você fizer uma mudança significativa na arquitetura ou nos detalhes técnicos, execute `npm run memory:load` para atualizar a memória consolidada.
- Use `npm run memory:load:text` para revisar o conteúdo da memória e garantir que está tudo correto.
- O servidor MCP fornece busca avançada para encontrar informações específicas rapidamente.

## 🔧 Configuração MCP

O servidor MCP está configurado em `C:\Users\raine\.cursor\mcp.json`:

```json
{
  "portfolio-frontend-memory": {
    "command": "node",
    "args": [
      "C:\\Desenvolvimento\\rainer-portfolio-frontend\\.cursor\\mcp-memory-server.mjs"
    ],
    "env": {
      "MEMORY_DIR": "C:\\Desenvolvimento\\rainer-portfolio-frontend\\docs\\.memories",
      "PROJECT_ROOT": "C:\\Desenvolvimento\\rainer-portfolio-frontend"
    }
  }
}
```

## 📊 Estrutura de Memórias

### Arquivos de Memória

1. **initial-memory.json** - Memória inicial do projeto
   - Entidades e relações
   - Contexto do projeto
   - Tags e metadados

2. **technical-details.json** - Detalhes técnicos
   - Componentes React (60+)
   - Hooks customizados (15+)
   - Páginas Next.js
   - Configurações e design tokens

3. **code-analysis.json** - Análise de código
   - Arquitetura e estrutura
   - Padrões e convenções
   - Relações entre componentes

4. **consolidated-memory.json** - Memória consolidada (gerada)
   - Combinação de todas as memórias
   - Estrutura otimizada para leitura
   - Resumo executivo

## 🎯 Funcionalidades do Servidor MCP

### Busca de Entidades

Permite buscar entidades por:

- Nome parcial ou completo
- Tipo de entidade
- Conteúdo das observações
- Tags associadas

### Contexto do Projeto

Fornece:

- Informações do projeto (nome, versão, framework)
- Estatísticas (número de entidades, relações, tags)
- Contexto completo do projeto
- Resumo executivo

### Detalhes Técnicos

Acesso a:

- Componentes e sua organização
- Hooks customizados
- Páginas e rotas
- Design tokens e configurações

---

**Desenvolvido por**: AI Assistant  
**Última atualização**: 20/01/2025  
**Status**: ✅ Ativo e Configurado  
**Versão**: 2.0.0 (Aprimorado com MCP Server)
