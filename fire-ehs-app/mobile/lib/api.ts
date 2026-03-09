
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

// Determine base URL based on environment
// For Android Emulator, use 10.0.0.2
// For iOS Simulator, use localhost
// For physical device, use your machine's IP address
const getBaseUrl = () => {
    // Replace with your machine's LAN IP for physical device testing
    // e.g., 'http://192.168.1.5:3000'
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(':')[0];

    if (!localhost) {
        return 'http://localhost:3000';
    }

    return `http://${localhost}:3000`;
};

const api = axios.create({
    baseURL: getBaseUrl() + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('auth_token');
    console.log(`[API] Request: ${config.method?.toUpperCase()} ${config.url}`);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
