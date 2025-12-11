# ⚡ 06-FEATURES - Funcionalidades Implementadas

## 📋 Índice da Seção

- [Visão Geral das Features](#-visão-geral-das-features)
- [Autenticação OAuth](#-autenticação-oauth)
- [Blog com Editor Rich Text](#-blog-com-editor-rich-text)
- [Dashboard Administrativo](#-dashboard-administrativo)
- [Progressive Web App (PWA)](#-progressive-web-app-pwa)
- [Analytics e Monitoring](#-analytics-e-monitoring)
- [SEO Avançado](#-seo-avançado)
- [Acessibilidade WCAG 2.1](#-acessibilidade-wcag-21)

---

## 🎯 Visão Geral das Features

### Features Enterprise

O projeto implementa funcionalidades **enterprise-grade** que vão além de um portfolio simples:

```
⚡ ENTERPRISE FEATURES
├─ 🔐 Autenticação OAuth           (Google/GitHub via Cognito)
├─ 📝 Blog com Editor Rich Text    (Tiptap + Markdown)
├─ 📊 Dashboard Administrativo     (CRUD + Analytics)
├─ 📱 PWA Universal                (Install + Offline)
├─ 📈 Analytics Tracking           (GA4 + Custom Events)
├─ 🎯 SEO Avançado                 (Sitemap + Schema.org)
├─ ♿ Acessibilidade Total          (WCAG 2.1 AA)
└─ 🌐 Internacionalização          (pt-BR, en-US, es-ES)
```

### Características Técnicas

- **Type-First**: Todas as features tipadas com TypeScript
- **Performance**: Otimizadas para Core Web Vitals
- **Security**: Best practices de segurança implementadas
- **Scalability**: Arquitetura preparada para escala
- **Testing**: Cobertura de testes completa

---

## 🔐 Autenticação OAuth

### Arquitetura OAuth

Implementação completa de **OAuth 2.0 via AWS Cognito** com suporte para Google e GitHub:

```
🔐 OAUTH FLOW
1. Frontend → Backend (/auth/oauth/google)
2. Backend → Cognito Hosted UI (com state CSRF)
3. Cognito → Google/GitHub OAuth
4. Google/GitHub → Cognito (com code)
5. Cognito → Frontend callback (/dashboard/login/callback?code=xxx)
6. Frontend → Backend (/auth/oauth/google/callback)
7. Backend → Troca code por tokens no Cognito
8. Backend → Criar/atualizar user no MongoDB
9. Backend → Retornar tokens + user
10. Frontend → Salvar tokens e redirecionar
```

### Componentes Implementados

#### Backend (NestJS)
```typescript
// auth.controller.ts
@Controller('auth')
export class AuthController {
  @Post('oauth/google')
  startOAuth(@Res() res: Response) {
    const state = generateCSRFState();
    const cognitoUrl = `https://auth.rainersoft.com.br/oauth2/authorize?` +
      `client_id=${process.env.COGNITO_CLIENT_ID}&` +
      `response_type=code&` +
      `scope=openid+email+profile&` +
      `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
      `state=${state}`;
    
    res.cookie('oauth_state', state, { httpOnly: true, secure: true });
    res.redirect(cognitoUrl);
  }

  @Post('oauth/google/callback')
  async handleOAuthCallback(
    @Body() body: { code: string; state: string },
    @Req() req: Request,
    @Res() res: Response
  ) {
    // Validar state CSRF
    const savedState = req.cookies.oauth_state;
    if (savedState !== body.state) {
      throw new UnauthorizedException('Invalid state');
    }

    // Trocar code por tokens
    const tokens = await this.authService.exchangeCognitoCode(body.code);
    
    // Obter dados do usuário
    const userInfo = await this.authService.getUserInfo(tokens.access_token);
    
    // Criar/atualizar usuário no MongoDB
    const user = await this.userService.findOrCreate({
      cognitoId: userInfo.sub,
      email: userInfo.email,
      fullName: userInfo.name,
      nickname: generateNickname(userInfo.email),
      avatar: userInfo.picture,
      provider: 'google'
    });

    // Retornar tokens + usuário
    res.json({
      user,
      tokens: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        idToken: tokens.id_token
      }
    });
  }
}
```

#### Frontend (Next.js)
```typescript
// components/domain/dashboard/oauth-buttons.tsx
export const OAuthButtons: React.FC = () => {
  const { loginWithGoogle, loginWithGitHub, isLoading } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        onClick={() => loginWithGoogle()}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <GoogleIcon className="w-5 h-5" />
        Continuar com Google
      </Button>
      
      <Button
        variant="outline"
        onClick={() => loginWithGitHub()}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <GitHubIcon className="w-5 h-5" />
        Continuar com GitHub
      </Button>
    </div>
  );
};

// app/dashboard/login/callback/page.tsx
export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithOAuthCallback } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const provider = router.pathname.includes('google') ? 'google' : 'github';

    if (code && state) {
      loginWithOAuthCallback({ code, state, provider })
        .then(() => {
          router.push('/dashboard');
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          router.push('/dashboard/login?error=oauth_failed');
        });
    } else {
      router.push('/dashboard/login?error=missing_params');
    }
  }, [code, state, router, loginWithOAuthCallback]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner size="lg" />
    </div>
  );
}
```

### Context de Autenticação

```typescript
// components/providers/auth-context-provider.tsx
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithOAuthCallback: (data: OAuthCallbackData) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão existente
    checkExistingSession();
  }, []);

  const loginWithOAuthCallback = async (data: OAuthCallbackData) => {
    setIsLoading(true);
    try {
      const response = await authService.oauthCallback(data);
      
      // Salvar tokens
      localStorage.setItem('access_token', response.tokens.accessToken);
      localStorage.setItem('refresh_token', response.tokens.refreshToken);
      
      // Setar usuário
      setUser(response.user);
      
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Erro no login OAuth');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      toast.success('Logout realizado');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      loginWithGoogle,
      loginWithGitHub,
      loginWithOAuthCallback,
      logout,
      register,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 📝 Blog com Editor Rich Text

### Arquitetura do Blog

Sistema de blog completo com **editor rich text Tiptap**, suporte a Markdown e SEO otimizado:

```
📝 BLOG ARCHITECTURE
├─ 📝 Editor Rich Text           (Tiptap + Extensions)
├─ 📄 Markdown Support           (Import/Export)
├─ 🏷️ Categorias & Tags          (Taxonomia)
├─ 📊 Analytics Integration      (GA4 Events)
├─ 🔍 SEO Optimized              (Sitemap + Schema)
├─ 💬 Comments System            (Disqus/Custom)
└─ 📱 Responsive Design          (Mobile First)
```

### Editor Tiptap Configurado

```typescript
// lib/blog/editor.ts
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';

export const useBlogEditor = (initialContent = '') => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        codeBlock: false, // Usar CodeBlockLowlight
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 bg-gray-50 font-semibold',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // Auto-save logic
      const content = editor.getHTML();
      debouncedSave(content);
    },
  });
};

// components/domain/blog/blog-editor.tsx
export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialContent,
  onSave,
  readOnly = false
}) => {
  const editor = useBlogEditor(initialContent);

  if (!editor) {
    return <LoadingSpinner />;
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      {!readOnly && (
        <div className="border-b p-2 flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          >
            Code
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          >
            H1
          </button>
          {/* More toolbar buttons */}
        </div>
      )}
      
      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        readOnly={readOnly}
        className="p-4 min-h-[400px]"
      />
    </div>
  );
};
```

### Sistema de Posts

```typescript
// lib/blog/post-service.ts
export class PostService {
  async getPosts(options: GetPostsOptions = {}): Promise<PostListResponse> {
    const { page = 1, limit = 10, category, tag, search } = options;
    
    const response = await apiClient.get('/posts', {
      params: { page, limit, category, tag, search }
    });
    
    return {
      posts: response.data.posts,
      total: response.data.total,
      page,
      limit,
      totalPages: Math.ceil(response.data.total / limit)
    };
  }

  async getPost(slug: string): Promise<Post> {
    const response = await apiClient.get(`/posts/${slug}`);
    return response.data;
  }

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await apiClient.post('/posts', data);
    return response.data;
  }

  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    const response = await apiClient.put(`/posts/${id}`, data);
    return response.data;
  }

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  }

  // Markdown export/import
  async exportToMarkdown(id: string): Promise<string> {
    const response = await apiClient.get(`/posts/${id}/markdown`);
    return response.data.markdown;
  }

  async importFromMarkdown(markdown: string, metadata: PostMetadata): Promise<Post> {
    const response = await apiClient.post('/posts/import-markdown', {
      markdown,
      metadata
    });
    return response.data;
  }
}

