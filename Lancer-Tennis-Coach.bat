@echo off
rem Demarre le petit serveur local et ouvre l'application dans le navigateur par defaut.
cd /d "%~dp0"
start "" "http://localhost:8080/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8080
