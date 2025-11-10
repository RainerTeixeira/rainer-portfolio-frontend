# 🧠 Guia: Sistema de Memórias do Projeto

## 📋 Visão Geral

O sistema de memórias mantém informações estruturadas sobre o projeto em `docs/.memories/` para uso por ferramentas de IA, MCP e desenvolvimento.

## 🎯 Objetivo

- **Contexto persistente**: Informações do projeto sempre disponíveis
- **Atualização automática**: Scripts que atualizam memórias com dados atuais
- **Integração**: Fácil integração com ferramentas MCP e IA

## 📁 Estrutura

```
docs/.memories/
├── initial-memory.json      # Conhecimento geral do projeto
├── technical-details.json   # Detalhes técnicos (componentes, páginas)
├── code-analysis.json       # Análise de código e arquitetura
└── README.md                # Documentação das memórias
```

## 🔄 Comandos Disponíveis

### Atualizar Memórias

```bash
# Via NPM (recomendado)
npm run memory:update

# Direto
tsx scripts/08-memoria/update-memory.ts
```

**O que atualiza:**
- Versão do projeto (package.json)
- Estrutura de pastas
- Informações de componentes
- Scripts disponíveis
- Organização do projeto

### Ler Memórias

```bash
# Todas as memórias
npm run memory:read

# Memória específica
npm run memory:read:initial      # Conhecimento geral
npm run memory:read:technical    # Detalhes técnicos
npm run memory:read:code         # Análise de código
```

## 📝 Quando Atualizar

Atualize as memórias quando:

1. **Versão do projeto muda** - `package.json` version
2. **Estrutura de pastas muda** - Nova organização
3. **Novos componentes são adicionados** - Novos recursos
4. **Dependências principais mudam** - Framework, bibliotecas, etc.
5. **Métricas de qualidade mudam** - Cobertura de testes, etc.
6. **Scripts são reorganizados** - Estrutura de scripts

## 🤖 Integração com Ferramentas

### Cursor IDE

O arquivo `.cursorrules` na raiz do projeto instrui o Cursor a:
- Ler memórias automaticamente no início
- Usar informações das memórias como contexto
- Atualizar memórias após mudanças significativas

### MCP (Model Context Protocol)

Para configurar MCP para ler memórias:

1. **Configuração no MCP Server:**
   ```json
   {
     "memoryPath": "docs/.memories",
     "autoLoad": true,
     "updateOnChange": true
   }
   ```

2. **Script de inicialização:**
   ```typescript
   import { getMemories } from './scripts/08-memoria/read-memory';
   
   // Carregar memórias no início
   const memories = getMemories();
   ```

### Outras Ferramentas

Para outras ferramentas, use os scripts exportados:

```typescript
// Em qualquer script Node.js/TypeScript
import { getMemories, getMemory } from './scripts/08-memoria/read-memory';

// Obter todas as memórias
const allMemories = getMemories();

// Obter memória específica
const technical = getMemory('technical');
```

## 📊 Conteúdo das Memórias

### initial-memory.json

Contém:
- Descrição do projeto
- Arquitetura (Next.js, React, etc.)
- Estrutura de componentes
- PWA e acessibilidade
- Qualidade de testes
- Documentação

### technical-details.json

Contém:
- **Componentes**: Lista de 60+ componentes
- **Páginas**: Rotas e páginas disponíveis
- **Hooks**: Custom hooks implementados
- **Scripts**: Scripts disponíveis organizados
- **Configuração**: Variáveis de ambiente
- **Organização**: Estrutura de pastas
- **Qualidade**: Métricas de performance e acessibilidade

### code-analysis.json

Contém:
- **Entidades**: Componentes do sistema
- **Relacionamentos**: Como componentes se relacionam
- **Padrões**: Padrões arquiteturais usados
- **Observações**: Notas sobre cada componente

## 🔧 Personalização

### Adicionar Informações Customizadas

Edite os scripts em `scripts/08-memoria/update-memory.ts` para adicionar:
- Novas métricas
- Informações customizadas
- Dados de outras fontes

### Formato Personalizado

Os arquivos JSON seguem estrutura flexível. Você pode:
- Adicionar novos campos
- Criar novas entidades
- Adicionar novos relacionamentos

## 📌 Exemplos de Uso

### Exemplo 1: Antes de Começar Tarefa

```bash
# 1. Ler contexto do projeto
npm run memory:read:initial

# 2. Ver detalhes técnicos relevantes
npm run memory:read:technical

# 3. Entender arquitetura
npm run memory:read:code
```

### Exemplo 2: Após Mudanças

```bash
# 1. Fazer mudanças no projeto
# (adicionar componente, mudar estrutura, etc.)

# 2. Atualizar memórias
npm run memory:update

# 3. Verificar atualização
npm run memory:read
```

### Exemplo 3: Integração MCP

```typescript
// No início do servidor MCP
import { getMemories } from './scripts/08-memoria/read-memory';

const memories = getMemories();

// Usar memórias como contexto
mcp.setContext({
  project: memories.initial,
  technical: memories.technical,
  code: memories.code,
});
```

## 🚀 Boas Práticas

1. **Atualize regularmente**: Execute `memory:update` após mudanças significativas
2. **Use como referência**: Consulte memórias antes de tomar decisões arquiteturais
3. **Mantenha sincronizado**: Não edite manualmente sem atualizar via script
4. **Documente mudanças**: Adicione comentários quando necessário

## 🔗 Links Relacionados

- [README das Memórias](../.memories/README.md)
- [Setup do Sistema](../.memories/SETUP.md)
- [Guia de Navegação](../01-INICIO/README.md)

---

**Criado em:** 04 de Novembro de 2025  
**Última atualização:** 04 de Novembro de 2025

