# Script para deploy automático com ngrok (obtém URL automaticamente)
# Uso: .\scripts\deploy-ngrok-auto.ps1

Write-Host "🚀 Iniciando deploy automático com ngrok..." -ForegroundColor Green

# 1. Verificar se o ngrok está rodando
Write-Host "🔍 Verificando se o ngrok está rodando..." -ForegroundColor Yellow

try {
    $ngrokInfo = Invoke-RestMethod -Uri "http://127.0.0.1:4040/api/tunnels" -ErrorAction Stop
    $ngrokUrl = $ngrokInfo.tunnels[0].public_url
    
    if (-not $ngrokUrl -or -not $ngrokUrl.StartsWith("https://")) {
        Write-Host "❌ URL do ngrok não encontrada ou não é HTTPS!" -ForegroundColor Red
        Write-Host "📝 Execute o ngrok primeiro:" -ForegroundColor Yellow
        Write-Host "   ngrok http 4000" -ForegroundColor Cyan
        exit 1
    }
    
    Write-Host "✅ URL do ngrok detectada: $ngrokUrl" -ForegroundColor Green
}
catch {
    Write-Host "❌ Não foi possível conectar ao ngrok!" -ForegroundColor Red
    Write-Host "📝 Execute o ngrok primeiro:" -ForegroundColor Yellow
    Write-Host "   ngrok http 4000" -ForegroundColor Cyan
    exit 1
}

# 2. Atualizar o .env.homolog
$envFile = ".env.homolog"
$envContent = Get-Content $envFile -Raw

# Substituir a URL da API
$envContent = $envContent -replace 'NEXT_PUBLIC_API_URL=.*', "NEXT_PUBLIC_API_URL=$ngrokUrl"

# Salvar o arquivo atualizado
Set-Content $envFile -Value $envContent -NoNewline
Write-Host "✅ Arquivo .env.homolog atualizado com a URL do ngrok" -ForegroundColor Green

# 3. Salvar a URL em arquivo de backup
Set-Content -Path "ngrok-url.txt" -Value $ngrokUrl -NoNewline
Write-Host "✅ URL salva em ngrok-url.txt para backup" -ForegroundColor Green

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
    Write-Host "🔗 API: $ngrokUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erro no deploy!" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Processo concluído!" -ForegroundColor Green
