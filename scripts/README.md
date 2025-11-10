# 📚 Índice de Scripts - Guia Completo

> **Todos os scripts organizados em pastas descritivas**

## 🎯 Estrutura Organizada

### 📂 Todos na Pasta scripts/

- **Pastas numeradas (00 a 11)** - Scripts organizados por ordem lógica

Cada pasta contém:

- ✅ **README.txt** - Documentação completa do script
- ✅ **script.bat** - Atalho Windows (duplo clique)
- ✅ **script.ps1** - PowerShell (Windows avançado)
- ✅ **script.sh** - Bash (Linux/Mac/WSL)

---

## Scripts Disponíveis

### 00. Iniciar Desenvolvimento

**Pasta:** `00-iniciar-desenvolvimento/`

Inicia o ambiente de desenvolvimento Next.js

- Next.js dev server com Turbopack
- Verificação de dependências
- Limpeza automática de cache
- Interface visual colorida

```bash
# Windows
.\00-iniciar-desenvolvimento\iniciar-dev.bat

# PowerShell
.\00-iniciar-desenvolvimento\iniciar-dev.ps1

# Linux/Mac
./00-iniciar-desenvolvimento/iniciar-dev.sh
```

---

### 01. Verificar Ambiente

**Pasta:** `01-verificar-ambiente/`

Diagnóstico completo do ambiente

- Verifica Node.js, npm
- Verifica portas disponíveis
- Verifica arquivos e configurações
- Status do servidor

```bash
# Windows
.\01-verificar-ambiente\verificar-ambiente.bat

# PowerShell
.\01-verificar-ambiente\verificar-ambiente.ps1

# Linux/Mac
./01-verificar-ambiente/verificar-ambiente.sh
```

---

### 02. Build e Produção

**Pasta:** `02-build-producao/`

Scripts para build e análise de produção

- Build otimizado
- Análise de bundle
- Verificação de tamanho
- Otimizações

```bash
# Windows
.\02-build-producao\build.bat

# PowerShell
.\02-build-producao\build.ps1 [--analyze|--production]

# Linux/Mac
./02-build-producao/build.sh
```

---

### 03. Testes

**Pasta:** `03-testes/`

Execução de testes organizados

- Testes unitários
- Testes de integração
- Testes E2E (Playwright)
- Coverage

```bash
# Windows
.\03-testes\testar.bat

# PowerShell
.\03-testes\testar.ps1 [--unit|--integration|--e2e|--coverage]

# Linux/Mac
./03-testes/testar.sh
```

---

### 04. Limpar Ambiente

**Pasta:** `04-limpar-ambiente/`

Limpeza de cache e arquivos temporários

- Limpar .next
- Limpar node_modules/.cache
- Limpar coverage
- Limpeza completa

```bash
# Windows
.\04-limpar-ambiente\limpar.bat

# PowerShell
.\04-limpar-ambiente\limpar.ps1 [--cache|--all]

# Linux/Mac
./04-limpar-ambiente/limpar.sh
```

---

### 05. Lint e Formatação

**Pasta:** `05-lint-formatacao/`

Análise e correção de código

- ESLint
- Prettier
- TypeScript check
- Correção automática

```bash
# Windows
.\05-lint-formatacao\lint.bat

# PowerShell
.\05-lint-formatacao\lint.ps1 [--fix|--check]

# Linux/Mac
./05-lint-formatacao/lint.sh
```

---

### 06. Análise e Debug

**Pasta:** `06-analise-debug/`

Ferramentas de análise e debug

- Analisar logs do console
- Verificar erros Turbopack
- Performance monitor
- Bundle analyzer

```bash
# Windows
.\06-analise-debug\analisar-logs.bat

# PowerShell
.\06-analise-debug\analisar-logs.ps1

# Linux/Mac
./06-analise-debug/analisar-logs.sh
```

---

### 07. Utilitários

**Pasta:** `07-utilitarios/`

Scripts utilitários diversos

- Criar usuário
- Setup memória
- Configurações AWS
- Helpers diversos

```bash
# Windows
.\07-utilitarios\criar-usuario.bat

# PowerShell
.\07-utilitarios\criar-usuario.ps1

# Linux/Mac
./07-utilitarios/criar-usuario.sh
```

---

### 08. Memória do Projeto

**Pasta:** `08-memoria/`

Gerenciamento de memórias do projeto

