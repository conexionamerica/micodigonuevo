import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './src/config/api';

/**
 * CubaConnect - App Completa con Backend Real
 */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('login'); // 'login', 'register', 'chats', 'chat'
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Formularios
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await AsyncStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      connectSocket(userData.id);
      setScreen('chats');
    }
  };

  const connectSocket = (userId) => {
    const newSocket = io(config.SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('✅ Conectado al servidor');
      newSocket.emit('authenticate', userId);
    });

    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user_online', (data) => {
      console.log('Usuario online:', data.userId);
    });

    setSocket(newSocket);
  };

  const handleRegister = async () => {
    if (!registerUsername || !registerEmail || !registerPassword) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    try {
      const response = await fetch(config.endpoints.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
        await AsyncStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        connectSocket(data.user.id);
        setScreen('chats');
        Alert.alert('Éxito', 'Registro exitoso');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Email y contraseña son requeridos');
      return;
    }

    try {
      const response = await fetch(config.endpoints.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
        await AsyncStorage.setItem('token', data.token);
        setCurrentUser(data.user);
        connectSocket(data.user.id);
        loadUsers();
        setScreen('chats');
        Alert.alert('Éxito', 'Login exitoso');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch(`${config.endpoints.searchUsers}?query=`);
      const data = await response.json();
      setUsers(data.filter(u => u.id !== currentUser?.id));
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || !socket || !selectedUser) return;

    const message = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: inputText.trim(),
    };

    socket.emit('send_message', message);

    setMessages(prev => [...prev, {
      ...message,
      timestamp: new Date(),
      id: Date.now().toString(),
    }]);

    setInputText('');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    await AsyncStorage.removeItem('token');
    if (socket) socket.disconnect();
    setCurrentUser(null);
    setScreen('login');
  };

  // PANTALLA DE LOGIN
  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🇨🇺 CubaConnect</Text>
          <Text style={styles.headerSubtitle}>Iniciar Sesión</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setScreen('register')}
          >
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // PANTALLA DE REGISTRO
  if (screen === 'register') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🇨🇺 CubaConnect</Text>
          <Text style={styles.headerSubtitle}>Crear Cuenta</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={registerUsername}
            onChangeText={setRegisterUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={registerEmail}
            onChangeText={setRegisterEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setScreen('login')}
          >
            <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // PANTALLA DE CHATS
  if (screen === 'chats') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chats</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => {
                setSelectedUser(item);
                setMessages([]);
                setScreen('chat');
              }}
            >
              <Text style={styles.avatar}>{item.avatar}</Text>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.username}</Text>
                <Text style={styles.chatEmail}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay usuarios disponibles</Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={loadUsers}
              >
                <Text style={styles.refreshButtonText}>Actualizar</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

  // PANTALLA DE CHAT
  if (screen === 'chat' && selectedUser) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar barStyle="light-content" backgroundColor="#075E54" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setScreen('chats')}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.chatHeader}>
            <Text style={styles.avatar}>{selectedUser.avatar}</Text>
            <Text style={styles.headerTitle}>{selectedUser.username}</Text>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isMe = item.senderId === currentUser.id;
            return (
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myMessage : styles.theirMessage,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>
                  {new Date(item.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            );
          }}
          style={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Mensaje"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  header: {
    backgroundColor: '#075E54',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    marginRight: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#075E54',
    fontSize: 14,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 40,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chatEmail: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    padding: 16,
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
    color: '#000',
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
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
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
