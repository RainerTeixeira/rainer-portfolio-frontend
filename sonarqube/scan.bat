@echo off
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
echo.

cd ..

echo Diretorio: %CD%
echo Projeto: rainer-portfolio-frontend
echo Server: http://host.docker.internal:9000
echo.
echo Executando analise...
echo.

docker run --rm --add-host="host.docker.internal:host-gateway" -e SONAR_HOST_URL="http://host.docker.internal:9000" -v "%CD%:/usr/src" -w "/usr/src" sonarsource/sonar-scanner-cli:latest -Dsonar.projectKey=rainer-portfolio-frontend -Dsonar.sources=app,components,hooks,lib,constants -Dsonar.sourceEncoding=UTF-8

if errorlevel 1 (
    echo.
    echo [ERRO] Analise falhou!
    exit /b 1
) else (
    echo.
    echo [SUCESSO] Analise concluida!
    echo Veja os resultados: http://localhost:9000/dashboard?id=rainer-portfolio-frontend
    echo.
)

