# 🎨 Rainer Portfolio Frontend

Portfólio profissional de **Rainer Teixeira** - Desenvolvedor Full-Stack, construído com Next.js 15, React 19, TypeScript e Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Sobre o Projeto

Portfolio moderno e responsivo desenvolvido com as mais recentes tecnologias web, oferecendo uma experiência profissional e otimizada.

### ✨ Principais Características

- 🎨 **Design Moderno** - Interface profissional e atraente
- 🌓 **Tema Claro/Escuro** - Alternância com persistência no localStorage
- 📱 **100% Responsivo** - Adaptado para todos os dispositivos
- ⚡ **Alta Performance** - Otimizado com Next.js 15 e Server Components
- 🎯 **SEO Otimizado** - Meta tags e structured data
- 🎭 **Animações Fluidas** - Transições suaves com Framer Motion
- ♿ **Acessibilidade** - Seguindo padrões WCAG 2.1
- 📊 **Dashboard Administrativo** - Gerenciamento de conteúdo
- 🔍 **Qualidade de Código** - Análise contínua com SonarQube
- 📖 **Código Documentado** - JSDoc completo em português brasileiro

## 🚀 Começando

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd rainer-portfolio-frontend
```

> 💡 **Nota:** Substitua `<URL_DO_REPOSITORIO>` pela URL do seu repositório Git ou use o caminho do projeto existente.

1. Instale as dependências:

```bash
npm install
# ou
yarn install
```

1. Configure as variáveis de ambiente:

```bash
# Copie o arquivo de exemplo (se houver)
cp .env.example .env.local

# Edite .env.local com suas configurações
```

1. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

1. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📦 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento (com Turbopack)
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
```

### Qualidade de Código

```bash
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint automaticamente
npm run type-check   # Verifica tipos TypeScript
```

### SonarQube

```bash
npm run sonar        # Análise SonarQube (usa config do sonar-project.properties)
npm run sonar:local  # Análise SonarQube local (localhost:9000)
```

### Documentação

```bash
npm run docs         # Gera documentação JSDoc
npm run docs:serve   # Gera e serve a documentação
npm run docs:clean   # Remove documentação gerada
npm run docs:watch   # Gera documentação em modo watch
```

> 📚 **Nota:** Todo o código do projeto está documentado com JSDoc em português brasileiro, incluindo componentes, hooks, utilitários e configurações. A documentação segue padrões profissionais com exemplos de uso, tipos detalhados e comentários inline explicativos.

### Utilitários

```bash
npm run clean        # Limpa arquivos de build (.next, out, dist)
```

> ⚠️ **Atenção Windows:** O comando `clean` usa `rm -rf` que não funciona nativamente no PowerShell. Use `Remove-Item -Recurse -Force .next,out,dist -ErrorAction SilentlyContinue` ou instale o Git Bash.

## 🏗️ Estrutura do Projeto

