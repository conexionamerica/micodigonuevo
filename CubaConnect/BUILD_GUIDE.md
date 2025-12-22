# 📱 Guía para Generar e Instalar CubaConnect en tu Teléfono

## 🎯 Opción 1: Build con EAS (Recomendado - Más Fácil)

### Paso 1: Instalar EAS CLI
```bash
npm install -g eas-cli
```

### Paso 2: Iniciar sesión en Expo
```bash
eas login
```
Si no tienes cuenta, créala en: https://expo.dev/signup

### Paso 3: Configurar el proyecto
```bash
cd CubaConnect
eas build:configure
```

### Paso 4: Generar el APK para Android
```bash
# APK para instalar directamente (sin Google Play)
eas build --platform android --profile preview

# O para producción
eas build --platform android --profile production
```

### Paso 5: Descargar e Instalar
1. El comando te dará un link para descargar el APK
2. Descarga el APK en tu teléfono Android
3. Habilita "Instalar desde fuentes desconocidas" en Configuración
4. Abre el APK y presiona "Instalar"

---

## 🎯 Opción 2: Build Local (Más Control)

### Requisitos Previos:
- Android Studio instalado
- Java JDK 11 o superior
- Android SDK configurado

### Paso 1: Instalar Expo CLI
```bash
npm install -g expo-cli
```

### Paso 2: Generar el APK
```bash
cd CubaConnect

# Generar APK
expo build:android -t apk

# O generar AAB (para Google Play)
expo build:android -t app-bundle
```

### Paso 3: Esperar el Build
El proceso puede tomar 10-20 minutos. Expo te enviará un email cuando esté listo.

### Paso 4: Descargar e Instalar
1. Descarga el APK desde el link que te envió Expo
2. Transfiere el APK a tu teléfono
3. Instala el APK

---

## 🎯 Opción 3: Expo Go (Para Pruebas Rápidas)

### Paso 1: Instalar Expo Go
- Descarga "Expo Go" desde Google Play Store o App Store

### Paso 2: Iniciar el servidor
```bash
cd CubaConnect
npm start
```

### Paso 3: Escanear el QR
- Abre Expo Go
- Escanea el código QR que aparece en la terminal
- La app se cargará en tu teléfono

**Nota**: Esta opción NO genera un APK instalable, solo sirve para pruebas.

---

## 📦 Generar APK Standalone (Sin Expo Go)

Si quieres una app completamente independiente:

### Usando eas-cli (Recomendado):

```bash
# 1. Instalar eas-cli
npm install -g eas-cli

# 2. Login
eas login

# 3. Configurar
cd CubaConnect
eas build:configure

# 4. Build APK
eas build --platform android --profile preview

# 5. Descargar
# El comando te dará un link para descargar el APK
```

### Configuración de Build Profiles

Crea un archivo `eas.json` en la raíz del proyecto:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 🔧 Solución de Problemas

### Error: "No se puede instalar el APK"
1. Ve a Configuración → Seguridad
2. Habilita "Orígenes desconocidos" o "Instalar apps desconocidas"
3. Intenta instalar nuevamente

### Error: "Build failed"
```bash
# Limpiar caché
expo start -c

# Reinstalar dependencias
rm -rf node_modules
npm install

# Intentar nuevamente
eas build --platform android --profile preview
```

### Error: "No compatible device"
- Asegúrate de que tu teléfono tenga Android 5.0 o superior
- Verifica que tengas espacio suficiente (mínimo 100 MB)

---

## 📲 Instalar en el Teléfono

### Método 1: Descarga Directa
1. Abre el navegador en tu teléfono
2. Ve al link del APK que te dio EAS
3. Descarga el APK
4. Abre el archivo descargado
5. Presiona "Instalar"

### Método 2: Transferencia por Cable
1. Conecta tu teléfono a la PC con un cable USB
2. Copia el APK a la carpeta "Downloads" del teléfono
3. En el teléfono, abre el explorador de archivos
4. Ve a "Downloads"
5. Toca el APK
6. Presiona "Instalar"

### Método 3: Google Drive / Dropbox
1. Sube el APK a Google Drive o Dropbox
2. Desde tu teléfono, abre Drive/Dropbox
3. Descarga el APK
4. Instala

---

## ✅ Verificar la Instalación

Después de instalar, deberías ver:
- ✅ Icono de CubaConnect en tu pantalla de inicio
- ✅ Al abrir, ver la lista de chats
- ✅ Indicador de estado de red funcionando
- ✅ Poder enviar mensajes de prueba

---

## 🚀 Comandos Rápidos

```bash
# Generar APK con EAS (Recomendado)
eas build --platform android --profile preview

# Verificar estado del build
eas build:list

# Generar para iOS (requiere Mac)
eas build --platform ios --profile preview

# Build para ambas plataformas
eas build --platform all
```

---

## 📊 Tamaño Estimado del APK

- **APK sin optimizar**: ~50-70 MB
- **APK optimizado**: ~30-40 MB
- **Instalación en teléfono**: ~80-100 MB

---

## 🎉 ¡Listo!

Una vez instalada, CubaConnect estará lista para usar en tu teléfono, incluso con conexiones 2G lentas.

### Características que funcionarán:
- ✅ Mensajería con compresión automática
- ✅ Llamadas de voz optimizadas
- ✅ Videollamadas adaptativas
- ✅ Modo offline con cola de mensajes
- ✅ Detección automática de calidad de red
- ✅ Ahorro de datos hasta 90%

---

**¿Necesitas ayuda?** Revisa la documentación en README.md o TESTING.md
