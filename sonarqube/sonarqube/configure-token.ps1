<#
.SYNOPSIS
    Script de configuração rápida do token do SonarQube

.DESCRIPTION
    Este script facilita a configuração do token do SonarQube
    e execução da primeira análise.

.EXAMPLE
    .\configure-token.ps1

.NOTES
    Autor: Rainer Teixeira
    Versão: 1.0.0
#>

# Cores para output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Banner
Clear-Host
Write-ColorOutput "╔════════════════════════════════════════════════════════════════╗" $InfoColor
Write-ColorOutput "║          🔧 Configuração do Token SonarQube                   ║" $InfoColor
Write-ColorOutput "║          Rainer Portfolio Frontend                             ║" $InfoColor
Write-ColorOutput "╚════════════════════════════════════════════════════════════════╝" $InfoColor
Write-Host ""

# Verificar se SonarQube está rodando
Write-ColorOutput "🔍 Verificando se SonarQube está rodando..." $InfoColor
$running = docker ps --filter "name=sonarqube-local" --format "{{.Names}}"

if ($running -ne "sonarqube-local") {
    Write-ColorOutput "⚠️  SonarQube não está rodando!" $WarningColor
    Write-ColorOutput "Por favor, inicie o SonarQube primeiro:" $InfoColor
    Write-ColorOutput "  .\sonarqube.ps1 start" $SuccessColor
    Write-Host ""
    exit 1
}

Write-ColorOutput "✅ SonarQube está rodando!" $SuccessColor
Write-Host ""

# Instruções para obter o token
Write-ColorOutput "📝 PASSO 1: Obter o Token do SonarQube" $InfoColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""
Write-ColorOutput "Se você ainda NÃO gerou o token:" $WarningColor
Write-ColorOutput "  1. Acesse: http://localhost:9000" $InfoColor
Write-ColorOutput "  2. Faça login (admin/admin)" $InfoColor
Write-ColorOutput "  3. Vá em: Account → Security → Generate Token" $InfoColor
Write-ColorOutput "  OU na página do projeto:" $InfoColor
Write-ColorOutput "  1. Clique em 'Projects'" $InfoColor
Write-ColorOutput "  2. Selecione 'rainer-portfolio-frontend'" $InfoColor
Write-ColorOutput "  3. No campo 'Nome do token', digite: portfolio-analysis" $InfoColor
Write-ColorOutput "  4. Clique em 'Gerar'" $InfoColor
Write-ColorOutput "  5. COPIE o token gerado" $InfoColor
Write-Host ""
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""

# Solicitar o token
Write-ColorOutput "📝 PASSO 2: Configurar o Token" $InfoColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""

# Verificar se já existe token configurado
if ($env:SONAR_TOKEN) {
    Write-ColorOutput "✅ Token já configurado na variável de ambiente!" $SuccessColor
    Write-ColorOutput "Token atual: $($env:SONAR_TOKEN.Substring(0, [Math]::Min(10, $env:SONAR_TOKEN.Length)))..." $InfoColor
    Write-Host ""
    Write-ColorOutput "Deseja usar este token? (S/N): " $WarningColor -NoNewline
    $useExisting = Read-Host
    
    if ($useExisting -eq 'N' -or $useExisting -eq 'n') {
        $env:SONAR_TOKEN = $null
    }
}

if (-not $env:SONAR_TOKEN) {
    Write-ColorOutput "Cole o token do SonarQube aqui: " $InfoColor -NoNewline
    $token = Read-Host -AsSecureString
    
    # Converter SecureString para String
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
    $tokenPlainText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
    
    if ([string]::IsNullOrWhiteSpace($tokenPlainText)) {
        Write-ColorOutput "❌ Token não pode ser vazio!" $ErrorColor
        exit 1
    }
    
    # Configurar token
    $env:SONAR_TOKEN = $tokenPlainText
    Write-ColorOutput "✅ Token configurado com sucesso!" $SuccessColor
}

Write-Host ""

# Perguntar sobre configuração permanente
Write-ColorOutput "📝 PASSO 3: Configuração Permanente (Opcional)" $InfoColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""
Write-ColorOutput "Deseja salvar o token no arquivo .env.sonarqube?" $WarningColor
Write-ColorOutput "Isso evitará ter que configurar novamente no futuro." $InfoColor
Write-ColorOutput "⚠️  O arquivo será adicionado ao .gitignore para segurança." $WarningColor
Write-Host ""
Write-ColorOutput "Salvar token no arquivo? (S/N): " $InfoColor -NoNewline
$saveToFile = Read-Host

