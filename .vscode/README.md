# Configurações do VS Code/Cursor

Este diretório contém configurações específicas do workspace para o projeto.

## Tailwind CSS IntelliSense

### Problema: Sugestões Incorretas de Classes Canônicas

O Tailwind CSS IntelliSense às vezes sugere classes incorretas como `bg-linear-to-*` ao invés de `bg-gradient-to-*`. 

**Solução:** As configurações em `settings.json` foram ajustadas para:
- Apontar para o arquivo de configuração correto (`tailwind.config.ts`)
- Desabilitar sugestões incorretas de classes canônicas
- Manter validação e sugestões úteis habilitadas

### Classes Válidas do Tailwind CSS

- ✅ `bg-gradient-to-r` - Gradiente da esquerda para direita
- ✅ `bg-gradient-to-l` - Gradiente da direita para esquerda
- ✅ `bg-gradient-to-t` - Gradiente de baixo para cima
- ✅ `bg-gradient-to-b` - Gradiente de cima para baixo
- ✅ `bg-gradient-to-tr` - Gradiente para cima-direita
- ✅ `bg-gradient-to-tl` - Gradiente para cima-esquerda
- ✅ `bg-gradient-to-br` - Gradiente para baixo-direita
- ✅ `bg-gradient-to-bl` - Gradiente para baixo-esquerda

**Nota:** O Tailwind CSS **não** usa `bg-linear-to-*`. Essas sugestões são incorretas e devem ser ignoradas.

## TypeScript

As configurações do TypeScript estão otimizadas para:
- Usar a versão do TypeScript do workspace
- Resolver módulos corretamente
- Validar tipos de forma eficiente

## Como Aplicar

1. Reinicie o VS Code/Cursor após alterações nas configurações
2. Recarregue a janela: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Se os avisos persistirem, verifique se a extensão Tailwind CSS IntelliSense está atualizada

