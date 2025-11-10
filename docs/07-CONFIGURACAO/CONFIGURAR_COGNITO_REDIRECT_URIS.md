# 🔧 Configurar Redirect URIs no Cognito App Client

## ❌ Problema Atual

Erro: `redirect_mismatch` - O Cognito está rejeitando o redirect URI porque não está configurado no App Client.

## ⚙️ Pré-requisito: Versão da UI

**IMPORTANTE**: Antes de configurar os Redirect URIs, certifique-se de que a versão da UI está correta:

1. Vá em **Domínio** no seu User Pool
2. Em **Versão de marca**, selecione: **"UI hospedada (clássica)"**
3. **NÃO** use "Login gerenciado" - isso é para páginas customizadas
4. Salve as alterações

**Por quê?**
- O login social (Google/GitHub) usa o Cognito Hosted UI
- O fluxo OAuth precisa da "UI hospedada (clássica)"
- "Login gerenciado" é para quando você cria suas próprias páginas

## ✅ Solução: Configurar Redirect URIs

### 📋 Informações do Seu Projeto

Com base nas suas variáveis de ambiente:

- **User Pool ID**: `us-east-1_wryiyhbWC`
- **App Client ID**: `3ueos5ofu499je6ebc5u98n35h`
- **Cognito Domain**: `us-east-1wryiyhbwc.auth.us-east-1.amazoncognito.com`

### 🔗 Redirect URIs que Precisam Ser Configurados

#### Para Desenvolvimento (Localhost)

**Allowed callback URLs:**
```
http://localhost:3000/dashboard/login/callback
```

**Allowed sign-out URLs:**
```
http://localhost:3000/dashboard/login
http://localhost:3000
```

#### Para Produção (quando deployar)

**Allowed callback URLs:**
```
https://seu-dominio.com/dashboard/login/callback
https://rainer-portfolio.vercel.app/dashboard/login/callback
```

**Allowed sign-out URLs:**
```
https://seu-dominio.com/dashboard/login
https://seu-dominio.com
https://rainer-portfolio.vercel.app/dashboard/login
https://rainer-portfolio.vercel.app
```

---

## 🚀 Passo a Passo no AWS Console

### 1️⃣ Acessar o App Client

1. Acesse: [AWS Cognito Console](https://console.aws.amazon.com/cognito)
2. Selecione sua região: **us-east-1** (N. Virginia)
3. Clique em **User pools**
4. Clique no seu User Pool: **RainerSoftCognito** (ID: `us-east-1_wryiyhbWC`)
5. No menu lateral, vá em **Integração do aplicativo** (App integration)
6. Clique em **Clientes da aplicação** (App clients)
7. Clique no **NOME** do App Client: **CognitoLogin** (ID: `3ueos5ofu499je6ebc5u98n35h`)

### 2️⃣ Encontrar a Configuração de Hosted UI

**IMPORTANTE**: A configuração de URLs pode estar em diferentes lugares:

#### Opção A: Na própria página do App Client
1. Na página do App Client, role para **baixo**
2. Procure por uma seção chamada **"Hosted UI"** ou **"UI hospedada"**
3. Ou procure por **"Allowed callback URLs"** / **"URLs de retorno de chamada permitidas"**
4. Clique em **"Editar"** ou **"Edit"** nessa seção

#### Opção B: Via menu lateral
1. **Volte** para o menu do User Pool
2. No menu lateral, vá em **Integração do aplicativo** → **UI hospedada** (Hosted UI)
3. Ou vá em **Integração do aplicativo** → **Domínio** e depois **Hosted UI**

#### Opção C: Botão Editar na página
1. Na página do App Client, procure pelo botão **"Editar"** (Edit)
2. Pode estar na seção **"Informações do cliente de aplicação"**
3. Clique e procure por opções de **Hosted UI** ou **OAuth settings**

### 3️⃣ Configurar Hosted UI

Uma vez que encontrar a seção de Hosted UI:

1. Clique em **"Editar"** ou **"Edit Hosted UI"**
2. Procure por **"Allowed callback URLs"** ou **"URLs de retorno de chamada permitidas"**

### 4️⃣ Adicionar Callback URLs

**Allowed callback URLs:**
```
http://localhost:3000/dashboard/login/callback
```

**Como adicionar:**
1. Se já houver URLs, adicione uma por linha
2. Se estiver vazio, cole a URL acima
3. **IMPORTANTE**: Não adicione espaços ou barras extras

### 5️⃣ Adicionar Sign-out URLs

**Allowed sign-out URLs:**
```
http://localhost:3000/dashboard/login
http://localhost:3000
```

**Como adicionar:**
1. Adicione uma URL por linha
2. Certifique-se de que não há espaços extras

### 6️⃣ Configurar Identity Providers

Certifique-se de que os Identity Providers estão habilitados:

- ✅ **Google** (se configurado)
- ✅ **GitHub** (se configurado)

**Para habilitar:**
1. Na mesma página, role até **"Identity providers"**
2. Marque os providers que você quer usar
3. Se não aparecerem, você precisa configurá-los primeiro em **Sign-in experience** → **Federated identity providers**

### 7️⃣ Salvar Configurações

1. Role até o final da página
2. Clique em **"Save changes"**
3. Aguarde a confirmação

---

## ✅ Verificar Configuração

Após salvar, você pode testar:

1. Acesse: `http://localhost:3000/dashboard/login`
2. Clique em **"Google"** ou **"GitHub"**
3. Você deve ser redirecionado para o Cognito Hosted UI
4. Após autenticar, deve voltar para: `http://localhost:3000/dashboard/login/callback`

---

## 🔍 Troubleshooting

### Erro: "redirect_mismatch" ainda aparece

1. **Verifique se salvou as alterações** no AWS Console
2. **Aguarde 1-2 minutos** para as mudanças propagarem
3. **Limpe o cache do navegador** (Ctrl+Shift+Delete)
4. **Verifique se a URL está exatamente igual** (sem espaços, com protocolo correto)

### Erro: "Identity provider not found"

1. Vá em **Sign-in experience** → **Federated identity providers**
2. Verifique se Google/GitHub estão configurados
3. Se não estiverem, siga o guia em `docs/07-CONFIGURACAO/SOCIAL_LOGIN_SETUP.md`

### Erro: "Invalid redirect_uri"

1. Verifique se a URL no código está exatamente igual à configurada no Cognito
2. Verifique se está usando `http://` para localhost (não `https://`)
3. Certifique-se de que não há espaços ou caracteres especiais

---

## 📝 Checklist de Configuração

- [ ] Acessei o AWS Console → Cognito → User Pools
- [ ] Encontrei o User Pool: `us-east-1_wryiyhbWC`
- [ ] Acessei App integration → App clients
- [ ] Editei o App Client: `3ueos5ofu499je6ebc5u98n35h`
- [ ] Adicionei callback URL: `http://localhost:3000/dashboard/login/callback`
- [ ] Adicionei sign-out URLs: `http://localhost:3000/dashboard/login` e `http://localhost:3000`
- [ ] Habilitei os Identity Providers (Google/GitHub)
- [ ] Salvei as alterações
- [ ] Testei o login social

---

## 🎯 Próximos Passos

Após configurar os Redirect URIs:

1. ✅ Teste o login com Google
2. ✅ Teste o login com GitHub
3. ✅ Verifique se o callback está funcionando
4. ✅ Configure as URLs de produção quando fizer deploy

---

## 📚 Referências

- [AWS Cognito Hosted UI Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html)
- [OAuth 2.0 Redirect URI Best Practices](https://www.oauth.com/oauth2-servers/redirect-uris/)

