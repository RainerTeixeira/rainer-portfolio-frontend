# Configuração do SonarQube Local

Este guia explica como configurar e executar o SonarQube localmente para análise de código do projeto Rainer Portfolio Frontend.

## 📋 Pré-requisitos

- **Java JDK 17 ou superior** - O SonarQube requer Java
- **SonarQube Community Edition** - Servidor de análise
- **SonarScanner** - Cliente para enviar código ao servidor

## 🚀 Instalação

### Instalar Java (se não tiver)

#### Windows

```powershell
# Baixe e instale o Java JDK 17+ de:
# https://www.oracle.com/java/technologies/downloads/
# ou use o OpenJDK
winget install Microsoft.OpenJDK.17
```

#### Linux/Mac

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Mac (usando Homebrew)
brew install openjdk@17
```

Verifique a instalação:

```bash
java -version
```

### Baixar e Configurar o SonarQube

#### Opção A: Download Manual

1. Baixe o SonarQube Community Edition:
   - Acesse: <https://www.sonarsource.com/products/sonarqube/downloads/>
   - Baixe a versão Community Edition

1. Extraia o arquivo:

   ```powershell
   # Windows (PowerShell)
   Expand-Archive -Path sonarqube-*.zip -DestinationPath C:\sonarqube
   ```

1. Inicie o servidor:

   ```powershell
   # Windows
   C:\sonarqube\bin\windows-x86-64\StartSonar.bat
   
   # Linux/Mac
   ./sonarqube/bin/linux-x86-64/sonar.sh start
   ```

#### Opção B: Usando Docker (Recomendado)

```bash
# Pull da imagem
docker pull sonarqube:latest

# Executar container
docker run -d --name sonarqube \
  -p 9000:9000 \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  -v sonarqube_logs:/opt/sonarqube/logs \
  sonarqube:latest
```

### Acessar o SonarQube

1. Aguarde alguns minutos para o servidor iniciar
1. Acesse: <http://localhost:9000>
1. Login padrão:
   - **Usuário:** admin
   - **Senha:** admin
1. Você será solicitado a alterar a senha no primeiro acesso

### Criar um Projeto

1. No SonarQube, clique em **"Create Project"**
1. Escolha **"Manually"**
1. Preencha:
   - **Project key:** `rainer-portfolio-frontend`
   - **Display name:** `Rainer Portfolio Frontend`
1. Clique em **"Set Up"**
1. Escolha **"Locally"**
1. Gere um token:
   - Nome: `portfolio-token`
   - Copie e salve o token gerado

### Instalar o SonarScanner

#### Windows (PowerShell)

```powershell
# Usando Chocolatey
choco install sonarscanner

# Ou baixe manualmente de:
# <https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/>
```

#### Linux (Bash)

```bash
# Baixe e instale
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
unzip sonar-scanner-cli-*.zip
sudo mv sonar-scanner-* /opt/sonar-scanner
sudo ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner
```

#### Mac

```bash
brew install sonar-scanner
```

Verifique a instalação:

```bash
sonar-scanner --version
```

## ⚙️ Configuração do Projeto

### Configurar o Token (Opcional)

Edite o arquivo `sonar-project.properties` e adicione seu token:

```ini
# Descomente e adicione seu token
sonar.login=seu-token-aqui
```

**Ou** use variável de ambiente (mais seguro):

```powershell
# Windows (PowerShell)
$env:SONAR_TOKEN="seu-token-aqui"

# Linux/Mac
export SONAR_TOKEN="seu-token-aqui"
```

### Arquivo de Configuração

O arquivo `sonar-project.properties` já está configurado com:

- **Diretórios fonte:** `app`, `components`, `hooks`, `lib`, `constants`
- **Exclusões:** `node_modules`, `.next`, arquivos de teste, configs
- **Configurações TypeScript/JavaScript**

## 🔍 Executando a Análise

### Método 1: Usando NPM Scripts

```bash
# Análise com servidor local (localhost:9000)
npm run sonar:local

# Ou análise padrão (se configurou o host no arquivo .properties)
npm run sonar
```

### Método 2: Comando Direto

```bash
# Com todas as configurações no arquivo .properties
sonar-scanner

