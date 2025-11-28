# 🔄 Refatoração: Nickname Personalizável no Cadastro

> **Status (2025-11)**: O fluxo atual de cadastro já usa **`nickname` como campo oficial** tanto no Cognito quanto no backend (`User.nickname` no Mongo/Prisma). As menções a `username` neste documento são históricas; na prática, o frontend trabalha com `nickname` e o backend persiste esse valor no perfil do usuário.

## 📋 Resumo

Refatoração do sistema de cadastro para permitir que o usuário escolha seu próprio nickname (nickname) durante o registro, com sugestão automática baseada no email.

## 🎯 Objetivo

Melhorar a experiência do usuário permitindo personalização do nickname (nickname) no momento do cadastro, mantendo a integração com AWS Cognito.

## ✨ Funcionalidades Implementadas

### 1. Campo Nickname no Formulário

- ✅ Campo editável para nickname (nickname)
- ✅ Sugestão automática baseada no email
- ✅ Validação em tempo real
- ✅ Feedback visual de disponibilidade

### 2. Validação de Nickname

```typescript
nickname: z.string()
  .min(3, "Nickname deve ter no mínimo 3 caracteres")
  .max(30, "Nickname deve ter no máximo 30 caracteres")
  .regex(/^[a-zA-Z0-9_]+$/, "Nickname deve conter apenas letras, números e underscore")
  .refine(val => !val.includes('@'), "Nickname não pode conter @")
```

**Regras:**

- Mínimo 3 caracteres
- Máximo 30 caracteres
- Apenas letras, números e underscore (_)
- Não pode conter @

### 3. Geração Automática de Sugestão

```typescript
const generateNickname = (email: string): string => {
  const prefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
  return prefix || 'usuario'
}
```

**Comportamento:**

- Extrai parte antes do @ do email
- Remove caracteres especiais
- Preenche automaticamente o campo nickname
- Usuário pode editar livremente

### 4. Verificação de Disponibilidade (Componente)

Novo componente `UsernameAvailability`:

- ✅ Verificação em tempo real (debounce 500ms)
- ✅ Feedback visual (ícones + cores)
- ✅ Estados: idle, checking, available, unavailable
- ✅ Preparado para integração com API

## 📁 Arquivos Modificados

### 1. `components/dashboard/login/forms/register-form.tsx`

**Alterações:**

- ✅ Adicionado campo `nickname` no schema de validação
- ✅ Implementada função `generateNickname()`
- ✅ Implementada função `handleEmailChange()` para sugestão automática
- ✅ Adicionado campo Nickname no formulário
- ✅ Integrado componente `NicknameAvailability`

### 2. `app/dashboard/login/register/page.tsx`

**Alterações:**

- ✅ Atualizada descrição do card para informar sobre sugestão automática

### 3. `components/dashboard/login/nickname-availability.tsx`

**Funcionalidades:**

- ✅ Verificação de disponibilidade com debounce
- ✅ Estados visuais (checking, available, unavailable)
- ✅ Feedback em tempo real
- ✅ Integrado ao formulário de registro

### 4. `components/dashboard/login/index.ts`

**Alterações:**

- ✅ Adicionado export do componente `NicknameAvailability`

## 🔄 Fluxo de Cadastro Atualizado

### Antes

```
1. Usuário preenche: nome, email, senha
2. Sistema gera nickname automático: email_prefix
3. Usuário pode personalizar o nickname
```

### Depois

```
1. Usuário preenche nome
2. Usuário preenche email
   → Sistema sugere nickname automaticamente
3. Usuário pode:
   - Aceitar sugestão
   - Editar nickname livremente
4. Sistema valida nickname em tempo real
5. Usuário preenche senha
6. Cadastro é enviado com nickname escolhido
```

## 🎨 Experiência do Usuário

### Exemplo de Uso

**Cenário 1: Aceitar Sugestão**

```
Email digitado: joao.silva@exemplo.com
Nickname sugerido: joaosilva
Usuário: [aceita] → Cadastro com "joaosilva"
```

**Cenário 2: Personalizar**

```
Email digitado: joao.silva@exemplo.com
Nickname sugerido: joaosilva
Usuário edita: joaosilva123
Sistema valida: ✓ Disponível
Cadastro com: "joaosilva123"
```

**Cenário 3: Nickname Inválido**

```
Usuário digita: jo@o
Sistema valida: ✗ Nickname não pode conter @
Usuário corrige: joao
Sistema valida: ✓ Disponível
```

