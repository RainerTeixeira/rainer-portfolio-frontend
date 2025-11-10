# Script PowerShell para configurar Hosted UI URLs no Cognito via AWS CLI
# Uso: .\scripts\configure-cognito-hosted-ui.ps1

$USER_POOL_ID = "us-east-1_wryiyhbWC"
$CLIENT_ID = "3ueos5ofu499je6ebc5u98n35h"
$CALLBACK_URL = "http://localhost:3000/dashboard/login/callback"
$SIGNOUT_URLS = @("http://localhost:3000/dashboard/login", "http://localhost:3000")

Write-Host "=== Configurando Cognito Hosted UI URLs ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "User Pool ID: $USER_POOL_ID" -ForegroundColor White
Write-Host "Client ID: $CLIENT_ID" -ForegroundColor White
Write-Host "Callback URL: $CALLBACK_URL" -ForegroundColor White
Write-Host "Sign-out URLs: $($SIGNOUT_URLS -join ', ')" -ForegroundColor White
Write-Host ""

# Verificar configuração atual
Write-Host "📋 Verificando configuração atual..." -ForegroundColor Yellow
Write-Host ""

$currentConfig = aws cognito-idp describe-user-pool-client `
  --user-pool-id $USER_POOL_ID `
  --client-id $CLIENT_ID `
  --output json | ConvertFrom-Json

Write-Host "Callback URLs atuais:" -ForegroundColor Cyan
$currentConfig.UserPoolClient.CallbackURLs | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

Write-Host ""
Write-Host "Logout URLs atuais:" -ForegroundColor Cyan
$currentConfig.UserPoolClient.LogoutURLs | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

Write-Host ""
Write-Host "⚙️ Configurando URLs..." -ForegroundColor Yellow

# Converter array para formato JSON
$signoutUrlsJson = ($SIGNOUT_URLS | ConvertTo-Json -Compress)

# Atualizar configuração
$result = aws cognito-idp update-user-pool-client `
  --user-pool-id $USER_POOL_ID `
  --client-id $CLIENT_ID `
  --callback-urls $CALLBACK_URL `
  --logout-urls $SIGNOUT_URLS `
  --allowed-o-auth-flows "code" `
  --allowed-o-auth-scopes "email" "openid" "profile" `
  --allowed-o-auth-flows-user-pool-client `
  --supported-identity-providers "Google" "COGNITO" `
  2>&1

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ URLs configuradas com sucesso!" -ForegroundColor Green
  Write-Host ""
  Write-Host "📋 Verificando nova configuração..." -ForegroundColor Yellow
  
  $newConfig = aws cognito-idp describe-user-pool-client `
    --user-pool-id $USER_POOL_ID `
    --client-id $CLIENT_ID `
    --output json | ConvertFrom-Json
  
  Write-Host ""
  Write-Host "Novas Callback URLs:" -ForegroundColor Green
  $newConfig.UserPoolClient.CallbackURLs | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }
  
  Write-Host ""
  Write-Host "Novas Logout URLs:" -ForegroundColor Green
  $newConfig.UserPoolClient.LogoutURLs | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }
} else {
  Write-Host "❌ Erro ao configurar URLs" -ForegroundColor Red
  Write-Host $result -ForegroundColor Red
  Write-Host ""
  Write-Host "Verifique se você tem permissões adequadas" -ForegroundColor Yellow
}


