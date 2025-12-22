# 🧪 Guía de Pruebas - CubaConnect

## 📱 Opciones para Probar la Aplicación

### Opción 1: Expo Go (Más Rápido - Recomendado para Pruebas)

#### Paso 1: Instalar Expo Go en tu celular
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Paso 2: Iniciar el servidor de desarrollo
```bash
cd CubaConnect
npm start
```

#### Paso 3: Escanear el código QR
- **Android**: Abre Expo Go y escanea el código QR que aparece en la terminal
- **iOS**: Abre la cámara del iPhone y escanea el código QR

#### Paso 4: ¡Listo!
La app se cargará en tu celular y podrás ver:
- Estado de la red en tiempo real
- Calidad de conexión (2G, 3G, 4G, WiFi)
- Capacidades disponibles (voz, video)
- Configuración recomendada según tu red
- Ahorro de datos estimado

---

### Opción 2: Emulador Android (Para Desarrollo)

#### Requisitos Previos:
- Android Studio instalado
- Emulador Android configurado

#### Pasos:
```bash
cd CubaConnect

# Iniciar emulador Android
npm run android
```

---

### Opción 3: Simulador iOS (Solo Mac)

#### Requisitos Previos:
- Xcode instalado
- Simulador iOS configurado

#### Pasos:
```bash
cd CubaConnect

# Iniciar simulador iOS
npm run ios
```

---

### Opción 4: Web (Para Vista Previa Rápida)

```bash
cd CubaConnect

# Iniciar en navegador web
npm run web
```

**Nota**: Algunas funcionalidades nativas no funcionarán en web.

---

## 🧪 Pruebas de Funcionalidad

### 1. Probar Detección de Red

**Qué probar:**
- Cambia entre WiFi y datos móviles
- Activa/desactiva el modo avión
- Observa cómo cambia el indicador de estado

**Resultado esperado:**
- El indicador debe cambiar de color según la calidad
- Los mensajes deben actualizarse en tiempo real
- Las capacidades (voz/video) deben ajustarse

### 2. Simular Red Lenta (2G)

**En Android (con ADB):**
```bash
# Simular 2G
adb shell settings put global network_type 2

# Restaurar
adb shell settings put global network_type 13
```

**En Chrome DevTools (para web):**
1. Abre DevTools (F12)
2. Ve a Network
3. Selecciona "Slow 3G" o "Fast 3G"

**Resultado esperado:**
- La app debe detectar la red lenta
- Debe recomendar configuración de baja calidad
- Debe deshabilitar video si es muy lento

### 3. Probar Modo Offline

**Qué hacer:**
1. Activa el modo avión
2. Observa el estado de la red
3. Desactiva el modo avión

**Resultado esperado:**
- Debe mostrar "❌ Sin conexión"
- Debe cambiar a "🟢 Conexión excelente" al reconectar

---

## 📊 Métricas a Observar

### Estado de la Red
- ✅ Tipo de conexión (WiFi, Cellular, etc.)
- ✅ Calidad (excellent, good, fair, poor, offline)
- ✅ Tipo efectivo (2g, 3g, 4g)
- ✅ Ancho de banda (Mbps)
- ✅ Latencia (ms)

### Capacidades
- ✅ Llamadas de voz disponibles
- ✅ Videollamadas disponibles

### Configuración Recomendada
- ✅ Resolución de video
- ✅ Bitrate de video
- ✅ Bitrate de audio
- ✅ Calidad de imagen

---

## 🐛 Solución de Problemas

### Error: "Unable to resolve module"
```bash
# Limpiar caché
npm start -- --clear

# O reinstalar dependencias
rm -rf node_modules
npm install
```

### Error: "Metro bundler failed"
```bash
# Reiniciar el servidor
# Presiona Ctrl+C y luego:
npm start
```

### La app no se conecta al servidor
1. Asegúrate de que tu celular y PC estén en la misma red WiFi
2. Verifica que el firewall no esté bloqueando Expo
3. Intenta con el modo túnel: `npm start -- --tunnel`

### No detecta cambios de red
1. Verifica que los permisos de red estén habilitados
2. Reinicia la app
3. Presiona el botón "🔄 Actualizar Estado de Red"

---

## 📝 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Iniciar y limpiar caché
npm start -- --clear

# Iniciar en modo túnel (para redes complicadas)
npm start -- --tunnel

# Ver logs en tiempo real
npm start -- --dev-client

# Construir para Android
npm run android

# Construir para iOS (solo Mac)
npm run ios

# Abrir en navegador
npm run web
```

---

## 🎯 Próximos Pasos

Una vez que hayas probado la demo básica, puedes:

1. **Agregar funcionalidad de chat**
   - Implementar pantalla de conversaciones
   - Agregar envío de mensajes
   - Probar compresión de mensajes

2. **Implementar llamadas de voz**
   - Configurar WebRTC
   - Probar con diferentes calidades de red

3. **Agregar videollamadas**
   - Implementar streaming adaptativo
   - Probar en red 2G vs 4G

4. **Crear backend**
   - Servidor Socket.IO
   - API de autenticación
   - Base de datos

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa la consola de errores
2. Verifica los logs de Expo
3. Consulta la documentación de Expo: https://docs.expo.dev

---

**¡Disfruta probando CubaConnect!** 🚀🇨🇺
