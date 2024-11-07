import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5500/api/auth/login', { email, password });
            const { token } = response.data;

            // Save the token to local storage or state management
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
            // Redirect to the main page
            navigate('/main');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const goToSignUp = () => {
        navigate('/signup'); // Navigate to the Sign-Up page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <p>Don't have an account?</p>
            <button onClick={goToSignUp}>Sign Up</button>
        </div>
    );
};

export default LoginPage;
