#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# Script: Limpar Ambiente
# Descrição: Limpa cache e arquivos temporários do Next.js
# ═══════════════════════════════════════════════════════════════════════════

CLEAN_CACHE=false
CLEAN_ALL=false

# Processar argumentos
while [[ $# -gt 0 ]]; do
    case $1 in
        --cache)
            CLEAN_CACHE=true
            shift
            ;;
        --all)
            CLEAN_ALL=true
            shift
            ;;
        *)
            shift
            ;;
    esac
done

# Cores
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
WHITE='\033[1;37m'
CYAN='\033[0;36m'
NC='\033[0m'

clear
echo ""
echo "   ╔═══════════════════════════════════════════════════════════════════════════╗"
echo -e "   ║                    ${WHITE}🧹 LIMPANDO AMBIENTE${NC}                                 ║"
echo "   ╚═══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Navegar para o diretório raiz
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

if [ "$CLEAN_ALL" = true ]; then
    echo -e "   ${RED}🗑️  LIMPEZA COMPLETA...${NC}"
    echo ""
    
    [ -d ".next" ] && rm -rf .next && echo -e "   ${GREEN}✅ .next removido${NC}"
    [ -d "node_modules/.cache" ] && rm -rf node_modules/.cache && echo -e "   ${GREEN}✅ node_modules/.cache removido${NC}"
    [ -d "coverage" ] && rm -rf coverage && echo -e "   ${GREEN}✅ coverage removido${NC}"
    [ -d ".turbo" ] && rm -rf .turbo && echo -e "   ${GREEN}✅ .turbo removido${NC}"
    
    echo ""
    echo -e "   ${GREEN}✨ Limpeza completa finalizada!${NC}"
elif [ "$CLEAN_CACHE" = true ] || [ "$CLEAN_ALL" = false ]; then
    echo -e "   ${YELLOW}🧹 LIMPANDO CACHE...${NC}"
    echo ""
    
    [ -d ".next" ] && rm -rf .next && echo -e "   ${GREEN}✅ .next removido${NC}"
    [ -d "node_modules/.cache" ] && rm -rf node_modules/.cache && echo -e "   ${GREEN}✅ node_modules/.cache removido${NC}"
    
    echo ""
    echo -e "   ${GREEN}✨ Cache limpo!${NC}"
    if [ "$CLEAN_ALL" = false ]; then
        echo ""
        echo -e "   ${CYAN}💡 Use --all para limpeza completa (inclui coverage, .turbo)${NC}"
    fi
fi

echo ""

