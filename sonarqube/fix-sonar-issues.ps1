# Script para Corrigir Issues do SonarQube Automaticamente
# ==========================================================

Write-Host "🔧 CORREÇÃO AUTOMÁTICA DE ISSUES DO SONARQUBE" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Carregar token do arquivo .env.sonarqube
$envFile = Join-Path $PSScriptRoot ".env.sonarqube"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.+)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
    Write-Host "✅ Token carregado de .env.sonarqube" -ForegroundColor Green
} elseif (-not $env:SONAR_TOKEN) {
    Write-Host "⚠️  Arquivo .env.sonarqube não encontrado!" -ForegroundColor Yellow
    Write-Host "Crie o arquivo ou configure: `$env:SONAR_TOKEN='seu-token'" -ForegroundColor Cyan
    exit 1
}

# 1. Executar lint fix (corrige muitos code smells automaticamente)
Write-Host "📝 Passo 1/4: Executando ESLint Fix..." -ForegroundColor Yellow
npm run lint:fix
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Lint fix concluído!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Lint fix teve avisos (normal)" -ForegroundColor Yellow
}
Write-Host ""

# 2. Executar type-check
Write-Host "📝 Passo 2/4: Verificando tipos TypeScript..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Type check passou!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Type check teve avisos (normal)" -ForegroundColor Yellow
}
Write-Host ""

# 3. Executar nova análise do SonarQube
Write-Host "📝 Passo 3/4: Executando nova análise do SonarQube..." -ForegroundColor Yellow
npm run sonar:local
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Análise do SonarQube concluída!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro na análise do SonarQube" -ForegroundColor Red
}
Write-Host ""

# 4. Buscar resultados
Write-Host "📝 Passo 4/4: Buscando resultados atualizados..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

try {
    $response = Invoke-RestMethod -Uri "http://localhost:9000/api/measures/component?component=rainer-portfolio-frontend&metricKeys=bugs,vulnerabilities,code_smells,security_hotspots,coverage,duplicated_lines_density" -Method Get
    
    Write-Host ""
    Write-Host "=" * 60 -ForegroundColor Green
    Write-Host "📊 RESULTADOS ATUALIZADOS" -ForegroundColor Green
    Write-Host "=" * 60 -ForegroundColor Green
    Write-Host ""
    
    foreach ($measure in $response.component.measures) {
        $metricName = $measure.metric
        $value = $measure.value
        
        switch ($metricName) {
            "bugs" { 
                $color = if ($value -eq "0") { "Green" } else { "Yellow" }
                Write-Host "🐛 Bugs: $value" -ForegroundColor $color
            }
            "vulnerabilities" { 
                $color = if ($value -eq "0") { "Green" } else { "Red" }
                Write-Host "🔒 Vulnerabilities: $value" -ForegroundColor $color
            }
            "code_smells" { 
                $color = if ([int]$value -lt 50) { "Green" } elseif ([int]$value -lt 100) { "Yellow" } else { "Red" }
                Write-Host "💡 Code Smells: $value" -ForegroundColor $color
            }
            "security_hotspots" { 
                $color = if ($value -eq "0") { "Green" } else { "Magenta" }
                Write-Host "🔥 Security Hotspots: $value" -ForegroundColor $color
            }
            "coverage" { 
                Write-Host "📊 Coverage: $value%" -ForegroundColor Cyan
            }
            "duplicated_lines_density" { 
                $color = if ([double]$value -lt 3) { "Green" } else { "Yellow" }
                Write-Host "📋 Duplications: $value%" -ForegroundColor $color
            }
        }
    }
    
    Write-Host ""
    Write-Host "=" * 60 -ForegroundColor Green
    Write-Host "✅ Processo concluído!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Ver dashboard completo:" -ForegroundColor Cyan
    Write-Host "   http://localhost:9000/dashboard?id=rainer-portfolio-frontend" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "⚠️  Não foi possível buscar métricas. Verifique manualmente:" -ForegroundColor Yellow
    Write-Host "   http://localhost:9000" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Acesse o dashboard do SonarQube" -ForegroundColor White
Write-Host "   2. Revise os Security Hotspots manualmente" -ForegroundColor White
Write-Host "   3. Corrija bugs restantes se houver" -ForegroundColor White
Write-Host ""

