// Configuración de la API
const API_URL = 'http://localhost:3000';
const SOCKET_URL = 'http://localhost:3000';

export default {
    API_URL,
    SOCKET_URL,
    endpoints: {
        register: `${API_URL}/api/auth/register`,
        login: `${API_URL}/api/auth/login`,
        searchUsers: `${API_URL}/api/users/search`,
    }
};
