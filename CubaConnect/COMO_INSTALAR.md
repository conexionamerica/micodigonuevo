# 📱 GUÍA RÁPIDA: Instalar CubaConnect en tu Teléfono

## 🎯 OPCIÓN 1: EXPO GO (INSTANTÁNEO - RECOMENDADO)

### ✅ Ventajas:
- ⚡ Funciona en 2 minutos
- 🆓 Completamente gratis
- 🔄 Actualización automática
- ✨ No necesitas generar APK

### 📝 Pasos:

**1. En tu teléfono:**
   - Abre Google Play Store
   - Busca "Expo Go"
   - Instala la app (es gratis)

**2. En tu PC (donde está el código):**
   ```bash
   cd CubaConnect
   npm start
   ```

**3. Conectar:**
   - En la terminal aparecerá un código QR
   - Abre Expo Go en tu teléfono
   - Toca "Scan QR code"
   - Escanea el QR
   - ¡Listo! La app se cargará

**Nota**: Tu PC y teléfono deben estar en la misma red WiFi.

---

## 🎯 OPCIÓN 2: GENERAR APK (Para instalar sin Expo Go)

Si quieres un APK instalable que funcione sin Expo Go:

### Método A: Con EAS Build (Recomendado)

**1. Crear cuenta en Expo:**
   - Ve a: https://expo.dev/signup
   - Crea una cuenta gratis

**2. Instalar EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

**3. Login:**
   ```bash
   eas login
   ```
   (Usa tu email y contraseña de Expo)

**4. Configurar proyecto:**
   ```bash
   cd CubaConnect
   eas build:configure
   ```

**5. Generar APK:**
   ```bash
   eas build --platform android --profile preview
   ```

**6. Esperar:**
   - El proceso toma 10-20 minutos
   - Te enviará un email cuando esté listo
   - Te dará un link para descargar el APK

**7. Descargar e instalar:**
   - Abre el link en tu teléfono
   - Descarga el APK
   - Instala (habilita "Fuentes desconocidas" si te lo pide)

### Método B: Build Local (Más complejo)

**Requisitos:**
- Android Studio instalado
- Java JDK 11+
- Android SDK

**Pasos:**
```bash
# 1. Instalar Expo CLI
npm install -g expo-cli

# 2. Generar APK
cd CubaConnect
expo build:android -t apk

# 3. Esperar el build
# 4. Descargar del link que te da
```

---

## 🎯 OPCIÓN 3: APK Pre-compilado (Si alguien ya lo generó)

Si alguien ya generó el APK, solo necesitas:

1. **Descargar el APK** del link que te den
2. **En tu teléfono:**
   - Ve a Configuración → Seguridad
   - Activa "Instalar apps desconocidas" o "Fuentes desconocidas"
3. **Abre el APK descargado**
4. **Toca "Instalar"**
5. **¡Listo!**

---

## ❓ ¿Cuál método usar?

### Usa **EXPO GO** si:
- ✅ Quieres probar rápido (2 minutos)
- ✅ Estás en la misma WiFi que tu PC
- ✅ No te importa tener Expo Go instalado

### Usa **EAS BUILD** si:
- ✅ Quieres un APK instalable
- ✅ Quieres compartir la app con otros
- ✅ No quieres depender de Expo Go
- ✅ Tienes 20 minutos para esperar el build

---

## 🚨 Solución de Problemas

### "No puedo escanear el QR"
- Asegúrate de estar en la misma red WiFi
- Intenta con el modo túnel: `npm start -- --tunnel`

### "No se puede instalar el APK"
- Ve a Configuración → Seguridad
- Activa "Fuentes desconocidas"
- Intenta instalar nuevamente

### "El build falló"
- Verifica que tengas cuenta en Expo
- Asegúrate de estar logueado: `eas whoami`
- Intenta nuevamente: `eas build --platform android --profile preview`

---

## 📞 Necesitas Ayuda?

1. **Expo Go**: https://expo.dev/go
2. **EAS Build**: https://docs.expo.dev/build/setup/
3. **Documentación**: Ver README.md en el proyecto

---

## ⚡ RECOMENDACIÓN RÁPIDA

**Para probar AHORA (2 minutos):**
1. Instala Expo Go en tu teléfono
2. En tu PC: `cd CubaConnect && npm start`
3. Escanea el QR
4. ¡Listo!

**Para tener APK instalable (20 minutos):**
1. Crea cuenta en expo.dev
2. `npm install -g eas-cli`
3. `eas login`
4. `cd CubaConnect`
5. `eas build --platform android --profile preview`
6. Espera el email con el link
7. Descarga e instala

---

**¿Qué método prefieres?** 🚀