// app/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', params.slug],
    queryFn: () => postService.getPost(params.slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Track page view
  useEffect(() => {
    if (post) {
      analytics.track('blog_post_view', {
        post_id: post.id,
        post_title: post.title,
        post_category: post.category,
      });
    }
  }, [post]);

  if (isLoading) return <BlogPostSkeleton />;
  if (error) return <BlogPostError />;
  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.readingTime} min de leitura</span>
          <span>•</span>
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <div className="flex gap-2 mt-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <BlogContent content={post.content} />
      </div>

      <footer className="mt-12 pt-8 border-t">
        <AuthorBio author={post.author} />
        <ShareButtons post={post} />
        <RelatedPosts posts={post.relatedPosts} />
      </footer>
    </article>
  );
}
```

---

## 📊 Dashboard Administrativo

### Arquitetura do Dashboard

Painel administrativo completo com **CRUD operations**, **analytics** e **user management**:

```
📊 DASHBOARD ARCHITECTURE
├─ 👤 User Management           (Profile + Settings)
├─ 📝 Content Management        (Posts + Pages CRUD)
├─ 📈 Analytics Dashboard       (Charts + Metrics)
├─ 🔐 Security Settings         (OAuth + Sessions)
├─ 🎨 Theme Customization       (Colors + Fonts)
├─ 📊 Performance Monitoring    (Core Web Vitals)
└─ 📱 PWA Management            (Install + Updates)
```

### Analytics Dashboard

```typescript
// components/domain/dashboard/analytics-dashboard.tsx
export const AnalyticsDashboard: React.FC = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsService.getDashboardData(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) return <AnalyticsSkeleton />;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Visitas Hoje"
          value={analytics?.todayViews || 0}
          change={analytics?.todayViewsChange || 0}
          icon="eye"
        />
        <MetricCard
          title="Novos Usuários"
          value={analytics?.newUsers || 0}
          change={analytics?.newUsersChange || 0}
          icon="users"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${analytics?.conversionRate || 0}%`}
          change={analytics?.conversionRateChange || 0}
          icon="trending-up"
        />
        <MetricCard
          title="Performance Score"
          value={analytics?.performanceScore || 0}
          change={analytics?.performanceScoreChange || 0}
          icon="zap"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3>Visitas (Últimos 7 dias)</h3>
          </CardHeader>
          <CardContent>
            <VisitsChart data={analytics?.visitsChart || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3>Top Páginas</h3>
          </CardHeader>
          <CardContent>
            <TopPagesList pages={analytics?.topPages || []} />
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <h3>Atividade em Tempo Real</h3>
        </CardHeader>
        <CardContent>
          <RealTimeActivity activities={analytics?.realTimeActivity || []} />
        </CardContent>
      </Card>
    </div>
  );
};

// components/charts/visits-chart.tsx
export const VisitsChart: React.FC<VisitsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => formatDate(value, 'dd/MM')}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(value) => formatDate(value, 'dd/MM/yyyy')}
          formatter={(value) => [value, 'Visitas']}
        />
        <Line 
          type="monotone" 
          dataKey="visits" 
          stroke="#0891b2" 
          strokeWidth={2}
          dot={{ fill: '#0891b2' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
```

