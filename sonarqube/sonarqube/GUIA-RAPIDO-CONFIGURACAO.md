# 🚀 Guia Rápido - Configuração Atual

**Status:** Você está na fase de gerar token e executar a primeira análise!

---

## ✅ Checklist de Progresso

- [x] SonarQube rodando no Docker
- [x] Projeto criado no SonarQube (`rainer-portfolio-frontend`)
- [ ] **Token gerado** ← VOCÊ ESTÁ AQUI
- [ ] Token configurado no sistema
- [ ] Primeira análise executada

---

## 📋 Passo a Passo para Continuar

### **1️⃣ Gerar o Token (Na Interface do SonarQube)**

Você está vendo esta tela agora:

```text
┌─────────────────────────────────────────────┐
│ Forneça um token                             │
│                                              │
│ Nome do token: [_________________]           │
│ Expira em: [1 year ▼]                       │
│                                              │
│ [Gerar]                                      │
└─────────────────────────────────────────────┘
```

**Faça isto:**

1. No campo "Nome do token", digite: `portfolio-analysis`
2. Em "Expira em", deixe: `1 year`
3. Clique em **"Gerar"**
4. **⚠️ COPIE O TOKEN!** (Você só verá uma vez)

Exemplo do token: `squ_a1b2c3d4e5f6g7h8i9j0...`

---

### **2️⃣ Configurar o Token**

Você tem **3 opções**:

#### **OPÇÃO 1: Script Automático (MAIS FÁCIL)** ⭐

```powershell
# Na pasta sonarqube
.\configure-token.ps1
```

Este script irá:

- ✅ Solicitar o token
- ✅ Configurar automaticamente
- ✅ Executar a primeira análise
- ✅ Salvar configurações

#### **OPÇÃO 2: Configuração Manual - PowerShell**

```powershell
# Substitua SEU_TOKEN_AQUI pelo token copiado
$env:SONAR_TOKEN="SEU_TOKEN_AQUI"

# Verificar
echo $env:SONAR_TOKEN
```

#### **OPÇÃO 3: Adicionar no Arquivo**

Edite: `sonarqube/sonar-project.properties`

Descomente e adicione:

```properties
sonar.login=SEU_TOKEN_AQUI
```

---

### **3️⃣ Executar a Primeira Análise**

Depois de configurar o token, execute:

#### **Usando o Script Helper:**

```powershell
# Na pasta sonarqube
.\sonarqube.ps1 analyze
```

#### **Usando NPM:**

```powershell
# Na raiz do projeto
npm run sonar:local
```

#### **Usando SonarScanner Direto:**

```powershell
# Certifique-se de ter instalado: choco install sonarscanner
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.login=SEU_TOKEN_AQUI
```

---

### **4️⃣ Visualizar Resultados**

Após a análise concluir (1-3 minutos):

1. Acesse: <http://localhost:9000>
2. Clique em "Projects"
3. Selecione "rainer-portfolio-frontend"
4. Visualize:
   - 🐛 Bugs
   - 🔒 Vulnerabilidades
   - 💡 Code Smells
   - 📊 Métricas de qualidade

---

## 🎯 Solução Mais Rápida (Tudo de Uma Vez)

Execute este comando após copiar o token:

```powershell
# 1. Configurar token (substitua SEU_TOKEN_AQUI)
$env:SONAR_TOKEN="SEU_TOKEN_AQUI"

# 2. Executar análise
cd sonarqube
.\sonarqube.ps1 analyze
```

---

## 🆘 Problemas Comuns

### ❌ "SonarScanner não encontrado"

**Solução:**

```powershell
# Instalar com Chocolatey
choco install sonarscanner

# OU com Scoop
scoop install sonarscanner

# Verificar instalação
sonar-scanner --version
```

### ❌ "Token inválido"

**Solução:**

1. Verifique se copiou o token corretamente
2. Gere um novo token em: <http://localhost:9000/account/security>
3. Configure novamente

### ❌ "SonarQube não responde"

**Solução:**

```powershell
# Verificar se está rodando
docker ps | Select-String sonarqube

# Se não estiver, iniciar
docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d

# Aguardar 2-3 minutos e verificar status
curl http://localhost:9000/api/system/status
```

---

## 📚 Documentação Completa

Para mais detalhes, consulte:

- **[SONARQUBE-QUICKSTART.md](./docs/SONARQUBE-QUICKSTART.md)** - Guia completo de início rápido
- **[SONARQUBE-SETUP.md](./docs/SONARQUBE-SETUP.md)** - Setup detalhado
- **[SONARQUBE-FAQ.md](./docs/SONARQUBE-FAQ.md)** - Perguntas frequentes
- **[SONARQUBE-CHEATSHEET.md](./docs/SONARQUBE-CHEATSHEET.md)** - Referência rápida

---

## 🎉 Após Concluir

Você terá:

- ✅ SonarQube configurado
- ✅ Primeira análise executada
- ✅ Dashboard com métricas de qualidade
- ✅ Relatório de bugs, vulnerabilidades e code smells

**Workflow futuro:**

```powershell
# Desenvolver código...

# Executar análise
.\sonarqube.ps1 analyze

# Ver resultados
# http://localhost:9000

# Corrigir issues reportados
```

---

**Última atualização:** 13/10/2025  
**Status:** Pronto para gerar token e executar primeira análise!
