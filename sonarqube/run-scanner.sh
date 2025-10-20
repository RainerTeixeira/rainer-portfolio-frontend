#!/bin/bash

# Script para executar SonarScanner via Docker
# Não requer instalação local do SonarScanner

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🔍 Executando SonarScanner via Docker...${NC}"

# Configurações
SONAR_HOST="http://host.docker.internal:9000"
PROJECT_KEY="rainer-portfolio-frontend"
TOKEN="${SONAR_TOKEN:-}"

# Verificar se SonarQube está rodando
if ! docker ps | grep -q "sonarqube-local"; then
    echo -e "${RED}❌ SonarQube não está rodando!${NC}"
    echo -e "${YELLOW}Execute: cd sonarqube && ./sonarqube.sh start${NC}"
    exit 1
fi

echo -e "${GREEN}✅ SonarQube está rodando${NC}"

# Verificar token
if [ -z "$TOKEN" ]; then
    echo -e "${YELLOW}⚠️  Token não configurado. A análise pode falhar se o servidor exigir autenticação.${NC}"
    echo -e "${CYAN}Configure com: export SONAR_TOKEN='seu-token'${NC}"
    echo ""
    read -p "Deseja continuar sem token? (s/N): " response
    if [ "$response" != "s" ] && [ "$response" != "S" ]; then
        exit 0
    fi
fi

# Navegar para a raiz do projeto
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( dirname "$SCRIPT_DIR" )"
cd "$PROJECT_ROOT"

echo ""
echo -e "${CYAN}📁 Diretório do projeto: $PROJECT_ROOT${NC}"
echo -e "${CYAN}🔑 Projeto: $PROJECT_KEY${NC}"
echo -e "${CYAN}🌐 SonarQube: $SONAR_HOST${NC}"
echo ""

# Executar SonarScanner via Docker
echo -e "${GREEN}🚀 Iniciando análise...${NC}"
echo ""

if [ -n "$TOKEN" ]; then
    docker run --rm \
        --network="host" \
        -e SONAR_HOST_URL="$SONAR_HOST" \
        -e SONAR_TOKEN="$TOKEN" \
        -v "$PROJECT_ROOT:/usr/src" \
        sonarsource/sonar-scanner-cli \
        -Dsonar.projectKey=$PROJECT_KEY \
        -Dsonar.sources=app,components,hooks,lib,constants \
        -Dsonar.sourceEncoding=UTF-8 \
        -Dsonar.exclusions="**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts"
else
    docker run --rm \
        --network="host" \
        -e SONAR_HOST_URL="$SONAR_HOST" \
        -v "$PROJECT_ROOT:/usr/src" \
        sonarsource/sonar-scanner-cli \
        -Dsonar.projectKey=$PROJECT_KEY \
        -Dsonar.sources=app,components,hooks,lib,constants \
        -Dsonar.sourceEncoding=UTF-8 \
        -Dsonar.exclusions="**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts"
fi

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Análise concluída com sucesso!${NC}"
    echo -e "${CYAN}📊 Visualize os resultados em: http://localhost:9000/dashboard?id=$PROJECT_KEY${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Erro durante a análise!${NC}"
    echo -e "${YELLOW}Verifique os logs acima para mais detalhes.${NC}"
    echo ""
    exit 1
fi

