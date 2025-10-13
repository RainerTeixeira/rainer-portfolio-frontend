<#
.SYNOPSIS
    Script para gerenciar SonarQube local para análise de código.

.DESCRIPTION
    Este script facilita o gerenciamento do SonarQube Docker e execução de análises.
    Suporta iniciar, parar, verificar status e executar análises.

.PARAMETER Action
    Ação a ser executada: start, stop, status, analyze, logs, restart, clean

.EXAMPLE
    .\sonarqube.ps1 start
    Inicia o servidor SonarQube

.EXAMPLE
    .\sonarqube.ps1 analyze
    Executa análise de código

.NOTES
    Autor: Rainer Teixeira
    Versão: 1.0.0
    Requer: Docker Desktop instalado
#>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet('start', 'stop', 'status', 'analyze', 'logs', 'restart', 'clean', 'help')]
    [string]$Action
)

# Configurações
$ComposeFile = "sonarqube/docker-compose.sonarqube.yml"
$SonarHost = "http://localhost:9000"
$ProjectKey = "rainer-portfolio-frontend"
$SonarProjectProperties = "sonarqube/sonar-project.properties"

# Cores para output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-Docker {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        Write-ColorOutput "❌ Docker não está instalado ou não está no PATH!" $ErrorColor
        Write-ColorOutput "Instale o Docker Desktop: https://www.docker.com/products/docker-desktop" $InfoColor
        return $false
    }
}

function Test-DockerRunning {
    try {
        docker ps | Out-Null
        return $true
    }
    catch {
        Write-ColorOutput "❌ Docker não está rodando!" $ErrorColor
        Write-ColorOutput "Inicie o Docker Desktop e tente novamente." $InfoColor
        return $false
    }
}

function Test-SonarScanner {
    try {
        sonar-scanner --version | Out-Null
        return $true
    }
    catch {
        Write-ColorOutput "⚠️  SonarScanner não está instalado!" $WarningColor
        Write-ColorOutput "Instale com: choco install sonarscanner" $InfoColor
        return $false
    }
}

function Start-SonarQube {
    Write-ColorOutput "🚀 Iniciando SonarQube..." $InfoColor
    
    if (-not (Test-Docker)) { return }
    if (-not (Test-DockerRunning)) { return }
    
    # Verificar se já está rodando
    $running = docker ps --filter "name=sonarqube-local" --format "{{.Names}}"
    if ($running -eq "sonarqube-local") {
        Write-ColorOutput "✅ SonarQube já está rodando!" $SuccessColor
        Write-ColorOutput "Acesse: $SonarHost" $InfoColor
        return
    }
    
    # Iniciar container
    docker-compose -f $ComposeFile up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ SonarQube iniciado com sucesso!" $SuccessColor
        Write-ColorOutput "`n📊 Aguarde cerca de 2-3 minutos para o servidor iniciar completamente." $InfoColor
        Write-ColorOutput "🌐 Acesse: $SonarHost" $InfoColor
        Write-ColorOutput "👤 Login: admin / Senha: admin (altere no primeiro acesso)" $InfoColor
        Write-ColorOutput "`n💡 Use '.\sonarqube.ps1 logs' para acompanhar o processo de inicialização." $InfoColor
    }
    else {
        Write-ColorOutput "❌ Erro ao iniciar SonarQube!" $ErrorColor
    }
}

function Stop-SonarQube {
    Write-ColorOutput "🛑 Parando SonarQube..." $InfoColor
    
    if (-not (Test-Docker)) { return }
    
    docker-compose -f $ComposeFile down
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ SonarQube parado com sucesso!" $SuccessColor
    }
    else {
        Write-ColorOutput "❌ Erro ao parar SonarQube!" $ErrorColor
    }
}

