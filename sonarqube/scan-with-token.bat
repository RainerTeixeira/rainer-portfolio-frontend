@echo off
setlocal

REM Uso: scan-with-token.bat [token]
REM Se nao passar o token, tenta usar variavel de ambiente SONAR_TOKEN

set TOKEN=%1
if "%TOKEN%"=="" set TOKEN=%SONAR_TOKEN%

if "%TOKEN%"=="" (
    echo.
    echo [ERRO] Token nao configurado!
    echo.
    echo Opcao 1: Passar como parametro
    echo   scan-with-token.bat seu-token-aqui
    echo.
    echo Opcao 2: Configurar variavel de ambiente
    echo   set SONAR_TOKEN=seu-token-aqui
    echo   scan-with-token.bat
    echo.
    echo Como gerar token:
    echo 1. Acesse: http://localhost:9000
    echo 2. Login: admin / admin
    echo 3. Perfil ^> My Account ^> Security
    echo 4. Generate Token
    echo.
    exit /b 1
)

echo.
echo === SonarQube Scanner via Docker ===
echo.

REM Verificar se SonarQube está rodando
docker ps | findstr "sonarqube-local" >nul 2>&1
if errorlevel 1 (
    echo [ERRO] SonarQube nao esta rodando!
    echo Execute: docker-compose -f sonarqube/docker-compose.sonarqube.yml up -d
    exit /b 1
)

echo [OK] SonarQube esta rodando
echo [OK] Token configurado
echo.

cd /d %~dp0\..

echo Diretorio: %CD%
echo Projeto: rainer-portfolio-frontend
echo Server: http://host.docker.internal:9000
echo.
echo Executando analise...
echo.

docker run --rm --add-host="host.docker.internal:host-gateway" -e SONAR_HOST_URL="http://host.docker.internal:9000" -e SONAR_TOKEN=%TOKEN% -v "%CD%:/usr/src" -w "/usr/src" sonarsource/sonar-scanner-cli:latest -Dsonar.projectKey=rainer-portfolio-frontend -Dsonar.sources=app,components,hooks,lib,constants -Dsonar.sourceEncoding=UTF-8 -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts

if errorlevel 1 (
    echo.
    echo [ERRO] Analise falhou!
    exit /b 1
) else (
    echo.
    echo [SUCESSO] Analise concluida!
    echo.
    echo Veja os resultados: http://localhost:9000/dashboard?id=rainer-portfolio-frontend
    echo.
)

endlocal

