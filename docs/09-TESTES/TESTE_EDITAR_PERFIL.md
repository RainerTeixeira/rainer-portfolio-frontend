# 🧪 Teste de Edição de Perfil

## 📋 Passos para Testar

### 1. Abrir o Dashboard

- Acesse: <http://localhost:3000/dashboard>
- Faça login se necessário

### 2. Abrir Console do Navegador

- Pressione **F12**
- Vá na aba **Console**
- Deixe aberto para ver os logs

### 3. Clicar em "Editar Perfil"

- Clique no botão **"Editar Perfil"** no cabeçalho

### 4. Preencher os Dados

- **Nome**: Teste Atualizado
- **Email**: <teste@atualizado.com>
- **Bio**: Esta é minha bio atualizada

### 5. Clicar em "Salvar Alterações"

- Observe o console
- Deve aparecer:

  ```
  Salvando perfil...
  User ID: [algum ID]
  Dados: {fullName: "...", email: "...", bio: "..."}
  Resposta do backend: {success: true, data: {...}}
  ```

### 6. Verificar Resultado

**✅ Se funcionar:**

- Alert: "✅ Perfil atualizado com sucesso!"
- Página recarrega
- Dados atualizados aparecem

**❌ Se der erro:**

- Copie TODA a mensagem do console
- Me envie para eu corrigir

---

## 🔍 Possíveis Problemas

### Problema 1: "User ID não encontrado"

**Causa**: Usuário não está logado corretamente
**Solução**: Faça logout e login novamente

### Problema 2: "Network Error"

**Causa**: Backend não está rodando
**Solução**: Verifique se o backend está em <http://localhost:4000>

### Problema 3: "404 Not Found"

**Causa**: Endpoint não existe ou ID inválido
**Solução**: Verifique se o user.id está correto no console

---

## 📊 O que Verificar no Console

Copie e me envie estas informações:

1. **User ID**: O ID que aparece no log
2. **Dados**: Os dados que estão sendo enviados
3. **Resposta**: A resposta completa do backend
4. **Erros**: Qualquer erro em vermelho

---

## 🛠️ Teste Manual da API

Se quiser testar a API diretamente, abra o PowerShell:

```powershell
# Substitua USER_ID pelo ID real do usuário
$userId = "SEU_USER_ID_AQUI"

$body = @{
    fullName = "Teste Manual"
    email = "teste@manual.com"
    bio = "Bio de teste manual"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/users/$userId" -Method Put -Body $body -ContentType "application/json"
```

Se isso funcionar, o problema está no frontend.
Se não funcionar, o problema está no backend.