```text
rainer-portfolio-frontend/
├── app/                              # App Router do Next.js
│   ├── blog/                         # Página do Blog
│   │   └── [slug]/                   # Páginas dinâmicas de posts
│   ├── contato/                      # Página de Contato
│   ├── dashboard/                    # Dashboard administrativo
│   │   └── login/                    # Autenticação
│   ├── sobre/                        # Página Sobre
│   ├── layout.tsx                    # Layout raiz
│   ├── page.tsx                      # Página inicial
│   └── globals.css                   # Estilos globais
├── components/                       # Componentes React (documentados)
│   ├── accessibility/                # Componentes de acessibilidade
│   ├── blog/                         # Componentes do blog
│   │   ├── comments/                 # Sistema de comentários
│   │   ├── search/                   # Busca de posts
│   │   └── social/                   # Compartilhamento social
│   ├── contato/                      # Componentes de contato
│   ├── dashboard/                    # Componentes do dashboard
│   │   ├── charts/                   # Gráficos e visualizações
│   │   ├── hooks/                    # Hooks customizados
│   │   ├── login/                    # Formulários de login
│   │   └── utils/                    # Utilitários do dashboard
│   ├── home/                         # Componentes da home
│   │   └── carousel/                 # Carrossel de projetos
│   ├── layout/                       # Header e Footer
│   ├── providers/                    # Context Providers
│   ├── sobre/                        # Componentes da página sobre
│   ├── theme/                        # Tema claro/escuro
│   └── ui/                           # Componentes UI reutilizáveis
├── constants/                        # Constantes e dados estáticos
├── hooks/                            # Custom React Hooks
├── lib/                              # Utilitários e helpers
├── public/                           # Arquivos estáticos
│   └── images/                       # Imagens do projeto
├── sonarqube/                        # 📊 SonarQube - Análise de Qualidade
│   ├── docs/                         # Documentação completa
│   │   ├── README.md                 # Índice da documentação
│   │   ├── SONARQUBE-QUICKSTART.md   # Guia rápido
│   │   ├── SONARQUBE-SETUP.md        # Setup completo
│   │   ├── SONARQUBE-FAQ.md          # Perguntas frequentes
│   │   ├── SONARQUBE-CHEATSHEET.md   # Referência rápida
│   │   └── SONARQUBE-INDEX.md        # Índice completo
│   ├── docker-compose.sonarqube.yml  # Docker Compose
│   ├── sonar-project.properties      # Configuração principal
│   ├── env.sonarqube.example         # Variáveis de ambiente
│   ├── sonarqube.ps1                 # Script Windows
│   ├── sonarqube.sh                  # Script Linux/Mac
│   └── sonarqube.yml.example         # GitHub Actions exemplo
├── types/                            # Definições TypeScript
└── package.json                      # Dependências e scripts
```

> 💡 **Documentação:** Todos os arquivos TypeScript/React estão documentados com JSDoc profissional em português, incluindo descrições detalhadas, exemplos de uso, tipos e comentários explicativos.

## 🔍 Análise de Qualidade com SonarQube

Este projeto está configurado para análise de qualidade de código com SonarQube.

### ⚡ Início Rápido (com Docker)

#### 1. Iniciar o SonarQube

```bash
# Iniciar o servidor SonarQube
docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d

# Ver os logs (opcional)
docker-compose -f sonarqube/docker-compose.sonarqube.yml logs -f sonarqube
```

Aguarde cerca de 2-3 minutos para o servidor iniciar completamente.

#### 2. Acessar a Interface

Abra o navegador em: **<http://localhost:9000>**

**Login padrão:**

- Usuário: `admin`
- Senha: `admin`

⚠️ **Importante:** Você será solicitado a alterar a senha no primeiro acesso.

#### 3. Criar o Projeto

1. Clique em **"Create Project"** → **"Manually"**
2. Preencha:
   - **Project key:** `rainer-portfolio-frontend`
   - **Display name:** `Rainer Portfolio Frontend`
3. Clique em **"Set Up"** → **"Locally"**
4. Gere um token de acesso:
   - Nome do token: `portfolio-analysis`
   - Clique em **"Generate"**
   - **Copie e salve o token** (você não verá novamente!)

#### 4. Instalar o SonarScanner

##### Windows (PowerShell como Admin)

```powershell
# Opção 1: Chocolatey
choco install sonarscanner

# Opção 2: Scoop
scoop install sonarscanner
```

##### Linux

```bash
sudo apt update
sudo apt install unzip wget
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-*.zip
sudo mv sonar-scanner-* /opt/sonar-scanner
sudo ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner
```

##### macOS

```bash
brew install sonar-scanner
```

##### Verificar instalação

```bash
sonar-scanner --version
```

#### 5. Configurar o Token

##### Opção A: Variável de Ambiente (Recomendado)

```powershell
# Windows (PowerShell)
$env:SONAR_TOKEN="seu-token-aqui"

# Linux/Mac (Bash/Zsh)
export SONAR_TOKEN="seu-token-aqui"
```

##### Opção B: Editar `sonarqube/sonar-project.properties`

