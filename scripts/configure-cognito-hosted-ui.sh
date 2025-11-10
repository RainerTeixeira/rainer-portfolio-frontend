#!/bin/bash

# Script para configurar Hosted UI URLs no Cognito via AWS CLI
# Uso: ./scripts/configure-cognito-hosted-ui.sh

USER_POOL_ID="us-east-1_wryiyhbWC"
CLIENT_ID="3ueos5ofu499je6ebc5u98n35h"
CALLBACK_URL="http://localhost:3000/dashboard/login/callback"
SIGNOUT_URLS="http://localhost:3000/dashboard/login http://localhost:3000"

echo "=== Configurando Cognito Hosted UI URLs ==="
echo ""
echo "User Pool ID: $USER_POOL_ID"
echo "Client ID: $CLIENT_ID"
echo "Callback URL: $CALLBACK_URL"
echo "Sign-out URLs: $SIGNOUT_URLS"
echo ""

# Verificar configuração atual
echo "📋 Verificando configuração atual..."
aws cognito-idp describe-user-pool-client \
  --user-pool-id "$USER_POOL_ID" \
  --client-id "$CLIENT_ID" \
  --query 'UserPoolClient.CallbackURLs' \
  --output table

echo ""
echo "📋 URLs de logout atuais:"
aws cognito-idp describe-user-pool-client \
  --user-pool-id "$USER_POOL_ID" \
  --client-id "$CLIENT_ID" \
  --query 'UserPoolClient.LogoutURLs' \
  --output table

echo ""
echo "⚙️ Configurando URLs..."

# Atualizar configuração do App Client
aws cognito-idp update-user-pool-client \
  --user-pool-id "$USER_POOL_ID" \
  --client-id "$CLIENT_ID" \
  --callback-urls "$CALLBACK_URL" \
  --logout-urls $SIGNOUT_URLS \
  --allowed-o-auth-flows "code" \
  --allowed-o-auth-scopes "email" "openid" "profile" \
  --allowed-o-auth-flows-user-pool-client \
  --supported-identity-providers "Google" "COGNITO" \
  > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ URLs configuradas com sucesso!"
  echo ""
  echo "📋 Verificando nova configuração..."
  aws cognito-idp describe-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-id "$CLIENT_ID" \
    --query 'UserPoolClient.[CallbackURLs,LogoutURLs]' \
    --output table
else
  echo "❌ Erro ao configurar URLs"
  echo "Verifique se você tem permissões adequadas"
fi


