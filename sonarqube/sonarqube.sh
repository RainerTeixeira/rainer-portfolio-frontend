#!/bin/bash

#
# SonarQube Manager Script
# Script para gerenciar SonarQube local e executar análises
#
# Autor: Rainer Teixeira
# Versão: 1.0.0
# Requer: Docker e Docker Compose
#

set -e

# Configurações
COMPOSE_FILE="sonarqube/docker-compose.sonarqube.yml"
SONAR_HOST="http://localhost:9000"
PROJECT_KEY="rainer-portfolio-frontend"
SONAR_PROJECT_PROPERTIES="sonarqube/sonar-project.properties"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Funções auxiliares
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}$(printf '=%.0s' {1..60})${NC}"
}

# Verificações
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado!"
        print_info "Instale: https://docs.docker.com/get-docker/"
        exit 1
    fi
}

check_docker_running() {
    if ! docker ps &> /dev/null; then
        print_error "Docker não está rodando!"
        print_info "Inicie o Docker e tente novamente."
        exit 1
    fi
}

check_sonar_scanner() {
    if ! command -v sonar-scanner &> /dev/null; then
        print_warning "SonarScanner não está instalado!"
        print_info "Instale: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/"
        return 1
    fi
    return 0
}

# Função: Iniciar SonarQube
start_sonarqube() {
    print_header "🚀 Iniciando SonarQube..."
    
    check_docker
    check_docker_running
    
    # Verificar se já está rodando
    if [ "$(docker ps -q -f fullName=sonarqube-local)" ]; then
        print_success "SonarQube já está rodando!"
        print_info "Acesse: $SONAR_HOST"
        return 0
    fi
    
    # Iniciar container
    docker-compose -f "$COMPOSE_FILE" up -d
    
    if [ $? -eq 0 ]; then
        print_success "SonarQube iniciado com sucesso!"
        echo ""
        print_info "📊 Aguarde cerca de 2-3 minutos para o servidor iniciar completamente."
        print_info "🌐 Acesse: $SONAR_HOST"
        print_info "👤 Login: admin / Senha: admin (altere no primeiro acesso)"
        echo ""
        print_info "💡 Use './sonarqube.sh logs' para acompanhar o processo de inicialização."
    else
        print_error "Erro ao iniciar SonarQube!"
        exit 1
    fi
}

# Função: Parar SonarQube
stop_sonarqube() {
    print_header "🛑 Parando SonarQube..."
    
    check_docker
    
    docker-compose -f "$COMPOSE_FILE" down
    
    if [ $? -eq 0 ]; then
        print_success "SonarQube parado com sucesso!"
    else
        print_error "Erro ao parar SonarQube!"
        exit 1
    fi
}

