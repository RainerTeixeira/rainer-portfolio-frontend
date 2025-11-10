# 🎨 Guia de Implementação Frontend - Cognito Only

## 📋 Resumo da Migração Frontend

Este guia detalha como adaptar o frontend para trabalhar com a nova arquitetura onde **Amazon Cognito** é a única fonte de verdade para `email` e `username`, e o MongoDB armazena apenas dados complementares.

## 🎯 Objetivo

- **Frontend**: Usar `cognitoSub` como identificador único em todas as chamadas ao backend
- **Exibição**: Mostrar `email` e `username` vindos do token Cognito
- **Edição**: Permitir editar apenas dados complementares (nome, bio, avatar, etc.)
- **Autenticação**: Manter fluxo Cognito inalterado

## 📝 Mudanças Necessárias

### 1. Tipos TypeScript (`types/database.ts`)

```typescript
// ❌ ANTES
interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  // ...
}

// ✅ DEPOIS
interface User {
  id: string;
  cognitoSub: string;  // ← Chave única
  fullName: string;
  // email e username vêm do token Cognito
  // ...
}

// ✅ NOVO: Interface para dados do Cognito
interface CognitoUserData {
  sub: string;
  email: string;
  username: string;
  email_verified: boolean;
}

// ✅ NOVO: Interface combinada para exibição
interface UserProfile extends User {
  email: string;      // ← Do token Cognito
  username: string;   // ← Do token Cognito
  emailVerified: boolean;
}
```

### 2. Serviços de API (`lib/api/services/`)

#### `users.service.ts`

```typescript
// ❌ ANTES
export const getUserByUsername = async (username: string) => {
  return api.get(`/users/username/${username}`);
};

// ✅ DEPOIS
export const getUserByCognitoSub = async (cognitoSub: string) => {
  return api.get(`/users/cognito/${cognitoSub}`);
};

// ✅ ATUALIZADO: Criar usuário sem email/username
export const createUser = async (userData: {
  cognitoSub: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  // ❌ Não incluir: email, username
}) => {
  return api.post('/users', userData);
};

// ✅ ATUALIZADO: Atualizar usuário sem email/username
export const updateUser = async (id: string, userData: {
  fullName?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  // ❌ Não incluir: email, username
}) => {
  return api.put(`/users/${id}`, userData);
};
```

### 3. Context de Autenticação (`components/providers/auth-context-provider.tsx`)

