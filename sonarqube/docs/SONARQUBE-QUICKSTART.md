# 🚀 SonarQube - Guia Rápido

Guia rápido para rodar análise de código com SonarQube localmente.

## ⚡ Início Rápido (com Docker)

### 1. Iniciar o SonarQube

```bash
# Iniciar o servidor SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# Ver os logs (opcional)
docker-compose -f docker-compose.sonarqube.yml logs -f sonarqube
```

Aguarde cerca de 2-3 minutos para o servidor iniciar completamente.

### 2. Acessar a Interface

Abra o navegador em: **http://localhost:9000**

**Login padrão:**
- Usuário: `admin`
- Senha: `admin`

⚠️ **Importante:** Você será solicitado a alterar a senha no primeiro acesso.

### 3. Criar o Projeto

1. Clique em **"Create Project"** → **"Manually"**
2. Preencha:
   - **Project key:** `rainer-portfolio-frontend`
   - **Display name:** `Rainer Portfolio Frontend`
3. Clique em **"Set Up"** → **"Locally"**
4. Gere um token de acesso:
   - Nome do token: `SONAR_TOKEN`
   - Clique em **"Generate"**
   - **Copie e salve o token** (você não verá novamente!)

### 4. Instalar o SonarScanner

#### Windows (PowerShell como Admin)
```powershell
# Opção 1: Chocolatey
choco install sonarscanner

# Opção 2: Scoop
scoop install sonarscanner
```

#### Linux
```bash
sudo apt update
sudo apt install unzip wget
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-*.zip
sudo mv sonar-scanner-* /opt/sonar-scanner
sudo ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner
```

#### macOS
```bash
brew install sonar-scanner
```

**Verificar instalação:**
```bash
sonar-scanner --version
```

### 5. Configurar o Token

**Opção A: Variável de Ambiente (Recomendado)**

```powershell
# Windows (PowerShell)
$env:SONAR_TOKEN="seu-token-aqui"

# Linux/Mac (Bash/Zsh)
export SONAR_TOKEN="seu-token-aqui"
```

**Opção B: Editar `sonar-project.properties`**

Descomente e adicione:
```properties
sonar.login=seu-token-aqui
```

### 6. Executar a Análise

```bash
# Navegar até a pasta do projeto
cd c:\Desenvolvimento\rainer-portfolio-frontend

# Executar análise
npm run sonar:local

# OU
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.login=seu-token-aqui
```

### 7. Ver Resultados

1. Aguarde a análise concluir (1-3 minutos)
2. Acesse: http://localhost:9000
3. Clique no projeto para ver:
   - 🐛 **Bugs**
   - 🔒 **Vulnerabilidades**
   - 💡 **Code Smells**
   - 📊 **Métricas de qualidade**

## 🛑 Parar o SonarQube

```bash
# Parar os containers
docker-compose -f docker-compose.sonarqube.yml down

# Parar e remover volumes (limpa todos os dados)
docker-compose -f docker-compose.sonarqube.yml down -v
```

## 📋 Comandos Úteis

### Docker
```bash
# Ver status dos containers
docker-compose -f docker-compose.sonarqube.yml ps

# Ver logs em tempo real
docker-compose -f docker-compose.sonarqube.yml logs -f

# Reiniciar o SonarQube
docker-compose -f docker-compose.sonarqube.yml restart

# Entrar no container (debug)
docker exec -it sonarqube-local bash
```

### NPM Scripts
```bash
# Análise local
npm run sonar:local

# Análise padrão (usa configuração do sonar-project.properties)
npm run sonar

# Verificações antes da análise
npm run lint:fix
npm run type-check
```

### SonarScanner
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

## 🔍 Análise de Arquivos Específicos

Para analisar apenas arquivos específicos, edite `sonar-project.properties`:

```properties
# Analisar apenas components
sonar.sources=components

# Analisar múltiplos diretórios
sonar.sources=components,hooks,lib
```

## 🎯 Fluxo de Trabalho Recomendado

### Desenvolvimento Diário
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

### Antes de Pull Request
```bash
# Análise completa
npm run lint:fix && npm run type-check && npm run sonar:local

# Verificar resultado no SonarQube
# Garantir que não há novos bugs ou vulnerabilidades
```

## ⚙️ Configurações Importantes

### Quality Gate Padrão
O SonarQube vem com quality gates que podem falhar a análise se:
- **Cobertura < 80%** (se testes configurados)
- **Bugs > 0** em código novo
- **Vulnerabilidades > 0** em código novo
- **Code Smells** com rating D ou E

### Customizar Quality Gates
1. Acesse: http://localhost:9000/quality_gates
2. Crie um novo quality gate ou edite o padrão
3. Ajuste os limites conforme sua necessidade

## 🆘 Problemas Comuns

### SonarQube não inicia
```bash
# Verificar logs
docker-compose -f docker-compose.sonarqube.yml logs sonarqube

# Verificar se a porta 9000 está disponível
netstat -an | findstr 9000  # Windows
lsof -i :9000               # Linux/Mac

# Aumentar memória do Docker Desktop
# Settings → Resources → Memory (mínimo 4GB)
```

### Análise falha
```bash
# Verificar Java
java -version  # Deve ser Java 17+

# Verificar SonarScanner
sonar-scanner --version

# Limpar cache
rm -rf .scannerwork
```

### Token inválido
```bash
# Gerar novo token em:
# http://localhost:9000/account/security

# Atualizar variável de ambiente
$env:SONAR_TOKEN="novo-token"
```

## 📚 Documentação Completa

Para instruções detalhadas, consulte:

- **[SONARQUBE-SETUP.md](./SONARQUBE-SETUP.md)** - Guia completo de instalação
- **[SONARQUBE-FAQ.md](./SONARQUBE-FAQ.md)** - Perguntas frequentes e troubleshooting
- **[SONARQUBE-CHEATSHEET.md](./SONARQUBE-CHEATSHEET.md)** - Referência rápida de comandos
- **[SONARQUBE-INDEX.md](./SONARQUBE-INDEX.md)** - Índice completo da documentação
- **[README.md](../../README.md)** - Documentação principal do projeto

## 🔗 Links Úteis

- **Interface Local:** http://localhost:9000
- **Documentação:** https://docs.sonarqube.org/
- **Regras TypeScript:** https://rules.sonarsource.com/typescript/
- **Community Forum:** https://community.sonarsource.com/

---

**Dica:** Marque esta página nos favoritos para referência rápida! 🔖

