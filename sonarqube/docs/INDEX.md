# 📚 Documentação SonarQube - Rainer Portfolio Frontend

> **Documentação oficial completa para análise de qualidade de código com SonarQube**

---

## 🎯 Visão Geral

Esta documentação fornece todas as informações necessárias para configurar, executar e manter análises de qualidade de código usando **SonarQube** no projeto Rainer Portfolio Frontend.

### O que é SonarQube?

SonarQube é uma plataforma de código aberto para inspeção contínua da qualidade do código, que detecta:

- 🐛 **Bugs** - Erros que podem causar falhas
- 🔒 **Vulnerabilidades** - Problemas de segurança
- 💡 **Code Smells** - Problemas de manutenibilidade
- 📊 **Duplicações** - Código duplicado
- 📈 **Complexidade** - Análise de complexidade ciclomática

---

## 📖 Estrutura da Documentação

### 🚀 Para Começar Rapidamente

**[QUICKSTART.md](./QUICKSTART.md)** ⭐ *Recomendado para iniciantes*

- Configuração em 5-10 minutos
- Passo a passo visual e simples
- Primeira análise garantida

### 🔧 Instalação e Configuração Completa

**[SETUP.md](./SETUP.md)** ⭐⭐ *Para configuração detalhada*

- Instalação do SonarQube (Docker e Manual)
- Configuração avançada
- Integração com CI/CD
- Customização de Quality Gates

### ❓ Problemas e Soluções

**[FAQ.md](./FAQ.md)** ⭐⭐ *Troubleshooting*

- Perguntas frequentes
- Soluções para erros comuns
- Dicas de performance
- Boas práticas

### 📋 Referência Rápida

**[CHEATSHEET.md](./CHEATSHEET.md)** ⭐⭐⭐ *Consulta diária*

- Comandos principais
- Atalhos úteis
- Configurações importantes
- Workflow recomendado

---

## 🗺️ Fluxo de Aprendizado Recomendado

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  INICIANTE → QUICKSTART.md → Executar 1ª análise           │
│                     ↓                                       │
│              CHEATSHEET.md (favoritar)                      │
│                     ↓                                       │
│              Usar regularmente                              │
│                     ↓                                       │
│  AVANÇADO → SETUP.md → Configurações customizadas          │
│                     ↓                                       │
│              FAQ.md (quando necessário)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Início Rápido (3 Comandos)

```powershell
# 1. Iniciar SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# 2. Configurar token (primeira vez)
.\configure-token.ps1

# 3. Ver resultados
# http://localhost:9000
```

**💡 Dica:** Para detalhes completos, consulte [QUICKSTART.md](./QUICKSTART.md)

---

## 📁 Arquivos de Configuração do Projeto

### Arquivos Principais

| Arquivo | Localização | Descrição |
|---------|-------------|-----------|
| `sonar-project.properties` | Raiz do projeto | Configuração principal do SonarQube |
| `docker-compose.sonarqube.yml` | `/sonarqube/` | Docker Compose do SonarQube |
| `configure-token.ps1` | `/sonarqube/docs/` | Script de configuração automática |
| `.env.sonarqube.example` | `/sonarqube/` | Exemplo de variáveis de ambiente |

### Scripts de Gerenciamento

| Script | Plataforma | Descrição |
|--------|-----------|-----------|
| `sonarqube.ps1` | Windows | Gerenciamento completo do SonarQube |
| `sonarqube.sh` | Linux/Mac | Gerenciamento completo do SonarQube |

---

## 🎯 Casos de Uso Comuns

### "Quero começar do zero"

→ [QUICKSTART.md](./QUICKSTART.md) - Guia completo para iniciantes

### "Preciso de ajuda com um erro"

→ [FAQ.md](./FAQ.md) - Perguntas frequentes e troubleshooting

### "Onde está o comando X?"

→ [CHEATSHEET.md](./CHEATSHEET.md) - Referência rápida de todos os comandos

### "Quero configurar algo avançado"

→ [SETUP.md](./SETUP.md) - Guia completo de instalação e configuração

### "Preciso integrar com CI/CD"

