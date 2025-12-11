# 🤝 09-CONTRIBUICAO - Guia de Contribuição

## 📋 Índice da Seção

- [Visão Geral da Contribuição](#-visão-geral-da-contribuição)
- [Como Começar](#-como-começar)
- [Setup do Ambiente](#-setup-do-ambiente)
- [Fluxo de Trabalho](#-fluxo-de-trabalho)
- [Padrões de Código](#-padrões-de-código)
- [Processo de Pull Request](#-processo-de-pull-request)
- [Tipos de Contribuição](#-tipos-de-contribuição)
- [Recompensas e Reconhecimento](#-recompensas-e-reconhecimento)

---

## 🎯 Visão Geral da Contribuição

### Bem-vindo ao Ecossistema Rainer!

Este projeto faz parte do **ecossistema open source @rainersoft** e valorizamos contribuições de todos os tipos:

```
🤝 CONTRIBUTION TYPES
├─ 💻 Code Contributions      (Features, Fixes, Refactoring)
├─ 📝 Documentation           (Docs, Guides, Examples)
├─ 🐛 Bug Reports             (Issues, Edge Cases)
├─ 💡 Feature Requests        (Ideias, Improvements)
├─ 🎨 Design & UX             (UI/UX, Accessibility)
├─ 🧪 Testing & QA            (Tests, Performance)
└─ 📢 Community               (Support, Feedback, Promotion)
```

### Nossa Filosofia

- **Acessibilidade**: Código e documentação claros para todos os níveis
- **Qualidade**: Testes, TypeScript e melhores práticas em tudo
- **Colaboração**: Respeito, comunicação aberta e aprendizado mútuo
- **Inovação**: Ideias novas e pensamento crítico construtivo
- **Sustentabilidade**: Código manutenível e documentação atualizada

---

## 🚀 Como Começar

### Pré-requisitos

```bash
# Software necessário
- Node.js 18+ 
- pnpm 10+
- Git 2.30+
- VS Code (recomendado)
- Conta GitHub

# Conhecimentos desejáveis
- React/Next.js intermediário
- TypeScript avançado
- Tailwind CSS
- Jest/Playwright
- Git flow
```

### Primeiros Passos

1. **Fork o Repositório**
   ```bash
   # Via GitHub UI
   # 1. Acesse https://github.com/rainersoft/rainer-portfolio-frontend
   # 2. Clique em "Fork"
   # 3. Escolha sua conta como destino
   ```

2. **Clone seu Fork**
   ```bash
   git clone https://github.com/SEU_USERNAME/rainer-portfolio-frontend.git
   cd rainer-portfolio-frontend
   ```

3. **Configure Remotes**
   ```bash
   # Adicionar upstream (repositório original)
   git remote add upstream https://github.com/rainersoft/rainer-portfolio-frontend.git
   
   # Verificar configuração
   git remote -v
   # origin    https://github.com/SEU_USERNAME/rainer-portfolio-frontend.git (fetch)
   # upstream  https://github.com/rainersoft/rainer-portfolio-frontend.git (fetch)
   ```

---

## 🛠️ Setup do Ambiente

### Instalação e Configuração

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar ambiente local
cp .env.example .env.local

# 3. Editar variáveis de ambiente
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development

# 4. Instalar bibliotecas do ecossistema (local)
cd ../rainer-design-tokens && pnpm install && pnpm run build
cd ../rainer-ui && pnpm install && pnpm run build
cd ../rainer-utils && pnpm install && pnpm run build
cd ../rainer-portfolio-frontend

# 5. Iniciar desenvolvimento
pnpm run dev
```

### VS Code Setup

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}

// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one",
    "ms-playwright.playwright"
  ]
}
```

### Git Hooks Setup

```bash
# Husky já configurado no projeto
# Hooks disponíveis:
- pre-commit: lint + format + type-check
- pre-push: test + coverage
- commit-msg: conventional commits

# Instalar hooks (automático com pnpm install)
pnpm run prepare

# Testar hooks manualmente
pnpm run pre-commit
pnpm run pre-push
```

---

## 🔄 Fluxo de Trabalho

### Git Flow Simplificado

```bash
# 1. Manter seu fork atualizado
git checkout main
git pull upstream main
git push origin main

# 2. Criar branch para sua feature
git checkout -b feature/nome-da-feature

# 3. Desenvolver sua feature
# - Faça commits pequenos e descritivos
# - Teste suas mudanças
# - Mantenha o código limpo

# 4. Fazer commits seguindo Conventional Commits
git add .
git commit -m "feat: add new contact form validation"

# 5. Push para seu fork
git push origin feature/nome-da-feature

# 6. Abrir Pull Request
# - Via GitHub UI
# - Preencher template PR
# - Aguardar review

# 7. Após merge, limpar branches locais
git checkout main
git pull upstream main
git branch -d feature/nome-da-feature
```

### Conventional Commits

```bash
# Estrutura: <type>[optional scope]: <description>

# Types permitidos:
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação (sem mudança de código)
refactor: Refatoração (sem feature ou bug)
perf:     Melhoria de performance
test:     Adição ou correção de testes
chore:    Tarefas de build/maintenance

# Exemplos:
git commit -m "feat(auth): add OAuth Google integration"
git commit -m "fix(contact): resolve form validation edge case"
git commit -m "docs(readme): update installation instructions"
git commit -m "test(hero): add unit tests for hero component"
git commit -m "refactor(utils): optimize string formatting functions"
```

### Branch Naming

```bash
# Padrão: <type>/<description>

feat/add-blog-editor
fix/contact-form-validation
docs/update-api-documentation
refactor/oauth-service-architecture
test/add-e2e-scenarios
chore/update-dependencies

# Exemplos práticos:
feature/oauth-github-integration
bugfix/mobile-navigation-menu
hotfix/security-vulnerability-patch
release/v2.3.0-preparation
```

---

## 📝 Padrões de Código

### TypeScript Standards

```typescript
// ✅ Boas práticas
interface UserConfig {
  readonly id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const UserService = {
  async getUser(id: string): Promise<UserConfig | null> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      logger.error('Failed to get user', { id, error });
      return null;
    }
  }
};

// �️ Evitar
function getUser(id) {  // sem tipagem
  return fetch('/users/' + id);  // sem tratamento de erro
}
```

### React Component Patterns

```typescript
// ✅ Componente funcional com TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ✅ Custom Hook pattern
interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout: useCallback(async () => {
      await authService.logout();
      setUser(null);
    }, [])
  };
};
```

### CSS/Tailwind Patterns

```typescript
// ✅ Component styling com Tailwind
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ✅ Responsive design
export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
          Hero Title
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Hero description
        </p>
      </div>
    </section>
  );
};
```

### Testing Patterns

```typescript
// ✅ Test structure padrão
describe('ComponentName', () => {
  const defaultProps = {
    // props padrão
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<ComponentName {...defaultProps} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('should render with custom props', () => {
      render(<ComponentName {...defaultProps} customProp="value" />);
      expect(screen.getByText('value')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should handle click events', async () => {
      const handleClick = jest.fn();
      render(<ComponentName {...defaultProps} onClick={handleClick} />);
      
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      render(<ComponentName {...defaultProps} />);
      
      await userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });
});

// ✅ Mock patterns
jest.mock('@/lib/api/services', () => ({
  userService: {
    getUser: jest.fn(),
    updateUser: jest.fn(),
  },
}));

// ✅ Integration test pattern
describe('User Flow Integration', () => {
  it('should complete user registration flow', async () => {
    render(<RegistrationPage />);
    
    // Fill form
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    
    // Submit
    await userEvent.click(screen.getByRole('button', { name: 'Register' }));
    
    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Registration successful')).toBeInTheDocument();
    });
  });
});
```

---

## 🔄 Processo de Pull Request

### Template de PR

```markdown
<!-- PR Template (.github/pull_request_template.md) -->

## 📋 Descrição
Breve descrição do que esta PR implementa.

## 🎯 Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] 💥 Breaking change
- [ ] 📝 Documentação
- [ ] 🎨 UI/UX improvement
- [ ] ⚡ Performance improvement
- [ ] 🧪 Testes

## 📝 Checklist
- [ ] Eu li e segui o [CONTRIBUTING.md](../docs/09-CONTRIBUICAO/)
- [ ] Meu código segue os padrões de estilo do projeto
- [ ] Eu realizei autoreview do meu próprio código
- [ ] Eu adicionei testes que cobrem minhas mudanças
- [ ] Todos os novos testes estão passando
- [ ] Eu atualizei a documentação se necessário
- [ ] Meus commits seguem Conventional Commits

## 🧪 Testes
- [ ] Unit tests: `pnpm test`
- [ ] Integration tests: `pnpm test:integration`
- [ ] E2E tests: `pnpm test:e2e`
- [ ] Performance tests: `pnpm test:performance`

## 📸 Screenshots (se aplicável)
Adicione screenshots antes/depois para mudanças de UI.

## 🔗 Issues Relacionados
Fixes #(issue number)

## 💬 Comentários Adicionais
Qualquer contexto adicional ou considerações.
```

### Processo de Review

```bash
# 1. Abrir PR com template preenchido
# 2. Aguardar aprovação automatizada (CI/CD)
# 3. Review manual dos maintainers
# 4. Solicitar mudanças se necessário
# 5. Aprovação e merge
# 6. Deploy automático
```

### Critérios de Merge

- ✅ Todos os testes passando
- ✅ Cobertura de testes mantida ou aumentada
- ✅ Code review aprovado por pelo menos 1 maintainer
- ✅ CI/CD passando com sucesso
- ✅ Documentação atualizada se necessário
- ✅ Conventional commits seguidos

---

## 💡 Tipos de Contribuição

### 1. Code Contributions

#### Bug Fixes
```bash
# Encontrar e reportar bugs
- Issues bem documentados
- Passos para reproduzir
- Environment details
- Screenshots se aplicável

# Corrigir bugs
- Branch: fix/bug-description
- Tests para reproduzir bug
- Tests para verificar fix
- Documentação se necessário
```

#### Features
```bash
# Propor novas features
- Issue de discussão primeiro
- Casos de uso claros
- Design/UX consideration
- Impact analysis

# Implementar features
- Branch: feature/feature-name
- Component-based development
- TypeScript strict
- Tests completos
- Documentação
```

#### Refactoring
```bash
# Melhorar código existente
- Manter funcionalidade
- Melhorar performance
- Aumentar legibilidade
- Reduzir complexidade
- Atualizar dependências
```

### 2. Documentation Contributions

#### Melhorar Docs
```markdown
# Tipos de documentação necessária:
- README.md improvements
- API documentation
- Code examples
- Tutorials and guides
- Architecture decisions
- Troubleshooting guides
```

#### Exemplos Práticos
```typescript
// Adicionar exemplos de uso:
// docs/examples/auth-example.ts
import { useAuth } from '@/hooks/use-auth';

export function AuthExample() {
  const { user, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <Loading />;
  
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={login} />
      )}
    </div>
  );
}
```

### 3. Design & UX Contributions

#### UI/UX Improvements
```typescript
// Melhorias de acessibilidade:
- ARIA labels e roles
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus indicators

// Design system:
- Component consistency
- Responsive design
- Micro-interactions
- Loading states
- Error states
```

### 4. Testing Contributions

#### Test Coverage
```typescript
// Adicionar testes para:
- Component rendering
- User interactions
- API integration
- Error handling
- Edge cases
- Performance scenarios
```

---

## 🏆 Recompensas e Reconhecimento

### Sistema de Contribuição

```bash
# Níveis de contribuidor:
🌱 Contributor: 1+ PRs merged
🌿 Active Contributor: 5+ PRs merged
🌳 Core Contributor: 10+ PRs merged
🌳🌳 Maintainer: 20+ PRs + community leadership

# Benefícios:
- 📛 Contributor badge no README
- 🏅 Menção especial em releases
- 🎖️ Acesso a repositórios privados
- 👥 Convite para maintainer team
- 🎁 Swag exclusivo (camisetas, adesivos)
- 💼 Cartas de recomendação
- 📢 Destaque no blog e redes sociais
```

### Reconhecimento Público

```markdown
## 🏆 Contributors

Agradecemos a todos os contribuidores que tornam este projeto possível!

### Core Contributors
- [@rainersoft](https://github.com/rainersoft) - Project Lead & Architecture
- [@contributor1](https://github.com/contributor1) - UI/UX & Accessibility
- [@contributor2](https://github.com/contributor2) - Testing & QA

### Active Contributors
- [@contributor3](https://github.com/contributor3) - Documentation
- [@contributor4](https://github.com/contributor4) - Bug Fixes

### Recent Contributors
- [@you](https://github.com/your-username) - Latest PR contribution

---

### 📊 Contribution Stats
- 📝 Total Contributors: 25+
- 🔀 Total Pull Requests: 150+
- 🐛 Issues Resolved: 80+
- 📚 Documentation Pages: 50+
```

### Oportunidades Especiais

```bash
# Para contribuidores dedicados:
1. 🎓 Mentoria programa
2. 💼 Oportunidades de freelance
3. 🚀 Co-fundador em novos projetos
4. 📣 Palestras e workshops
5. 🤝 Networking com comunidade
6. 📈 Portfólio de contribuições open source
```

---

## 📞 Comunicação e Suporte

### Canais de Comunicação

```bash
# 📧 Email para dúvidas:
contributions@rainersoft.com.br

# 💬 GitHub Discussions:
- https://github.com/rainersoft/rainer-portfolio-frontend/discussions

# 🐛 Issues e Bugs:
- https://github.com/rainersoft/rainer-portfolio-frontend/issues

# 📱 Redes Sociais:
- Twitter: @rainersoft
- LinkedIn: /in/rainer-teixeira
- GitHub: @rainersoft
```

### Code of Conduct

```markdown
## 🤝 Nosso Compromisso

Para garantir um ambiente acolhedor e produtivo:

- ✅ Respeito e empatia com todos
- ✅ Comunicação construtiva e educada
- ✅ Abertura a diferentes perspectivas
- ✅ Ajuda mútua e compartilhamento de conhecimento
- ✅ Paciência com iniciantes e perguntas
- ❌ Assédio, discriminação ou linguagem ofensiva
- ❌ Spam ou promoção não solicitada
- ❌ Comportamento tóxico ou desrespeitoso
```

---

## 🎯 Próximos Passos

1. **Fork o repositório** e comece a contribuir!
2. **Leia a documentação completa** em [00-LEIA_PRIMEIRO.md](../00-LEIA_PRIMEIRO.md)
3. **Explore os projetos** do ecossistema @rainersoft
4. **Entre na comunidade** e ajude a melhorar o projeto

---

## 📚 Referências Úteis

- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [Playwright Testing](https://playwright.dev/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

---

## 🙏 Agradecimento

**Obrigado por considerar contribuir para este projeto!** 

Cada contribuição, por menor que seja, ajuda a tornar o ecossistema @rainersoft melhor para toda a comunidade. Juntos estamos construindo ferramentas de alta qualidade que fazem a diferença no dia a dia dos desenvolvedores.

**Vamos criar algo incrível juntos! 🚀**