```typescript
// ✅ ATUALIZADO: Context com dados combinados
interface AuthContextType {
  user: UserProfile | null;  // ← Dados combinados
  cognitoUser: CognitoUserData | null;  // ← Dados do Cognito
  mongoUser: User | null;    // ← Dados do MongoDB
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateUserData) => Promise<void>;
  // ✅ NOVO: Método para alterar email (via Cognito)
  changeEmail: (newEmail: string) => Promise<void>;
}

// ✅ IMPLEMENTAÇÃO
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cognitoUser, setCognitoUser] = useState<CognitoUserData | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);

  // ✅ Combinar dados para exibição
  const user: UserProfile | null = useMemo(() => {
    if (!cognitoUser || !mongoUser) return null;
    
    return {
      ...mongoUser,
      email: cognitoUser.email,
      username: cognitoUser.username,
      emailVerified: cognitoUser.email_verified,
    };
  }, [cognitoUser, mongoUser]);

  const login = async (email: string, password: string) => {
    // 1. Login no Cognito
    const cognitoResult = await Auth.signIn(email, password);
    const tokens = cognitoResult.signInUserSession;
    
    // 2. Extrair dados do token
    const cognitoData = {
      sub: tokens.idToken.payload.sub,
      email: tokens.idToken.payload.email,
      username: tokens.idToken.payload['cognito:username'],
      email_verified: tokens.idToken.payload.email_verified,
    };
    setCognitoUser(cognitoData);
    
    // 3. Buscar dados complementares no MongoDB
    const mongoData = await getUserByCognitoSub(cognitoData.sub);
    setMongoUser(mongoData);
  };

  const updateProfile = async (data: UpdateUserData) => {
    if (!mongoUser) throw new Error('Usuário não logado');
    
    // ✅ Atualizar apenas dados complementares no MongoDB
    const updatedUser = await updateUser(mongoUser.id, data);
    setMongoUser(updatedUser);
    
    // ❌ NÃO atualizar email/username aqui
  };

  const changeEmail = async (newEmail: string) => {
    if (!cognitoUser) throw new Error('Usuário não logado');
    
    // ✅ Alterar email apenas no Cognito
    await Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), {
      email: newEmail,
    });
    
    // ✅ Atualizar estado local
    setCognitoUser(prev => prev ? { ...prev, email: newEmail, email_verified: false } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      cognitoUser,
      mongoUser,
      login,
      logout,
      updateProfile,
      changeEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. Componentes de Perfil (`components/dashboard/profile-form.tsx`)

```tsx
// ✅ ATUALIZADO: Formulário sem email/username
const ProfileForm = () => {
  const { user, updateProfile, changeEmail } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    website: user?.website || '',
    // ❌ Não incluir: email, username
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Atualizar apenas dados complementares
    await updateProfile(formData);
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ Campos editáveis */}
      <Input
        label="Nome"
        value={formData.fullName}
        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
      />
      
      <Textarea
        label="Bio"
        value={formData.bio}
        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
      />
      
      {/* ✅ Campos somente leitura (do Cognito) */}
      <div className="space-y-2">
        <Label>Email</Label>
        <div className="flex items-center gap-2">
          <Input
            value={user?.email || ''}
            disabled
            className="bg-gray-50"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowChangeEmailDialog(true)}
          >
            Alterar
          </Button>
        </div>
        {!user?.emailVerified && (
          <p className="text-sm text-amber-600">
            ⚠️ Email não verificado
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Username</Label>
        <Input
          value={user?.username || ''}
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-500">
          Username é gerenciado pelo sistema de autenticação
        </p>
      </div>

      <Button type="submit">
        Salvar Alterações
      </Button>
    </form>
  );
};
```

### 5. Dialog de Alteração de Email (`components/dashboard/change-email-dialog.tsx`)

```tsx
// ✅ NOVO: Componente para alterar email
const ChangeEmailDialog = ({ open, onOpenChange }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { changeEmail } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await changeEmail(newEmail);
      toast.success('Email alterado! Verifique sua caixa de entrada.');
      onOpenChange(false);
    } catch (error) {
      toast.error('Erro ao alterar email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Email</DialogTitle>
          <DialogDescription>
            Você receberá um código de verificação no novo email.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Novo email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Alterando...' : 'Alterar Email'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
```

### 6. Hooks Customizados (`hooks/useAuth.ts`)

```typescript
// ✅ ATUALIZADO: Hook com dados combinados
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

// ✅ NOVO: Hook para dados do Cognito
export const useCognitoUser = () => {
  const { cognitoUser } = useAuth();
  return cognitoUser;
};

// ✅ NOVO: Hook para dados do MongoDB
export const useMongoUser = () => {
  const { mongoUser } = useAuth();
  return mongoUser;
};

// ✅ NOVO: Hook para perfil completo
export const useUserProfile = () => {
  const { user } = useAuth();
  return user;
};
```

## 🔄 Fluxo de Dados Atualizado

### Registro

```typescript
// 1. Frontend → Cognito
const signUpResult = await Auth.signUp({
  username: email,
  password,
  attributes: { email, fullName }
});

// 2. Após confirmação → Backend
await createUser({
  cognitoSub: signUpResult.userSub,
  fullName: fullName,
  // ❌ Não enviar: email, username
});
```

### Login

```typescript
// 1. Frontend → Cognito
const signInResult = await Auth.signIn(email, password);
const tokens = signInResult.signInUserSession;

// 2. Extrair dados do token
const cognitoData = {
  sub: tokens.idToken.payload.sub,
  email: tokens.idToken.payload.email,
  username: tokens.idToken.payload['cognito:username'],
};

// 3. Frontend → Backend (buscar dados complementares)
const mongoData = await getUserByCognitoSub(cognitoData.sub);

// 4. Combinar dados para exibição
const userProfile = { ...mongoData, ...cognitoData };
```

### Atualização de Perfil

```typescript
// ✅ Dados complementares → MongoDB
await updateProfile({
  fullName: 'Novo Nome',
  bio: 'Nova bio',
  // ❌ Não incluir: email, username
});

// ✅ Email → Cognito (separadamente)
await changeEmail('novo@email.com');
```

## 📋 Checklist de Implementação

### Backend (Já Implementado ✅)

- [x] Remover `email` e `username` do schema Prisma
- [x] Usar `cognitoSub` como chave única
- [x] Atualizar endpoints para usar `cognitoSub`
- [x] Remover validações de `email`/`username` duplicados
- [x] Atualizar seed sem `email`/`username`
- [x] Atualizar testes

### Frontend (A Implementar)

- [ ] Atualizar tipos TypeScript (`types/database.ts`)
- [ ] Modificar serviços de API (`lib/api/services/users.service.ts`)
- [x] Atualizar Context de Auth (`components/providers/auth-context-provider.tsx`)
- [ ] Modificar formulário de perfil (`components/dashboard/profile-form.tsx`)
- [ ] Criar dialog de alteração de email (`components/dashboard/change-email-dialog.tsx`)
- [ ] Atualizar hooks customizados (`hooks/useAuth.ts`)
- [ ] Testar fluxo completo de auth
- [ ] Atualizar componentes que exibem dados do usuário
- [ ] Verificar todas as chamadas à API de usuários

### Testes

- [ ] Testar registro de novo usuário
- [ ] Testar login existente
- [ ] Testar atualização de perfil (apenas dados complementares)
- [ ] Testar alteração de email (via Cognito)
- [ ] Verificar exibição correta de dados combinados

## ⚠️ Pontos de Atenção

1. **Não enviar email/username para o backend** em formulários de perfil
2. **Sempre usar cognitoSub** como identificador nas chamadas à API
3. **Combinar dados** do Cognito + MongoDB para exibição
4. **Alterar email apenas via Cognito**, não via backend
5. **Verificar estado de email_verified** do Cognito
6. **Manter compatibilidade** com usuários existentes

## 🎯 Benefícios

- ✅ **Single Source of Truth**: Cognito gerencia credenciais
- ✅ **Segurança**: Senhas nunca tocam o frontend/backend
- ✅ **Escalabilidade**: Cognito gerencia milhões de usuários
- ✅ **Simplicidade**: Menos duplicação de dados
- ✅ **Conformidade**: Padrões AWS de autenticação

## 🚀 Próximos Passos

1. Implementar mudanças nos tipos TypeScript
2. Atualizar serviços de API
3. Modificar Context de Auth
4. Atualizar componentes de perfil
5. Testar fluxo completo
6. Deploy e validação em produção