→ [SETUP.md - Seção Integração](./SETUP.md#integração-cicd)

---

## 🛠️ Comandos Essenciais

### Gerenciamento do SonarQube

```powershell
# Windows
.\sonarqube.ps1 start     # Iniciar servidor
.\sonarqube.ps1 stop      # Parar servidor
.\sonarqube.ps1 analyze   # Executar análise
.\sonarqube.ps1 status    # Ver status
.\sonarqube.ps1 help      # Ver todos os comandos
```

```bash
# Linux/Mac
./sonarqube.sh start      # Iniciar servidor
./sonarqube.sh stop       # Parar servidor
./sonarqube.sh analyze    # Executar análise
./sonarqube.sh status     # Ver status
./sonarqube.sh help       # Ver todos os comandos
```

### NPM Scripts

```bash
# Análise local (usa localhost:9000)
npm run sonar:local

# Análise com configuração do arquivo
npm run sonar
```

### Docker Direto

```bash
# Iniciar
docker-compose -f docker-compose.sonarqube.yml up -d

# Parar
docker-compose -f docker-compose.sonarqube.yml down

# Ver logs
docker-compose -f docker-compose.sonarqube.yml logs -f

# Status
docker-compose -f docker-compose.sonarqube.yml ps
```

---

## 🌐 Links Importantes

### Interface Local

- **Dashboard:** <http://localhost:9000>
- **Projetos:** <http://localhost:9000/projects>
- **Quality Gates:** <http://localhost:9000/quality_gates>
- **Regras:** <http://localhost:9000/coding_rules>
- **Segurança (Tokens):** <http://localhost:9000/account/security>

### API

- **Status do Sistema:** <http://localhost:9000/api/system/status>
- **Health Check:** <http://localhost:9000/api/system/health>

### Documentação Externa

- **SonarQube Oficial:** <https://docs.sonarqube.org/>
- **Regras TypeScript:** <https://rules.sonarsource.com/typescript/>
- **Community Forum:** <https://community.sonarsource.com/>
- **Stack Overflow:** <https://stackoverflow.com/questions/tagged/sonarqube>

---

## 📊 Workflow de Desenvolvimento Recomendado

### Configuração Inicial (Uma vez)

```powershell
# 1. Iniciar SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# 2. Aguardar inicialização (2-3 minutos)
Start-Sleep -Seconds 180

# 3. Acessar interface e fazer login
# http://localhost:9000 (admin/admin)

# 4. Configurar token
cd sonarqube/docs
.\configure-token.ps1

# 5. Pronto! ✅
```

### Uso Diário

```powershell
# 1. Desenvolver código...

# 2. Antes de commit, verificar qualidade
npm run lint:fix
npm run type-check
.\sonarqube.ps1 analyze

# 3. Revisar issues em http://localhost:9000

# 4. Corrigir problemas reportados

# 5. Commit
git commit -m "feat: nova funcionalidade"
```

---

## ✅ Checklist de Configuração

Use esta checklist para garantir que tudo está configurado:

- [ ] Docker instalado e rodando
- [ ] SonarQube iniciado via Docker Compose
- [ ] Interface acessível em <http://localhost:9000>
- [ ] Login realizado e senha alterada
- [ ] Projeto criado no SonarQube
- [ ] Token gerado e salvo
- [ ] SonarScanner instalado
- [ ] Primeira análise executada com sucesso
- [ ] Resultados visualizados no dashboard
- [ ] Scripts helper testados (opcional)
- [ ] CHEATSHEET.md salvo nos favoritos

---

## 💡 Dicas Profissionais

### 1. Configure Quality Gates Personalizados

- Defina limites adequados ao seu projeto
- Foque em **código novo** vs código legado
- Configure falhas apenas para issues críticos

### 2. Use SonarLint no VS Code

- Feedback em tempo real durante desenvolvimento
- Evita issues antes do commit
- Instale: [SonarLint Extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

### 3. Integre com CI/CD

- Análise automática em cada Pull Request
- Bloqueie merges com issues críticos
- Veja exemplo em `.github/workflows/sonarqube.yml.example`

### 4. Execute Análises Regularmente

- **Diariamente:** Durante desenvolvimento ativo
- **Antes de commits importantes:** Features, refactorings
- **Em cada PR:** Via CI/CD

### 5. Revise Issues Periodicamente

- **Diariamente:** Bugs e vulnerabilidades novas
- **Semanalmente:** Code smells e dívida técnica
- **Mensalmente:** Métricas gerais e tendências

---

## 🆘 Precisa de Ajuda?

### Fluxo de Suporte

1. **Erro ou dúvida específica?**
   → Consulte [FAQ.md](./FAQ.md)

2. **Procurando um comando?**
   → Consulte [CHEATSHEET.md](./CHEATSHEET.md)

3. **Problema de configuração?**
   → Consulte [SETUP.md](./SETUP.md)

4. **Ainda com problemas?**
   → [Community Forum](https://community.sonarsource.com/)
   → [Stack Overflow](https://stackoverflow.com/questions/tagged/sonarqube)

---

## 📈 Métricas e Indicadores

### O que o SonarQube Analisa

| Métrica | Descrição | Importância |
|---------|-----------|-------------|
| **Bugs** | Erros que podem causar falhas | 🔴 Crítico |
| **Vulnerabilities** | Problemas de segurança | 🔴 Crítico |
| **Code Smells** | Problemas de manutenibilidade | 🟡 Importante |
| **Coverage** | Cobertura de testes | 🟢 Desejável |
| **Duplications** | Código duplicado | 🟢 Desejável |
| **Technical Debt** | Tempo para corrigir issues | 🟡 Importante |

### Ratings

- **A** - Excelente (0-5% de issues)
- **B** - Bom (6-10% de issues)
- **C** - Médio (11-20% de issues)
- **D** - Ruim (21-50% de issues)
- **E** - Crítico (>50% de issues)

---

## 🔐 Segurança e Boas Práticas

### Proteção de Tokens

✅ **FAZER:**

- Usar variáveis de ambiente para tokens
- Adicionar `.env.sonarqube` ao `.gitignore`
- Rotacionar tokens periodicamente (recomendado: a cada 6 meses)

❌ **NÃO FAZER:**

- Commitar tokens no código
- Compartilhar tokens publicamente
- Usar o mesmo token para ambientes diferentes

### Exclusões Seguras

```properties
# sonar-project.properties
sonar.exclusions=\
  **/node_modules/**,\
  **/.next/**,\
  **/dist/**,\
  **/*.config.js
```

---

## 📞 Suporte e Contato

### Autor do Projeto

- **Nome:** Rainer Teixeira
- **Email:** <suporte@rainersoft.com.br>
- **Website:** <https://rainersoft.com.br>

### Sobre o SonarQube

- **Website:** <https://www.sonarqube.org/>
- **Documentação:** <https://docs.sonarqube.org/>
- **Community:** <https://community.sonarsource.com/>

---

## 📝 Informações da Documentação

**Versão:** 2.0.0  
**Última Atualização:** 15/10/2025  
**Compatibilidade:** SonarQube 10.x+  
**Ambiente:** Windows, Linux, macOS

---

## 🎓 Recursos Adicionais

### Documentação Relacionada

- [QUICKSTART.md](./QUICKSTART.md) - Guia de início rápido
- [SETUP.md](./SETUP.md) - Instalação e configuração
- [FAQ.md](./FAQ.md) - Perguntas frequentes
- [CHEATSHEET.md](./CHEATSHEET.md) - Referência rápida

### Exemplos de Integração

- GitHub Actions (`.github/workflows/sonarqube.yml.example`)
- GitLab CI/CD
- Azure DevOps
- Jenkins

### Plugins Recomendados

- **SonarLint** - VS Code, IntelliJ, Eclipse
- **SonarQube Scanner** - CLI
- **SonarQube GitHub Plugin** - Integração GitHub

---

## 🎯 Objetivos de Qualidade

### Meta do Projeto

| Métrica | Meta | Status Atual |
|---------|------|--------------|
| Bugs | 0 | - |
| Vulnerabilities | 0 | - |
| Code Smells Rating | A ou B | - |
| Coverage | ≥ 80% | - |
| Duplications | < 3% | - |
| Technical Debt Ratio | < 5% | - |

---

> **💡 Dica Final:** Salve este arquivo nos favoritos e consulte regularmente. A qualidade do código é uma jornada contínua!

---

**Desenvolvido com ❤️ para garantir código de qualidade excepcional!**
