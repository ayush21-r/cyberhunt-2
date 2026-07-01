@echo off
title TECHALFA CYBER HUNT GATEWAY
color 0A
cls
echo =======================================================================
echo          T E C H A L F A  //  C Y B E R  H U N T  //  G A T E W A Y
echo =======================================================================
echo  [SYSTEM LOG] INITIALIZING CLASSIFIED OPERATIONS INTERFACE...
echo  [SYSTEM LOG] PROTOCOL: CLIENT CONNECTION STACK v1.0
echo  [SYSTEM LOG] ADDR: localhost:5173
echo.

if not exist node_modules (
    echo  [WARNING] REQUIRED ENCRYPTION PACKAGES MISSING!
    echo  [SYSTEM LOG] INSTALLING DEPENDENCIES. STANDBY...
    call npm install
)

if not exist backend\node_modules (
    echo  [WARNING] REQUIRED BACKEND PACKAGES MISSING!
    echo  [SYSTEM LOG] INSTALLING BACKEND DEPENDENCIES. STANDBY...
    pushd backend
    call npm install
    popd
)

echo.
echo  [SYSTEM LOG] SECURE TERMINAL LAUNCHING...
echo.
npm run dev:all
pause
