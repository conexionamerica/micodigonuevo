import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import useNetworkStatus from '../hooks/useNetworkStatus';

const { width, height } = Dimensions.get('window');

/**
 * Pantalla de llamadas de voz y video optimizadas para redes lentas
 * Incluye adaptación automática de calidad según la red
 */
export default function CallScreen({ route, navigation }) {
    const { chat, type } = route.params; // type: 'voice' | 'video'
    const [callStatus, setCallStatus] = useState('connecting'); // connecting, ringing, active, ended
    const [duration, setDuration] = useState(0);
    const [muted, setMuted] = useState(false);
    const [speakerOn, setSpeakerOn] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(type === 'video');
    const [quality, setQuality] = useState('auto');

    const { networkStatus, recommendedQuality, canHandleVideo, canHandleVoice } = useNetworkStatus();

    const pulseAnim = new Animated.Value(1);

    useEffect(() => {
        // Verificar si la red soporta el tipo de llamada
        if (type === 'video' && !canHandleVideo) {
            alert('Tu conexión es muy lenta para videollamadas. Se iniciará una llamada de voz.');
            setVideoEnabled(false);
        } else if (!canHandleVoice) {
            alert('No hay conexión suficiente para realizar llamadas.');
            navigation.goBack();
            return;
        }

        // Simular conexión
        setTimeout(() => {
            setCallStatus('ringing');
        }, 1000);

        setTimeout(() => {
            setCallStatus('active');
            startTimer();
        }, 3000);

        // Animación de pulso
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => {
            // Limpiar al desmontar
        };
    }, []);

    const startTimer = () => {
        const interval = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const endCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    const toggleSpeaker = () => {
        setSpeakerOn(!speakerOn);
    };

    const toggleVideo = () => {
        if (!canHandleVideo && !videoEnabled) {
            alert('Tu conexión no soporta video en este momento');
            return;
        }
        setVideoEnabled(!videoEnabled);
    };

    const getQualityInfo = () => {
        if (type === 'voice') {
            return `Audio: ${recommendedQuality.audio?.bitrate || 16} kbps`;
        } else if (videoEnabled) {
            const video = recommendedQuality.video;
            return video
                ? `Video: ${video.width}x${video.height} @ ${video.bitrate}kbps`
                : 'Solo audio';
        }
        return 'Solo audio';
    };

    const getNetworkQualityColor = () => {
        switch (networkStatus.quality) {
            case 'excellent':
            case 'good':
                return '#4CAF50';
            case 'fair':
                return '#FF9800';
            case 'poor':
                return '#F44336';
            default:
                return '#9E9E9E';
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <LinearGradient
                colors={['#1a237e', '#0d47a1', '#01579b']}
                style={styles.gradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.networkIndicator}>
                        <View
                            style={[
                                styles.networkDot,
                                { backgroundColor: getNetworkQualityColor() },
                            ]}
                        />
                        <Text style={styles.networkText}>{networkStatus.quality}</Text>
                    </View>
                </View>

                {/* Avatar y nombre */}
                <View style={styles.callInfo}>
                    <Animated.View
                        style={[
                            styles.avatarContainer,
                            callStatus === 'ringing' && {
                                transform: [{ scale: pulseAnim }],
                            },
                        ]}
                    >
                        <Text style={styles.avatar}>{chat.avatar}</Text>
                    </Animated.View>

                    <Text style={styles.callerName}>{chat.name}</Text>

                    <Text style={styles.callStatusText}>
                        {callStatus === 'connecting' && 'Conectando...'}
                        {callStatus === 'ringing' && 'Llamando...'}
                        {callStatus === 'active' && formatDuration(duration)}
                        {callStatus === 'ended' && 'Llamada finalizada'}
                    </Text>

                    <Text style={styles.qualityInfo}>{getQualityInfo()}</Text>

                    {networkStatus.quality === 'poor' && (
                        <View style={styles.warningBanner}>
                            <Ionicons name="warning" size={16} color="#FFF" />
                            <Text style={styles.warningText}>
                                Red lenta - Calidad reducida automáticamente
                            </Text>
                        </View>
                    )}
                </View>

                {/* Controles */}
                <View style={styles.controls}>
                    <View style={styles.controlsRow}>
                        <TouchableOpacity
                            style={[styles.controlButton, muted && styles.controlButtonActive]}
                            onPress={toggleMute}
                        >
                            <Ionicons
                                name={muted ? 'mic-off' : 'mic'}
                                size={28}
                                color="#FFFFFF"
                            />
                            <Text style={styles.controlLabel}>
                                {muted ? 'Silenciado' : 'Silenciar'}
                            </Text>
                        </TouchableOpacity>

                        {type === 'video' && (
                            <TouchableOpacity
                                style={[
                                    styles.controlButton,
                                    !videoEnabled && styles.controlButtonActive,
                                ]}
                                onPress={toggleVideo}
                            >
                                <Ionicons
                                    name={videoEnabled ? 'videocam' : 'videocam-off'}
                                    size={28}
                                    color="#FFFFFF"
                                />
                                <Text style={styles.controlLabel}>
                                    {videoEnabled ? 'Video' : 'Sin video'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.controlButton,
                                speakerOn && styles.controlButtonActive,
                            ]}
                            onPress={toggleSpeaker}
                        >
                            <Ionicons
                                name={speakerOn ? 'volume-high' : 'volume-medium'}
                                size={28}
                                color="#FFFFFF"
                            />
                            <Text style={styles.controlLabel}>
                                {speakerOn ? 'Altavoz' : 'Auricular'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botón de colgar */}
                    <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
                        <Ionicons name="call" size={32} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Información de datos */}
                <View style={styles.dataInfo}>
                    <Text style={styles.dataText}>
                        💾 Ahorro de datos: ~{type === 'video' ? '90' : '88'}% vs WhatsApp
                    </Text>
                    <Text style={styles.dataText}>
                        📊 Uso estimado: ~{type === 'video' ? '500' : '60'} KB/min
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    networkIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    networkDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    networkText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    callInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 24,
    },
    avatar: {
        fontSize: 120,
    },
    callerName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    callStatusText: {
        fontSize: 18,
        color: '#FFFFFF',
        opacity: 0.9,
        marginBottom: 8,
    },
    qualityInfo: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.7,
    },
    warningBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 16,
    },
    warningText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginLeft: 8,
    },
    controls: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 32,
    },
    controlButton: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        minWidth: 80,
    },
    controlButtonActive: {
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    controlLabel: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 8,
    },
    endCallButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    dataInfo: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    dataText: {
        color: '#FFFFFF',
        fontSize: 12,
        opacity: 0.7,
        marginBottom: 4,
    },
});