# Função: Status
get_status() {
    print_header "📊 Status do SonarQube"
    
    check_docker
    
    # Status do container
    echo ""
    print_info "Container:"
    docker ps -a --filter "fullName=sonarqube-local" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    # Verificar se está rodando
    if [ "$(docker ps -q -f fullName=sonarqube-local)" ]; then
        echo ""
        print_success "Status: RODANDO"
        print_info "🌐 Interface: $SONAR_HOST"
        
        # Testar conectividade
        if curl -s "$SONAR_HOST/api/system/status" &> /dev/null; then
            status=$(curl -s "$SONAR_HOST/api/system/status" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
            print_success "💚 Health: $status"
        else
            print_warning "API ainda não está respondendo (pode estar inicializando)"
        fi
    else
        if [ "$(docker ps -a -q -f fullName=sonarqube-local)" ]; then
            echo ""
            print_warning "Status: PARADO"
        else
            echo ""
            print_warning "Container não existe"
            print_info "Use './sonarqube.sh start' para criar e iniciar."
        fi
    fi
    
    # Volumes
    echo ""
    print_info "Volumes Docker:"
    docker volume ls --filter "fullName=rainer-portfolio-frontend" --format "table {{.Name}}\t{{.Driver}}"
}

# Função: Logs
show_logs() {
    print_header "📜 Logs do SonarQube (Ctrl+C para sair)"
    echo ""
    
    check_docker
    
    docker-compose -f "$COMPOSE_FILE" logs -f sonarqube
}

# Função: Reiniciar
restart_sonarqube() {
    print_header "🔄 Reiniciando SonarQube..."
    
    stop_sonarqube
    sleep 2
    start_sonarqube
}

# Função: Análise
run_analysis() {
    print_header "🔍 Executando análise de código..."
    
    if ! check_sonar_scanner; then
        print_error "Não é possível executar a análise sem o SonarScanner!"
        exit 1
    fi
    
    # Verificar se SonarQube está rodando
    if [ ! "$(docker ps -q -f fullName=sonarqube-local)" ]; then
        print_warning "SonarQube não está rodando!"
        read -p "Deseja iniciar o SonarQube? (s/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            start_sonarqube
            print_info "⏳ Aguardando 30 segundos para o servidor inicializar..."
            sleep 30
        else
            exit 1
        fi
    fi
    
    # Verificar token
    if [ -z "$SONAR_TOKEN" ]; then
        print_warning "Token do SonarQube não configurado!"
        print_info "Configure com: export SONAR_TOKEN='seu-token-aqui'"
        print_info "Ou adicione no arquivo sonar-project.properties"
        echo ""
        read -p "Deseja continuar sem token? (s/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Ss]$ ]]; then
            exit 1
        fi
    fi
    
    # Executar análise
    echo ""
    print_info "🔍 Iniciando análise..."
    
    if [ -n "$SONAR_TOKEN" ]; then
        sonar-scanner \
            -Dsonar.host.url="$SONAR_HOST" \
            -Dsonar.login="$SONAR_TOKEN" \
            -Dsonar.projectKey="$PROJECT_KEY" \
            -Dsonar.projectBaseDir=.
    else
        sonar-scanner \
            -Dsonar.host.url="$SONAR_HOST" \
            -Dsonar.projectKey="$PROJECT_KEY" \
            -Dsonar.projectBaseDir=.
    fi
    
    if [ $? -eq 0 ]; then
        echo ""
        print_success "Análise concluída com sucesso!"
        print_info "📊 Visualize os resultados em: $SONAR_HOST/dashboard?id=$PROJECT_KEY"
    else
        echo ""
        print_error "Erro durante a análise!"
        print_info "Execute com -X para mais detalhes: sonar-scanner -X"
        exit 1
    fi
}

# Função: Limpar
clean_sonarqube() {
    print_header "🧹 Limpando SonarQube e dados..."
    print_warning "⚠️  ATENÇÃO: Isso removerá TODOS os dados do SonarQube!"
    
    read -p "Deseja continuar? (s/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        check_docker
        
        print_info "🛑 Parando containers..."
        docker-compose -f "$COMPOSE_FILE" down -v
        
        print_info "🗑️  Removendo volumes..."
        docker volume prune -f
        
        print_info "🗑️  Removendo cache local..."
        [ -d ".scannerwork" ] && rm -rf .scannerwork
        
        echo ""
        print_success "Limpeza concluída!"
    else
        print_info "Operação cancelada."
    fi
}

# Função: Ajuda
show_help() {
    echo ""
    print_header "📖 SonarQube Manager - Ajuda"
    echo ""
    print_info "USO:"
    echo "  ./sonarqube.sh <ação>"
    echo ""
    
    print_info "AÇÕES DISPONÍVEIS:"
    echo -e "  ${GREEN}start${NC}     - Inicia o servidor SonarQube"
    echo -e "  ${RED}stop${NC}      - Para o servidor SonarQube"
    echo -e "  ${YELLOW}restart${NC}   - Reinicia o servidor SonarQube"
    echo -e "  ${CYAN}status${NC}    - Mostra status do servidor"
    echo -e "  ${CYAN}logs${NC}      - Exibe logs em tempo real"
    echo -e "  ${GREEN}analyze${NC}   - Executa análise de código"
    echo -e "  ${RED}clean${NC}     - Remove containers e dados"
    echo -e "  ${CYAN}help${NC}      - Exibe esta ajuda"
    echo ""
    
    print_info "EXEMPLOS:"
    echo "  ./sonarqube.sh start"
    echo "  ./sonarqube.sh analyze"
    echo "  ./sonarqube.sh logs"
    echo ""
    
    print_info "CONFIGURAÇÃO:"
    echo "  1. Execute: ./sonarqube.sh start"
    echo "  2. Acesse: $SONAR_HOST"
    echo "  3. Login: admin / admin"
    echo "  4. Crie um projeto e gere um token"
    echo "  5. Configure: export SONAR_TOKEN='seu-token'"
    echo "  6. Execute: ./sonarqube.sh analyze"
    echo ""
    
    print_info "MAIS INFORMAÇÕES:"
    echo "  Consulte: SONARQUBE-QUICKSTART.md"
    echo ""
}

# Main
case "${1:-help}" in
    start)
        start_sonarqube
        ;;
    stop)
        stop_sonarqube
        ;;
    status)
        get_status
        ;;
    logs)
        show_logs
        ;;
    restart)
        restart_sonarqube
        ;;
    analyze)
        run_analysis
        ;;
    clean)
        clean_sonarqube
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Ação inválida: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

