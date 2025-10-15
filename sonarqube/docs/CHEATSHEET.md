# 📋 SonarQube - Cheat Sheet

Referência rápida para comandos e configurações do SonarQube.

---

## 🚀 Início Rápido

```bash
# 1. Iniciar SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# 2. Acessar interface
# http://localhost:9000 (admin/admin)

# 3. Executar análise
npm run sonar:local
```

---

## 🐳 Docker

### Gerenciamento de Containers

```bash
# Iniciar
docker-compose -f docker-compose.sonarqube.yml up -d

# Parar
docker-compose -f docker-compose.sonarqube.yml down

# Parar e remover tudo (CUIDADO!)
docker-compose -f docker-compose.sonarqube.yml down -v

# Reiniciar
docker-compose -f docker-compose.sonarqube.yml restart

# Ver status
docker-compose -f docker-compose.sonarqube.yml ps

# Ver logs
docker-compose -f docker-compose.sonarqube.yml logs -f

# Logs apenas erros
docker-compose -f docker-compose.sonarqube.yml logs -f | grep ERROR
```

### Manutenção

```bash
# Limpar volumes não utilizados
docker volume prune -f

# Ver volumes
docker volume ls | grep sonarqube

# Entrar no container
docker exec -it sonarqube-local bash

# Ver uso de recursos
docker stats sonarqube-local
```

---

## 🔍 SonarScanner

### Comandos Básicos

```bash
# Análise padrão
sonar-scanner

# Com servidor local
sonar-scanner -Dsonar.host.url=http://localhost:9000

# Com token
sonar-scanner -Dsonar.login=seu-token

# Modo debug
sonar-scanner -X

# Modo verbose
sonar-scanner -Dsonar.verbose=true
```

### Parâmetros Importantes

```bash
sonar-scanner \
  -Dsonar.projectKey=meu-projeto \
  -Dsonar.projectName="Meu Projeto" \
  -Dsonar.projectVersion=1.0.0 \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=token
```

---

## 📝 NPM Scripts

```bash
# Análise local
npm run sonar:local

# Análise padrão
npm run sonar

# Lint + Type Check + Análise
npm run lint:fix && npm run type-check && npm run sonar:local
```

---

## 🛠️ Scripts Helper (Windows/Linux)

### Windows (PowerShell)

```powershell
# Iniciar
.\sonarqube.ps1 start

# Parar
.\sonarqube.ps1 stop

# Status
.\sonarqube.ps1 status

# Análise
.\sonarqube.ps1 analyze

# Logs
.\sonarqube.ps1 logs

# Reiniciar
.\sonarqube.ps1 restart

# Limpar tudo
.\sonarqube.ps1 clean

# Ajuda
.\sonarqube.ps1 help
```

### Linux/Mac (Bash)

```bash
# Tornar executável
chmod +x sonarqube.sh

# Iniciar
./sonarqube.sh start

# Parar
./sonarqube.sh stop

# Status
./sonarqube.sh status

# Análise
./sonarqube.sh analyze

# Logs
./sonarqube.sh logs

# Reiniciar
./sonarqube.sh restart

# Limpar tudo
./sonarqube.sh clean
```

---

## 🔐 Token e Autenticação

### Gerar Token

1. <http://localhost:9000/account/security>
1. Generate Token
1. Copiar token

### Configurar Token

**PowerShell:**

```powershell
$env:SONAR_TOKEN="seu-token-aqui"
```

**Bash:**

```bash
export SONAR_TOKEN="seu-token-aqui"
```

**Arquivo .properties:**

```ini
sonar.login=seu-token-aqui
```

---

## ⚙️ Configuração (sonar-project.properties)

### Básico

```properties
sonar.projectKey=meu-projeto
sonar.projectName=Meu Projeto
sonar.projectVersion=1.0.0
sonar.sources=src,app,components
sonar.sourceEncoding=UTF-8
```

### Exclusões

```properties
# Excluir diretórios
sonar.exclusions=\
  **/node_modules/**,\
  **/.next/**,\
  **/dist/**

# Excluir testes
sonar.test.exclusions=\
  **/*.spec.ts,\
  **/*.test.tsx

# Excluir de cobertura
sonar.coverage.exclusions=\
  **/*.config.js,\
  **/*.config.ts
```

