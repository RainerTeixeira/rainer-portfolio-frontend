#!/bin/bash

# =============================================================================
# Script para Finalizar Todos os Processos Node.js
# =============================================================================
# Descrição: Mata todos os processos Node.js, npm, pnpm e processos em portas comuns
# Autor: Rainer Teixeira
# =============================================================================

# Cores ANSI
RED='\033[91m'
GREEN='\033[92m'
YELLOW='\033[93m'
CYAN='\033[96m'
BOLD='\033[1m'
RESET='\033[0m'
BG_RED='\033[41m'
WHITE='\033[97m'

clear

echo ""
echo -e "${BG_RED}${WHITE} ╔══════════════════════════════════════════════════════════════════════════╗ ${RESET}"
echo -e "${BG_RED}${WHITE} ║                    🛑 FINALIZAR TODOS PROCESSOS NODE.JS                  ║ ${RESET}"
echo -e "${BG_RED}${WHITE} ╚══════════════════════════════════════════════════════════════════════════╝ ${RESET}"
echo ""

# =============================================================================
# Verificar e matar processos Node.js
# =============================================================================
echo -e "${CYAN}🔍 Verificando processos Node.js ativos...${RESET}"
echo ""

# Contar processos
NODE_COUNT=$(pgrep -f node | wc -l | tr -d ' ')
PNPM_COUNT=$(pgrep -f pnpm | wc -l | tr -d ' ')
NPM_COUNT=$(pgrep -f npm | wc -l | tr -d ' ')
TOTAL=$((NODE_COUNT + PNPM_COUNT + NPM_COUNT))

if [ "$TOTAL" -eq 0 ]; then
    echo -e "${GREEN}✅ Nenhum processo Node.js/npm/pnpm encontrado${RESET}"
    echo ""
    echo -e "${YELLOW}Pressione Enter para fechar...${RESET}"
    read -r
    exit 0
fi

echo -e "${YELLOW}📊 Encontrados ${BOLD}${TOTAL}${RESET} processo(s) Node.js/npm/pnpm${RESET}"
echo ""

# Matar processos node
if [ "$NODE_COUNT" -gt 0 ]; then
    echo -e "${RED}🛑 Finalizando ${NODE_COUNT} processo(s) node...${RESET}"
    pkill -9 node 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Processos node finalizados${RESET}"
    echo ""
fi

# Matar processos pnpm
if [ "$PNPM_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}🔌 Finalizando ${PNPM_COUNT} processo(s) pnpm...${RESET}"
    pkill -9 pnpm 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Processos pnpm finalizados${RESET}"
    echo ""
fi

# Matar processos npm
if [ "$NPM_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}🔌 Finalizando ${NPM_COUNT} processo(s) npm...${RESET}"
    pkill -9 npm 2>/dev/null
    sleep 1
    echo -e "${GREEN}✅ Processos npm finalizados${RESET}"
    echo ""
fi

# Matar processos em portas específicas
PORTS=(3000 4000 5555 6007)
echo -e "${YELLOW}🔌 Verificando portas comuns (3000, 4000, 5555, 6007)...${RESET}"

for PORT in "${PORTS[@]}"; do
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        PROCESS_NAME=$(ps -p "$PID" -o comm= 2>/dev/null)
        echo -e "${YELLOW}   🔌 Finalizando processo na porta ${PORT} (PID: ${PID} - ${PROCESS_NAME})...${RESET}"
        kill -9 "$PID" 2>/dev/null
    fi
done
echo ""

# Verificação final
echo -e "${CYAN}🔍 Verificação final...${RESET}"
sleep 1

REMAINING_NODE=$(pgrep -f node | wc -l | tr -d ' ')
REMAINING_PNPM=$(pgrep -f pnpm | wc -l | tr -d ' ')
REMAINING_NPM=$(pgrep -f npm | wc -l | tr -d ' ')
REMAINING=$((REMAINING_NODE + REMAINING_PNPM + REMAINING_NPM))

if [ "$REMAINING" -gt 0 ]; then
    echo -e "${RED}⚠️  Ainda há ${REMAINING} processo(s) ativo(s)${RESET}"
    echo -e "${YELLOW}💡 Tente executar com sudo: sudo ./matar-node.sh${RESET}"
else
    echo -e "${GREEN}✅ Todos os processos foram finalizados com sucesso!${RESET}"
fi
echo ""

echo -e "${GREEN}🎉 Operação concluída!${RESET}"
echo ""

echo -e "${YELLOW}Pressione Enter para fechar...${RESET}"
read -r

