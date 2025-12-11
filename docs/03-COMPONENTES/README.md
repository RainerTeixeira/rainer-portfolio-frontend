# 🧩 03-COMPONENTES - Componentes React

## 📋 Índice da Seção

- [Visão Geral dos Componentes](#-visão-geral-dos-componentes)
- [Estrutura de Componentes](#-estrutura-de-componentes)
- [Componentes de Domínio](#-componentes-de-domínio)
- [Componentes de Layout](#-componentes-de-layout)
- [Providers e Contexts](#-providers-e-contexts)
- [Biblioteca @rainersoft/ui](#-biblioteca-rainersoftui)
- [Padrões e Best Practices](#-padrões-e-best-practices)

---

## 🎯 Visão Geral dos Componentes

### Arquitetura de Componentes

O projeto segue uma arquitetura **domain-first** com separação clara:

```
🧦 COMPONENT ARCHITECTURE
├─ 📁 domain/          # ✅ Específicos do portfolio
├─ 📁 layout/          # ✅ Estrutura da aplicação
├─ 📁 providers/       # ✅ Contexts React
├─ 📁 icons/           # ✅ Ícones customizados
├─ 📁 cookies/         # ✅ Gestão de cookies
└─ 📁 skills/          # ✅ Display de habilidades
```

### Principais Características

- **TypeScript Strict**: Todos componentes tipados
- **Composition over Inheritance**: Componentes compostos
- **Props Interface**: Interfaces explícitas para props
- **Error Boundaries**: Tratamento de erros visuais
- **Performance**: Memoização onde necessário
- **Accessibility**: WCAG 2.1 AA compliance

---

## 📂 Estrutura de Componentes

### Domain Components (Específicos do Portfolio)

```typescript
components/domain/
├── 📁 home/                    # Página inicial
│   ├── 📄 hero-section.tsx     # Hero principal
│   ├── 📄 services-section.tsx # Lista de serviços
│   └── 📄 portfolio-showcase.tsx # Showcase de projetos
├── 📁 sobre/                   # Página sobre
│   ├── 📄 about-section.tsx    # Biografia e habilidades
│   └── 📄 experience-timeline.tsx # Timeline de experiência
├── 📁 contato/                 # Página de contato
│   ├── 📄 contact-form.tsx     # Formulário de contato
│   └── 📄 faq-section.tsx      # FAQ interativo
├── 📁 blog/                    # Blog posts
│   ├── 📄 post-card.tsx        # Card de post
│   ├── 📄 post-content.tsx     # Conteúdo do post
│   └── 📄 post-list.tsx        # Listagem de posts
└── 📁 dashboard/               # Área administrativa
    ├── 📄 user-profile.tsx     # Perfil do usuário
    ├── 📄 analytics-card.tsx   # Cards de analytics
    └── 📄 content-editor.tsx   # Editor de conteúdo
```

### Layout Components (Estrutura da Aplicação)

```typescript
components/layout/
├── 📄 navbar.tsx               # Barra de navegação
├── 📄 footer.tsx               # Rodapé
└── 📄 app-wrapper.tsx          # Wrapper principal com providers
```

### Providers (Contexts React)

```typescript
components/providers/
├── 📄 auth-context-provider.tsx # Contexto de autenticação
├── 📄 theme-provider.tsx        # Contexto de tema
└── 📄 analytics-provider.tsx    # Contexto de analytics
```

---

## 🏠 Componentes de Domínio

### Home Components

#### HeroSection
```typescript
// components/domain/home/hero-section.tsx
interface HeroSectionProps {
  animated?: boolean;
  onCTAClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  animated = true,
  onCTAClick
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold">
          {CONTEUDO_HERO.titulo}
        </h1>
        <p className="text-xl mt-4">
          {CONTEUDO_HERO.subtitulo}
        </p>
        <Button onClick={onCTAClick} size="lg">
          {CONTEUDO_HERO.cta.texto}
        </Button>
      </motion.div>
    </section>
  );
};
```

#### ServicesSection
```typescript
// components/domain/home/services-section.tsx
interface ServicesSectionProps {
  limit?: number;
  showAll?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  limit = 6,
  showAll = false
}) => {
  const services = showAll 
    ? SERVICOS.lista 
    : SERVICOS.lista.slice(0, limit);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          {SERVICOS.titulo}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### PortfolioShowcase
```typescript
// components/domain/home/portfolio-showcase.tsx
interface PortfolioShowcaseProps {
  featured?: boolean;
  category?: string;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  featured = true,
  category
}) => {
  const projects = useMemo(() => {
    let filtered = PROJETOS.lista;
    
    if (featured) {
      filtered = filtered.filter(p => p.destaque);
    }
    
    if (category) {
      filtered = filtered.filter(p => p.categoria === category);
    }
    
    return filtered;
  }, [featured, category]);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Projetos em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Sobre Components

#### AboutSection
```typescript
// components/domain/sobre/about-section.tsx
export const AboutSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              {DESENVOLVEDOR.nome}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {BIO.paragrafo1}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {BIO.paragrafo2}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Métricas Principais
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.values(METRICAS).map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Contato Components

#### ContactForm
```typescript
// components/domain/contato/contact-form.tsx
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await contatoService.sendContact(data);
      toast.success('Mensagem enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar mensagem');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields implementation */}
    </form>
  );
};
```

---

## 🏗️ Componentes de Layout

### Navbar
```typescript
// components/layout/navbar.tsx
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-background'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavigationMenu />
          <div className="flex items-center space-x-4">
            <ThemeToggle onClick={toggleTheme} />
            {user ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
```

### Footer
```typescript
// components/layout/footer.tsx
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-sm text-muted-foreground">
              {BIO.paragrafo1}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <NavigationLinks />
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ContactInfo />
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <SocialLinks />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {DESENVOLVEDOR.nome}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
```

---

## 🔄 Providers e Contexts

### AuthContextProvider
```typescript
// components/providers/auth-context-provider.tsx
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      // Store tokens
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    // OAuth implementation
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    // Clear tokens
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithGoogle,
      loginWithGitHub,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🎨 Biblioteca @rainersoft/ui

### Componentes Disponíveis

```typescript
// Import de componentes genéricos
import {
  // Formulários
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  
  // Layout
  Card,
  Container,
  Grid,
  Flex,
  
  // Feedback
  Toast,
  Alert,
  Badge,
  Spinner,
  
  // Navegação
  Navigation,
  Breadcrumb,
  Tabs,
  
  // Display
  Avatar,
  Image,
  Video,
  
  // Overlays
  Modal,
  Dialog,
  Drawer,
  Tooltip,
  
  // Data
  Table,
  List,
  Pagination
} from '@rainersoft/ui';
```

### Hooks Disponíveis

```typescript
import {
  useIsMobile,     // < 768px
  usePWA,          // PWA features
  useLocalStorage,
  useDebounce,
  useClickOutside,
  useKeyboard,
  useScroll,
  useTheme,
  useMediaQuery
} from '@rainersoft/ui';
```

---

## 🎯 Padrões e Best Practices

### 1. Component Pattern

```typescript
// ✅ Interface explícita
interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  children?: ReactNode;
}

// ✅ Componente funcional com TypeScript
export const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onAction,
  children
}) => {
  // Implementation
};

// ✅ Default props
Component.defaultProps = {
  description: '',
  onAction: () => {}
};
```

### 2. Composition Pattern

```typescript
// ✅ Componentes compostos
export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div className="rounded-lg border bg-card p-6" {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

// Uso
<Card>
  <CardHeader>
    <h3>Título</h3>
  </CardHeader>
  <CardContent>
    <p>Conteúdo</p>
  </CardContent>
</Card>
```

### 3. Performance Pattern

```typescript
// ✅ Memoização para componentes pesados
export const ExpensiveComponent = React.memo<ExpensiveProps>(
  ({ data, onUpdate }) => {
    const processedData = useMemo(() => {
      return heavyProcessing(data);
    }, [data]);

    return (
      <div>
        {/* Render processed data */}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.data.id === nextProps.data.id;
  }
);

// ✅ Callback memoizado
export const ComponentWithCallbacks: React.FC = ({ items }) => {
  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

### 4. Error Boundary Pattern

```typescript
// ✅ Error boundary para componentes
export class ComponentErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
    // Send to error tracking
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-red-800 font-semibold">Algo deu errado</h3>
          <p className="text-red-600 text-sm mt-1">
            Tente recarregar a página
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🎯 Próximos Passos

1. **Constants**: Explore [04-CONSTANTS](../04-CONSTANTS/)
2. **Bibliotecas**: Veja [05-LIBRARIES](../05-LIBRARIES/)
3. **Features**: Configure [06-FEATURES](../06-FEATURES/)

---

## 📚 Referências

- [React Documentation](https://react.dev/)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/components)
- [TypeScript React](https://www.typescriptlang.org/docs/handbook/react.html)
- [@rainersoft/ui Documentation](../05-LIBRARIES/RAINERSOFT_UI.md)