### TypeScript/JavaScript

```properties
sonar.language=ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### Servidor

```properties
sonar.host.url=http://localhost:9000
sonar.login=seu-token
```

---

## 🌐 URLs Importantes

```text
Interface Web:        http://localhost:9000
API Status:           http://localhost:9000/api/system/status
Projetos:             http://localhost:9000/projects
Quality Gates:        http://localhost:9000/quality_gates
Regras:               http://localhost:9000/coding_rules
Security:             http://localhost:9000/account/security
Administration:       http://localhost:9000/admin
```

---

## 📊 API REST

### Status do Sistema

```bash
# Status
curl http://localhost:9000/api/system/status

# Health
curl http://localhost:9000/api/system/health

# Info
curl http://localhost:9000/api/system/info
```

### Projetos

```bash
# Listar projetos
curl -u admin:admin http://localhost:9000/api/projects/search

# Detalhes do projeto
curl -u admin:admin \
  "http://localhost:9000/api/measures/component?component=rainer-portfolio-frontend&metricKeys=bugs,vulnerabilities,code_smells"
```

### Issues

```bash
# Listar issues
curl -u admin:admin \
  "http://localhost:9000/api/issues/search?componentKeys=rainer-portfolio-frontend"
```

---

## 🔧 Troubleshooting Rápido

### Servidor não inicia

```bash
# Ver logs
docker-compose -f docker-compose.sonarqube.yml logs -f

# Verificar memória do Docker
docker info | grep Memory

# Aumentar memória (Docker Desktop → Settings → Resources)
```

### Análise falha

```bash
# Verificar Java
java -version  # Deve ser 17+

# Verificar SonarScanner
sonar-scanner --version

# Limpar cache
rm -rf .scannerwork

# Debug
sonar-scanner -X
```

### Conectividade

```bash
# Testar conexão
curl http://localhost:9000

# Testar API
curl http://localhost:9000/api/system/status

# Verificar firewall
netstat -an | findstr 9000  # Windows
lsof -i :9000               # Linux/Mac
```

---

## 💻 Variáveis de Ambiente

### SonarScanner

```bash
# Token
export SONAR_TOKEN="seu-token"

# URL do servidor
export SONAR_HOST_URL="http://localhost:9000"

# Memória do scanner
export SONAR_SCANNER_OPTS="-Xmx2048m"
```

### SonarQube (Docker)

```bash
# Porta
export SONAR_PORT=9000

# Memória
export SONAR_MEMORY_LIMIT=4G
```

---

## 📦 Arquivos do Projeto

```text
sonar-project.properties       # Configuração principal
docker-compose.sonarqube.yml   # Docker Compose
sonarqube.ps1                  # Script Windows
sonarqube.sh                   # Script Linux/Mac
env.sonarqube.example          # Exemplo variáveis
.sonarqube-ignore              # Arquivos ignorados
```

---

## 📚 Documentação Completa

- **Setup Completo:** [SETUP.md](./SETUP.md)
- **Guia Rápido:** [QUICKSTART.md](./QUICKSTART.md)
- **FAQ:** [FAQ.md](./FAQ.md)
- **Índice:** [INDEX.md](./INDEX.md)
- **README Projeto:** [README.md](../../README.md)

---

## 🎯 Workflow Recomendado

```bash
# 1. Iniciar servidor (primeira vez ou após reiniciar PC)
docker-compose -f docker-compose.sonarqube.yml up -d

# 2. Desenvolver...

# 3. Antes de commit
npm run lint:fix
npm run type-check
npm run sonar:local

# 4. Revisar issues em http://localhost:9000

# 5. Corrigir problemas

# 6. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 7. Ao final do dia (opcional)
docker-compose -f docker-compose.sonarqube.yml stop
```

---

## 🔑 Atalhos Úteis

### Interface Web

- `g` + `h` = Home
- `g` + `p` = Projetos
- `g` + `i` = Issues
- `g` + `r` = Regras
- `g` + `m` = Métricas
- `/` = Busca

---

## 📞 Suporte

- **Docs:** <https://docs.sonarqube.org/>
- **Forum:** <https://community.sonarsource.com/>
- **Stack Overflow:** tag `sonarqube`

---

### Imprima esta página ou salve nos favoritos para referência rápida! 🔖

### Última atualização: 13/10/2025