function Get-SonarQubeStatus {
    Write-ColorOutput "📊 Status do SonarQube:" $InfoColor
    Write-ColorOutput "=" * 50 $InfoColor
    
    if (-not (Test-Docker)) { return }
    
    # Status do container
    $containerStatus = docker ps -a --filter "name=sonarqube-local" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    if ($containerStatus) {
        Write-ColorOutput "`nContainer:" $InfoColor
        Write-ColorOutput $containerStatus
        
        # Verificar se está rodando
        $running = docker ps --filter "name=sonarqube-local" --format "{{.Names}}"
        if ($running -eq "sonarqube-local") {
            Write-ColorOutput "`n✅ Status: RODANDO" $SuccessColor
            Write-ColorOutput "🌐 Interface: $SonarHost" $InfoColor
            
            # Testar conectividade
            try {
                $response = Invoke-WebRequest -Uri "$SonarHost/api/system/status" -TimeoutSec 5 -ErrorAction SilentlyContinue
                $status = ($response.Content | ConvertFrom-Json).status
                Write-ColorOutput "💚 Health: $status" $SuccessColor
            }
            catch {
                Write-ColorOutput "⚠️  API ainda não está respondendo (pode estar inicializando)" $WarningColor
            }
        }
        else {
            Write-ColorOutput "`n⚠️  Status: PARADO" $WarningColor
        }
    }
    else {
        Write-ColorOutput "`n⚠️  Container não existe" $WarningColor
        Write-ColorOutput "Use '.\sonarqube.ps1 start' para criar e iniciar." $InfoColor
    }
    
    # Volumes
    Write-ColorOutput "`nVolumes Docker:" $InfoColor
    docker volume ls --filter "name=rainer-portfolio-frontend" --format "table {{.Name}}\t{{.Driver}}"
}

function Show-Logs {
    Write-ColorOutput "📜 Logs do SonarQube (Ctrl+C para sair):" $InfoColor
    Write-ColorOutput "=" * 50 $InfoColor
    
    if (-not (Test-Docker)) { return }
    
    docker-compose -f $ComposeFile logs -f sonarqube
}

function Restart-SonarQube {
    Write-ColorOutput "🔄 Reiniciando SonarQube..." $InfoColor
    
    Stop-SonarQube
    Start-Sleep -Seconds 2
    Start-SonarQube
}

function Start-Analysis {
    Write-ColorOutput "🔍 Executando análise de código..." $InfoColor
    Write-ColorOutput "=" * 50 $InfoColor
    
    if (-not (Test-SonarScanner)) {
        Write-ColorOutput "`n⚠️  Não é possível executar a análise sem o SonarScanner!" $ErrorColor
        return
    }
    
    # Verificar se SonarQube está rodando
    $running = docker ps --filter "name=sonarqube-local" --format "{{.Names}}"
    if ($running -ne "sonarqube-local") {
        Write-ColorOutput "⚠️  SonarQube não está rodando!" $WarningColor
        Write-ColorOutput "Deseja iniciar o SonarQube? (S/N): " $InfoColor -NoNewline
        $response = Read-Host
        if ($response -eq 'S' -or $response -eq 's') {
            Start-SonarQube
            Write-ColorOutput "`n⏳ Aguardando 30 segundos para o servidor inicializar..." $InfoColor
            Start-Sleep -Seconds 30
        }
        else {
            return
        }
    }
    
    # Verificar token
    if (-not $env:SONAR_TOKEN) {
        Write-ColorOutput "`n⚠️  Token do SonarQube não configurado!" $WarningColor
        Write-ColorOutput "Configure com: `$env:SONAR_TOKEN = 'seu-token-aqui'" $InfoColor
        Write-ColorOutput "Ou adicione no arquivo sonar-project.properties" $InfoColor
        Write-ColorOutput "`nDeseja continuar sem token? (S/N): " $InfoColor -NoNewline
        $response = Read-Host
        if ($response -ne 'S' -and $response -ne 's') {
            return
        }
    }
    
    # Executar análise
    Write-ColorOutput "`n🔍 Iniciando análise..." $InfoColor
    
    if ($env:SONAR_TOKEN) {
        sonar-scanner `
            -Dsonar.host.url=$SonarHost `
            -Dsonar.login=$env:SONAR_TOKEN `
            -Dsonar.projectKey=$ProjectKey `
            -Dsonar.projectBaseDir=.
    }
    else {
        sonar-scanner `
            -Dsonar.host.url=$SonarHost `
            -Dsonar.projectKey=$ProjectKey `
            -Dsonar.projectBaseDir=.
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "`n✅ Análise concluída com sucesso!" $SuccessColor
        Write-ColorOutput "📊 Visualize os resultados em: $SonarHost/dashboard?id=$ProjectKey" $InfoColor
    }
    else {
        Write-ColorOutput "`n❌ Erro durante a análise!" $ErrorColor
        Write-ColorOutput "Execute com -X para mais detalhes: sonar-scanner -X" $InfoColor
    }
}

