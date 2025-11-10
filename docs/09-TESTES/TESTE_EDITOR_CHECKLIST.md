# ✅ Checklist de Teste - Editor Persistência Visual ↔ JSON

## 🔍 Funcionalidades Implementadas

### 1. ✅ Persistência em localStorage
- ✅ Conteúdo salvo automaticamente quando em modo Visual
- ✅ JSON completo preservado quando em modo JSON
- ✅ Modo (Visual/JSON) preservado ao recarregar
- ✅ Limpeza automática após salvar post

### 2. ✅ Alternância Visual ↔ JSON
- ✅ Visual → JSON: Captura conteúdo do editor
- ✅ JSON → Visual: Aplica JSON editado manualmente
- ✅ Preserva JSON completo mesmo com nós não suportados
- ✅ Validação de JSON antes de aplicar

### 3. ✅ Preservação de Nós Não Suportados
- ✅ JSON original completo preservado no localStorage
- ✅ Nós não suportados (callout, video, accordion) mantidos no JSON
- ✅ Warning no console quando nós são removidos pelo Tiptap

## 📋 Teste Manual - Siga Estes Passos

### Teste 1: Alternância Básica
1. ✅ Abra: `http://localhost:3000/dashboard?mode=new`
2. ✅ No editor, clique em "JSON"
3. ✅ Cole o JSON de teste (do arquivo `test-post.json`)
4. ✅ Clique em "Visual"
   - ✅ Deve mostrar título, parágrafo, imagem, citação
5. ✅ Clique em "JSON" novamente
   - ✅ JSON completo deve estar preservado

### Teste 2: Edição no Modo JSON
1. ✅ No modo JSON, edite o título (ex: "Revolução" → "Evolução")
2. ✅ Clique em "Visual"
   - ✅ Edição deve aparecer no editor
3. ✅ Clique em "JSON" novamente
   - ✅ Edição deve estar preservada

### Teste 3: Edição no Modo Visual
1. ✅ No modo Visual, digite um novo parágrafo
2. ✅ Clique em "JSON"
   - ✅ Novo conteúdo deve aparecer no JSON
3. ✅ Clique em "Visual"
   - ✅ Conteúdo deve estar preservado

### Teste 4: Persistência após Recarregar
1. ✅ Edite o conteúdo (Visual ou JSON)
2. ✅ Recarregue a página (F5)
   - ✅ Conteúdo deve estar restaurado
   - ✅ Modo (Visual/JSON) deve estar preservado
3. ✅ Verifique localStorage (F12 → Application → Local Storage)
   - ✅ Deve haver: `editor-new-post-content`
   - ✅ Deve haver: `editor-new-post-json`
   - ✅ Deve haver: `editor-new-post-viewMode`

### Teste 5: Limpeza após Salvar
1. ✅ Edite o conteúdo
2. ✅ Salve o post
3. ✅ Verifique localStorage
   - ✅ Chaves devem ser removidas
4. ✅ Crie novo post
   - ✅ Editor deve estar vazio

## 🔧 Correções Aplicadas

### 1. Persistência Inteligente no `onUpdate`
```typescript
// Só salva no localStorage se estiver em modo Visual
// Preserva JSON completo se houver um salvo
if (viewModeRef.current === 'visual') {
  // Lógica de preservação do JSON completo
}
```

### 2. Ref para Acessar `viewMode` em Callbacks
```typescript
const viewModeRef = useRef<'visual' | 'json'>(viewMode);
useEffect(() => {
  viewModeRef.current = viewMode;
}, [viewMode]);
```

### 3. Preservação de JSON Completo
```typescript
// Salva JSON original completo no localStorage
localStorage.setItem(`${storageKey}-content`, JSON.stringify(parsed));
localStorage.setItem(`${storageKey}-json`, JSON.stringify(parsed, null, 2));
```

## ⚠️ Pontos de Atenção

1. **Nós Não Suportados**: Se o JSON contém nós como `callout`, `video`, `accordion`, eles serão removidos pelo Tiptap, mas o JSON original completo é preservado no localStorage.

2. **Race Conditions**: O código usa `isSwitchingModeRef` para evitar race conditions ao alternar modos.

3. **Limpeza**: localStorage é limpo apenas após salvar o post com sucesso.

## 🐛 Possíveis Problemas

- Se o conteúdo sumir ao alternar modos: Verificar console para erros de parsing JSON
- Se não persistir após recarregar: Verificar se localStorage está habilitado no navegador
- Se JSON completo for perdido: Verificar se há nós não suportados que estão sendo removidos

## ✅ Status dos Testes

- [ ] Teste 1: Alternância Básica
- [ ] Teste 2: Edição no Modo JSON
- [ ] Teste 3: Edição no Modo Visual
- [ ] Teste 4: Persistência após Recarregar
- [ ] Teste 5: Limpeza após Salvar

## 📝 Notas

- O navegador foi aberto em: `http://localhost:3000/dashboard?mode=new`
- JSON de teste disponível em: `test-post.json`
- Script de teste em: `scripts/teste-persistencia-real.js`