Descomente e adicione:

```properties
sonar.login=seu-token-aqui
```

#### 6. Executar a Análise

```bash
# Navegar até a pasta do projeto
cd c:\Desenvolvimento\rainer-portfolio-frontend

# Executar análise
npm run sonar:local

# OU
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.login=seu-token-aqui
```

#### 7. Ver Resultados

1. Aguarde a análise concluir (1-3 minutos)
2. Acesse: <http://localhost:9000>
3. Clique no projeto para ver:
   - 🐛 **Bugs**
   - 🔒 **Vulnerabilidades**
   - 💡 **Code Smells**
   - 📊 **Métricas de qualidade**

### 🛑 Parar o SonarQube

```bash
# Parar os containers
docker-compose -f sonarqube/docker-compose.sonarqube.yml down

# Parar e remover volumes (limpa todos os dados)
docker-compose -f sonarqube/docker-compose.sonarqube.yml down -v
```

### 📋 Comandos Úteis do SonarQube

#### Docker

```bash
# Ver status dos containers
docker-compose -f sonarqube/docker-compose.sonarqube.yml ps

# Ver logs em tempo real
docker-compose -f sonarqube/docker-compose.sonarqube.yml logs -f

# Reiniciar o SonarQube
docker-compose -f sonarqube/docker-compose.sonarqube.yml restart

# Entrar no container (debug)
docker exec -it sonarqube-local bash
```

#### SonarScanner

```bash
# Análise básica
sonar-scanner

# Análise com parâmetros customizados
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=seu-token-aqui \
  -Dsonar.projectKey=rainer-portfolio-frontend

# Análise com modo verbose (debug)
sonar-scanner -X

# Análise sem aguardar Quality Gate
sonar-scanner -Dsonar.qualitygate.wait=false
```

### 🔍 Análise de Arquivos Específicos

Para analisar apenas arquivos específicos, edite `sonarqube/sonar-project.properties`:

```properties
# Analisar apenas components
sonar.sources=components

# Analisar múltiplos diretórios
sonar.sources=components,hooks,lib
```

### 🎯 Fluxo de Trabalho Recomendado

#### Desenvolvimento Diário

```bash
# 1. Fazer suas alterações no código
# 2. Verificar linter
npm run lint:fix

# 3. Verificar tipos
npm run type-check

# 4. Executar análise SonarQube
npm run sonar:local

# 5. Corrigir issues reportados
# 6. Commit
```

#### Antes de Pull Request

```bash
# Análise completa
npm run lint:fix && npm run type-check && npm run sonar:local

# Verificar resultado no SonarQube
# Garantir que não há novos bugs ou vulnerabilidades
```

### ⚙️ Configurações Importantes

#### Quality Gate Padrão

O SonarQube vem com quality gates que podem falhar a análise se:

- **Cobertura < 80%** (se testes configurados)
- **Bugs > 0** em código novo
- **Vulnerabilidades > 0** em código novo
- **Code Smells** com rating D ou E

#### Customizar Quality Gates

1. Acesse: <http://localhost:9000/quality_gates>
2. Crie um novo quality gate ou edite o padrão
3. Ajuste os limites conforme sua necessidade

### 🆘 Problemas Comuns

#### SonarQube não inicia

```bash
# Verificar logs
docker-compose -f sonarqube/docker-compose.sonarqube.yml logs sonarqube

# Verificar se a porta 9000 está disponível
netstat -an | findstr 9000  # Windows
lsof -i :9000               # Linux/Mac

# Aumentar memória do Docker Desktop
# Settings → Resources → Memory (mínimo 4GB)
```

#### Análise falha

```bash
# Verificar Java
java -version  # Deve ser Java 17+

# Verificar SonarScanner
sonar-scanner --version

# Limpar cache (Linux/Mac)
rm -rf .scannerwork

# Limpar cache (Windows PowerShell)
# Remove-Item -Recurse -Force .scannerwork -ErrorAction SilentlyContinue
```

#### Token inválido

