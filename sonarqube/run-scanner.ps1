# Script para executar SonarScanner via Docker
# Não requer instalação local do SonarScanner

param(
    [string]$Token = $env:SONAR_TOKEN
)

Write-Host "🔍 Executando SonarScanner via Docker..." -ForegroundColor Cyan

# Configurações
$SonarHost = "http://localhost:9000"
$ProjectKey = "rainer-portfolio-frontend"
$NetworkName = "rainer-portfolio-frontend_default"

# Verificar se SonarQube está rodando
$running = docker ps --filter "fullName=sonarqube-local" --format "{{.Names}}"
if ($running -ne "sonarqube-local") {
    Write-Host "❌ SonarQube não está rodando!" -ForegroundColor Red
    Write-Host "Execute: cd sonarqube && .\sonarqube.ps1 start" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ SonarQube está rodando" -ForegroundColor Green

# Verificar token
if (-not $Token) {
    Write-Host "⚠️  Token não configurado. A análise pode falhar se o servidor exigir autenticação." -ForegroundColor Yellow
    Write-Host "Configure com: `$env:SONAR_TOKEN='seu-token'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Deseja continuar sem token? (S/N): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    if ($response -ne 'S' -and $response -ne 's') {
        exit 0
    }
}

# Navegar para a raiz do projeto
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host ""
Write-Host "📁 Diretório do projeto: $ProjectRoot" -ForegroundColor Cyan
Write-Host "🔑 Projeto: $ProjectKey" -ForegroundColor Cyan
Write-Host "🌐 SonarQube: $SonarHost" -ForegroundColor Cyan
Write-Host ""

# Executar SonarScanner via Docker
Write-Host "🚀 Iniciando análise..." -ForegroundColor Green
Write-Host ""

# Verificar rede Docker
$networkExists = docker network ls --filter "fullName=$NetworkName" --format "{{.Name}}"
if (-not $networkExists) {
    Write-Host "⚠️  Rede Docker não encontrada. Usando rede padrão..." -ForegroundColor Yellow
    $NetworkName = "bridge"
}

# Converter path do Windows para formato Docker
$DockerPath = $ProjectRoot -replace '\\', '/' -replace 'C:', '/c'

Write-Host "🐳 Network: $NetworkName" -ForegroundColor Cyan
Write-Host ""

if ($Token) {
    docker run --rm `
        --add-host="host.docker.internal:host-gateway" `
        -e SONAR_HOST_URL="http://host.docker.internal:9000" `
        -e SONAR_TOKEN="$Token" `
        -v "${ProjectRoot}:/usr/src" `
        -w /usr/src `
        sonarsource/sonar-scanner-cli `
        "-Dsonar.projectKey=$ProjectKey" `
        "-Dsonar.sources=app,components,hooks,lib,constants" `
        "-Dsonar.sourceEncoding=UTF-8" `
        "-Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts"
} else {
    docker run --rm `
        --add-host="host.docker.internal:host-gateway" `
        -e SONAR_HOST_URL="http://host.docker.internal:9000" `
        -v "${ProjectRoot}:/usr/src" `
        -w /usr/src `
        sonarsource/sonar-scanner-cli `
        "-Dsonar.projectKey=$ProjectKey" `
        "-Dsonar.sources=app,components,hooks,lib,constants" `
        "-Dsonar.sourceEncoding=UTF-8" `
        "-Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Análise concluída com sucesso!" -ForegroundColor Green
    Write-Host "📊 Visualize os resultados em: http://localhost:9000/dashboard?id=$ProjectKey" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Erro durante a análise!" -ForegroundColor Red
    Write-Host "Verifique os logs acima para mais detalhes." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

