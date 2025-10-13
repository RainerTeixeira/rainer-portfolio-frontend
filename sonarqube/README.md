# 📊 SonarQube - Análise de Qualidade de Código

Pasta centralizada com todos os arquivos e documentação relacionados ao SonarQube.

## 📁 Estrutura

```
sonarqube/
├── docs/                         # 📚 Documentação completa
│   ├── README.md                 # Índice da documentação
│   ├── SONARQUBE-QUICKSTART.md   # ⚡ Guia rápido (5-10 min)
│   ├── SONARQUBE-SETUP.md        # 🔧 Setup completo
│   ├── SONARQUBE-FAQ.md          # ❓ Perguntas frequentes
│   ├── SONARQUBE-CHEATSHEET.md   # 📋 Referência rápida
│   └── SONARQUBE-INDEX.md        # 📍 Índice completo
│
├── docker-compose.sonarqube.yml  # 🐳 Docker Compose
├── sonar-project.properties      # ⚙️  Configuração principal
├── .sonarqube-ignore             # 🚫 Arquivos ignorados
├── env.sonarqube.example         # 🔐 Variáveis de ambiente
├── sonarqube.ps1                 # 💻 Script Windows
├── sonarqube.sh                  # 🐧 Script Linux/Mac
└── sonarqube.yml.example         # 🔄 GitHub Actions exemplo
```

## 🚀 Início Rápido

### 1. Iniciar SonarQube

```bash
# Executar da raiz do projeto
docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d
```

### 2. Acessar Interface

- URL: http://localhost:9000
- Login: `admin` / `admin`

### 3. Configurar Token (Primeira Vez)

```powershell
# Na pasta sonarqube
cd sonarqube
.\configure-token.ps1
```

**OU veja o guia:** [INSTRUCOES-IMEDIATAS.md](sonarqube/INSTRUCOES-IMEDIATAS.md)

### 4. Executar Análise

```bash
# Executar da raiz do projeto
npm run sonar:local

# OU usando o script helper (na pasta sonarqube)
.\sonarqube.ps1 analyze
```

## 📚 Documentação

- **[Início Rápido](docs/SONARQUBE-QUICKSTART.md)** - Comece em 5-10 minutos
- **[Setup Completo](docs/SONARQUBE-SETUP.md)** - Instalação detalhada
- **[FAQ](docs/SONARQUBE-FAQ.md)** - Perguntas frequentes
- **[Cheat Sheet](docs/SONARQUBE-CHEATSHEET.md)** - Referência rápida
- **[Índice Completo](docs/SONARQUBE-INDEX.md)** - Toda documentação

## 🛠️ Scripts Helper

### Windows (PowerShell)

```powershell
# Navegue até a pasta sonarqube
cd sonarqube

# Use os comandos
.\sonarqube.ps1 start    # Iniciar
.\sonarqube.ps1 analyze  # Analisar
.\sonarqube.ps1 stop     # Parar
.\sonarqube.ps1 help     # Ajuda
```

### Linux/Mac (Bash)

```bash
# Navegue até a pasta sonarqube
cd sonarqube

# Use os comandos
./sonarqube.sh start    # Iniciar
./sonarqube.sh analyze  # Analisar
./sonarqube.sh stop     # Parar
./sonarqube.sh help     # Ajuda
```

## 📦 Arquivos de Configuração

### docker-compose.sonarqube.yml
Docker Compose para executar SonarQube localmente. Configurado com volumes persistentes.

### sonar-project.properties
Configuração principal do SonarScanner. Define:
- Diretórios fonte
- Exclusões
- Configurações TypeScript/JavaScript

### .sonarqube-ignore
Lista de arquivos/diretórios ignorados na análise.

### env.sonarqube.example
Exemplo de variáveis de ambiente. Copie para `.env.sonarqube` e configure.

### sonarqube.yml.example
Exemplo de workflow do GitHub Actions para integração CI/CD.

## 🔙 Voltar

- **[← README Principal](../README.md)** - Documentação do projeto
- **[← Raiz do Projeto](../)** - Voltar para raiz

---

**Desenvolvido com ❤️ para garantir código de qualidade!**

