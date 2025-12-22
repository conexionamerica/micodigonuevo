import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Pantalla principal que muestra la lista de conversaciones
 * Similar a la pantalla principal de WhatsApp
 */
export default function ChatsScreen({ navigation }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const storedChats = await AsyncStorage.getItem('chats');
            if (storedChats) {
                setChats(JSON.parse(storedChats));
            } else {
                // Chats de demostración
                const demoChats = [
                    {
                        id: '1',
                        name: 'María García',
                        lastMessage: 'Hola! ¿Cómo estás?',
                        timestamp: new Date().toISOString(),
                        unread: 2,
                        avatar: '👩',
                        online: true,
                    },
                    {
                        id: '2',
                        name: 'Carlos Rodríguez',
                        lastMessage: 'Nos vemos mañana',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        unread: 0,
                        avatar: '👨',
                        online: false,
                    },
                    {
                        id: '3',
                        name: 'Ana Martínez',
                        lastMessage: 'Gracias por todo!',
                        timestamp: new Date(Date.now() - 7200000).toISOString(),
                        unread: 1,
                        avatar: '👩‍🦰',
                        online: true,
                    },
                    {
                        id: '4',
                        name: 'Familia Cuba 🇨🇺',
                        lastMessage: 'Los extrañamos mucho',
                        timestamp: new Date(Date.now() - 86400000).toISOString(),
                        unread: 5,
                        avatar: '👨‍👩‍👧‍👦',
                        online: false,
                    },
                ];
                setChats(demoChats);
                await AsyncStorage.setItem('chats', JSON.stringify(demoChats));
            }
        } catch (error) {
            console.error('Error loading chats:', error);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Ahora';
        if (diffMins < 60) return `${diffMins}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `${diffDays}d`;
        return date.toLocaleDateString();
    };

    const renderChatItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chat', { chat: item })}
        >
            <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{item.avatar}</Text>
                {item.online && <View style={styles.onlineIndicator} />}
            </View>

            <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatTime}>{formatTime(item.timestamp)}</Text>
                </View>
                <View style={styles.chatFooter}>
                    <Text
                        style={styles.lastMessage}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#075E54" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CubaConnect</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Lista de chats */}
            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
                contentContainerStyle={styles.chatListContent}
            />

            {/* Botón flotante para nuevo chat */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    // Aquí iría la lógica para crear un nuevo chat
                    alert('Función de nuevo chat próximamente');
                }}
            >
                <Ionicons name="chatbubble" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 20,
    },
    chatList: {
        flex: 1,
    },
    chatListContent: {
        paddingBottom: 80,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        fontSize: 50,
        width: 50,
        height: 50,
        textAlign: 'center',
        lineHeight: 50,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    chatTime: {
        fontSize: 12,
        color: '#999999',
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        color: '#666666',
        flex: 1,
        marginRight: 8,
    },
    unreadBadge: {
        backgroundColor: '#25D366',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
});
