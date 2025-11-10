# ═══════════════════════════════════════════════════════════════════════════
# Script: Iniciar Desenvolvimento Next.js
# Descrição: Inicia servidor de desenvolvimento Next.js com Turbopack
# ═══════════════════════════════════════════════════════════════════════════

# ═══════════════════════════════════════════════════════════════════════════
#                         HEADER BONITO
# ═══════════════════════════════════════════════════════════════════════════
Clear-Host
Write-Host ""
Write-Host ""
Write-Host "   ╔═══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "   ║                                                                           ║" -ForegroundColor Cyan
Write-Host "   ║              🚀  INICIANDO DESENVOLVIMENTO NEXT.JS  🚀                   ║" -ForegroundColor White
Write-Host "   ║                                                                           ║" -ForegroundColor Cyan
Write-Host "   ║                     TURBOPACK + HOT RELOAD                                 ║" -ForegroundColor Yellow
Write-Host "   ║                                                                           ║" -ForegroundColor Cyan
Write-Host "   ╚═══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════════════════
#                    VERIFICAÇÃO DE DEPENDÊNCIAS
# ═══════════════════════════════════════════════════════════════════════════

Write-Host "   🔍 VERIFICANDO DEPENDÊNCIAS..." -ForegroundColor Yellow
Write-Host ""

# Verificar Node.js
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   📝 Instale Node.js v18+ em: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar npm
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ npm não encontrado!" -ForegroundColor Red
    exit 1
}

# Verificar node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "   📦 INSTALANDO DEPENDÊNCIAS..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ❌ Erro ao instalar dependências!" -ForegroundColor Red
        exit 1
    }
    Write-Host "   ✅ Dependências instaladas!" -ForegroundColor Green
}

Write-Host ""
Start-Sleep -Seconds 1

# ═══════════════════════════════════════════════════════════════════════════
#                    LIMPEZA DE CACHE (OPCIONAL)
# ═══════════════════════════════════════════════════════════════════════════

$param = $args[0]
if ($param -eq "--clean") {
    Write-Host "   🧹 LIMPANDO CACHE..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "   ✅ Cache .next removido!" -ForegroundColor Green
    }
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
        Write-Host "   ✅ Cache node_modules removido!" -ForegroundColor Green
    }
    Write-Host ""
}

# ═══════════════════════════════════════════════════════════════════════════
#                    INICIAR SERVIDOR
# ═══════════════════════════════════════════════════════════════════════════

Write-Host "   ╔═══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "   ║                    🚀 INICIANDO SERVIDOR...                              ║" -ForegroundColor White
Write-Host "   ╚═══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "   🌐 Servidor será iniciado em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   📝 Pressione Ctrl+C para parar o servidor" -ForegroundColor Gray
Write-Host ""
Start-Sleep -Seconds 2

# Navegar para o diretório raiz do projeto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
Set-Location $projectRoot

# Iniciar servidor de desenvolvimento
npm run dev

