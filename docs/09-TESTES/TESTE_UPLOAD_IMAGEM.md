# 🧪 Guia de Teste - Upload de Imagem em Postagem

## 📋 Pré-requisitos

1. ✅ Servidor frontend rodando: `npm run dev` (http://localhost:3000)
2. ✅ Servidor backend rodando: `npm run dev` (http://localhost:4000)
3. ✅ Credenciais de login válidas no dashboard
4. ✅ Imagem de teste: `public/imagem_Postagem_blog_test.jpg`

## 🧪 Teste Manual Passo a Passo

### 1. Acessar Dashboard

- Abra: http://localhost:3000/dashboard
- Faça login se necessário

### 2. Criar Nova Postagem

- Clique no botão **"Novo Post"** ou **"+"**
- Aguarde o formulário de criação aparecer

### 3. Testar Upload de Imagem de Capa

#### Passo 3.1: Preencher campos básicos

```
Título: "Teste de Postagem com Imagem"
Resumo: "Testando upload de imagem"
```

#### Passo 3.2: Upload de imagem

- Localize o campo **"Imagem de Capa"**
- Você verá um input de texto e um botão **"Upload"** ao lado
- Clique no botão **"Upload"**
- Selecione uma imagem (JPG, PNG, GIF ou WebP)
- **Aguarde o upload** (você verá uma notificação "Fazendo upload...")

#### Passo 3.3: Verificar resultado

✅ **Sucesso esperado:**

- Notificação verde: "✅ Imagem de capa enviada com sucesso!"
- Preview da imagem aparece abaixo do campo
- URL do Cloudinary aparece no input
- Console do navegador mostra: "✅ Imagem de capa enviada para Cloudinary: [URL]"

❌ **Erros possíveis:**

- "❌ Imagem muito grande. Máximo 5MB." → Reduza o tamanho da imagem
- "❌ Apenas imagens são permitidas." → Use JPG, PNG, GIF ou WebP
- "❌ Erro ao fazer upload: ..." → Verifique:
  - Backend está rodando?
  - Variável CLOUDINARY_URL está configurada?
  - Há erros no console do navegador?

### 4. Testar Upload de Imagem no Editor

#### Passo 4.1: Inserir imagem no conteúdo

- No editor Tiptap, localize o botão **"Inserir Imagem"** (ícone de imagem na toolbar)
- Clique no botão
- Selecione uma imagem

#### Passo 4.2: Verificar upload

✅ **Sucesso esperado:**

- Imagem aparece no editor
- URL é do Cloudinary (res.cloudinary.com)
- Console mostra: "✅ Imagem enviada para Cloudinary: [URL]"

❌ **Erros possíveis:**

- Mesmos erros do passo 3.3
- Imagem não aparece → Verifique console para erros

### 5. Verificar Console do Navegador

Abra o DevTools (F12) e verifique:

✅ **Logs esperados:**

```
✅ Imagem de capa enviada para Cloudinary: https://res.cloudinary.com/...
✅ Imagem enviada para Cloudinary: https://res.cloudinary.com/...
```

❌ **Erros a verificar:**

```javascript
// Se aparecer algum destes erros, anote:
- TypeError: Cannot read property...
- NetworkError: Failed to fetch
- 404 Not Found (endpoint /cloudinary/upload/...)
- 500 Internal Server Error
```

## 🔍 Checklist de Verificação

### Backend

- [ ] Servidor backend está rodando na porta 4000
- [ ] Variável `CLOUDINARY_URL` está configurada no `.env`
- [ ] Endpoint `/cloudinary/upload/blog-image` está funcionando
- [ ] Teste manual do endpoint: `curl -X POST http://localhost:4000/cloudinary/upload/blog-image`

### Frontend

- [ ] Servidor frontend está rodando na porta 3000
- [ ] Variável `NEXT_PUBLIC_API_URL` está configurada (se necessário)
- [ ] Não há erros no console ao carregar a página
- [ ] Botão "Upload" está visível e clicável

### Imagem

- [ ] Arquivo de imagem existe e é válido
- [ ] Tamanho < 5MB
- [ ] Formato: JPG, PNG, GIF ou WebP

## 🐛 Problemas Comuns e Soluções

### Problema: Botão Upload não abre seletor de arquivo

**Solução:** Verifique se o input `id="coverImageUpload"` existe e está com `className="hidden"`

### Problema: Upload falha silenciosamente

**Solução:**

1. Abra DevTools (F12)
2. Vá em Network
3. Tente fazer upload novamente
4. Verifique se há requisição para `/cloudinary/upload/blog-image`
5. Veja a resposta (status code e mensagem)

### Problema: Preview não aparece

**Solução:**

1. Verifique se `currentEditingPost.coverImage` está sendo atualizado
2. Verifique se a URL retornada é válida
3. Tente abrir a URL diretamente no navegador

### Problema: Erro 404 no endpoint

**Solução:**

1. Verifique se o backend está rodando
2. Verifique a rota em `src/modules/cloudinary/cloudinary.controller.ts`
3. Teste o endpoint manualmente com Postman/curl

## 📊 Teste Automatizado

Execute o teste E2E:

```bash
npx playwright test tests/e2e/test-create-post-with-image.spec.ts --headed
```

Ou em modo UI:

```bash
npx playwright test tests/e2e/test-create-post-with-image.spec.ts --ui
```

## ✅ Resultado Esperado

Após o teste bem-sucedido:

1. ✅ Imagem de capa salva no estado do post
2. ✅ Preview da imagem visível
3. ✅ URL do Cloudinary no campo de input
4. ✅ Nenhum erro no console
5. ✅ Post pode ser salvo com sucesso
6. ✅ Imagem aparece no blog público

---

**Última atualização:** Agora
**Testado em:** Windows, Chrome/Edge
