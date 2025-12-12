# Script de deploy para Vercel usando .env.local como template
# Lê o arquivo .env.local e substitui os valores para produção

# Lê o conteúdo do .env.local
$envLocal = Get-Content ".env.local" -Raw

# Substitui os valores de desenvolvimento pelos de produção
$envProduction = $envLocal -replace 'NEXT_PUBLIC_BASE_URL=http://localhost:3000', 'NEXT_PUBLIC_BASE_URL=https://rainer-portfolio.vercel.app'
$envProduction = $envProduction -replace 'NEXT_PUBLIC_API_URL=http://localhost:4000', 'NEXT_PUBLIC_API_URL=https://rainer-portfolio-backend.onrender.com'
$envProduction = $envProduction -replace 'NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN=http://localhost:3000/dashboard/login/callback', 'NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN=https://rainer-portfolio.vercel.app/dashboard/login/callback'

# Salva em um arquivo temporário
$envProduction | Out-File -FilePath ".env.vercel" -Encoding utf8 -NoNewline

Write-Host "Arquivo .env.vercel criado com as configurações de produção:" -ForegroundColor Green
Get-Content ".env.vercel"

# Executa o deploy com as variáveis de ambiente
Write-Host "`nIniciando deploy para produção..." -ForegroundColor Yellow
$env:NEXT_PUBLIC_BASE_URL = "https://rainer-portfolio.vercel.app"
$env:NEXT_PUBLIC_API_URL = "https://rainer-portfolio-backend.onrender.com"
$env:NEXT_PUBLIC_OAUTH_REDIRECT_SIGN_IN = "https://rainer-portfolio.vercel.app/dashboard/login/callback"
$env:NEXT_PUBLIC_API_TIMEOUT = "30000"
$env:NEXT_PUBLIC_API_MAX_RETRIES = "3"
$env:NEXT_PUBLIC_API_RETRY_DELAY = "1000"
$env:NEXT_PUBLIC_FORCE_COGNITO_AUTH = "true"

vercel --prod

# Remove o arquivo temporário após o deploy
Remove-Item ".env.vercel"
Write-Host "`nArquivo temporário .env.vercel removido." -ForegroundColor Cyan