## 🔍 Validações Implementadas

### Frontend (Zod Schema)

| Validação | Regra | Mensagem |
|-----------|-------|----------|
| Tamanho mínimo | 3 caracteres | "Nickname deve ter no mínimo 3 caracteres" |
| Tamanho máximo | 30 caracteres | "Nickname deve ter no máximo 30 caracteres" |
| Caracteres permitidos | `[a-zA-Z0-9_]` | "Nickname deve conter apenas letras, números e underscore" |
| Sem @ | Não pode conter @ | "Nickname não pode conter @" |

### Backend (Cognito)

O backend já valida:

- ✅ Nickname único (não duplicado)
- ✅ Formato válido para Cognito
- ✅ Não pode ser formato de email

## 📊 Componente NicknameAvailability

### Estados

```typescript
type Status = 'idle' | 'checking' | 'available' | 'unavailable'
```

| Estado | Ícone | Cor | Mensagem |
|--------|-------|-----|----------|
| `idle` | - | - | (nada exibido) |
| `checking` | Loader | Cinza | "Verificando..." |
| `available` | CheckCircle | Verde | "Nickname disponível" |
| `unavailable` | XCircle | Vermelho | "Este nickname já está em uso" |

### Debounce

- ⏱️ **500ms** após última digitação
- ✅ Evita requisições excessivas
- ✅ Melhora performance

## 🚀 Próximos Passos (Opcional)

### 1. Integração com Backend

Implementar endpoint para verificar disponibilidade:

```typescript
// Backend: GET /auth/check-nickname/:nickname
export async function checkNicknameAvailability(nickname: string) {
  const exists = await cognito.checkUserExists(nickname)
  return { available: !exists }
}
```

### 2. Sugestões Alternativas

Se o nickname estiver em uso, sugerir alternativas:

```typescript
// joaosilva → joaosilva1, joaosilva2, joaosilva123
const suggestions = generateAlternatives(nickname)
```

### 3. Histórico de Nicknames

Salvar usernames já tentados para evitar repetição:

```typescript
const [triedUsernames, setTriedUsernames] = useState<string[]>([])
```

## ✅ Checklist de Implementação

- [x] Adicionar campo username no schema de validação
- [x] Implementar geração automática de sugestão
- [x] Criar componente UsernameAvailability
- [x] Integrar componente no formulário
- [x] Atualizar exports do módulo
- [x] Atualizar descrição da página
- [x] Documentar alterações
- [ ] Implementar verificação real no backend (opcional)
- [ ] Adicionar testes unitários (opcional)
- [ ] Adicionar sugestões alternativas (opcional)

## 🎯 Benefícios

| Benefício | Descrição |
|-----------|-----------|
| 🎨 **UX Melhorada** | Usuário tem controle sobre seu username |
| ⚡ **Sugestão Inteligente** | Sistema sugere username baseado no email |
| ✅ **Validação em Tempo Real** | Feedback imediato sobre disponibilidade |
| 🔒 **Segurança** | Validações impedem usernames inválidos |
| 🚀 **Performance** | Debounce evita requisições excessivas |

## 📝 Notas Técnicas (Atualização)

### Compatibilidade com Cognito / Backend Atual

No modelo atual:

- O **Cognito** continua exigindo um `username` interno, gerado automaticamente no backend.
- O **frontend** trabalha apenas com `email`, `fullName` e **`nickname`**.
- O backend envia para o Cognito um `username` gerado e um atributo `nickname`, e persiste o mesmo `nickname` em `User.nickname` no Mongo/Prisma.

Ou seja, o que importa para UI/UX e para o domínio é o **`nickname`**, não o `username` interno do Cognito.

## 🐛 Troubleshooting

### Problema: Username não é sugerido automaticamente

**Solução:** Verificar se `handleEmailChange()` está sendo chamado no onChange do campo email.

### Problema: Validação não funciona

**Solução:** Verificar se o schema Zod está correto e se o campo está registrado no formulário.

### Problema: Componente UsernameAvailability não aparece

**Solução:** Verificar se o componente está importado e se o username tem pelo menos 3 caracteres.

## 📚 Referências

- [AWS Cognito - Username Requirements](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html)
- [Zod - Schema Validation](https://zod.dev/)
- [React Hook Form - Field Validation](https://react-hook-form.com/api/useform/register)

---

**Autor:** Rainer Teixeira  
**Data:** 2025-01-XX  
**Versão:** 1.0.0
