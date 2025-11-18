# =============================================================================
# Script para Finalizar Todos os Processos Node.js
# =============================================================================
# Descrição: Mata todos os processos Node.js, npm, pnpm e processos em portas comuns
# Autor: Rainer Teixeira
# =============================================================================

$ErrorActionPreference = "SilentlyContinue"

# Cores ANSI
$Reset = [char]27 + "[0m"
$Bold = [char]27 + "[1m"
$Red = [char]27 + "[91m"
$Green = [char]27 + "[92m"
$Yellow = [char]27 + "[93m"
$Cyan = [char]27 + "[96m"
$White = [char]27 + "[97m"
$BgRed = [char]27 + "[41m"

Clear-Host

Write-Host ""
Write-Host ("$BgRed$White ╔══════════════════════════════════════════════════════════════════════════╗ $Reset")
Write-Host ("$BgRed$White ║                    🛑 FINALIZAR TODOS PROCESSOS NODE.JS                  ║ $Reset")
Write-Host ("$BgRed$White ╚══════════════════════════════════════════════════════════════════════════╝ $Reset")
Write-Host ""

# =============================================================================
# Verificar e matar processos Node.js
# =============================================================================
Write-Host ("$Cyan 🔍 Verificando processos Node.js ativos...$Reset")
Write-Host ""

$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
$pnpmProcesses = Get-Process -Name pnpm -ErrorAction SilentlyContinue
$npmProcesses = Get-Process -Name npm -ErrorAction SilentlyContinue

$totalProcesses = ($nodeProcesses | Measure-Object).Count + 
                  ($pnpmProcesses | Measure-Object).Count + 
                  ($npmProcesses | Measure-Object).Count

if ($totalProcesses -eq 0) {
    Write-Host ("$Green ✅ Nenhum processo Node.js/npm/pnpm encontrado$Reset")
    Write-Host ""
    Write-Host ("$Yellow Pressione qualquer tecla para fechar...$Reset")
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 0
}

Write-Host ("$Yellow 📊 Encontrados $Bold$totalProcesses$Reset processo(s) Node.js/npm/pnpm$Reset")
Write-Host ""

# Matar processos node
if ($nodeProcesses) {
    $count = ($nodeProcesses | Measure-Object).Count
    Write-Host ("$Red 🛑 Finalizando $count processo(s) node.exe...$Reset")
    $nodeProcesses | Stop-Process -Force
    Write-Host ("$Green ✅ Processos node.exe finalizados$Reset")
    Write-Host ""
}

# Matar processos pnpm
if ($pnpmProcesses) {
    $count = ($pnpmProcesses | Measure-Object).Count
    Write-Host ("$Yellow 🔌 Finalizando $count processo(s) pnpm...$Reset")
    $pnpmProcesses | Stop-Process -Force
    Write-Host ("$Green ✅ Processos pnpm finalizados$Reset")
    Write-Host ""
}

# Matar processos npm
if ($npmProcesses) {
    $count = ($npmProcesses | Measure-Object).Count
    Write-Host ("$Yellow 🔌 Finalizando $count processo(s) npm...$Reset")
    $npmProcesses | Stop-Process -Force
    Write-Host ("$Green ✅ Processos npm finalizados$Reset")
    Write-Host ""
}

# Matar processos em portas específicas
$portsToKill = @(3000, 4000, 5555, 6007)
Write-Host ("$Yellow 🔌 Verificando portas comuns (3000, 4000, 5555, 6007)...$Reset")

foreach ($port in $portsToKill) {
    $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    foreach ($conn in $connections) {
        $pid = $conn.OwningProcess
        if ($pid) {
            try {
                $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
                if ($proc) {
                    Write-Host ("$Yellow    🔌 Finalizando processo na porta $port (PID: $pid - $($proc.ProcessName))...$Reset")
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                }
            } catch {
                # Processo já terminou ou não tem permissão
            }
        }
    }
}
Write-Host ""

# Verificação final
Write-Host ("$Cyan 🔍 Verificação final...$Reset")
Start-Sleep -Seconds 1

$remainingNode = Get-Process -Name node -ErrorAction SilentlyContinue
$remainingPnpm = Get-Process -Name pnpm -ErrorAction SilentlyContinue
$remainingNpm = Get-Process -Name npm -ErrorAction SilentlyContinue

if ($remainingNode -or $remainingPnpm -or $remainingNpm) {
    $remaining = ($remainingNode | Measure-Object).Count + 
                 ($remainingPnpm | Measure-Object).Count + 
                 ($remainingNpm | Measure-Object).Count
    Write-Host ("$Red ⚠️  Ainda há $remaining processo(s) ativo(s)$Reset")
    Write-Host ("$Yellow 💡 Tente executar como Administrador$Reset")
} else {
    Write-Host ("$Green ✅ Todos os processos foram finalizados com sucesso!$Reset")
}
Write-Host ""

Write-Host ("$Green 🎉 Operação concluída!$Reset")
Write-Host ""

Write-Host ("$Yellow Pressione qualquer tecla para fechar...$Reset")
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
