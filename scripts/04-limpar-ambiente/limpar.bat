@echo off
chcp 65001 >nul
title Limpar Ambiente

cd /d "%~dp0\..\.."
powershell -ExecutionPolicy Bypass -File "%~dp0\limpar.ps1" %*

