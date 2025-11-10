# 🧪 Guia de Teste - Preview de Imagem no Preview em Tempo Real

## 📋 Teste Manual Passo a Passo

### 1. Acessar Dashboard

- Abra: http://localhost:3000/dashboard
- Faça login se necessário

### 2. Criar Nova Postagem

- Clique no botão **"Novo Post"** ou **"+"**
- Aguarde o formulário aparecer

### 3. Verificar Layout Inicial

✅ **Deve aparecer:**

- Formulário de edição à esquerda
- Preview em Tempo Real à direita
- Campo "Imagem de Capa" com botão "Upload"

❌ **NÃO deve aparecer:**

- Preview de imagem abaixo do campo de upload (foi removido)

### 4. Selecionar Imagem

- Clique no botão **"Upload"** ao lado de "Imagem de Capa"
- Selecione uma imagem (JPG, PNG, GIF ou WebP)
- **Aguarde a seleção**

### 5. Verificar Preview em Tempo Real

✅ **No Preview em Tempo Real (lado direito):**

- A imagem deve aparecer no card do post
- Deve aparecer um indicador azul abaixo do card:
  - 📸 "Preview local - Imagem será enviada ao salvar"

❌ **No formulário (lado esquerdo):**

- NÃO deve aparecer preview abaixo do campo de upload

### 6. Testar Preview Visual

- Digite um título e resumo
- Verifique se o Preview em Tempo Real atualiza
- Verifique se a imagem aparece no card do preview

### 7. Salvar Postagem

- Clique no botão **"Salvar"**
- **Observar sequência:**
  1. Toast: "Fazendo upload da imagem..."
  2. Toast: "✅ Imagem enviada com sucesso!"
  3. Toast: "Post criado com sucesso!"
  4. O indicador azul desaparece
  5. A imagem no preview agora usa URL do Cloudinary

### 8. Verificar Resultado Final

✅ **Deve acontecer:**

- Post é salvo com sucesso
- Preview mostra URL do Cloudinary
- Nenhum indicador azul aparece
- Estados são limpos

## 🔍 Checklist de Verificação

### Antes de Selecionar Imagem

- [ ] Campo de upload está visível
- [ ] Botão "Upload" está funcionando
- [ ] Nenhuma preview aparece abaixo do campo

### Após Selecionar Imagem

- [ ] Preview aparece no "Preview em Tempo Real"
- [ ] Indicador azul aparece informando upload pendente
- [ ] Toast informativo aparece
- [ ] Nenhuma preview abaixo do campo de upload

### Ao Salvar

- [ ] Upload acontece primeiro
- [ ] Toast de progresso aparece
- [ ] Toast de sucesso aparece
- [ ] Post é salvo após upload bem-sucedido
- [ ] Indicador azul desaparece
- [ ] Preview usa URL do Cloudinary

## 🐛 Problemas Comuns

### Problema: Preview não aparece no Preview em Tempo Real

**Solução:**

1. Abra DevTools (F12)
2. Verifique Console para erros
3. Verifique se `coverImagePreview` está sendo setado

### Problema: Indicador azul não aparece

**Solução:**

1. Verifique se `coverImagePreview` está definido
2. Verifique se o componente está renderizando condicionalmente

### Problema: Preview ainda aparece abaixo do campo

**Solução:**

1. Verifique se o código foi atualizado
2. Recarregue a página (Ctrl+F5)
3. Limpe cache do navegador

## ✅ Resultado Esperado

Após o teste bem-sucedido:

1. ✅ Preview aparece apenas no Preview em Tempo Real
2. ✅ Formulário fica limpo (sem preview abaixo do campo)
3. ✅ Indicador azul informa sobre upload pendente
4. ✅ Upload acontece apenas ao salvar
5. ✅ Preview atualiza após upload bem-sucedido

---

**Última atualização:** Agora
**Versão:** 1.0.0
