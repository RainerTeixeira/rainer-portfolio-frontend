# 🚀 Guia Rápido - SonarQube com Docker

## 📋 Passo a Passo

### ✅ Passo 1: SonarQube já está rodando
```
Status: ✅ CONCLUÍDO
```

### 🔐 Passo 2: Criar Token de Acesso

1. **Abra o navegador:**
   ```
   http://localhost:9000
   ```

2. **Faça login:**
   - Usuário: `admin`
   - Senha: `admin`
   - ⚠️ Se for o primeiro acesso, será solicitado trocar a senha

3. **Crie o projeto:**
   - Clique em **"Create Project"** → **"Manually"**
   - **Project key:** `rainer-portfolio-frontend`
   - **Display name:** `Rainer Portfolio Frontend`
   - Clique em **"Set Up"** → **"Locally"**

4. **Gere o token:**
   - **Token name:** `rainer-portfolio-token`
   - Clique em **"Generate"**
   - **⚠️ COPIE O TOKEN** (você só verá uma vez!)
   - Exemplo: `sqp_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

### 🔍 Passo 3: Executar Análise

#### Opção 1: Passar token direto

```powershell
cd sonarqube
.\scan-with-token.bat sqp_SEU_TOKEN_AQUI
```

#### Opção 2: Usar variável de ambiente

```powershell
# Configurar token (válido apenas na sessão atual)
$env:SONAR_TOKEN = "sqp_SEU_TOKEN_AQUI"

# Executar análise
cd sonarqube
.\scan-with-token.bat
```

#### Opção 3: Configurar permanentemente

```powershell
# Abrir variáveis de ambiente do sistema
rundll32 sysdm.cpl,EditEnvironmentVariables

# OU criar arquivo .env na pasta sonarqube
echo SONAR_TOKEN=sqp_SEU_TOKEN_AQUI > sonarqube\.env
```

### 📊 Passo 4: Ver Resultados

Após a análise, acesse:
```
http://localhost:9000/dashboard?id=rainer-portfolio-frontend
```

Você verá:
- 🐛 **Bugs** - Erros no código
- 🔒 **Vulnerabilidades** - Problemas de segurança  
- 💡 **Code Smells** - Problemas de qualidade
- 📈 **Cobertura** - Se houver testes configurados
- 📏 **Duplicação** - Código duplicado
- 📊 **Métricas** - Tamanho, complexidade, etc.

## 🎯 Comandos Úteis

### Executar nova análise
```powershell
cd sonarqube
.\scan-with-token.bat
```

### Ver logs do SonarQube
```powershell
cd sonarqube
docker-compose -f docker-compose.sonarqube.yml logs -f
```

### Parar SonarQube
```powershell
cd sonarqube
docker-compose -f docker-compose.sonarqube.yml down
```

### Iniciar SonarQube
```powershell
cd sonarqube
docker-compose -f docker-compose.sonarqube.yml up -d
```

## 🔧 Troubleshooting

### Erro HTTP 401
```
❌ Failed with HTTP 401
```
**Solução:** Token inválido ou não configurado. Gere um novo token.

### SonarQube não responde
```
❌ SonarQube não está rodando
```
**Solução:** Execute:
```powershell
docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d
```
Aguarde 2-3 minutos para inicializar.

### Projeto não existe
```
❌ Project not found
```
**Solução:** Crie o projeto manualmente no SonarQube:
1. Acesse http://localhost:9000
2. Create Project → Manually
3. Project key: `rainer-portfolio-frontend`

### Container não inicia
```
❌ Docker error
```
**Solução:**
1. Verifique se o Docker Desktop está rodando
2. Verifique se a porta 9000 está livre:
   ```powershell
   netstat -ano | findstr :9000
   ```
3. Reinicie o Docker Desktop

## 📚 Documentação Completa

- [README.md](README.md) - Documentação completa
- [SONARQUBE-QUICKSTART.md](docs/SONARQUBE-QUICKSTART.md) - Guia de início rápido
- [SONARQUBE-FAQ.md](docs/SONARQUBE-FAQ.md) - Perguntas frequentes

## 🎉 Pronto!

Agora você pode executar análises de código sempre que quiser com apenas um comando:

```powershell
cd sonarqube && .\scan-with-token.bat
```

---

**💡 Dica:** Adicione o token às variáveis de ambiente do sistema para não precisar configurá-lo toda vez!

