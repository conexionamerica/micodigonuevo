import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Switch,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useNetworkStatus from '../hooks/useNetworkStatus';

/**
 * Pantalla de configuración de la aplicación
 */
export default function SettingsScreen({ navigation }) {
    const [autoCompress, setAutoCompress] = React.useState(true);
    const [saveData, setSaveData] = React.useState(true);
    const [notifications, setNotifications] = React.useState(true);
    const [autoDownload, setAutoDownload] = React.useState(false);

    const { networkStatus, statusMessage, statusColor } = useNetworkStatus();

    const settingsSections = [
        {
            title: 'Red y Datos',
            items: [
                {
                    icon: 'flash',
                    label: 'Compresión Automática',
                    value: autoCompress,
                    onToggle: setAutoCompress,
                    description: 'Comprime mensajes automáticamente',
                },
                {
                    icon: 'save',
                    label: 'Modo Ahorro de Datos',
                    value: saveData,
                    onToggle: setSaveData,
                    description: 'Reduce el uso de datos al mínimo',
                },
                {
                    icon: 'download',
                    label: 'Descarga Automática',
                    value: autoDownload,
                    onToggle: setAutoDownload,
                    description: 'Descargar medios automáticamente',
                },
            ],
        },
        {
            title: 'Notificaciones',
            items: [
                {
                    icon: 'notifications',
                    label: 'Notificaciones',
                    value: notifications,
                    onToggle: setNotifications,
                    description: 'Recibir notificaciones de mensajes',
                },
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#075E54" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configuración</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                {/* Estado de la Red */}
                <View style={styles.networkCard}>
                    <View style={styles.networkHeader}>
                        <Ionicons name="wifi" size={24} color={statusColor} />
                        <Text style={styles.networkTitle}>Estado de la Red</Text>
                    </View>
                    <View style={[styles.networkStatus, { backgroundColor: statusColor }]}>
                        <Text style={styles.networkStatusText}>{statusMessage}</Text>
                    </View>
                    <View style={styles.networkDetails}>
                        <View style={styles.networkDetailRow}>
                            <Text style={styles.networkDetailLabel}>Tipo:</Text>
                            <Text style={styles.networkDetailValue}>
                                {networkStatus.type || 'Desconocido'}
                            </Text>
                        </View>
                        <View style={styles.networkDetailRow}>
                            <Text style={styles.networkDetailLabel}>Calidad:</Text>
                            <Text style={styles.networkDetailValue}>
                                {networkStatus.quality || 'Desconocido'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Secciones de configuración */}
                {settingsSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.items.map((item, itemIndex) => (
                            <View key={itemIndex} style={styles.settingItem}>
                                <View style={styles.settingLeft}>
                                    <Ionicons name={item.icon} size={24} color="#075E54" />
                                    <View style={styles.settingText}>
                                        <Text style={styles.settingLabel}>{item.label}</Text>
                                        <Text style={styles.settingDescription}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onToggle}
                                    trackColor={{ false: '#CCC', true: '#25D366' }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>
                        ))}
                    </View>
                ))}

                {/* Información */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Acerca de CubaConnect</Text>
                    <Text style={styles.infoText}>
                        CubaConnect está optimizada para funcionar en redes lentas (2G) y
                        reducir el consumo de datos hasta un 90% comparado con otras apps.
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Versión:</Text>
                        <Text style={styles.infoValue}>1.0.0</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Desarrollado para:</Text>
                        <Text style={styles.infoValue}>Cuba 🇨🇺</Text>
                    </View>
                </View>

                {/* Estadísticas de Ahorro */}
                <View style={styles.statsSection}>
                    <Text style={styles.statsTitle}>📊 Ahorro de Datos</Text>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Mensajes de texto:</Text>
                        <Text style={styles.statValue}>~90%</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Llamadas de voz:</Text>
                        <Text style={styles.statValue}>~88%</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Videollamadas:</Text>
                        <Text style={styles.statValue}>~90%</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Imágenes:</Text>
                        <Text style={styles.statValue}>~80%</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#075E54',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 16,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    networkCard: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    networkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    networkTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
        color: '#000',
    },
    networkStatus: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    networkStatusText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    networkDetails: {
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 12,
    },
    networkDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    networkDetailLabel: {
        fontSize: 14,
        color: '#666',
    },
    networkDetailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    section: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#075E54',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: 12,
        flex: 1,
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    settingDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    infoSection: {
        backgroundColor: '#FFF9C4',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F57F17',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    infoLabel: {
        fontSize: 13,
        color: '#666',
    },
    infoValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },
    statsSection: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        marginBottom: 32,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#075E54',
        marginBottom: 16,
    },
    statItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});
