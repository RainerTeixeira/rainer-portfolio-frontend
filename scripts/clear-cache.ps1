# Script para limpar cache do Next.js
# Execute: .\scripts\clear-cache.ps1

Write-Host "=== 🧹 Limpando Cache do Next.js ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se a pasta .next existe
if (Test-Path .next) {
    Write-Host "Removendo pasta .next..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Pasta .next removida com sucesso!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Pasta .next não encontrada (já está limpa)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Cache limpo! Agora execute: npm run dev" -ForegroundColor Green
Write-Host ""


