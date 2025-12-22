# 📱 CubaConnect - Mensajería Optimizada para Redes Lentas

## 🎯 Descripción

CubaConnect es una aplicación de mensajería móvil diseñada específicamente para funcionar en condiciones de red extremadamente lentas (2G) y costosas, como las que se encuentran en Cuba. La aplicación ofrece:

- ✅ **Mensajería de texto ultra-comprimida** - Reduce el uso de datos hasta un 90%
- ✅ **Llamadas de voz optimizadas** - Codec Opus a 8kbps para calidad aceptable
- ✅ **Videollamadas adaptativas** - Se ajusta automáticamente a la velocidad de red
- ✅ **Modo offline** - Mensajes en cola que se envían cuando hay conexión
- ✅ **Compresión inteligente** - Algoritmos LZ-String y Pako para máxima eficiencia
- ✅ **UI familiar** - Interfaz similar a WhatsApp para facilidad de uso

## 🚀 Características Técnicas

### Optimizaciones para Redes Lentas

1. **Compresión de Mensajes**
   - Texto: LZ-String (compresión de hasta 90%)
   - Imágenes: WebP con calidad adaptativa
   - Audio: Opus codec a 8-16 kbps
   - Video: H.264 a 64-128 kbps

2. **Gestión de Conexión**
   - Detección automática de velocidad de red
   - Reconexión automática con backoff exponencial
   - Cola de mensajes offline
   - Sincronización incremental

3. **Protocolo de Comunicación**
   - WebSocket con compresión gzip
   - Mensajes binarios para reducir overhead
   - Heartbeat optimizado (cada 30s)
   - ACK selectivo para reducir tráfico

### Arquitectura

```
CubaConnect/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ChatBubble.js
│   │   ├── MessageInput.js
│   │   ├── CallControls.js
│   │   └── NetworkIndicator.js
│   ├── screens/             # Pantallas principales
│   │   ├── ChatsScreen.js
│   │   ├── ChatScreen.js
│   │   ├── CallScreen.js
│   │   └── SettingsScreen.js
│   ├── services/            # Servicios de backend
│   │   ├── SocketService.js
│   │   ├── CompressionService.js
│   │   ├── VoiceService.js
│   │   └── VideoService.js
│   ├── utils/               # Utilidades
│   │   ├── compression.js
│   │   ├── networkDetector.js
│   │   └── messageQueue.js
│   ├── contexts/            # Contextos de React
│   │   ├── AuthContext.js
│   │   └── ChatContext.js
│   ├── hooks/               # Custom hooks
│   │   ├── useNetworkStatus.js
│   │   └── useCompression.js
│   └── config/              # Configuración
│       └── constants.js
└── App.js                   # Punto de entrada
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
API_URL=https://your-backend-url.com
SOCKET_URL=wss://your-socket-url.com
TURN_SERVER=turn:your-turn-server.com
STUN_SERVER=stun:stun.l.google.com:19302
```

### Configuración del Backend

El backend debe soportar:
- WebSocket con compresión
- TURN/STUN servers para WebRTC
- Almacenamiento de mensajes offline
- API REST para autenticación

## 🎨 Tecnologías Utilizadas

- **React Native** + **Expo** - Framework móvil
- **Socket.IO** - Comunicación en tiempo real
- **WebRTC** - Llamadas de voz y video
- **LZ-String** - Compresión de texto
- **Pako** - Compresión gzip/deflate
- **AsyncStorage** - Almacenamiento local
- **React Navigation** - Navegación
- **Gifted Chat** - UI de chat

## 📊 Uso de Datos Estimado

### Comparación con WhatsApp

| Acción | WhatsApp | CubaConnect | Ahorro |
|--------|----------|-------------|--------|
| Mensaje de texto (100 caracteres) | ~1 KB | ~100 bytes | 90% |
| Llamada de voz (1 min) | ~500 KB | ~60 KB | 88% |
| Videollamada (1 min) | ~5 MB | ~500 KB | 90% |
| Imagen (comprimida) | ~100 KB | ~20 KB | 80% |

## 🔐 Seguridad

- Encriptación end-to-end (E2EE)
- Autenticación con JWT
- Mensajes efímeros opcionales
- Verificación de dispositivos

## 🌐 Compatibilidad de Red

- ✅ 2G (GPRS/EDGE) - 50-200 kbps
- ✅ 3G - 200 kbps - 2 Mbps
- ✅ 4G/LTE - 2+ Mbps
- ✅ WiFi

## 📱 Plataformas Soportadas

- ✅ Android 5.0+
- ✅ iOS 11.0+

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Tu Nombre - Desarrollo inicial

## 🙏 Agradecimientos

- Comunidad de Cuba que inspiró este proyecto
- Desarrolladores de Opus codec
- Equipo de React Native y Expo

---

**Versión:** 1.0.0  
**Última actualización:** Diciembre 2024  
**Estado:** En desarrollo activo
