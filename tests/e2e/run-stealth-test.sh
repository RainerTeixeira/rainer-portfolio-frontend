#!/bin/bash

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  🔒 Teste Google OAuth com Puppeteer Stealth"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "✅ Backend deve estar rodando em http://localhost:4000"
echo "✅ Frontend deve estar rodando em http://localhost:3000"
echo ""
echo "📧 Email para usar: raineroliveira94@hotmail.com"
echo ""

# Executa o teste
npx ts-node tests/e2e/google-stealth.test.ts

