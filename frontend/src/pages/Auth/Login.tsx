import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

import './auth.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && token !== 'undefined') {
          navigate('/user');
        }
      }, [navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await apiService.logIn({ username, password });
            console.log(response);
            const token = localStorage.getItem('authToken');
            if (token && token !== 'undefined') {
              navigate('/user');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    
    return (
        <div className="container">
            <h1>Sign in</h1>
            <h2>Atomic Habits</h2>
            <form className="formbox" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <a id="redir" href="/signup">Don't have an account? Sign up here!</a>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