if ($saveToFile -eq 'S' -or $saveToFile -eq 's') {
    # Criar arquivo .env.sonarqube
    $envFile = "sonarqube\.env.sonarqube"
    
    $envContent = @"
# Configuração do SonarQube
# Gerado automaticamente em: $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")

SONAR_TOKEN=$env:SONAR_TOKEN
SONAR_HOST_URL=http://localhost:9000
SONAR_PROJECT_KEY=rainer-portfolio-frontend
SONAR_PROJECT_NAME=Rainer Portfolio Frontend
SONAR_PROJECT_VERSION=1.0.0
"@
    
    Set-Content -Path $envFile -Value $envContent
    Write-ColorOutput "✅ Token salvo em: $envFile" $SuccessColor
    
    # Verificar .gitignore
    $gitignore = ".gitignore"
    if (Test-Path $gitignore) {
        $gitignoreContent = Get-Content $gitignore
        if ($gitignoreContent -notcontains ".env.sonarqube") {
            Add-Content -Path $gitignore -Value "`n# SonarQube`n.env.sonarqube"
            Write-ColorOutput "✅ Adicionado .env.sonarqube ao .gitignore" $SuccessColor
        }
    }
}

Write-Host ""

# Verificar se SonarScanner está instalado
Write-ColorOutput "🔍 Verificando SonarScanner..." $InfoColor
try {
    sonar-scanner --version | Out-Null
    $scannerInstalled = $true
    Write-ColorOutput "✅ SonarScanner está instalado!" $SuccessColor
}
catch {
    $scannerInstalled = $false
    Write-ColorOutput "⚠️  SonarScanner NÃO está instalado!" $WarningColor
    Write-ColorOutput "Para instalar:" $InfoColor
    Write-ColorOutput "  choco install sonarscanner" $SuccessColor
    Write-ColorOutput "  OU" $InfoColor
    Write-ColorOutput "  scoop install sonarscanner" $SuccessColor
}

Write-Host ""

# Perguntar sobre executar análise
if ($scannerInstalled) {
    Write-ColorOutput "📝 PASSO 4: Executar Primeira Análise" $InfoColor
    Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
    Write-Host ""
    Write-ColorOutput "Deseja executar a análise agora? (S/N): " $SuccessColor -NoNewline
    $runAnalysis = Read-Host
    
    if ($runAnalysis -eq 'S' -or $runAnalysis -eq 's') {
        Write-Host ""
        Write-ColorOutput "🚀 Iniciando análise do código..." $InfoColor
        Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
        Write-Host ""
        
        # Navegar para a raiz do projeto
        Set-Location ..
        
        # Executar análise
        sonar-scanner `
            -Dsonar.host.url=http://localhost:9000 `
            -Dsonar.login=$env:SONAR_TOKEN `
            -Dsonar.projectKey=rainer-portfolio-frontend `
            -Dsonar.projectBaseDir=.
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $SuccessColor
            Write-ColorOutput "✅ Análise concluída com sucesso!" $SuccessColor
            Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $SuccessColor
            Write-Host ""
            Write-ColorOutput "📊 Visualize os resultados em:" $InfoColor
            Write-ColorOutput "   http://localhost:9000/dashboard?id=rainer-portfolio-frontend" $SuccessColor
            Write-Host ""
        }
        else {
            Write-Host ""
            Write-ColorOutput "❌ Erro durante a análise!" $ErrorColor
            Write-ColorOutput "Execute com modo debug para mais detalhes:" $InfoColor
            Write-ColorOutput "  sonar-scanner -X" $WarningColor
        }
        
        # Voltar para pasta sonarqube
        Set-Location sonarqube
    }
}

# Resumo final
Write-Host ""
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-ColorOutput "📋 RESUMO DA CONFIGURAÇÃO" $InfoColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""
Write-ColorOutput "✅ Token configurado: SIM" $SuccessColor
Write-ColorOutput "✅ SonarQube rodando: SIM" $SuccessColor
if ($scannerInstalled) {
    Write-ColorOutput "✅ SonarScanner instalado: SIM" $SuccessColor
}
else {
    Write-ColorOutput "⚠️  SonarScanner instalado: NÃO (instale para executar análises)" $WarningColor
}
Write-Host ""

# Próximos passos
Write-ColorOutput "📝 PRÓXIMOS PASSOS:" $InfoColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $InfoColor
Write-Host ""

if (-not $scannerInstalled) {
    Write-ColorOutput "1. Instalar SonarScanner:" $InfoColor
    Write-ColorOutput "   choco install sonarscanner" $SuccessColor
    Write-Host ""
}

Write-ColorOutput "Para executar análises futuras, use:" $InfoColor
Write-ColorOutput "  .\sonarqube.ps1 analyze" $SuccessColor
Write-ColorOutput "  OU" $InfoColor
Write-ColorOutput "  npm run sonar:local" $SuccessColor
Write-Host ""

Write-ColorOutput "Para ver resultados:" $InfoColor
Write-ColorOutput "  http://localhost:9000" $SuccessColor
Write-Host ""

Write-ColorOutput "Para mais comandos:" $InfoColor
Write-ColorOutput "  .\sonarqube.ps1 help" $SuccessColor
Write-Host ""

Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $SuccessColor
Write-ColorOutput "✅ Configuração concluída!" $SuccessColor
Write-ColorOutput "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" $SuccessColor
Write-Host ""