### User Profile Management

```typescript
// components/domain/dashboard/user-profile.tsx
export const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateProfileData>({
    defaultValues: {
      fullName: user?.fullName || '',
      nickname: user?.nickname || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    },
    resolver: zodResolver(updateProfileSchema)
  });

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Perfil do Usuário</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie suas informações pessoais
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="fullName"
              label="Nome Completo"
              error={errors.fullName?.message}
            >
              <Input placeholder="Seu nome completo" />
            </FormField>
            
            <FormField
              control={control}
              name="nickname"
              label="Apelido"
              error={errors.nickname?.message}
            >
              <Input placeholder="Seu apelido" />
            </FormField>
            
            <FormField
              control={control}
              name="bio"
              label="Biografia"
              error={errors.bio?.message}
            >
              <Textarea 
                placeholder="Fale sobre você..." 
                rows={4}
              />
            </FormField>
            
            <FormField
              control={control}
              name="avatar"
              label="URL do Avatar"
              error={errors.avatar?.message}
            >
              <Input placeholder="https://exemplo.com/avatar.jpg" />
            </FormField>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar size="lg" src={user?.avatar} />
              <div>
                <h4 className="font-semibold">{user?.fullName}</h4>
                <p className="text-sm text-muted-foreground">@{user?.nickname}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="font-medium">Email:</span>
                <span className="ml-2">{user?.email}</span>
              </div>
              <div>
                <span className="font-medium">Provider:</span>
                <span className="ml-2">{user?.provider}</span>
              </div>
              <div>
                <span className="font-medium">Membro desde:</span>
                <span className="ml-2">
                  {formatDate(user?.createdAt || '')}
                </span>
              </div>
              {user?.bio && (
                <div>
                  <span className="font-medium">Biografia:</span>
                  <p className="mt-1 text-sm">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
```

