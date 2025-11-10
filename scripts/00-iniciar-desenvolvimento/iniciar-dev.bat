@echo off
chcp 65001 >nul
title Iniciar Desenvolvimento Next.js

cd /d "%~dp0\..\.."
powershell -ExecutionPolicy Bypass -File "%~dp0\iniciar-dev.ps1" %*

