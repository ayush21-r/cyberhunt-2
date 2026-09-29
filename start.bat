@echo off
title HACK WITH INDIA // OPERATION HUNT GATEWAY
color 0A
cls
echo =======================================================================
echo     H A C K  W I T H  I N D I A  //  O P E R A T I O N  H U N T
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
