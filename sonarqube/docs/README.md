# 📚 Documentação SonarQube

Bem-vindo à documentação completa do SonarQube para análise de qualidade de código do projeto **Rainer Portfolio Frontend**.

---

## 🚀 Início Rápido

**Primeira vez usando SonarQube?**

👉 **[Comece aqui: QUICKSTART.md](./QUICKSTART.md)**

Configure e execute sua primeira análise em 5-10 minutos!

---

## 📖 Documentação Completa

### 📑 Índice Principal

**[INDEX.md](./INDEX.md)** - Índice completo com toda a documentação organizada

### 📝 Guias Principais

| Documento | Descrição | Público |
|-----------|-----------|---------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Guia de início rápido (5-10 min) | ⭐ Iniciantes |
| **[SETUP.md](./SETUP.md)** | Instalação e configuração completa | ⭐⭐ Avançado |
| **[FAQ.md](./FAQ.md)** | Perguntas frequentes e troubleshooting | ⭐⭐ Todos |
| **[CHEATSHEET.md](./CHEATSHEET.md)** | Referência rápida de comandos | ⭐⭐⭐ Consulta |

---

## 🎯 Por Onde Começar?

### 🆕 Sou Iniciante

```powershell
# 1. Leia o guia rápido
docs/QUICKSTART.md

# 2. Execute a configuração
docker-compose -f docker-compose.sonarqube.yml up -d
cd docs
.\configure-token.ps1

# 3. Consulte quando precisar
docs/CHEATSHEET.md
```

### 🔧 Preciso Configurar Algo Avançado

```powershell
# Consulte o guia completo
docs/SETUP.md
```

### ❌ Estou com um Problema

```powershell
# Veja a FAQ
docs/FAQ.md
```

---

## 📂 Estrutura da Documentação

```
docs/
├── README.md (você está aqui)
├── INDEX.md (índice completo)
├── QUICKSTART.md (início rápido)
├── SETUP.md (configuração completa)
├── FAQ.md (perguntas frequentes)
├── CHEATSHEET.md (referência rápida)
└── configure-token.ps1 (script de configuração)
```

---

## ⚡ Comandos Essenciais

```powershell
# Iniciar SonarQube
docker-compose -f docker-compose.sonarqube.yml up -d

# Configurar token (primeira vez)
cd docs
.\configure-token.ps1

# Executar análise
npm run sonar:local

# Ver resultados
# http://localhost:9000
```

---

## 🔗 Links Rápidos

- **Interface Local:** <http://localhost:9000>
- **Índice Completo:** [INDEX.md](./INDEX.md)
- **Documentação Oficial:** <https://docs.sonarqube.org/>
- **Community:** <https://community.sonarsource.com/>

---

## 💡 Dica

**Salve nos favoritos:** [INDEX.md](./INDEX.md) - É o ponto central de toda a documentação!

---

**Última atualização:** 15/10/2025  
**Versão:** 2.0.0

---

**Desenvolvido com ❤️ para garantir código de qualidade excepcional!**
