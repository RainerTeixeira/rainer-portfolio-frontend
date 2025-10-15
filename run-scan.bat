@echo off
echo.
echo === Executando SonarQube Scanner ===
echo.
echo Projeto: rainer-portfolio-frontend
echo Diretorio: %CD%
echo.

docker run --rm --add-host=host.docker.internal:host-gateway -e SONAR_HOST_URL=http://host.docker.internal:9000 -e SONAR_TOKEN=sqp_e26f42481d4e8e5afbb2993bf75cdb8f4e6226cc -v "%CD%:/usr/src" -w /usr/src sonarsource/sonar-scanner-cli:latest -Dsonar.projectKey=rainer-portfolio-frontend -Dsonar.sources=app,components,hooks,lib,constants -Dsonar.sourceEncoding=UTF-8 -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx,**/dist/**,**/.next/**,**/out/**,**/coverage/**,**/public/**,**/*.config.js,**/*.config.ts

echo.
if errorlevel 1 (
    echo [ERRO] Analise falhou!
    pause
) else (
    echo [SUCESSO] Analise concluida!
    echo.
    echo Veja os resultados em: http://localhost:9000/dashboard?id=rainer-portfolio-frontend
    echo.
    pause
)

