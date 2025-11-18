# 📝 Sistema de Atualização Automática de Versão e Memórias

Este diretório contém scripts para gerenciar automaticamente a versão do projeto e sincronizar com as memórias.

## 🚀 Scripts Disponíveis

### `update-version.ts`
Script principal que detecta mudanças de versão e atualiza automaticamente todas as memórias.

**Funcionalidades:**
- ✅ Detecta mudanças de versão no `package.json`
- ✅ Atualiza versão em todos os arquivos de memória
- ✅ Mantém cache da última versão processada
- ✅ Atualiza `lastModified` em todas as memórias
- ✅ Executa atualização completa de memórias após mudança de versão

**Uso:**
```bash
pnpm run version:update
```

### `update-memory.ts`
Script para atualizar informações gerais das memórias (sem foco em versão).

**Uso:**
```bash
pnpm run memory:update
```

### `memory-loader.ts`
Carregador de memórias para uso programático.

## 📋 Comandos NPM

```bash
# Atualizar versão e memórias automaticamente
pnpm run version:update

# Atualizar apenas memórias (sem verificar versão)
pnpm run memory:update

# Sincronizar tudo (versão + memórias completas)
pnpm run memory:sync
```

## 🔄 Como Funciona

### Detecção Automática de Versão

1. O script lê a versão atual do `package.json`
2. Compara com a versão cacheada em `.version-cache.json`
3. Se a versão mudou, atualiza todas as memórias
4. Salva a nova versão no cache

### Arquivos Atualizados

Quando a versão muda, os seguintes arquivos são atualizados:

- ✅ `docs/.memories/initial-memory.json`
- ✅ `docs/.memories/technical-details.json`
- ✅ `docs/.memories/code-analysis.json`
- ✅ `docs/.memories/consolidated-memory.json`

### Campos Atualizados

- `version` em todas as referências
- `lastModified` com timestamp atual
- `content` com nova versão
- `projectVersion` no context
- Observações que mencionam versão

## 🎯 Fluxo de Trabalho Recomendado

### Ao Atualizar Versão Manualmente

1. **Atualizar `package.json`:**
   ```json
   {
     "version": "2.1.0"
   }
   ```

2. **Executar atualização automática:**
   ```bash
   pnpm run version:update
   ```

3. **Verificar mudanças:**
   ```bash
   git diff docs/.memories/
   ```

### Integração com Git Hooks (Opcional)

Para atualização automática em commits, adicione ao `.husky/pre-commit`:

```bash
#!/bin/sh
# Verificar se package.json mudou
if git diff --cached --name-only | grep -q package.json; then
  pnpm run version:update
  git add docs/.memories/
fi
```

## 📊 Cache de Versão

O arquivo `.version-cache.json` é criado automaticamente em `docs/.memories/`:

```json
{
  "lastVersion": "2.1.0",
  "lastUpdated": "2025-01-28T12:00:00.000Z"
}
```

Este cache permite:
- ✅ Detectar mudanças de versão
- ✅ Evitar atualizações desnecessárias
- ✅ Rastrear histórico de versões

## 🔍 Verificação Manual

Para verificar a versão atual em todas as memórias:

```bash
# Buscar todas as referências de versão
grep -r "2.1.0" docs/.memories/
```

## ⚠️ Notas Importantes

1. **Sempre execute `version:update` após mudar a versão no `package.json`**
2. **O cache é criado automaticamente na primeira execução**
3. **Se o cache for removido, o script detectará como primeira execução**
4. **O script é idempotente - pode ser executado múltiplas vezes sem problemas**

## 🐛 Troubleshooting

### Versão não está sendo atualizada

1. Verifique se o `package.json` tem a versão correta
2. Remova o cache: `rm docs/.memories/.version-cache.json`
3. Execute novamente: `pnpm run version:update`

### Erro ao importar módulos

Certifique-se de que está usando Node.js 20+ e que o projeto está configurado como ES module (`"type": "module"` no `package.json`).

## 📚 Arquivos Relacionados

- `package.json` - Versão do projeto
- `docs/.memories/` - Arquivos de memória
- `.version-cache.json` - Cache de versão (gerado automaticamente)

---

**Última atualização:** 2025-01-28  
**Versão do sistema:** 1.0.0

