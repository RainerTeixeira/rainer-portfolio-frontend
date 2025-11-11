# Analisa componentes para encontrar cores hardcoded

Write-Host ""
Write-Host "🔍 Analisando cores hardcoded nos componentes..." -ForegroundColor Cyan
Write-Host ""

$directories = @("components", "app")
$hexPattern = '#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}'
$results = @{}
$totalIssues = 0

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Write-Host "📁 Analisando: $dir" -ForegroundColor Cyan
        $files = Get-ChildItem -Path $dir -Recurse -Include "*.tsx", "*.ts" -File

        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            $matches = [regex]::Matches($content, $hexPattern)
            
            if ($matches.Count -gt 0) {
                $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
                $results[$relativePath] = $matches.Count
                $totalIssues += $matches.Count
            }
        }
    }
}

Write-Host ""
Write-Host "📊 RELATÓRIO DE ANÁLISE" -ForegroundColor Cyan
Write-Host ("=" * 80) -ForegroundColor Cyan
Write-Host ""

if ($results.Count -eq 0) {
    Write-Host "✅ Nenhuma cor hardcoded encontrada!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Total de arquivos: $($results.Count)" -ForegroundColor Yellow
    Write-Host "⚠️  Total de issues: $totalIssues" -ForegroundColor Yellow
    Write-Host ""
    
    $sortedResults = $results.GetEnumerator() | Sort-Object -Property Value -Descending
    $top20 = $sortedResults | Select-Object -First 20
    
    Write-Host "🔝 TOP 20 ARQUIVOS COM MAIS ISSUES" -ForegroundColor Cyan
    Write-Host ""
    $rank = 1
    
    foreach ($entry in $top20) {
        Write-Host "  $rank. $($entry.Key) - $($entry.Value) issues" -ForegroundColor Yellow
        $rank++
    }
    
    $reportPath = "scripts\hardcoded-colors-report.json"
    $reportData = @{
        timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        totalFiles = $results.Count
        totalIssues = $totalIssues
        files = $results
    }
    
    $reportData | ConvertTo-Json -Depth 10 | Out-File $reportPath -Encoding UTF8
    Write-Host ""
    Write-Host "💾 Relatório salvo em: $reportPath" -ForegroundColor Green
}

Write-Host ""
Write-Host ("=" * 80) -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 PRÓXIMOS PASSOS" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Revise o relatório gerado" -ForegroundColor Gray
Write-Host "2. Consulte docs\REFACTORING_GUIDE.md" -ForegroundColor Gray
Write-Host "3. Use os design tokens de @rainer/design-tokens" -ForegroundColor Gray
Write-Host ""

