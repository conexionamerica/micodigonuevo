@echo off
echo ========================================
echo   GENERADOR DE APK - CUBACONNECT
echo ========================================
echo.
echo Este script generara el APK automaticamente.
echo.
echo PASOS QUE HARA:
echo 1. Verificar que EAS CLI este instalado
echo 2. Pedirte que hagas login en Expo
echo 3. Generar el APK
echo 4. Darte el link de descarga
echo.
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Verificando EAS CLI...
where eas >nul 2>&1
if %errorlevel% neq 0 (
    echo EAS CLI no esta instalado. Instalando...
    call npm install -g eas-cli
)

echo.
echo [2/4] Haciendo login en Expo...
echo.
echo IMPORTANTE: Necesitas crear una cuenta GRATIS en https://expo.dev/signup
echo Si ya tienes cuenta, ingresa tu email y password a continuacion.
echo.
pause
call eas login

echo.
echo [3/4] Generando APK...
echo Esto tomara 10-20 minutos. El APK se generara en la nube.
echo.
call eas build --platform android --profile preview

echo.
echo [4/4] LISTO!
echo.
echo El comando anterior te dio un LINK para descargar el APK.
echo.
echo INSTRUCCIONES:
echo 1. Copia el link que aparece arriba
echo 2. Abrelo en tu telefono
echo 3. Descarga el APK
echo 4. Instala el APK
echo.
echo ========================================
echo   APK GENERADO EXITOSAMENTE!
echo ========================================
echo.
pause