---

## 📱 Progressive Web App (PWA)

### Features PWA

Implementação completa de **Progressive Web App** com instalação e suporte offline:

```typescript
// public/manifest.json
{
  "name": "Rainer Portfolio",
  "short_name": "Rainer",
  "description": "Portfolio profissional de Rainer Teixeira",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0891b2",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["portfolio", "developer", "technology"],
  "lang": "pt-BR",
  "dir": "ltr"
}

// hooks/use-pwa.ts (importado de @rainersoft/ui)
export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if PWA is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
      analytics.track('pwa_install_accepted');
    } else {
      analytics.track('pwa_install_dismissed');
    }

    setDeferredPrompt(null);
  };

  return {
    isInstallable,
    isInstalled,
    install
  };
};

// components/pwa/install-prompt.tsx
export const InstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, install } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || isInstalled || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="font-semibold">Instale o App</h4>
          <p className="text-sm text-muted-foreground">
            Instale o portfolio como um aplicativo no seu dispositivo
          </p>
        </div>
        <Button size="sm" onClick={install}>
          Instalar
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setDismissed(true)}
        >
          ×
        </Button>
      </div>
    </div>
  );
};
```

### Service Worker para Offline

```typescript
// public/sw.js
const CACHE_NAME = 'rainer-portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/offline');
            }
          });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <WifiOffIcon className="w-16 h-16 mx-auto text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Você está offline</h1>
        <p className="text-muted-foreground mb-6">
          Verifique sua conexão com a internet. Algumas funcionalidades podem não estar disponíveis.
        </p>
        <Button onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}
```

---

## 📈 Analytics e Monitoring

### Sistema de Analytics

Implementação completa de **analytics tracking** com Google Analytics 4 e eventos customizados:

```typescript
// lib/tracking/analytics.ts
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export class Analytics {
  private static instance: Analytics;
  private isInitialized = false;

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    if (!GA_ID) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
  }

  track(event: string, parameters?: Record<string, any>) {
    if (!this.isInitialized) return;

    window.gtag('event', event, {
      ...parameters,
      custom_map: {
        custom_parameter_1: 'parameter_1',
        custom_parameter_2: 'parameter_2',
      },
    });
  }

  // Custom events for portfolio
  trackPageView(path: string) {
    this.track('page_view', {
      page_path: path,
      page_title: document.title,
    });
  }

  trackProjectView(projectId: string, projectTitle: string) {
    this.track('project_view', {
      project_id: projectId,
      project_title: projectTitle,
      category: 'portfolio',
    });
  }

  trackContactFormSubmit(formData: Record<string, string>) {
    this.track('contact_form_submit', {
      form_type: 'contact',
      has_message: !!formData.message,
      has_phone: !!formData.phone,
    });
  }

  trackBlogPostView(postId: string, postTitle: string, category: string) {
    this.track('blog_post_view', {
      post_id: postId,
      post_title: postTitle,
      post_category: category,
    });
  }

  trackOAuthLogin(provider: string) {
    this.track('oauth_login', {
      provider,
      method: 'oauth',
    });
  }

  trackPWAInstall(outcome: 'accepted' | 'dismissed') {
    this.track('pwa_install', {
      outcome,
    });
  }

  trackDownload(type: string, url: string) {
    this.track('download', {
      download_type: type,
      download_url: url,
    });
  }
}

export const analytics = Analytics.getInstance();

// hooks/use-analytics.ts
export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    // Initialize analytics
    analytics.init();

    // Track page views
    const handleRouteChange = (path: string) => {
      analytics.trackPageView(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return {
    track: analytics.track.bind(analytics),
    trackProjectView: analytics.trackProjectView.bind(analytics),
    trackContactFormSubmit: analytics.trackContactFormSubmit.bind(analytics),
    trackBlogPostView: analytics.trackBlogPostView.bind(analytics),
    trackOAuthLogin: analytics.trackOAuthLogin.bind(analytics),
    trackPWAInstall: analytics.trackPWAInstall.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
  };
};

// Usage in components
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { trackProjectView } = useAnalytics();

  const handleClick = () => {
    trackProjectView(project.id, project.title);
    // Navigate to project
  };

  return (
    <Card onClick={handleClick}>
      {/* Project content */}
    </Card>
  );
};
```

