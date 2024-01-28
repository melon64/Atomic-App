import React, { useState } from 'react';
import apiService from '../../services/apiService';
import { useNavigate } from 'react-router-dom';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await apiService.signUp({ username, password });
            console.log(response.data);
            navigate('/');
        } 
        catch (error) {
            console.error('Error during sign up:', error);
        }
    };

    return (
        <div className="container">
            <h1>Sign up</h1>
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
                <a id="redir" href="/">Already have an account? Log in here!</a>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
