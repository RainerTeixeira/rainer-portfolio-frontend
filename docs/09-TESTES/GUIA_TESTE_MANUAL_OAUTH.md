# 🎯 Guia Definitivo: Teste Manual OAuth Google/GitHub

## ⚠️ CONCLUSÃO IMPORTANTE

Após extensa investigação, concluímos que:

**❌ Automação completa do OAuth do Google é IMPOSSÍVEL**

- Google detecta Playwright
- Google detecta Puppeteer
- Google detecta Puppeteer Stealth
- Google detecta até Chrome com perfil real via automação

**✅ A ÚNICA forma confiável é TESTE MANUAL**

## 📋 Teste Manual - Google OAuth

### Pré-requisitos

1. ✅ Backend rodando: `http://localhost:4000`
2. ✅ Frontend rodando: `http://localhost:3000`
3. ✅ Cognito configurado com Google
4. ✅ Email de teste: `raineroliveira94@hotmail.com`

### Passo a Passo

#### 1. Abra Chrome NORMALMENTE (não automatizado)

```
Não use Playwright, Puppeteer ou qualquer automação!
```

#### 2. Limpe o localStorage

```
1. Abra DevTools (F12)
2. Vá em Application → Local Storage
3. Clique em http://localhost:3000
4. Clique com botão direito → Clear
```

#### 3. Acesse a página de login

```
http://localhost:3000/dashboard/login
```

#### 4. Clique em "Login com Google"

O fluxo esperado:
```
1. Frontend → Backend /auth/oauth/google
2. Backend → Redireciona para Cognito Hosted UI  
3. Cognito → Redireciona para Google
4. Google → Você faz login
5. Google → Redireciona para Cognito com código
6. Cognito → Redireciona para /dashboard/login/callback?code=xxx
7. Frontend → POST /auth/oauth/google/callback (backend)
8. Backend → Troca código por tokens
9. Backend → Retorna tokens
10. Frontend → Salva tokens e vai para /dashboard
```

#### 5. Faça login no Google

- Email: `raineroliveira94@hotmail.com`
- Senha: (sua senha)

#### 6. Se pedir autorização, aceite

- Clique em "Permitir" ou "Allow"

#### 7. Aguarde o callback

O browser vai redirecionar automaticamente para:
```
http://localhost:3000/dashboard/login/callback?code=xxx&state=yyy
```

#### 8. Verifique se foi para o dashboard

URL esperada:
```
http://localhost:3000/dashboard
```

#### 9. Valide no DevTools

```
F12 → Application → Local Storage → http://localhost:3000

Deve ter:
✅ accessToken
✅ refreshToken  
✅ idToken
✅ user (JSON com email, nome, etc)
```

### ✅ Teste Bem-Sucedido

Você saberá que funcionou quando:

1. ✅ Redirecionado para `/dashboard`
2. ✅ Tokens salvos no localStorage
3. ✅ Sem erros no console
4. ✅ User data presente
5. ✅ Pode navegar no dashboard

### ❌ Problemas Comuns

#### Erro: "Código de autorização inválido ou expirado"

**Causa:** O código OAuth expira em alguns segundos e o frontend tentou reusar.

**Solução:**
1. Limpe localStorage (F12 → Application → Clear)
2. Limpe cookies do site
3. Feche e abra o navegador
4. Tente novamente

#### Erro: "This browser or app may not be secure"

**Causa:** Google detectou automação.

**Solução:**
1. Use Chrome NORMAL (não automatizado)
2. Não use extensões de desenvolvedor ativas
3. Use navegação normal (não incógnito no primeiro teste)

#### Callback não processa

**Causa:** Backend não está respondendo.

**Solução:**
1. Verifique se backend está rodando
2. Verifique logs do backend
3. Verifique variável `NEXT_PUBLIC_API_URL` no frontend

## 🧪 Teste Manual - GitHub OAuth

Mesmo processo acima, mas:
- Clique em "Login com GitHub"
- Use suas credenciais do GitHub
- Pode pedir autenticação de 2 fatores

## 📊 Logs para Debug

### Backend

Verifique nos logs do backend:

```
✅ GET /auth/oauth/google → 302 (redireciona para Cognito)
✅ POST /auth/oauth/google/callback → 200/201 (processa código)
```

### Frontend Console

No DevTools → Console, procure por:

```
✅ [OAuth Callback] Código recebido
✅ [API Client] POST /auth/oauth/google/callback
✅ Login realizado com sucesso
```

### Network Tab

No DevTools → Network:

```
✅ /auth/oauth/google → 302
✅ /auth/oauth/google/callback → 200
✅ /users/profile → 200
```

## 🎯 Checklist Completo

### Antes de Começar
- [ ] Backend rodando (`http://localhost:4000`)
- [ ] Frontend rodando (`http://localhost:3000`)
- [ ] Cognito configurado
- [ ] Google OAuth configurado no Cognito
- [ ] Variáveis de ambiente corretas

### Durante o Teste
- [ ] Chrome aberto NORMALMENTE
- [ ] localStorage limpo
- [ ] DevTools aberto (F12)
- [ ] Console sem erros iniciais
- [ ] Clicou em "Login com Google"
- [ ] Fez login no Google
- [ ] Aceitou permissões

### Após o Login
- [ ] Redirecionado para /dashboard
- [ ] Tokens no localStorage
- [ ] User data presente
- [ ] Sem erros no console
- [ ] Backend respondeu 200/201

## 💡 Recomendações Finais

### Para Desenvolvimento
✅ Teste manualmente conforme este guia
✅ Use DevTools para debug
✅ Mantenha backend e frontend rodando
✅ Limpe localStorage entre testes

### Para CI/CD
✅ **NÃO tente automatizar OAuth do Google/GitHub**
✅ Use testes com MOCKS:
```typescript
// Mock completo do fluxo
await page.route('**/auth/oauth/**', mockRoute);
```
✅ Teste apenas o callback com código mockado
✅ Teste UI sem backend real

### Para Produção
✅ Monitore logs do Cognito
✅ Configure alertas para falhas de OAuth
✅ Documente fluxo para usuários
✅ Tenha fallback para login com email/senha

## 📚 Documentação Adicional

- `ANALISE_ERRO_GOOGLE.md` - Por que automação falha
- `TESTE_PUPPETEER_STEALTH.md` - Tentativas com Stealth
- `README_TESTES_OAUTH.md` - Visão geral de testes

## ✅ Conclusão

**Teste manual é a ÚNICA forma confiável de validar OAuth com Google.**

Automação deve ser usada apenas para:
- UI (com mocks)
- Backend (APIs diretas)
- Callback (com códigos mockados)

**NÃO para login real com Google/GitHub via browser.**