### Performance Monitoring

```typescript
// lib/monitoring/performance.ts
export class PerformanceMonitor {
  static observeCoreWebVitals() {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        analytics.track('lcp', {
          value: Math.round(lastEntry.startTime),
          url: window.location.pathname,
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // First Input Delay (FID)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          analytics.track('fid', {
            value: Math.round(entry.processingStart - entry.startTime),
            url: window.location.pathname,
          });
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });

        analytics.track('cls', {
          value: Math.round(clsValue * 1000) / 1000,
          url: window.location.pathname,
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Start observing
    observeLCP();
    observeFID();
    observeCLS();
  }

  static measurePageLoad() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      analytics.track('page_load', {
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        totalTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
        url: window.location.pathname,
      });
    });
  }

  static measureComponentRender(componentName: string) {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = Math.round(endTime - startTime);
      
      analytics.track('component_render', {
        component: componentName,
        renderTime,
        url: window.location.pathname,
      });
    };
  }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  PerformanceMonitor.observeCoreWebVitals();
  PerformanceMonitor.measurePageLoad();
}
```

---

## 🎯 SEO Avançado

### Implementação SEO

SEO otimizado com **sitemaps**, **schema.org** e **metadados dinâmicos**:

```typescript
// lib/seo/sitemap.ts
export async function generateSitemap(): Promise<string> {
  const baseUrl = 'https://rainersoft.com.br';
  
  // Get all pages
  const pages = [
    { url: '/', priority: 1.0, changeFreq: 'weekly' },
    { url: '/sobre', priority: 0.8, changeFreq: 'monthly' },
    { url: '/contato', priority: 0.7, changeFreq: 'monthly' },
    { url: '/blog', priority: 0.9, changeFreq: 'daily' },
  ];

  // Get all blog posts
  const posts = await postService.getPosts({ limit: 100 });
  const postPages = posts.posts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: 0.8,
    changeFreq: 'weekly' as const,
    lastMod: post.updatedAt,
  }));

  // Combine all pages
  const allPages = [...pages, ...postPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(page => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastMod || new Date().toISOString()}</lastmod>
          <changefreq>${page.changeFreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return sitemap;
}

// app/sitemap.xml/route.ts
export async function GET() {
  const sitemap = await generateSitemap();
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

// lib/seo/schema.ts
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: DESENVOLVEDOR.nome,
    jobTitle: DESENVOLVEDOR.titulo,
    url: SITE_CONFIG.url,
    email: DESENVOLVEDOR.email,
    telephone: DESENVOLVEDOR.telefone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
    sameAs: [
      REDES_SOCIAIS.github.url,
      REDES_SOCIAIS.linkedin.url,
      REDES_SOCIAIS.twitter.url,
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Web Development',
      'Full-Stack Development',
    ],
  };
}

export function generateBlogPostingSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.fullName,
      url: `${SITE_CONFIG.url}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await postService.getPost(params.slug);
  
  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.excerpt,
    keywords: [...post.tags, ...post.category.split(' ')],
    authors: [{ name: post.author.fullName }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.fullName],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };
}
```

---

## ♿ Acessibilidade WCAG 2.1

### Implementação A11y

Acessibilidade completa com **WCAG 2.1 AA compliance** e suporte a screen readers:

```typescript
// hooks/use-accessibility.ts
export const useAccessibility = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    motionQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };
    
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const updateFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size);
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : 
      size === 'normal' ? '16px' : '18px';
  };

  return {
    reducedMotion,
    highContrast,
    fontSize,
    updateFontSize,
  };
};

// components/accessible/skip-link.tsx
export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Pular para o conteúdo principal
    </a>
  );
};

// components/accessible/focus-trap.tsx
export const FocusTrap: React.FC<{ children: ReactNode; isOpen: boolean }> = ({
  children,
  isOpen
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  return <div ref={containerRef}>{children}</div>;
};

// Accessible button component
export const AccessibleButton: React.FC<{
  children: ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}> = ({ children, onClick, ariaLabel, ariaDescribedBy }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
    >
      {children}
    </button>
  );
};
```

---

## 🎯 Próximos Passos

1. **Deploy**: Configure [07-DEPLOY](../07-DEPLOY/)
2. **Testes**: Veja [08-TESTES](../08-TESTES/)
3. **Contribuição**: Explore [09-CONTRIBUICAO](../09-CONTRIBUICAO/)

---

## 📚 Referências

- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [Tiptap Documentation](https://www.tiptap.dev/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
