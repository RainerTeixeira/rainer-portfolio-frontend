@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul
cls

:: =============================================================================
:: Configuração de Cores ANSI para Windows
:: =============================================================================
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

set "RESET=%DEL%%DEL%[0m"
set "BOLD=%DEL%%DEL%[1m"
set "RED=%DEL%%DEL%[91m"
set "GREEN=%DEL%%DEL%[92m"
set "YELLOW=%DEL%%DEL%[93m"
set "CYAN=%DEL%%DEL%[96m"
set "WHITE=%DEL%%DEL%[97m"
set "BG_RED=%DEL%%DEL%[41m"

:: =============================================================================
:: Banner Principal
:: =============================================================================
echo.
echo %BOLD%%BG_RED%%WHITE% ╔══════════════════════════════════════════════════════════════════════════╗ %RESET%
echo %BOLD%%BG_RED%%WHITE% ║                    🛑 FINALIZAR TODOS PROCESSOS NODE.JS                  ║ %RESET%
echo %BOLD%%BG_RED%%WHITE% ╚══════════════════════════════════════════════════════════════════════════╝ %RESET%
echo.

:: =============================================================================
:: Matar todos os processos Node.js
:: =============================================================================
echo %BOLD%%CYAN%🔍 Verificando processos Node.js ativos...%RESET%
echo.

set "node_count=0"
set "ports_to_kill=3000 4000 5555 6007"

:: Contar processos Node
for /f %%i in ('tasklist /FI "IMAGENAME eq node.exe" 2^>nul ^| find /I /C "node.exe"') do set node_count=%%i

if %node_count% EQU 0 (
    echo %GREEN%✅ Nenhum processo Node.js encontrado%RESET%
    echo.
    echo %YELLOW%Pressione qualquer tecla para fechar...%RESET%
    pause >nul
    exit /b 0
)

echo %YELLOW%📊 Encontrados %BOLD%!node_count!%RESET% processo(s) Node.js%RESET%
echo.

:: Matar processos Node.exe
echo %BOLD%%RED%🛑 Finalizando todos os processos node.exe...%RESET%
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul && (
    taskkill /F /IM node.exe >nul 2>&1
    if not errorlevel 1 (
        echo %GREEN%✅ Todos os processos node.exe foram finalizados%RESET%
    ) else (
        echo %RED%❌ Erro ao finalizar processos (pode precisar de privilégios de administrador)%RESET%
    )
)
echo.

:: Matar processos em portas específicas
echo %YELLOW%🔌 Verificando portas comuns (3000, 4000, 5555, 6007)...%RESET%
for %%P in (%ports_to_kill%) do (
    for /F "tokens=5" %%PID in ('netstat -ano 2^>nul ^| findstr :%%P ^| findstr LISTENING') do (
        echo %YELLOW%   🔌 Finalizando processo na porta %%P (PID: %%PID)...%RESET%
        taskkill /F /PID %%PID >nul 2>&1
    )
)
echo.

:: Verificar processos pnpm (se houver)
echo %YELLOW%🔍 Verificando processos pnpm...%RESET%
tasklist /FI "IMAGENAME eq pnpm.exe" 2>nul | find /I "pnpm.exe" >nul && (
    echo %YELLOW%   🔌 Finalizando processos pnpm...%RESET%
    taskkill /F /IM pnpm.exe >nul 2>&1
    echo %GREEN%✅ Processos pnpm finalizados%RESET%
) else (
    echo %GREEN%✅ Nenhum processo pnpm encontrado%RESET%
)
echo.

:: Verificar processos npm (se houver)
echo %YELLOW%🔍 Verificando processos npm...%RESET%
tasklist /FI "IMAGENAME eq npm.exe" 2>nul | find /I "npm.exe" >nul && (
    echo %YELLOW%   🔌 Finalizando processos npm...%RESET%
    taskkill /F /IM npm.exe >nul 2>&1
    echo %GREEN%✅ Processos npm finalizados%RESET%
) else (
    echo %GREEN%✅ Nenhum processo npm encontrado%RESET%
)
echo.

:: Verificação final
echo %BOLD%%CYAN%🔍 Verificação final...%RESET%
timeout /t 1 >nul
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if not errorlevel 1 (
    echo %RED%⚠️  Alguns processos Node.js ainda estão ativos%RESET%
    echo %YELLOW%💡 Tente executar como Administrador%RESET%
) else (
    echo %GREEN%✅ Todos os processos Node.js foram finalizados com sucesso!%RESET%
)
echo.

echo %BOLD%%GREEN%🎉 Operação concluída!%RESET%
echo.

echo %YELLOW%Pressione qualquer tecla para fechar...%RESET%
pause >nul

