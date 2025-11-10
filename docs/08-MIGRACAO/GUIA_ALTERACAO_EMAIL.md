# ✉️ Guia: Alteração de Email

## 🎯 Visão Geral

Fluxo completo de alteração de email usando Amazon Cognito.

---

## 🔄 Fluxo Completo

### Passo 1: Usuário Clica em "Alterar Email"

```
Dashboard → ProfileForm → Botão "Alterar" → Abre ChangeEmailDialog
```

### Passo 2: Usuário Digita Novo Email

```typescript
<Input
  type="email"
  value={newEmail}
  onChange={(e) => setNewEmail(e.target.value)}
  placeholder="novo@example.com"
/>
<Button onClick={handleSendCode}>
  Enviar Código
</Button>
```

### Passo 3: Backend Processa

```
POST /auth/change-email
{
  "cognitoSub": "cognito-abc123",
  "newEmail": "novo@example.com"
}

↓

AWS Cognito AdminUpdateUserAttributes
- Atualiza email
- Define email_verified = false
- Envia código de verificação

↓

Resposta: { success: true }
```

### Passo 4: Usuário Recebe Email

```
AWS Cognito → Email com código de 6 dígitos → Caixa de entrada
```

### Passo 5: Usuário Digita Código

```typescript
<Input
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder="123456"
  maxLength={6}
/>
<Button onClick={handleVerifyCode}>
  Verificar Código
</Button>
```

### Passo 6: Backend Verifica

```
POST /auth/verify-email-change
{
  "cognitoSub": "cognito-abc123",
  "code": "123456"
}

↓

AWS Cognito VerifyUserAttribute
- Valida código
- Define email_verified = true

↓

Resposta: { success: true }
```

### Passo 7: Logout Automático

```typescript
alert('✅ Email alterado! Faça login novamente.');
window.location.href = '/auth/login';
```

---

## 🎨 Interface do Usuário

### ProfileForm

```
┌─────────────────────────────────────────┐
│ Email                                   │
│ ┌─────────────────────┬──────────────┐ │
│ │ john@example.com    │  [Alterar]   │ │
│ └─────────────────────┴──────────────┘ │
│ Email gerenciado pelo Cognito          │
│                                         │
│ Nome                                    │
│ ┌─────────────────────────────────────┐ │
│ │ John Doe                            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Salvar Alterações]                    │
└─────────────────────────────────────────┘
```

### ChangeEmailDialog - Passo 1

```
┌─────────────────────────────────────────┐
│ ✉️  Alterar Email                       │
├─────────────────────────────────────────┤
│ Email Atual                             │
│ ┌─────────────────────────────────────┐ │
│ │ john@example.com (desabilitado)     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Novo Email                              │
│ ┌─────────────────────────────────────┐ │
│ │ novo@example.com                    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancelar]           [Enviar Código]    │
└─────────────────────────────────────────┘
```

### ChangeEmailDialog - Passo 2

```
┌─────────────────────────────────────────┐
│ ✉️  Alterar Email                       │
├─────────────────────────────────────────┤
│ Digite o código enviado para            │
│ novo@example.com                        │
│                                         │
│ Código de Verificação                   │
│ ┌─────────────────────────────────────┐ │
│ │ 123456                              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancelar]        [Verificar Código]    │
└─────────────────────────────────────────┘
```

---

## 🔐 Validações

### Frontend

```typescript
// Email válido
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Código de 6 dígitos
const isValidCode = (code: string) => {
  return /^\d{6}$/.test(code);
};
```

### Backend

```typescript
// Email único
const existingUser = await cognito.getUserByEmail(newEmail);
if (existingUser) {
  throw new ConflictException('Email já em uso');
}

// Código válido
try {
  await cognito.verifyUserAttribute(cognitoSub, code);
} catch (error) {
  throw new BadRequestException('Código inválido ou expirado');
}
```

---

## 🚨 Tratamento de Erros

### Email já em uso

```typescript
try {
  await userService.changeEmail({ cognitoSub, newEmail });
} catch (error) {
  if (error.status === 409) {
    alert('❌ Este email já está em uso');
  }
}
```

### Código inválido

```typescript
try {
  await userService.verifyEmailChange({ cognitoSub, code });
} catch (error) {
  if (error.status === 400) {
    alert('❌ Código inválido ou expirado');
  }
}
```

### Código expirado

```typescript
// Código expira em 24 horas
// Usuário deve solicitar novo código
alert('❌ Código expirado. Solicite um novo.');
setStep('email'); // Volta para passo 1
```

---

## 💡 Boas Práticas

### UX

1. **Feedback claro**
   - Loading states
   - Mensagens de sucesso/erro
   - Instruções claras

2. **Validação em tempo real**
   - Email válido
   - Código de 6 dígitos
   - Desabilitar botão se inválido

3. **Confirmação**
   - Mostrar novo email antes de enviar
   - Confirmar antes de verificar código

### Segurança

1. **Verificação em duas etapas**
   - Código enviado para novo email
   - Validação no backend

2. **Logout obrigatório**
   - Após alteração, usuário deve fazer login
   - Novo token com email atualizado

3. **Rate limiting**
   - Cognito limita tentativas
   - Previne ataques de força bruta

---

## 🧪 Como Testar

### Teste Manual

1. Acesse <http://localhost:3000/dashboard>
2. Localize o email no ProfileForm
3. Clique em "Alterar"
4. Digite novo email
5. Clique em "Enviar Código"
6. Verifique email (caixa de entrada)
7. Digite código de 6 dígitos
8. Clique em "Verificar Código"
9. Será redirecionado para login
10. Faça login com novo email

### Teste Automatizado

```typescript
describe('ChangeEmailDialog', () => {
  it('should send code to new email', async () => {
    render(<ChangeEmailDialog {...props} />);
    
    const input = screen.getByPlaceholderText('novo@example.com');
    fireEvent.change(input, { target: { value: 'novo@example.com' } });
    
    const button = screen.getByText('Enviar Código');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(userService.changeEmail).toHaveBeenCalledWith({
        cognitoSub: 'cognito-abc123',
        newEmail: 'novo@example.com'
      });
    });
  });

  it('should verify code', async () => {
    render(<ChangeEmailDialog {...props} step="code" />);
    
    const input = screen.getByPlaceholderText('123456');
    fireEvent.change(input, { target: { value: '123456' } });
    
    const button = screen.getByText('Verificar Código');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(userService.verifyEmailChange).toHaveBeenCalledWith({
        cognitoSub: 'cognito-abc123',
        code: '123456'
      });
    });
  });
});
```

---

## ⚠️ Pontos de Atenção

### Email no MongoDB

- ❌ Email **não é atualizado** no MongoDB
- ✅ Email vem sempre do **token Cognito**
- ✅ Single source of truth mantido

### Logout Obrigatório

- ✅ Após alterar email, usuário **deve fazer logout**
- ✅ Novo login gera token com email atualizado
- ✅ Frontend redireciona automaticamente

### Código de Verificação

- ✅ Válido por **24 horas**
- ✅ Enviado para o **novo email**
- ✅ Apenas **6 dígitos numéricos**

---

## 🔗 Links Relacionados

- [GUIA_IMPLEMENTACAO_FRONTEND.md](GUIA_IMPLEMENTACAO_FRONTEND.md) - Implementação completa
- [Backend: GUIA_IMPLEMENTACAO_BACKEND.md](../../../rainer-portfolio-backend/docs/08-MIGRACAO/GUIA_IMPLEMENTACAO_BACKEND.md) - Backend

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0.0  
**Status:** ✅ Implementado
