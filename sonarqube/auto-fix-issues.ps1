# Script de Correção Automática de Issues
Write-Host "`n🔧 CORREÇÃO AUTOMÁTICA DE ISSUES" -ForegroundColor Cyan
Write-Host "=" * 70 -ForegroundColor Cyan
Write-Host ""

$fixCount = 0

# 1. Remover imports não usados de 'cn'
Write-Host "📝 1/4: Removendo imports não utilizados..." -ForegroundColor Yellow

$files = @(
    "components/blog/post-card.tsx",
    "components/sobre/team-card.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Remover import de cn não utilizado
        $content = $content -replace "import\s*\{\s*cn\s*\}\s*from\s*['`"][^'`"]+['`"]\s*\n?", ""
        $content = $content -replace ",\s*cn\s*\}", "}"
        Set-Content $file $content -NoNewline
        Write-Host "  ✅ Fixed: $file" -ForegroundColor Green
        $fixCount++
    }
}

# 2. Remover variável não usada isDarkTheme
Write-Host "`n📝 2/4: Removendo variáveis não utilizadas..." -ForegroundColor Yellow

$scrollFile = "components/home/carousel/ScrollIndicator.tsx"
if (Test-Path $scrollFile) {
    $content = Get-Content $scrollFile -Raw
    # Comentar ou remover a linha
    $content = $content -replace "(\s*)const isDarkTheme = .*?\n", "`$1// const isDarkTheme removed (unused)`n"
    Set-Content $scrollFile $content -NoNewline
    Write-Host "  ✅ Fixed: $scrollFile" -ForegroundColor Green
    $fixCount++
}

# 3. Substituir aspas por entidades HTML
Write-Host "`n📝 3/4: Escapando aspas em JSX..." -ForegroundColor Yellow

$files = @(
    "app/sobre/page.tsx",
    "components/home/about-section.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Substituir " por &quot; em strings JSX
        $content = $content -replace '([>])"([^<]+)"([<])', '$1&quot;$2&quot;$3'
        Set-Content $file $content -NoNewline
        Write-Host "  ✅ Fixed: $file" -ForegroundColor Green
        $fixCount++
    }
}

Write-Host "`n📝 4/4: Issues de parsing e dependencies..." -ForegroundColor Yellow
Write-Host "  ℹ️  Estes precisam de revisão manual" -ForegroundColor Cyan

Write-Host ""
Write-Host "=" * 70 -ForegroundColor Green
Write-Host "✅ Correções aplicadas: $fixCount issues" -ForegroundColor Green
Write-Host "=" * 70 -ForegroundColor Green
Write-Host ""

Write-Host "🔄 Executando nova análise..." -ForegroundColor Cyan
npm run lint:fix 2>&1 | Out-Null

Write-Host ""
Write-Host "✅ Pronto! Execute nova análise SonarQube:" -ForegroundColor Green
Write-Host "   cd sonarqube" -ForegroundColor Gray
Write-Host "   .\fix-sonar-issues.ps1" -ForegroundColor Gray
Write-Host ""