- Atualizar memórias
- Ler memórias
- Carregar memórias
- Testar memórias

```bash
# TypeScript scripts
npm run memory:update
npm run memory:read
npm run memory:read:initial
npm run memory:read:technical
npm run memory:read:code
```

---

## Guia Rápido de Uso

### Primeira Vez no Projeto?

**Opção Simples (Recomendado):**

```bash
# Windows
cd scripts
.\00-iniciar-desenvolvimento\iniciar-dev.bat

# PowerShell
cd scripts
.\00-iniciar-desenvolvimento\iniciar-dev.ps1

# Linux/Mac
cd scripts
./00-iniciar-desenvolvimento/iniciar-dev.sh
```

**Opção Manual:**

1. **01-verificar-ambiente/** - Verificar se tudo está OK
2. **00-iniciar-desenvolvimento/** - Iniciar servidor dev
3. **05-lint-formatacao/** - Verificar código

### Desenvolvimento Diário?

```bash
cd scripts  # Entre na pasta scripts/
```

1. **00-iniciar-desenvolvimento/** - Iniciar dev server
2. **06-analise-debug/** - Verificar logs/erros
3. **03-testes/** - Executar testes

### Antes de Commit?

1. **05-lint-formatacao/** - Lint e format
2. **03-testes/** - Executar testes
3. **02-build-producao/** - Build de produção

### Problemas?

1. **01-verificar-ambiente/** - Diagnosticar
2. **04-limpar-ambiente/** - Limpar cache
3. **06-analise-debug/** - Analisar logs

---

## Dicas Úteis

**Importante:** Todos os comandos devem ser executados dentro da pasta `scripts/`

```bash
# Entre na pasta scripts primeiro
cd scripts

# Iniciar desenvolvimento
.\00-iniciar-desenvolvimento\iniciar-dev.bat

# Verificar ambiente
.\01-verificar-ambiente\verificar-ambiente.bat

# Testar
.\03-testes\testar.bat

# Limpar
.\04-limpar-ambiente\limpar.bat
```

---

## Formato dos Scripts

Cada pasta contém **4 arquivos**:

### README.txt

- Documentação completa
- Exemplos de uso
- Troubleshooting
- Casos de uso

### script.bat

- Atalho Windows
- Duplo clique para executar
- Mais fácil para iniciantes

### script.ps1

- PowerShell (Windows)
- Aceita parâmetros
- Mais flexível e poderoso

### script.sh

- Bash (Linux/Mac/WSL)
- Compatível com ambientes Unix
- `chmod +x` antes de usar

---

## Requisitos

### Ferramentas Necessárias:

- Node.js v18+ e npm
- Git

### Opcional (mas recomendado):

- PowerShell 7+ (Windows)
- jq (Linux/Mac - para formatação JSON)

---

## Ajuda e Suporte

Cada pasta tem **README.txt completo** com:

- Descrição detalhada
- Como usar
- Exemplos práticos
- Troubleshooting
- Links relacionados

**Para ver documentação de qualquer script:**

1. Navegue até a pasta
2. Abra README.txt
3. Leia as instruções

---

## Estrutura do Projeto:

```
rainer-portfolio-frontend/
  │
  └─ scripts/                        ← TODOS OS SCRIPTS AQUI
      ├─ README.md                   ← Este arquivo
      │
      ├─ 00-iniciar-desenvolvimento/
      ├─ 01-verificar-ambiente/
      ├─ 02-build-producao/
      ├─ 03-testes/
      ├─ 04-limpar-ambiente/
      ├─ 05-lint-formatacao/
      ├─ 06-analise-debug/
      ├─ 07-utilitarios/
      ├─ 08-memoria/                  ← Scripts TypeScript
      │   ├─ update-memory.ts
      │   ├─ read-memory.ts
      │   ├─ memory-loader.ts
      │   └─ test-memory.ts
      │
      └─ aws/                        ← Scripts AWS (mantido)
          └─ configurar-github-oauth.ps1
```

**🚀 Para começar rapidamente:** `cd scripts` → Execute `00-iniciar-desenvolvimento/`  
**🔧 Para gerenciar passo a passo:** Use os scripts de `00` a `08` em ordem

---

<div align="center">

**Criado com ❤️ para facilitar o desenvolvimento!** 🚀

_Última atualização: Janeiro 2025_

</div>
