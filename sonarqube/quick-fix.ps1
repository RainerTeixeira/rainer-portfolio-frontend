# Script de Correção Rápida para Quality Gate
Write-Host "`n🎯 CORREÇÃO RÁPIDA - QUALITY GATE" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

# Carregar token
$envFile = Join-Path $PSScriptRoot ".env.sonarqube"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.+)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

Write-Host "📝 1/3: Corrigindo código automaticamente..." -ForegroundColor Yellow
cd ..
npm run lint:fix 2>&1 | Out-Null

Write-Host "✅ Lint fix concluído!" -ForegroundColor Green
Write-Host ""

Write-Host "📝 2/3: Executando nova análise..." -ForegroundColor Yellow
npm run sonar:local 2>&1 | Out-Null

Write-Host "✅ Análise concluída!" -ForegroundColor Green
Write-Host ""

Write-Host "📝 3/3: Abrindo páginas importantes..." -ForegroundColor Yellow
Write-Host ""

Write-Host "🔥 Security Hotspots (REVISAR MANUALMENTE):" -ForegroundColor Red
Write-Host "   http://localhost:9000/security_hotspots?id=rainer-portfolio-frontend" -ForegroundColor White

Write-Host ""
Write-Host "📋 Issues Restantes:" -ForegroundColor Yellow
Write-Host "   http://localhost:9000/project/issues?id=rainer-portfolio-frontend" -ForegroundColor White

Write-Host ""
Write-Host "📊 Dashboard:" -ForegroundColor Cyan
Write-Host "   http://localhost:9000/dashboard?id=rainer-portfolio-frontend" -ForegroundColor White

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Green
Write-Host "✅ Correções automáticas aplicadas!" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Green
Write-Host ""

Write-Host "🎯 PRÓXIMO PASSO: Revisar Security Hotspots (15 min)" -ForegroundColor Cyan
Write-Host ""

# Abrir páginas
start http://localhost:9000/security_hotspots?id=rainer-portfolio-frontend
Start-Sleep -Seconds 2
start http://localhost:9000/dashboard?id=rainer-portfolio-frontend

