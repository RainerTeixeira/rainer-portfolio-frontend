#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# Script: Iniciar Desenvolvimento Next.js
# Descrição: Inicia servidor de desenvolvimento Next.js com Turbopack
# ═══════════════════════════════════════════════════════════════════════════

# Cores
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

# Header
clear
echo ""
echo ""
echo "   ╔═══════════════════════════════════════════════════════════════════════════╗"
echo "   ║                                                                           ║"
echo -e "   ║              ${WHITE}🚀  INICIANDO DESENVOLVIMENTO NEXT.JS  🚀${NC}                   ║"
echo "   ║                                                                           ║"
echo -e "   ║                     ${YELLOW}TURBOPACK + HOT RELOAD${NC}                                 ║"
echo "   ║                                                                           ║"
echo "   ╚═══════════════════════════════════════════════════════════════════════════╝"
echo ""
sleep 1

# Verificar Node.js
echo -e "   ${YELLOW}🔍 VERIFICANDO DEPENDÊNCIAS...${NC}"
echo ""

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "   ${GREEN}✅ Node.js: $NODE_VERSION${NC}"
else
    echo -e "   ${RED}❌ Node.js não encontrado!${NC}"
    echo -e "   ${YELLOW}📝 Instale Node.js v18+ em: https://nodejs.org${NC}"
    exit 1
fi

# Verificar npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "   ${GREEN}✅ npm: $NPM_VERSION${NC}"
else
    echo -e "   ${RED}❌ npm não encontrado!${NC}"
    exit 1
fi

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo ""
    echo -e "   ${YELLOW}📦 INSTALANDO DEPENDÊNCIAS...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "   ${RED}❌ Erro ao instalar dependências!${NC}"
        exit 1
    fi
    echo -e "   ${GREEN}✅ Dependências instaladas!${NC}"
fi

echo ""
sleep 1

# Limpar cache se solicitado
if [ "$1" = "--clean" ]; then
    echo -e "   ${YELLOW}🧹 LIMPANDO CACHE...${NC}"
    [ -d ".next" ] && rm -rf .next && echo -e "   ${GREEN}✅ Cache .next removido!${NC}"
    [ -d "node_modules/.cache" ] && rm -rf node_modules/.cache && echo -e "   ${GREEN}✅ Cache node_modules removido!${NC}"
    echo ""
fi

# Navegar para o diretório raiz
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

# Iniciar servidor
echo "   ╔═══════════════════════════════════════════════════════════════════════════╗"
echo "   ║                    🚀 INICIANDO SERVIDOR...                              ║"
echo "   ╚═══════════════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "   ${CYAN}🌐 Servidor será iniciado em: http://localhost:3000${NC}"
echo -e "   ${GRAY}📝 Pressione Ctrl+C para parar o servidor${NC}"
echo ""
sleep 2

npm run dev

