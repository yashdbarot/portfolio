@echo off
echo ===================================================
echo Starting Portfolio for Tailscale Funnel / Serve...
echo ===================================================
cd /d %~dp0
set DEPLOY_BASE=/
echo Building production bundles with root base...
call npm run build
echo Starting static server on port 4173...
node serve-static.mjs 4173
