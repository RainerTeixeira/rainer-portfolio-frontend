# Script para buscar issues do SonarQube

# NOTA: Configure o token via: $env:SONAR_TOKEN="seu-token"
$projectKey = "rainer-portfolio-frontend"
$sonarHost = "http://localhost:9000"

Write-Host "🔍 Buscando issues do SonarQube..." -ForegroundColor Cyan

# Buscar bugs
Write-Host "`n🐛 BUGS:" -ForegroundColor Red
try {
    $bugs = Invoke-RestMethod -Uri "$sonarHost/api/issues/search?componentKeys=$projectKey&types=BUG&ps=100" -Method Get
    if ($bugs.issues) {
        foreach ($issue in $bugs.issues) {
            $file = $issue.component -replace ".*:", ""
            Write-Host "  📄 $file" -ForegroundColor Yellow
            Write-Host "     Linha: $($issue.line)" -ForegroundColor Gray
            Write-Host "     $($issue.message)" -ForegroundColor White
            Write-Host ""
        }
        Write-Host "Total: $($bugs.issues.Count) bugs`n" -ForegroundColor Red
    }
} catch {
    Write-Host "Erro ao buscar bugs: $_" -ForegroundColor Red
}

# Buscar code smells críticos
Write-Host "`n💡 CODE SMELLS CRÍTICOS:" -ForegroundColor Yellow
try {
    $smells = Invoke-RestMethod -Uri "$sonarHost/api/issues/search?componentKeys=$projectKey&types=CODE_SMELL&severities=CRITICAL,MAJOR&ps=50" -Method Get
    if ($smells.issues) {
        foreach ($issue in $smells.issues | Select-Object -First 10) {
            $file = $issue.component -replace ".*:", ""
            Write-Host "  📄 $file" -ForegroundColor Yellow
            Write-Host "     Linha: $($issue.line)" -ForegroundColor Gray
            Write-Host "     $($issue.message)" -ForegroundColor White
            Write-Host ""
        }
        Write-Host "Total: $($smells.issues.Count) code smells (mostrando 10)`n" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Erro ao buscar code smells: $_" -ForegroundColor Red
}

# Buscar security hotspots
Write-Host "`n🔒 SECURITY HOTSPOTS:" -ForegroundColor Magenta
try {
    $hotspots = Invoke-RestMethod -Uri "$sonarHost/api/hotspots/search?projectKey=$projectKey&ps=50" -Method Get
    if ($hotspots.hotspots) {
        foreach ($hotspot in $hotspots.hotspots | Select-Object -First 10) {
            $file = $hotspot.component -replace ".*:", ""
            Write-Host "  📄 $file" -ForegroundColor Yellow
            Write-Host "     Linha: $($hotspot.line)" -ForegroundColor Gray
            Write-Host "     $($hotspot.message)" -ForegroundColor White
            Write-Host ""
        }
        Write-Host "Total: $($hotspots.hotspots.Count) hotspots (mostrando 10)`n" -ForegroundColor Magenta
    }
} catch {
    Write-Host "Erro ao buscar hotspots: $_" -ForegroundColor Red
}

Write-Host "✅ Busca concluída!" -ForegroundColor Green

