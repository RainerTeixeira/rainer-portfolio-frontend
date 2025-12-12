# Scripts de Deploy com Ngrok

Este diretório contém scripts para automatizar o deploy do frontend na Vercel usando o backend local exposto via ngrok.

## Opção 1: Deploy Automático (Recomendado)

### deploy-ngrok-auto.ps1

Este script obtém automaticamente a URL do ngrok via API e faz o deploy.

**Passos:**

1. **Iniciar o ngrok**:
   ```powershell
   ngrok http 4000
   ```

2. **Executar o script** (em outro terminal):
   ```powershell
   cd c:\Desenvolvimento\rainer-portfolio-frontend
   .\scripts\deploy-ngrok-auto.ps1
   ```

O script irá:
- ✅ Detectar automaticamente a URL do ngrok
- ✅ Atualizar o `.env.homolog`
- ✅ Fazer commit e push das alterações
- ✅ Fazer deploy para Vercel

## Opção 2: Deploy Manual

### deploy-with-ngrok.ps1

Use este script se preferir informar manualmente a URL do ngrok.

**Passos:**

1. **Iniciar o ngrok**:
   ```powershell
   ngrok http 4000
   ```

2. **Copiar a URL** HTTPS do ngrok (ex: `https://abc1-123-45-678-90.ngrok.io`)

3. **Criar arquivo ngrok-url.txt**:
   ```
   https://abc1-123-45-678-90.ngrok.io
   ```

4. **Executar o script**:
   ```powershell
   cd c:\Desenvolvimento\rainer-portfolio-frontend
   .\scripts\deploy-with-ngrok.ps1
   ```

## Pré-requisitos

- PowerShell 7+ (recomendado)
- Git configurado
- Vercel CLI instalado (`npm i -g vercel`)
- Ngrok instalado (`npm i -g ngrok`)

## Solução de Problemas

### Erro: "Não foi possível conectar ao ngrok"
- Verifique se o ngrok está rodando na porta 4040
- Execute `ngrok http 4000` antes de rodar o script

### Erro: "Não está em um repositório git"
- Navegue até o diretório do projeto
- Execute `git init` se necessário

### Erro: "Erro no deploy"
- Verifique se está logado na Vercel (`vercel login`)
- Verifique se o projeto está configurado para deploy

## Fluxo Completo

1. Backend rodando localmente na porta 4000
2. Ngrok expondo a porta 4000
3. Script atualiza o frontend com a URL do ngrok
4. Deploy automático para Vercel
5. Frontend na Vercel acessa backend local via ngrok

## Variáveis de Ambiente

O script atualiza automaticamente:
- `NEXT_PUBLIC_API_URL` no arquivo `.env.homolog`
- Salva backup em `ngrok-url.txt`

## Observações

- A URL do ngrok muda a cada execução
- O deploy na Vercel pode levar 2-3 minutos
- O ngrok gratuito tem limite de uso (desconecta após 8 horas)
