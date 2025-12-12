# Script para deploy automático com ngrok
# Uso: .\scripts\deploy-with-ngrok.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$NgrokUrlFile = "ngrok-url.txt"
)

Write-Host "🚀 Iniciando deploy automático com ngrok..." -ForegroundColor Green

# 1. Verificar se o arquivo da URL do ngrok existe
if (-not (Test-Path $NgrokUrlFile)) {
    Write-Host "❌ Arquivo '$NgrokUrlFile' não encontrado!" -ForegroundColor Red
    Write-Host "📝 Execute o ngrok e salve a URL no arquivo:" -ForegroundColor Yellow
    Write-Host "   ngrok http 4000" -ForegroundColor Cyan
    Write-Host "   Copie a URL HTTPS para o arquivo '$NgrokUrlFile'" -ForegroundColor Cyan
    exit 1
}

# 2. Ler a URL do ngrok
$ngrokUrl = Get-Content $NgrokUrlFile -Raw
$ngrokUrl = $ngrokUrl.Trim()

if (-not $ngrokUrl -or -not $ngrokUrl.StartsWith("https://")) {
    Write-Host "❌ URL do ngrok inválida no arquivo '$NgrokUrlFile'!" -ForegroundColor Red
    Write-Host "📝 A URL deve começar com https://" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ URL do ngrok lida: $ngrokUrl" -ForegroundColor Green

# 3. Atualizar o .env.homolog
$envFile = ".env.homolog"
$envContent = Get-Content $envFile -Raw

# Substituir a URL da API
$envContent = $envContent -replace 'NEXT_PUBLIC_API_URL=.*', "NEXT_PUBLIC_API_URL=$ngrokUrl"

# Salvar o arquivo atualizado
Set-Content $envFile -Value $envContent -NoNewline
Write-Host "✅ Arquivo .env.homolog atualizado com a URL do ngrok" -ForegroundColor Green

# 4. Verificar se está no git
$gitStatus = git status --porcelain 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Não está em um repositório git!" -ForegroundColor Red
    exit 1
}

# 5. Fazer commit e push
Write-Host "📦 Fazendo commit das alterações..." -ForegroundColor Yellow
git add $envFile
git commit -m "feat: atualizar API URL para ngrok - $ngrokUrl"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer commit!" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Enviando para o repositório..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push!" -ForegroundColor Red
    exit 1
}

# 6. Deploy para Vercel
Write-Host "🚀 Iniciando deploy para Vercel..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "🌐 Acesse: https://rainersoft.com.br" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erro no deploy!" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Processo concluído!" -ForegroundColor Green
