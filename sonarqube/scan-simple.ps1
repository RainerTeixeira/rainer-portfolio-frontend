# Script simples para rodar SonarQube Scanner via Docker
# Uso: .\scan-simple.ps1

Write-Host "`n=== SonarQube Scanner via Docker ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se SonarQube está rodando
$sonarRunning = docker ps | Select-String "sonarqube-local"
if (-not $sonarRunning) {
    Write-Host "[ERRO] SonarQube não está rodando!" -ForegroundColor Red
    Write-Host "Execute primeiro: docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] SonarQube está rodando" -ForegroundColor Green
Write-Host ""

# Obter diretório do projeto
$ProjectPath = (Get-Location).Path
if ($ProjectPath.EndsWith('sonarqube')) {
    $ProjectPath = Split-Path -Parent $ProjectPath
}

Write-Host "Diretório: $ProjectPath" -ForegroundColor Gray
Write-Host "Projeto: rainer-portfolio-frontend" -ForegroundColor Gray
Write-Host "Server: http://host.docker.internal:9000" -ForegroundColor Gray
Write-Host ""
Write-Host "Executando análise..." -ForegroundColor Cyan
Write-Host ""

# Executar scanner
docker run `
    --rm `
    --add-host="host.docker.internal:host-gateway" `
    -e SONAR_HOST_URL="http://host.docker.internal:9000" `
    -v "${ProjectPath}:/usr/src" `
    -w "/usr/src" `
    sonarsource/sonar-scanner-cli:latest `
    -Dsonar.projectKey=rainer-portfolio-frontend `
    -Dsonar.sources=app,components,hooks,lib,constants `
    -Dsonar.sourceEncoding=UTF-8

$exitCode = $LASTEXITCODE

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "[SUCESSO] Análise concluída!" -ForegroundColor Green
    Write-Host "Veja os resultados: http://localhost:9000/dashboard?id=rainer-portfolio-frontend" -ForegroundColor Cyan
} else {
    Write-Host "[ERRO] Análise falhou (código: $exitCode)" -ForegroundColor Red
}
Write-Host ""

