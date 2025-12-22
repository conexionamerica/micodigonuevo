@echo off
title CubaConnect - Servidor Expo
color 0A
echo.
echo ========================================
echo   CUBACONNECT - SERVIDOR EXPO
echo ========================================
echo.
echo Iniciando servidor...
echo El codigo QR aparecera en unos segundos.
echo.
echo INSTRUCCIONES:
echo 1. Descarga "Expo Go" en tu telefono
echo 2. Abre Expo Go
echo 3. Toca "Scan QR code"
echo 4. Escanea el QR que aparece abajo
echo.
echo ========================================
echo.

cd /d "%~dp0"
npm start

pause
