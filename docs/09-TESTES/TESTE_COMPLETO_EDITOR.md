# 🧪 TESTE COMPLETO DO EDITOR - GUIAS DE TESTE

## 📋 CHECKLIST DE FUNCIONALIDADES

### ✅ 1. MODOS DE VISUALIZAÇÃO (Visual, JSON, Preview)

- [ ] **Botão Visual** aparece e está funcionando
- [ ] **Botão JSON** aparece e está funcionando  
- [ ] **Botão Preview** aparece e está funcionando
- [ ] Cada botão muda a cor quando ativo (Visual=cyan, JSON=purple, Preview=green)
- [ ] Ao clicar em cada modo, a área de conteúdo muda corretamente

### ✅ 2. MODO VISUAL (WYSIWYG)

- [ ] Editor Tiptap aparece e é editável
- [ ] Posso digitar texto normalmente
- [ ] Botões de formatação funcionam:
  - [ ] Negrito (Ctrl+B)
  - [ ] Itálico (Ctrl+I)
  - [ ] Tachado
  - [ ] Código inline
- [ ] Títulos funcionam (H1, H2, H3)
- [ ] Listas funcionam (ordenadas e não-ordenadas)
- [ ] Citação funciona
- [ ] Bloco de código funciona
- [ ] Linha horizontal funciona
- [ ] Inserir link funciona
- [ ] Inserir imagem funciona (upload do PC)
- [ ] Tabelas funcionam (inserir, adicionar/remover linhas/colunas)
- [ ] Desfazer/Refazer funcionam

### ✅ 3. MODO JSON

- [ ] Textarea grande aparece
- [ ] Posso editar JSON diretamente
- [ ] Validação de JSON funciona (mostra erro se inválido)
- [ ] Botão "Copiar JSON" funciona
- [ ] Indicador de JSON válido/inválido aparece

### ✅ 4. MODO PREVIEW

- [ ] Preview em tempo real aparece
- [ ] Conteúdo renderizado como HTML
- [ ] Estilos do blog aplicados corretamente
- [ ] Imagens aparecem no preview
- [ ] Formatação aparece corretamente

### ✅ 5. PERSISTÊNCIA NO LOCALSTORAGE

- [ ] Conteúdo persiste ao alternar entre Visual e JSON
- [ ] Conteúdo persiste ao alternar entre Visual e Preview
- [ ] Conteúdo persiste ao alternar entre JSON e Preview
- [ ] Modo atual (Visual/JSON/Preview) persiste após recarregar página
- [ ] Conteúdo completo persiste após recarregar página
- [ ] JSON completo (com nós não suportados) é preservado

### ✅ 6. ALTERNÂNCIA ENTRE MODOS

#### Visual → JSON
- [ ] Ao clicar em JSON, o conteúdo do Visual aparece no JSON
- [ ] JSON está formatado corretamente
- [ ] Posso editar o JSON

#### JSON → Visual
- [ ] Ao clicar em Visual, o JSON editado é aplicado
- [ ] Conteúdo aparece renderizado no editor
- [ ] Se JSON inválido, mostra erro e não muda de modo

#### Visual → Preview
- [ ] Ao clicar em Preview, o conteúdo aparece renderizado
- [ ] Preview atualiza em tempo real

#### Preview → Visual
- [ ] Ao clicar em Visual, volta para o editor
- [ ] Conteúdo permanece intacto

#### JSON → Preview
- [ ] Ao clicar em Preview, primeiro aplica o JSON ao editor
- [ ] Depois mostra o preview renderizado
- [ ] Se JSON inválido, mostra erro

#### Preview → JSON
- [ ] Ao clicar em JSON, mostra o JSON do conteúdo atual
- [ ] JSON está completo e formatado

### ✅ 7. EDIÇÃO DE CONTEÚDO

#### Editar no Visual
- [ ] Digitar texto novo funciona
- [ ] Formatação aplicada aparece
- [ ] Ao mudar para JSON, mudanças aparecem no JSON
- [ ] Ao mudar para Preview, mudanças aparecem no preview

#### Editar no JSON
- [ ] Posso editar o JSON manualmente
- [ ] Ao mudar para Visual, edições são aplicadas
- [ ] Ao mudar para Preview, edições aparecem renderizadas

### ✅ 8. COLAR JSON COMPLETO

