# 📖 README - Configuração do Token SonarQube

## 🎯 Situação Atual

Você está com o SonarQube rodando e precisa **gerar um token** para executar a primeira análise.

## ⚡ SOLUÇÃO RÁPIDA

### Execute APENAS este comando:

```powershell
cd c:\Desenvolvimento\rainer-portfolio-frontend\sonarqube
.\configure-token.ps1
```

**Este script faz tudo automaticamente para você!**

## 📋 O Que o Script Faz

1. ✅ Verifica se o SonarQube está rodando
2. ✅ Mostra instruções para gerar o token
3. ✅ Solicita que você cole o token
4. ✅ Configura o token automaticamente
5. ✅ Pergunta se quer salvar permanentemente
6. ✅ Executa a primeira análise
7. ✅ Mostra onde ver os resultados

## 🔑 Como Gerar o Token

**Na interface do SonarQube (http://localhost:9000):**

1. No campo **"Nome do token"**: digite `portfolio-analysis`
2. No campo **"Expira em"**: deixe `1 year`
3. Clique em **"Gerar"**
4. **COPIE** o token exibido (algo como: `squ_a1b2c3d4...`)

## 📁 Arquivos Criados

Este projeto já vem com todos os arquivos de configuração prontos:

- ✅ `docker-compose.sonarqube.yml` - Docker Compose do SonarQube
- ✅ `sonar-project.properties` - Configuração do projeto
- ✅ `sonarqube.ps1` - Script de gerenciamento (Windows)
- ✅ `sonarqube.sh` - Script de gerenciamento (Linux/Mac)
- ✅ `configure-token.ps1` - **Script de configuração automática** ⭐
- ✅ `env.sonarqube.example` - Exemplo de variáveis de ambiente

## 📚 Documentação Disponível

### Guias Práticos

- 🚀 **[COMECE-AQUI.md](./COMECE-AQUI.md)** - Guia super visual e simples
- ⚡ **[INSTRUCOES-IMEDIATAS.md](./INSTRUCOES-IMEDIATAS.md)** - Instruções passo a passo
- 📝 **[GUIA-RAPIDO-CONFIGURACAO.md](./GUIA-RAPIDO-CONFIGURACAO.md)** - Guia completo desta fase

### Documentação Completa

- 📖 **[docs/SONARQUBE-QUICKSTART.md](./docs/SONARQUBE-QUICKSTART.md)** - Início rápido (5-10 min)
- 🔧 **[docs/SONARQUBE-SETUP.md](./docs/SONARQUBE-SETUP.md)** - Setup completo
- ❓ **[docs/SONARQUBE-FAQ.md](./docs/SONARQUBE-FAQ.md)** - Perguntas frequentes
- 📋 **[docs/SONARQUBE-CHEATSHEET.md](./docs/SONARQUBE-CHEATSHEET.md)** - Referência rápida
- 📍 **[docs/SONARQUBE-INDEX.md](./docs/SONARQUBE-INDEX.md)** - Índice completo

## 🛠️ Comandos Disponíveis

### Scripts Helper

```powershell
# Configurar token (primeira vez)
.\configure-token.ps1

# Gerenciar SonarQube
.\sonarqube.ps1 start     # Iniciar
.\sonarqube.ps1 stop      # Parar
.\sonarqube.ps1 status    # Ver status
.\sonarqube.ps1 analyze   # Executar análise
.\sonarqube.ps1 logs      # Ver logs
.\sonarqube.ps1 restart   # Reiniciar
.\sonarqube.ps1 clean     # Limpar tudo
.\sonarqube.ps1 help      # Ver ajuda
```

### NPM Scripts

```bash
# Na raiz do projeto
npm run sonar:local       # Análise local
npm run sonar             # Análise padrão
```

### Docker

```bash
# Gerenciar container
docker-compose -f docker-compose.sonarqube.yml up -d    # Iniciar
docker-compose -f docker-compose.sonarqube.yml down     # Parar
docker-compose -f docker-compose.sonarqube.yml logs -f  # Ver logs
docker-compose -f docker-compose.sonarqube.yml ps       # Ver status
```

## 🎯 Workflow Recomendado

### Primeira Configuração

```powershell
# 1. Iniciar SonarQube (se ainda não estiver)
docker-compose -f docker-compose.sonarqube.yml up -d

# 2. Aguardar inicialização (2-3 minutos)
Start-Sleep -Seconds 180

# 3. Acessar interface
# http://localhost:9000 (admin/admin)

# 4. Gerar token na interface
# (seguir instruções visuais)

# 5. Configurar com script
.\configure-token.ps1

# 6. Pronto! 🎉
```

### Desenvolvimento Diário

```powershell
# 1. Fazer alterações no código
# 2. Executar análise
.\sonarqube.ps1 analyze

# 3. Ver resultados
# http://localhost:9000

# 4. Corrigir issues reportados
# 5. Commit
```

## 🆘 Precisa de Ajuda?

### Problema: SonarScanner não instalado

```powershell
# Instalar com Chocolatey
choco install sonarscanner

# OU com Scoop
scoop install sonarscanner

# Verificar
sonar-scanner --version
```

### Problema: SonarQube não responde

```powershell
# Verificar se está rodando
docker ps | Select-String sonarqube

# Se não estiver, iniciar
docker-compose -f docker-compose.sonarqube.yml up -d

# Aguardar e verificar
Start-Sleep -Seconds 120
curl http://localhost:9000/api/system/status
```

### Problema: Token não funciona

1. Gere um novo token em: http://localhost:9000/account/security
2. Copie corretamente (incluindo prefixo `squ_`)
3. Execute novamente: `.\configure-token.ps1`

## 📊 O Que Você Verá Após a Análise

### Dashboard do SonarQube

- **Bugs** 🐛 - Erros que podem causar falhas
- **Vulnerabilidades** 🔒 - Problemas de segurança
- **Code Smells** 💡 - Problemas de manutenibilidade
- **Coverage** 📊 - Cobertura de testes (quando configurado)
- **Duplications** 📋 - Código duplicado
- **Security Hotspots** 🔥 - Pontos sensíveis de segurança

### Métricas Importantes

- **Rating** - De A (excelente) até E (crítico)
- **Technical Debt** - Tempo estimado para corrigir issues
- **Lines of Code** - Linhas de código analisadas
- **Complexity** - Complexidade ciclomática

## 🎓 Recursos de Aprendizado

### Para Iniciantes

1. Leia: [COMECE-AQUI.md](./COMECE-AQUI.md)
2. Execute: `.\configure-token.ps1`
3. Explore: http://localhost:9000
4. Consulte: [SONARQUBE-CHEATSHEET.md](./docs/SONARQUBE-CHEATSHEET.md)

### Para Avançados

1. Configure Quality Gates customizados
2. Integre com CI/CD (GitHub Actions, etc.)
3. Instale SonarLint no VS Code
4. Configure webhooks para notificações
5. Use análise diferencial (foco em código novo)

## 🔗 Links Úteis

- **Interface Local:** http://localhost:9000
- **API Status:** http://localhost:9000/api/system/status
- **Documentação Oficial:** https://docs.sonarqube.org/
- **Regras TypeScript:** https://rules.sonarsource.com/typescript/
- **Community Forum:** https://community.sonarsource.com/

## ✅ Checklist de Sucesso

- [ ] SonarQube rodando no Docker
- [ ] Interface acessível em http://localhost:9000
- [ ] Projeto criado (`rainer-portfolio-frontend`)
- [ ] Token gerado e copiado
- [ ] Script `configure-token.ps1` executado
- [ ] Token configurado com sucesso
- [ ] Primeira análise executada
- [ ] Resultados visualizados no dashboard
- [ ] SonarScanner instalado
- [ ] Workflow de desenvolvimento definido

## 🎉 Conclusão

Após concluir a configuração, você terá:

✅ Análise automática de qualidade de código  
✅ Detecção de bugs e vulnerabilidades  
✅ Métricas de qualidade em tempo real  
✅ Relatórios detalhados de issues  
✅ Histórico de evolução da qualidade  

**Aproveite o SonarQube para manter seu código sempre com alta qualidade!** 🚀

---

**📅 Última atualização:** 13/10/2025  
**👨‍💻 Autor:** Rainer Teixeira  
**📧 Contato:** suporte@rainersoft.com.br  
**🌐 Website:** rainersoft.com.br

---

<div align="center">

**[⬆️ Voltar ao topo](#-readme---configuração-do-token-sonarqube)**

</div>

