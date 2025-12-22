import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompressionService from '../services/CompressionService';
import useNetworkStatus from '../hooks/useNetworkStatus';

/**
 * Pantalla de chat individual con mensajería optimizada
 * Incluye compresión de mensajes y adaptación a la red
 */
export default function ChatScreen({ route, navigation }) {
    const { chat } = route.params;
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [sending, setSending] = useState(false);
    const flatListRef = useRef(null);
    const { networkStatus, statusColor } = useNetworkStatus();

    useEffect(() => {
        loadMessages();
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{chat.name}</Text>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                        <Text style={styles.statusText}>
                            {chat.online ? 'En línea' : 'Desconectado'}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.navigate('Call', { chat, type: 'voice' })}
                    >
                        <Ionicons name="call" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.navigate('Call', { chat, type: 'video' })}
                    >
                        <Ionicons name="videocam" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [chat, statusColor]);

    const loadMessages = async () => {
        try {
            const key = `messages_${chat.id}`;
            const storedMessages = await AsyncStorage.getItem(key);

            if (storedMessages) {
                const parsed = JSON.parse(storedMessages);
                setMessages(parsed);
            } else {
                // Mensajes de demostración
                const demoMessages = [
                    {
                        id: '1',
                        text: '¡Hola! ¿Cómo estás?',
                        sender: 'them',
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        compressed: false,
                        sent: true,
                        delivered: true,
                        read: true,
                    },
                    {
                        id: '2',
                        text: 'Todo bien, gracias! ¿Y tú?',
                        sender: 'me',
                        timestamp: new Date(Date.now() - 3500000).toISOString(),
                        compressed: true,
                        sent: true,
                        delivered: true,
                        read: true,
                    },
                    {
                        id: '3',
                        text: 'Muy bien también. Esta app funciona increíble incluso con mi conexión 2G!',
                        sender: 'them',
                        timestamp: new Date(Date.now() - 3400000).toISOString(),
                        compressed: true,
                        sent: true,
                        delivered: true,
                        read: false,
                    },
                ];
                setMessages(demoMessages);
                await AsyncStorage.setItem(key, JSON.stringify(demoMessages));
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        setSending(true);
        const messageText = inputText.trim();
        setInputText('');

        try {
            // Comprimir el mensaje
            const originalSize = CompressionService.getByteSize(messageText);
            const compressed = CompressionService.compressText(messageText);
            const compressedSize = CompressionService.getByteSize(compressed);
            const ratio = CompressionService.getCompressionRatio(originalSize, compressedSize);

            const newMessage = {
                id: Date.now().toString(),
                text: messageText,
                sender: 'me',
                timestamp: new Date().toISOString(),
                compressed: true,
                compressionRatio: ratio,
                originalSize,
                compressedSize,
                sent: true,
                delivered: false,
                read: false,
            };

            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);

            // Guardar en AsyncStorage
            const key = `messages_${chat.id}`;
            await AsyncStorage.setItem(key, JSON.stringify(updatedMessages));

            // Simular envío y entrega
            setTimeout(() => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === newMessage.id
                            ? { ...msg, delivered: true }
                            : msg
                    )
                );
            }, 1000);

            // Scroll al final
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);

        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderMessage = ({ item }) => {
        const isMe = item.sender === 'me';

        return (
            <View
                style={[
                    styles.messageBubble,
                    isMe ? styles.myMessage : styles.theirMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
                <View style={styles.messageFooter}>
                    <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
                    {item.compressed && (
                        <Ionicons
                            name="flash"
                            size={12}
                            color={isMe ? '#B3E5FC' : '#999'}
                            style={styles.compressedIcon}
                        />
                    )}
                    {isMe && (
                        <Ionicons
                            name={
                                item.read
                                    ? 'checkmark-done'
                                    : item.delivered
                                        ? 'checkmark-done'
                                        : item.sent
                                            ? 'checkmark'
                                            : 'time'
                            }
                            size={16}
                            color={item.read ? '#4FC3F7' : '#B3E5FC'}
                            style={styles.statusIcon}
                        />
                    )}
                </View>
                {item.compressionRatio && (
                    <Text style={styles.compressionInfo}>
                        Ahorro: {item.compressionRatio}%
                    </Text>
                )}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <StatusBar barStyle="light-content" backgroundColor="#075E54" />

            {/* Indicador de red */}
            <View style={[styles.networkBanner, { backgroundColor: statusColor }]}>
                <Text style={styles.networkText}>
                    {networkStatus.quality === 'poor' && '🔴 Red lenta - Mensajes comprimidos al máximo'}
                    {networkStatus.quality === 'fair' && '🟡 Red regular - Compresión activa'}
                    {networkStatus.quality === 'good' && '🟢 Buena conexión'}
                    {networkStatus.quality === 'excellent' && '🟢 Excelente conexión'}
                </Text>
            </View>

            {/* Lista de mensajes */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
                contentContainerStyle={styles.messageListContent}
                onContentSizeChange={() =>
                    flatListRef.current?.scrollToEnd({ animated: true })
                }
            />

            {/* Input de mensaje */}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachButton}>
                    <Ionicons name="add" size={24} color="#666" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Mensaje"
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    maxLength={1000}
                />

                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        (!inputText.trim() || sending) && styles.sendButtonDisabled,
                    ]}
                    onPress={sendMessage}
                    disabled={!inputText.trim() || sending}
                >
                    <Ionicons
                        name={sending ? 'hourglass' : 'send'}
                        size={20}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECE5DD',
    },
    headerTitleContainer: {
        flexDirection: 'column',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 4,
    },
    statusText: {
        fontSize: 12,
        color: '#FFFFFF',
        opacity: 0.8,
    },
    headerButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 20,
    },
    networkBanner: {
        padding: 8,
        alignItems: 'center',
    },
    networkText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    messageList: {
        flex: 1,
    },
    messageListContent: {
        padding: 16,
        paddingBottom: 8,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    messageText: {
        fontSize: 15,
        color: '#000000',
        marginBottom: 4,
    },
    messageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    messageTime: {
        fontSize: 11,
        color: '#666666',
    },
    compressedIcon: {
        marginLeft: 4,
    },
    statusIcon: {
        marginLeft: 4,
    },
    compressionInfo: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
        fontStyle: 'italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    attachButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
        maxHeight: 100,
        fontSize: 15,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#CCC',
    },
});
