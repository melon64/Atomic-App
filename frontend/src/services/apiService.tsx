import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface UserData {
    username: string;
    password: string;
  }

const apiService = {
    signUp: async (userData: UserData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logIn: async (userData: UserData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, userData);
            localStorage.setItem('authToken', response.data['access_token']);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access_token']}`;
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logOut: async () => {
        try {
            localStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
            throw error;
        }
    },

};

export default apiService;