```bash
# Gerar novo token em:
# http://localhost:9000/account/security

# Atualizar variável de ambiente
$env:SONAR_TOKEN="novo-token"
```

### 📚 Documentação Completa do SonarQube

Para mais informações sobre o SonarQube, consulte a documentação completa na pasta `sonarqube/docs/`:

- **[📖 Índice Geral](sonarqube/docs/SONARQUBE-INDEX.md)** - Índice completo de toda documentação
- **[⚡ Guia Rápido](sonarqube/docs/SONARQUBE-QUICKSTART.md)** - Início rápido em 5-10 minutos
- **[🔧 Setup Completo](sonarqube/docs/SONARQUBE-SETUP.md)** - Instalação e configuração detalhada
- **[❓ FAQ](sonarqube/docs/SONARQUBE-FAQ.md)** - Perguntas frequentes e troubleshooting
- **[📋 Cheat Sheet](sonarqube/docs/SONARQUBE-CHEATSHEET.md)** - Referência rápida de comandos

---

### 📚 Instalação Detalhada (Alternativas ao Docker)

#### Requisitos do Sistema

- **Java JDK 17 ou superior**
- **SonarQube Community Edition**
- **SonarScanner**

#### Instalação do Java

##### Windows

```powershell
winget install Microsoft.OpenJDK.17
```

##### Linux/Mac

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Mac (usando Homebrew)
brew install openjdk@17
```

Verificar instalação:

```bash
java -version
```

#### Download Manual do SonarQube

1. Baixe o SonarQube Community Edition:
   - Acesse: <https://www.sonarsource.com/products/sonarqube/downloads/>
   - Baixe a versão Community Edition

2. Extraia o arquivo:

   ```powershell
   # Windows (PowerShell)
   Expand-Archive -Path sonarqube-*.zip -DestinationPath C:\sonarqube
   ```

3. Inicie o servidor:

   ```powershell
   # Windows
   C:\sonarqube\bin\windows-x86-64\StartSonar.bat
   
   # Linux/Mac
   ./sonarqube/bin/linux-x86-64/sonar.sh start
   ```

### 🔄 Atualização do SonarQube

#### Atualização via Docker

```bash
# Parar container
docker stop sonarqube

# Atualizar imagem
docker pull sonarqube:latest

# Reiniciar
docker start sonarqube
```

#### Atualização Manual

1. Baixe a nova versão
2. Pare o servidor atual
3. Substitua os arquivos
4. Mantenha as pastas `data`, `extensions`, `logs`
5. Inicie o novo servidor

### 💡 Dicas e Boas Práticas

1. **Execute análises regularmente** - Pelo menos antes de cada release
2. **Configure webhooks** - Para notificações de problemas
3. **Use plugins** - Instale plugins adicionais conforme necessário
4. **Revise as issues** - Não ignore os problemas reportados
5. **Configure exceções** - Use `// NOSONAR` apenas quando necessário
6. **Ignorar arquivos não relevantes** - Use `.sonarqube-ignore`

### 🔗 Links Úteis

- **Interface Local:** <http://localhost:9000>
- **Documentação Oficial:** <https://docs.sonarqube.org/>
- **Regras TypeScript:** <https://rules.sonarsource.com/typescript/>
- **Quality Gates:** <https://docs.sonarqube.org/latest/user-guide/quality-gates/>
- **Community Forum:** <https://community.sonarsource.com/>

## 🛠️ Tecnologias Principais

### Core

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS

### UI & Animações

- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis
- **[Lucide Icons](https://lucide.dev/)** - Ícones
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de tema

### Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linting
- **[SonarQube](https://www.sonarsource.com/products/sonarqube/)** - Análise de código
- **[JSDoc](https://jsdoc.app/)** - Documentação completa em português

## 📱 Recursos

### 📄 Páginas

- ✅ **Home** - Hero section, portfolio showcase, depoimentos e estatísticas
- ✅ **Sobre** - Informações profissionais, stack tecnológico e equipe
- ✅ **Blog** - Sistema completo de blog com posts dinâmicos
- ✅ **Contato** - Formulário de contato com validação
- ✅ **Dashboard** - Painel administrativo para gerenciar conteúdo

### 🎯 Funcionalidades Principais

- 🌓 **Modo Escuro/Claro** - Alternância de tema com persistência
- 📱 **Design Responsivo** - Mobile-first, tablet e desktop
- ⚡ **Performance Otimizada** - SSR, SSG e otimização de imagens
- ♿ **Acessibilidade** - Navegação por teclado, skip links, alto contraste
- 🎨 **Animações Suaves** - Framer Motion com transições elegantes
- 📧 **Formulário de Contato** - React Hook Form + Zod validation
- 🔼 **Scroll to Top** - Botão flutuante de navegação
- 📊 **Carrossel Interativo** - Showcase de projetos com drag & drop
- 🔍 **Busca de Posts** - Sistema de busca no blog
- 💬 **Sistema de Comentários** - Comentários nos posts do blog
- 📱 **PWA Ready** - Progressive Web App capabilities
- 📖 **Código Documentado** - JSDoc completo em português brasileiro

## 🎨 Temas e Personalização

O projeto suporta temas claro e escuro com persistência usando `next-themes`. A alternância é feita através do componente `ThemeToggle`.

### Cores Principais

- **Primária:** Azul (#0EA5E9)
- **Secundária:** Indigo (#6366F1)
- **Destaque:** Amarelo (#FBBF24)

As cores podem ser customizadas em `tailwind.config.js` e `app/globals.css`.

## 📈 Performance

- ⚡ **Lighthouse Score:** 95+ em todas as métricas
- 🎯 **Core Web Vitals:** Otimizado
- 📦 **Bundle Size:** Otimizado com code splitting
- 🖼️ **Imagens:** Otimizadas com next/image

## 🔒 Segurança

- ✅ Validação de formulários
- ✅ Sanitização de inputs
- ✅ Headers de segurança configurados
- ✅ Análise de vulnerabilidades com SonarQube

## 🚢 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas

- **Netlify**
- **AWS Amplify**
- **Azure Static Web Apps**
- **Docker**

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- ✅ Execute `npm run lint:fix` antes de commitar
- ✅ Execute `npm run type-check` para verificar tipos
- ✅ Execute `npm run sonar:local` para análise de qualidade
- ✅ Siga as convenções de commit (Conventional Commits)
- ✅ Adicione testes quando aplicável
- ✅ Documente novos componentes/funções com JSDoc em português

## 📄 Licença

Este projeto é propriedade de **Rainer Teixeira** e está protegido por direitos autorais.

## 👨‍💻 Autor

- 👤 **Nome:** Rainer Teixeira
- 📧 **Email:** <suporte@rainersoft.com.br>
- 💼 LinkedIn: [linkedin.com/in/rainer-teixeira](https://linkedin.com/in/rainer-teixeira)
- 🐙 GitHub: [@rainerteixeira](https://github.com/rainerteixeira)

## 📞 Suporte

Para questões e suporte:

- 📧 Email: <suporte@rainersoft.com.br>
- 🌐 Website: [rainersoft.com.br](https://rainersoft.com.br)

## 🙏 Agradecimentos

- [Next.js Team](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- Comunidade Open Source

---

## 📝 Changelog

### Versão 1.0.0 (Outubro 2025)

- ✅ Portfolio completo com múltiplas páginas
- ✅ Dashboard administrativo implementado
- ✅ Sistema de blog com posts dinâmicos
- ✅ Tema claro/escuro com persistência
- ✅ Componentes de acessibilidade
- ✅ Integração com SonarQube
- ✅ Documentação completa em JSDoc
- ✅ PWA capabilities
- ✅ Editor de conteúdo com TipTap
- ✅ Sistema de upload de imagens com Cloudinary

---

#### Desenvolvido com ❤️ por Rainer Teixeira

#### Última atualização: 15 de Outubro de 2025
