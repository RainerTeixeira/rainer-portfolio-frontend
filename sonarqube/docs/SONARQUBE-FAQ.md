# SonarQube - FAQ e Troubleshooting

Perguntas frequentes e soluções para problemas comuns ao usar o SonarQube.

## 📋 Índice

- [Instalação e Configuração](#instalação-e-configuração)
- [Execução e Análise](#execução-e-análise)
- [Erros Comuns](#erros-comuns)
- [Performance](#performance)
- [Integração](#integração)
- [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## Instalação e Configuração

### ❓ Preciso instalar o SonarQube para cada projeto?

**Não!** O SonarQube é um servidor centralizado. Você instala uma vez e pode analisar vários projetos. Cada projeto precisa apenas do SonarScanner e do arquivo de configuração `sonar-project.properties`.

### ❓ Qual a diferença entre SonarQube e SonarCloud?

- **SonarQube:** Servidor auto-hospedado (local ou em sua infraestrutura)
- **SonarCloud:** Serviço em nuvem gerenciado pela SonarSource
  - Gratuito para projetos open source
  - Pago para projetos privados

### ❓ Qual versão do Java preciso?

SonarQube 10.x+ requer **Java 17 ou superior**.

```bash
# Verificar versão
java -version

# Deve mostrar algo como:
# java version "17.0.x" ou superior
```

### ❓ Posso usar o SonarQube sem Docker?

Sim! Você pode baixar o SonarQube manualmente:

1. Baixe de: https://www.sonarsource.com/products/sonarqube/downloads/
2. Extraia o arquivo
3. Execute: `bin/[OS]/sonar.sh start` ou `bin/windows-x86-64/StartSonar.bat`

Mas Docker é mais fácil e recomendado para desenvolvimento local.

---

## Execução e Análise

### ❓ Quanto tempo demora a primeira análise?

Depende do tamanho do projeto:
- **Pequeno** (< 1000 arquivos): 1-2 minutos
- **Médio** (1000-5000 arquivos): 2-5 minutos
- **Grande** (> 5000 arquivos): 5-15 minutos

Análises subsequentes são mais rápidas (análise incremental).

### ❓ Posso analisar apenas arquivos modificados?

Não diretamente, mas o SonarQube foca em **código novo** ao mostrar issues. Configure Quality Gates para falhar apenas em problemas no código novo.

### ❓ Como ignorar arquivos específicos?

Edite `sonar-project.properties`:

```properties
# Ignorar arquivos específicos
sonar.exclusions=\
  **/components/ui/legacy/**,\
  **/deprecated/**,\
  **/*.generated.ts

# Ignorar testes
sonar.test.exclusions=\
  **/*.spec.ts,\
  **/*.test.tsx
```

### ❓ Posso rodar análise offline?

Não completamente. O SonarScanner precisa se conectar ao servidor SonarQube para enviar os resultados. Mas você pode:
1. Rodar servidor local (não precisa de internet)
2. Executar análises sem conectividade externa

---

## Erros Comuns

### ❌ "Insufficient permissions to access this resource"

**Causa:** Token inválido ou sem permissões.

**Solução:**
1. Gere novo token em: http://localhost:9000/account/security
2. Configure: `$env:SONAR_TOKEN = "novo-token"`
3. Ou edite `sonar-project.properties`

### ❌ "You're not authorized to run analysis"

**Causa:** Usuário sem permissão no projeto.

**Solução:**
1. Acesse: http://localhost:9000/admin/projects
2. Vá em **Project Settings → Permissions**
3. Adicione seu usuário com permissão "Execute Analysis"

### ❌ "ERROR: Error during SonarScanner execution - java.lang.OutOfMemoryError"

**Causa:** Memória insuficiente para análise.

**Solução:**

```bash
# Aumentar memória do SonarScanner
export SONAR_SCANNER_OPTS="-Xmx2048m"

# Windows PowerShell
$env:SONAR_SCANNER_OPTS="-Xmx2048m"
```

### ❌ "SonarQube server [http://localhost:9000] can not be reached"

**Causas e Soluções:**

1. **Servidor não está rodando:**
   ```bash
   # Verificar
   docker ps
   
   # Iniciar
   docker-compose -f docker-compose.sonarqube.yml up -d
   ```

2. **Servidor ainda inicializando:**
   - Aguarde 2-3 minutos
   - Verifique logs: `docker-compose -f docker-compose.sonarqube.yml logs -f`

3. **Firewall bloqueando:**
   - Verifique firewall do Windows
   - Permita conexões na porta 9000

### ❌ "Fail to get bootstrap index from server"

**Causa:** SonarQube ainda inicializando ou problemas de conectividade.

**Solução:**
```bash
# Ver status
curl http://localhost:9000/api/system/status

# Deve retornar: {"status":"UP"}
# Se retornar STARTING, aguarde mais
```

### ❌ "No quality profiles have been found, you probably don't have any language plugin installed"

**Causa:** Plugins de linguagem não instalados.

**Solução:**
1. Acesse: http://localhost:9000/admin/marketplace
2. Instale plugins: JavaScript/TypeScript
3. Reinicie o SonarQube

---

## Performance

### ❓ Como melhorar a performance da análise?

**1. Excluir arquivos desnecessários:**
```properties
sonar.exclusions=**/node_modules/**,**/.next/**,**/dist/**
```

**2. Limitar diretórios fonte:**
```properties
# Ao invés de analisar tudo:
sonar.sources=app,components,lib,hooks
```

**3. Desabilitar análise de duplicação:**
```properties
sonar.cpd.exclusions=**/*
```

**4. Aumentar recursos do Docker:**
```yaml
# docker-compose.sonarqube.yml
deploy:
  resources:
    limits:
      memory: 6G
```

### ❓ SonarQube está consumindo muita memória

**Soluções:**

1. **Limitar memória do Docker:**
   - Docker Desktop → Settings → Resources
   - Ajuste Memory para 4-6GB

2. **Limpar dados antigos:**
   ```bash
   # No SonarQube UI:
   # Administration → Projects → Management
   # Delete projetos não utilizados
   ```

3. **Usar PostgreSQL ao invés de H2:**
   - Descomente seção PostgreSQL no `docker-compose.sonarqube.yml`

---

## Integração

### ❓ Como integrar com VS Code?

**SonarLint Extension:**

1. Instale: [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
2. Configure em `.vscode/settings.json`:
```json
{
  "sonarlint.connectedMode.servers": [
    {
      "serverId": "local",
      "serverUrl": "http://localhost:9000",
      "token": "seu-token"
    }
  ],
  "sonarlint.connectedMode.project": {
    "projectKey": "rainer-portfolio-frontend"
  }
}
```

### ❓ Como integrar com GitHub Actions?

Veja o arquivo `.github/workflows/sonarqube.yml.example` para um exemplo completo.

**Resumo:**
1. Adicione secrets no GitHub: `SONAR_TOKEN` e `SONAR_HOST_URL`
2. Use action: `sonarsource/sonarqube-scan-action@master`

### ❓ Como integrar com GitLab CI?

```yaml
# .gitlab-ci.yml
sonarqube:
  image: sonarsource/sonar-scanner-cli:latest
  script:
    - sonar-scanner
      -Dsonar.projectKey=rainer-portfolio-frontend
      -Dsonar.sources=.
      -Dsonar.host.url=$SONAR_HOST_URL
      -Dsonar.login=$SONAR_TOKEN
  only:
    - main
    - merge_requests
```

---

## Dicas e Boas Práticas

### ✅ Configure Quality Gates

Quality Gates definem critérios de qualidade. Configure em:
http://localhost:9000/quality_gates

**Recomendações:**
- **Cobertura mínima:** 80%
- **Bugs em código novo:** 0
- **Vulnerabilidades em código novo:** 0
- **Code Smells:** Rating A ou B

### ✅ Use Análise Diferencial

Foque em **código novo**. Configure para:
- Não falhar em problemas legados
- Falhar apenas em novos bugs/vulnerabilidades
- Melhorar gradualmente a qualidade

### ✅ Revise Regularmente

- **Diariamente:** Code smells críticos
- **Semanalmente:** Dívida técnica
- **Mensalmente:** Métricas gerais

### ✅ Não Ignore Issues sem Motivo

Use `// NOSONAR` apenas quando realmente necessário e sempre com comentário:

```typescript
// NOSONAR: Performance crítica, otimização necessária
const result = complexCalculation();
```

### ✅ Documente Exceções

Se excluir arquivos ou desabilitar regras, documente:

```properties
# Excluir gerados automaticamente pelo Prisma
sonar.exclusions=**/prisma/generated/**
```

### ✅ Execute Antes de Commits Importantes

```bash
# Workflow recomendado
npm run lint:fix
npm run type-check
npm run sonar:local
# Revisar issues
git commit
```

### ✅ Configure Webhooks

Para notificações:
1. http://localhost:9000/admin/webhooks
2. Configure para Slack, Discord, etc.

---

## Comandos Úteis

### Docker

```bash
# Iniciar
docker-compose -f docker-compose.sonarqube.yml up -d

# Parar
docker-compose -f docker-compose.sonarqube.yml down

# Logs
docker-compose -f docker-compose.sonarqube.yml logs -f

# Status
docker-compose -f docker-compose.sonarqube.yml ps

# Reiniciar
docker-compose -f docker-compose.sonarqube.yml restart
```

### Scripts PowerShell/Bash

```bash
# Windows
.\sonarqube.ps1 start
.\sonarqube.ps1 analyze
.\sonarqube.ps1 logs

# Linux/Mac
./sonarqube.sh start
./sonarqube.sh analyze
./sonarqube.sh logs
```

### SonarScanner

```bash
# Análise básica
sonar-scanner

# Com parâmetros
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=token

# Debug mode
sonar-scanner -X

# Verbose
sonar-scanner -Dsonar.verbose=true
```

---

## Recursos Adicionais

### 📚 Documentação

- [Documentação Oficial](https://docs.sonarqube.org/)
- [Regras TypeScript](https://rules.sonarsource.com/typescript/)
- [Community Forum](https://community.sonarsource.com/)

### 🎓 Tutoriais

- [Getting Started](https://docs.sonarqube.org/latest/setup/get-started-2-minutes/)
- [Best Practices](https://docs.sonarqube.org/latest/user-guide/rules/)

### 🔧 Ferramentas

- [SonarLint](https://www.sonarlint.org/) - IDE Extension
- [SonarQube Scanner](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

---

## 💡 Ainda com Problemas?

### 1. Verifique os logs
```bash
docker-compose -f docker-compose.sonarqube.yml logs sonarqube
```

### 2. Verifique o status
```bash
curl http://localhost:9000/api/system/status
```

### 3. Execute em modo debug
```bash
sonar-scanner -X
```

### 4. Consulte a documentação completa
- [SONARQUBE-SETUP.md](./SONARQUBE-SETUP.md)
- [SONARQUBE-QUICKSTART.md](./SONARQUBE-QUICKSTART.md)
- [SONARQUBE-CHEATSHEET.md](./SONARQUBE-CHEATSHEET.md)
- [SONARQUBE-INDEX.md](./SONARQUBE-INDEX.md)

### 5. Busque ajuda
- [Community Forum](https://community.sonarsource.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sonarqube)

---

**Última atualização:** 13/10/2025  
**Contribuições:** Sugestões e melhorias são bem-vindas!

