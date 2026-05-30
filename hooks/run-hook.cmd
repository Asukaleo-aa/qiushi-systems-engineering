@echo off
setlocal enabledelayedexpansion

set "PLUGIN_ROOT=%~dp0.."
set "HOOK_NAME=%~1"

if "%HOOK_NAME%"=="session-start" (
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0session-start.ps1"
) else (
    echo Unknown hook: %HOOK_NAME%
    exit /b 1
)