- [ ] Posso colar JSON completo no modo JSON
- [ ] JSON é aceito e validado
- [ ] Ao mudar para Visual, conteúdo renderiza corretamente
- [ ] Imagens, tabelas, listas aparecem corretamente
- [ ] Nós não suportados são preservados no localStorage

### ✅ 9. RECARREGAR PÁGINA

- [ ] Após recarregar, o modo salvo é restaurado (Visual/JSON/Preview)
- [ ] Conteúdo completo é restaurado
- [ ] Posso continuar editando normalmente após recarregar

### ✅ 10. EDIÇÃO DE IMAGENS

- [ ] Posso inserir imagem via upload
- [ ] Ao clicar na imagem, abre painel de edição
- [ ] Posso editar alt, title, width, align
- [ ] Mudanças são salvas corretamente
- [ ] Imagem aparece no preview

### ✅ 11. TESTE DE STRESS

- [ ] Alternar rapidamente entre os 3 modos (10x) não perde conteúdo
- [ ] Editar e alternar modos múltiplas vezes funciona
- [ ] Recarregar e continuar editando funciona

## 🔍 VERIFICAÇÕES NO CONSOLE (F12)

- [ ] Não há erros no console
- [ ] Warnings sobre nós não suportados são esperados (normal)
- [ ] Logs de persistência aparecem (se habilitados)

## 📊 VERIFICAÇÕES NO LOCALSTORAGE (F12 → Application → Local Storage)

- [ ] `editor-new-post-content` existe e contém JSON
- [ ] `editor-new-post-json` existe e contém JSON formatado
- [ ] `editor-new-post-viewMode` existe e contém 'visual', 'json' ou 'preview'
- [ ] Valores são atualizados quando edito
- [ ] Valores persistem após recarregar

## 🎯 CENÁRIOS DE TESTE ESPECÍFICOS

### CENÁRIO 1: Criar novo post do zero
1. Abrir dashboard em modo novo post
2. Digitar texto no Visual
3. Alternar para Preview - verificar se aparece
4. Alternar para JSON - verificar se JSON aparece
5. Recarregar página - verificar se tudo persiste

### CENÁRIO 2: Colar JSON completo
1. Ir para modo JSON
2. Colar JSON completo de `test-post.json`
3. Mudar para Visual - verificar renderização
4. Mudar para Preview - verificar preview
5. Recarregar página - verificar persistência

### CENÁRIO 3: Editar JSON manualmente
1. Ir para modo JSON
2. Editar título no JSON (ex: "Revolução" → "Evolução")
3. Mudar para Visual - verificar se mudança aparece
4. Mudar para Preview - verificar se mudança aparece

### CENÁRIO 4: Editar no Visual
1. Estar em modo Visual
2. Digitar novo parágrafo
3. Mudar para JSON - verificar se parágrafo aparece no JSON
4. Mudar para Preview - verificar se parágrafo aparece

### CENÁRIO 5: Upload de imagem
1. Estar em modo Visual
2. Clicar em "Inserir Imagem"
3. Selecionar imagem do PC
4. Verificar se imagem aparece no editor
5. Clicar na imagem - verificar painel de edição
6. Editar atributos - verificar se salva
7. Mudar para Preview - verificar se imagem aparece
8. Mudar para JSON - verificar se JSON da imagem está correto

### CENÁRIO 6: Alternância múltipla
1. Estar em modo Visual com conteúdo
2. Alternar Visual → JSON → Preview → Visual (5 vezes)
3. Verificar se conteúdo permanece intacto
4. Recarregar página
5. Verificar se modo e conteúdo foram preservados

## ⚠️ PROBLEMAS CONHECIDOS ESPERADOS

- Warnings sobre nós não suportados (callout, video, accordion) são **NORMAIS**
- Esses nós são preservados no localStorage mesmo que não apareçam no Visual
- O JSON completo sempre contém esses nós

## 📝 NOTAS DE TESTE

Preencha aqui problemas encontrados:
- 
- 
- 

## ✅ RESULTADO FINAL

- [ ] Todas as funcionalidades testadas
- [ ] Todos os cenários passaram
- [ ] Não há erros críticos
- [ ] Persistência funciona corretamente
- [ ] Três modos funcionam perfeitamente

---

**Data do Teste:** _______________  
**Testador:** _______________  
**Resultado:** [ ] PASS | [ ] FAIL  
**Observações:** _______________

