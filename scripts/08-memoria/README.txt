╔═══════════════════════════════════════════════════════════════════════════╗
║              📚 MEMÓRIA DO PROJETO - SCRIPTS TYPESCRIPT                  ║
╚═══════════════════════════════════════════════════════════════════════════╝

📋 DESCRIÇÃO
═══════════════════════════════════════════════════════════════════════════

Scripts TypeScript para gerenciamento de memórias do projeto.
As memórias são arquivos JSON que contêm contexto do projeto para IA.

✅ Atualizar memórias do projeto
✅ Ler memórias (all, initial, technical, code)
✅ Carregar memórias para MCP
✅ Testar memórias

🚀 COMO USAR
═══════════════════════════════════════════════════════════════════════════

Via npm scripts (recomendado):
   npm run memory:update
   npm run memory:read
   npm run memory:read:initial
   npm run memory:read:technical
   npm run memory:read:code

Via tsx diretamente:
   tsx scripts/08-memoria/update-memory.ts
   tsx scripts/08-memoria/read-memory.ts [tipo]

📊 SCRIPTS DISPONÍVEIS
═══════════════════════════════════════════════════════════════════════════

update-memory.ts:
  Atualiza todas as memórias do projeto com informações atuais.
  - Analisa estrutura do projeto
  - Gera initial-memory.json
  - Gera technical-details.json
  - Gera code-analysis.json

read-memory.ts:
  Lê e exibe memórias do projeto.
  Tipos: all, initial, technical, code

memory-loader.ts:
  Carrega memórias para sistemas MCP e ferramentas de IA.

test-memory.ts:
  Testa se as memórias estão corretas e acessíveis.

setup-memory-reader.js:
  Setup inicial do sistema de memórias.

════════════════════════════════════════════════════════════════════════════

Criado com ❤️ para facilitar o desenvolvimento! 🚀

