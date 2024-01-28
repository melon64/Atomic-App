import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface UserData {
    username: string;
    password: string;
}

interface Comment {
    goal: string;
    user: string;
    text: string;
    image: File | null;
    creation_date: string;
}

export function setupAxios() {
    const token = localStorage.getItem('authToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
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
    getProfile: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getGoals: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/goal`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getGoal: async (goalId: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/goal/${goalId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    GetTaskList: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/goals`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    isValidToken: async () => {
        try {
            await axios.post(`${API_BASE_URL}/user/validate`);
            return true;
        } catch (error) {
            return false;
        }
    },
    addComment: async (goalId: string, comment: FormData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/goal/${goalId}/comment`, comment);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getComments: async (goalId: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/goal/${goalId}/comment`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addGoal: async (goal: FormData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/goal`, goal);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default apiService;