# Ou especificando o servidor e token via CLI
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=seu-token-aqui
```

### Método 3: PowerShell (Windows)

```powershell
# Análise simples
sonar-scanner

# Com parâmetros extras
sonar-scanner `
  -D"sonar.host.url=http://localhost:9000" `
  -D"sonar.login=$env:SONAR_TOKEN"
```

## 📊 Visualizando os Resultados

1. Aguarde a análise concluir (pode levar alguns minutos)
1. Acesse: <http://localhost:9000>
1. Clique no projeto **"Rainer Portfolio Frontend"**
1. Visualize:
   - **Bugs:** Problemas que podem causar erros
   - **Vulnerabilidades:** Problemas de segurança
   - **Code Smells:** Problemas de manutenibilidade
   - **Cobertura:** Se tiver testes configurados
   - **Duplicações:** Código duplicado

## 🎯 Boas Práticas

### 1. Executar Antes de Commits Importantes

```bash
npm run lint:fix
npm run type-check
npm run sonar:local
```

### Ignorar Arquivos Não Relevantes

O arquivo `.sonarqube-ignore` lista arquivos que devem ser ignorados.
Edite conforme necessário.

### Configurar Quality Gates

No SonarQube:

1. Vá em **"Quality Gates"**
1. Configure limites para:
   - Cobertura de código mínima
   - Número máximo de bugs
   - Dívida técnica aceitável

### Integração com CI/CD

Para integrar com GitHub Actions, Azure DevOps, etc:

```yaml
# Exemplo GitHub Actions
- name: SonarQube Scan
  uses: sonarsource/sonarqube-scan-action@master
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

## 🔧 Troubleshooting

### Erro: "Java não encontrado"

```bash
# Verifique se o Java está no PATH
java -version

# Se não estiver, adicione ao PATH
# Windows: Variáveis de Ambiente do Sistema
# Linux/Mac: ~/.bashrc ou ~/.zshrc
export JAVA_HOME=/path/to/java
export PATH=$JAVA_HOME/bin:$PATH
```

### Erro: "sonar-scanner não encontrado"

```bash
# Reinstale o sonar-scanner
# ou adicione ao PATH manualmente
```

### Erro: "Não conecta ao servidor"

```bash
# Verifique se o SonarQube está rodando
# Acesse http://localhost:9000

# Se usando Docker:
docker ps
docker logs sonarqube
```

### Erro: "Análise falha sem mensagem clara"

```bash
# Execute com modo verbose
sonar-scanner -X
```

## 📚 Recursos Adicionais

### Documentação Relacionada
- **[QUICKSTART.md](./QUICKSTART.md)** - Guia de início rápido
- **[FAQ.md](./FAQ.md)** - Perguntas frequentes
- **[CHEATSHEET.md](./CHEATSHEET.md)** - Referência rápida
- **[INDEX.md](./INDEX.md)** - Índice completo

### Links Externos
- [Documentação Oficial SonarQube](https://docs.sonarqube.org/latest/)
- [SonarScanner CLI](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
- [Regras TypeScript/JavaScript](https://rules.sonarsource.com/typescript/)
- [Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)

## 🔄 Atualização do SonarQube

### Docker

```bash
# Parar container
docker stop sonarqube

# Atualizar imagem
docker pull sonarqube:latest

# Reiniciar
docker start sonarqube
```

### Manual

1. Baixe a nova versão
1. Pare o servidor atual
1. Substitua os arquivos
1. Mantenha as pastas `data`, `extensions`, `logs`
1. Inicie o novo servidor

## 💡 Dicas

1. **Execute análises regularmente** - Pelo menos antes de cada release
2. **Configure webhooks** - Para notificações de problemas
3. **Use plugins** - Instale plugins adicionais conforme necessário
4. **Revise as issues** - Não ignore os problemas reportados
5. **Configure exceções** - Use `// NOSONAR` apenas quando necessário

---

**Última atualização:** 13/10/2025
**Versão do SonarQube recomendada:** 10.0+
**Autor:** Rainer Teixeira
