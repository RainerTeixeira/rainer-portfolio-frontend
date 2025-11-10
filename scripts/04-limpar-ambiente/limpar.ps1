# ═══════════════════════════════════════════════════════════════════════════
# Script: Limpar Ambiente
# Descrição: Limpa cache e arquivos temporários do Next.js
# ═══════════════════════════════════════════════════════════════════════════

param(
    [switch]$Cache,
    [switch]$All
)

Clear-Host
Write-Host ""
Write-Host "   ╔═══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
Write-Host "   ║                    🧹 LIMPANDO AMBIENTE                                 ║" -ForegroundColor White
Write-Host "   ╚═══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Yellow
Write-Host ""

# Navegar para o diretório raiz
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
Set-Location $projectRoot

if ($All) {
    Write-Host "   🗑️  LIMPEZA COMPLETA..." -ForegroundColor Red
    Write-Host ""
    
    # Limpar .next
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "   ✅ .next removido" -ForegroundColor Green
    }
    
    # Limpar node_modules/.cache
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
        Write-Host "   ✅ node_modules/.cache removido" -ForegroundColor Green
    }
    
    # Limpar coverage
    if (Test-Path "coverage") {
        Remove-Item -Recurse -Force "coverage"
        Write-Host "   ✅ coverage removido" -ForegroundColor Green
    }
    
    # Limpar .turbo
    if (Test-Path ".turbo") {
        Remove-Item -Recurse -Force ".turbo"
        Write-Host "   ✅ .turbo removido" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "   ✨ Limpeza completa finalizada!" -ForegroundColor Green
} elseif ($Cache) {
    Write-Host "   🧹 LIMPANDO CACHE..." -ForegroundColor Yellow
    Write-Host ""
    
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "   ✅ .next removido" -ForegroundColor Green
    }
    
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
        Write-Host "   ✅ node_modules/.cache removido" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "   ✨ Cache limpo!" -ForegroundColor Green
} else {
    Write-Host "   🧹 LIMPANDO CACHE (padrão)..." -ForegroundColor Yellow
    Write-Host ""
    
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force ".next"
        Write-Host "   ✅ .next removido" -ForegroundColor Green
    }
    
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
        Write-Host "   ✅ node_modules/.cache removido" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "   ✨ Cache limpo!" -ForegroundColor Green
    Write-Host ""
    Write-Host "   💡 Use --All para limpeza completa (inclui coverage, .turbo)" -ForegroundColor Cyan
}

Write-Host ""