function Clear-SonarQube {
    Write-ColorOutput "🧹 Limpando SonarQube e dados..." $WarningColor
    Write-ColorOutput "⚠️  ATENÇÃO: Isso removerá TODOS os dados do SonarQube!" $ErrorColor
    Write-ColorOutput "Deseja continuar? (S/N): " $WarningColor -NoNewline
    $response = Read-Host
    
    if ($response -eq 'S' -or $response -eq 's') {
        if (-not (Test-Docker)) { return }
        
        Write-ColorOutput "`n🛑 Parando containers..." $InfoColor
        docker-compose -f $ComposeFile down -v
        
        Write-ColorOutput "🗑️  Removendo volumes..." $InfoColor
        docker volume prune -f
        
        Write-ColorOutput "🗑️  Removendo cache local..." $InfoColor
        if (Test-Path ".scannerwork") {
            Remove-Item -Recurse -Force ".scannerwork"
        }
        
        Write-ColorOutput "`n✅ Limpeza concluída!" $SuccessColor
    }
    else {
        Write-ColorOutput "❌ Operação cancelada." $InfoColor
    }
}

function Show-Help {
    Write-ColorOutput "`n📖 SonarQube Manager - Ajuda" $InfoColor
    Write-ColorOutput "=" * 60 $InfoColor
    Write-ColorOutput "`nUSO:" $InfoColor
    Write-ColorOutput "  .\sonarqube.ps1 <ação>`n" $InfoColor
    
    Write-ColorOutput "AÇÕES DISPONÍVEIS:" $InfoColor
    Write-ColorOutput "  start     - Inicia o servidor SonarQube" $SuccessColor
    Write-ColorOutput "  stop      - Para o servidor SonarQube" $ErrorColor
    Write-ColorOutput "  restart   - Reinicia o servidor SonarQube" $WarningColor
    Write-ColorOutput "  status    - Mostra status do servidor" $InfoColor
    Write-ColorOutput "  logs      - Exibe logs em tempo real" $InfoColor
    Write-ColorOutput "  analyze   - Executa análise de código" $SuccessColor
    Write-ColorOutput "  clean     - Remove containers e dados" $ErrorColor
    Write-ColorOutput "  help      - Exibe esta ajuda`n" $InfoColor
    
    Write-ColorOutput "EXEMPLOS:" $InfoColor
    Write-ColorOutput "  .\sonarqube.ps1 start" $InfoColor
    Write-ColorOutput "  .\sonarqube.ps1 analyze" $InfoColor
    Write-ColorOutput "  .\sonarqube.ps1 logs`n" $InfoColor
    
    Write-ColorOutput "CONFIGURAÇÃO:" $InfoColor
    Write-ColorOutput "  1. Execute: .\sonarqube.ps1 start" $InfoColor
    Write-ColorOutput "  2. Acesse: $SonarHost" $InfoColor
    Write-ColorOutput "  3. Login: admin / admin" $InfoColor
    Write-ColorOutput "  4. Crie um projeto e gere um token" $InfoColor
    Write-ColorOutput "  5. Configure: `$env:SONAR_TOKEN = 'seu-token'" $InfoColor
    Write-ColorOutput "  6. Execute: .\sonarqube.ps1 analyze`n" $InfoColor
    
    Write-ColorOutput "MAIS INFORMAÇÕES:" $InfoColor
    Write-ColorOutput "  Consulte: SONARQUBE-QUICKSTART.md`n" $InfoColor
}

# Executar ação
switch ($Action) {
    'start'    { Start-SonarQube }
    'stop'     { Stop-SonarQube }
    'status'   { Get-SonarQubeStatus }
    'analyze'  { Start-Analysis }
    'logs'     { Show-Logs }
    'restart'  { Restart-SonarQube }
    'clean'    { Clear-SonarQube }
    'help'     { Show-Help }
}

