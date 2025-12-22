import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Hook personalizado para detectar y monitorear la calidad de la red
 * Clasifica la conexión en: offline, 2g, 3g, 4g, wifi
 */
export const useNetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState({
        isConnected: false,
        type: 'unknown',
        quality: 'unknown', // offline, poor, fair, good, excellent
        effectiveType: 'unknown', // 2g, 3g, 4g
        downlink: 0, // Mbps
        rtt: 0, // Round trip time en ms
        saveData: false
    });

    const [bandwidth, setBandwidth] = useState(0);
    const [latency, setLatency] = useState(0);

    useEffect(() => {
        // Suscribirse a cambios en la red
        const unsubscribe = NetInfo.addEventListener(state => {
            updateNetworkStatus(state);
        });

        // Obtener estado inicial
        NetInfo.fetch().then(state => {
            updateNetworkStatus(state);
        });

        // Medir bandwidth y latency periódicamente
        const interval = setInterval(() => {
            measureNetworkQuality();
        }, 30000); // Cada 30 segundos

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, []);

    /**
     * Actualiza el estado de la red
     */
    const updateNetworkStatus = (state) => {
        const quality = determineQuality(state);

        setNetworkStatus({
            isConnected: state.isConnected,
            type: state.type,
            quality,
            effectiveType: state.details?.effectiveType || 'unknown',
            downlink: state.details?.downlink || 0,
            rtt: state.details?.rtt || 0,
            saveData: state.details?.saveData || false
        });
    };

    /**
     * Determina la calidad de la conexión
     */
    const determineQuality = (state) => {
        if (!state.isConnected) return 'offline';

        const { type, details } = state;

        // WiFi generalmente es bueno
        if (type === 'wifi') {
            return details?.strength > 70 ? 'excellent' : 'good';
        }

        // Celular - basado en effectiveType
        const effectiveType = details?.effectiveType;

        switch (effectiveType) {
            case 'slow-2g':
            case '2g':
                return 'poor'; // < 200 kbps
            case '3g':
                return 'fair'; // 200 kbps - 2 Mbps
            case '4g':
                return 'good'; // 2+ Mbps
            default:
                // Fallback basado en downlink
                const downlink = details?.downlink || 0;
                if (downlink < 0.2) return 'poor';
                if (downlink < 2) return 'fair';
                if (downlink < 10) return 'good';
                return 'excellent';
        }
    };

    /**
     * Mide la calidad de la red haciendo una petición de prueba
     */
    const measureNetworkQuality = async () => {
        try {
            const startTime = Date.now();
            const testUrl = 'https://www.google.com/generate_204'; // Endpoint ligero

            const response = await fetch(testUrl, {
                method: 'HEAD',
                cache: 'no-cache'
            });

            const endTime = Date.now();
            const latencyMs = endTime - startTime;

            setLatency(latencyMs);

            // Estimar bandwidth basado en latencia
            // Esto es una aproximación simple
            let estimatedBandwidth = 0;
            if (latencyMs < 100) estimatedBandwidth = 10; // Excelente
            else if (latencyMs < 300) estimatedBandwidth = 2; // Bueno
            else if (latencyMs < 1000) estimatedBandwidth = 0.5; // Regular
            else estimatedBandwidth = 0.1; // Pobre

            setBandwidth(estimatedBandwidth);

        } catch (error) {
            console.error('Error measuring network quality:', error);
            setLatency(9999);
            setBandwidth(0);
        }
    };

    /**
     * Determina si la red es adecuada para video
     */
    const canHandleVideo = () => {
        return networkStatus.quality === 'good' ||
            networkStatus.quality === 'excellent';
    };

    /**
     * Determina si la red es adecuada para voz
     */
    const canHandleVoice = () => {
        return networkStatus.quality !== 'offline';
    };

    /**
     * Obtiene la configuración recomendada de calidad
     */
    const getRecommendedQuality = () => {
        switch (networkStatus.quality) {
            case 'excellent':
                return {
                    video: { width: 1280, height: 720, bitrate: 1000 },
                    audio: { bitrate: 64 },
                    image: { quality: 0.9 }
                };
            case 'good':
                return {
                    video: { width: 640, height: 480, bitrate: 500 },
                    audio: { bitrate: 32 },
                    image: { quality: 0.7 }
                };
            case 'fair':
                return {
                    video: { width: 320, height: 240, bitrate: 128 },
                    audio: { bitrate: 16 },
                    image: { quality: 0.5 }
                };
            case 'poor':
                return {
                    video: null, // No video
                    audio: { bitrate: 8 },
                    image: { quality: 0.3 }
                };
            default:
                return {
                    video: null,
                    audio: null,
                    image: { quality: 0.5 }
                };
        }
    };

    /**
     * Obtiene un mensaje descriptivo del estado de la red
     */
    const getStatusMessage = () => {
        if (!networkStatus.isConnected) {
            return '❌ Sin conexión';
        }

        switch (networkStatus.quality) {
            case 'excellent':
                return '🟢 Conexión excelente';
            case 'good':
                return '🟢 Buena conexión';
            case 'fair':
                return '🟡 Conexión regular';
            case 'poor':
                return '🔴 Conexión lenta';
            default:
                return '⚪ Verificando conexión...';
        }
    };

    /**
     * Obtiene el color del indicador
     */
    const getStatusColor = () => {
        switch (networkStatus.quality) {
            case 'excellent':
            case 'good':
                return '#4CAF50'; // Verde
            case 'fair':
                return '#FF9800'; // Naranja
            case 'poor':
                return '#F44336'; // Rojo
            default:
                return '#9E9E9E'; // Gris
        }
    };

    return {
        networkStatus,
        bandwidth,
        latency,
        canHandleVideo: canHandleVideo(),
        canHandleVoice: canHandleVoice(),
        recommendedQuality: getRecommendedQuality(),
        statusMessage: getStatusMessage(),
        statusColor: getStatusColor(),
        refresh: measureNetworkQuality
    };
};

export default useNetworkStatus;
