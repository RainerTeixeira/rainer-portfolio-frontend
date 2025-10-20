# Script para Mostrar Resultados do SonarQube

# Carregar configurações do .env.sonarqube
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

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host "📊 RESULTADOS DA ANÁLISE SONARQUBE" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

try {
    $url = "http://localhost:9000/api/measures/component?component=rainer-portfolio-frontend&metricKeys=bugs,vulnerabilities,code_smells,security_hotspots,coverage,duplicated_lines_density,ncloc"
    $response = Invoke-RestMethod -Uri $url -Method Get
    
    foreach ($measure in $response.component.measures) {
        $metric = $measure.metric
        $value = $measure.value
        
        switch ($metric) {
            "bugs" { 
                if ($value -eq "0") {
                    Write-Host "  ✅ Bugs: $value" -ForegroundColor Green
                } elseif ([int]$value -lt 5) {
                    Write-Host "  🐛 Bugs: $value" -ForegroundColor Yellow
                } else {
                    Write-Host "  🐛 Bugs: $value" -ForegroundColor Red
                }
            }
            "vulnerabilities" { 
                if ($value -eq "0") {
                    Write-Host "  ✅ Vulnerabilities: $value" -ForegroundColor Green
                } else {
                    Write-Host "  🔒 Vulnerabilities: $value" -ForegroundColor Red
                }
            }
            "code_smells" { 
                if ([int]$value -lt 30) {
                    Write-Host "  ✅ Code Smells: $value" -ForegroundColor Green
                } elseif ([int]$value -lt 70) {
                    Write-Host "  💡 Code Smells: $value" -ForegroundColor Yellow
                } else {
                    Write-Host "  💡 Code Smells: $value" -ForegroundColor Red
                }
            }
            "security_hotspots" { 
                if ($value -eq "0") {
                    Write-Host "  ✅ Security Hotspots: $value" -ForegroundColor Green
                } else {
                    Write-Host "  🔥 Security Hotspots: $value (precisa revisão manual)" -ForegroundColor Magenta
                }
            }
            "coverage" { 
                Write-Host "  📊 Coverage: $value%" -ForegroundColor Cyan
            }
            "duplicated_lines_density" { 
                if ([double]$value -lt 3) {
                    Write-Host "  ✅ Duplications: $value%" -ForegroundColor Green
                } else {
                    Write-Host "  📋 Duplications: $value%" -ForegroundColor Yellow
                }
            }
            "ncloc" { 
                Write-Host "  📏 Lines of Code: $value" -ForegroundColor White
            }
        }
    }
    
    Write-Host ""
    Write-Host "=" * 70 -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Ver dashboard completo:" -ForegroundColor Cyan
    Write-Host "   http://localhost:9000/dashboard?id=rainer-portfolio-frontend" -ForegroundColor White
    Write-Host ""
    Write-Host "🔥 Revisar Security Hotspots:" -ForegroundColor Magenta
    Write-Host "   http://localhost:9000/security_hotspots?id=rainer-portfolio-frontend" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Ver todos os issues:" -ForegroundColor Yellow
    Write-Host "   http://localhost:9000/project/issues?id=rainer-portfolio-frontend" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "❌ Erro ao buscar resultados!" -ForegroundColor Red
    Write-Host "Certifique-se de que o SonarQube está rodando em http://localhost:9000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Execute: docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d" -ForegroundColor Cyan
}

Write-Host ""

