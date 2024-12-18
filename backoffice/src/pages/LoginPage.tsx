import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/authregion';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            }, {
                withCredentials: true,
            });

            console.log('Réponse du serveur:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                setError('Token non reçu du serveur');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erreur de connexion:', error.response?.data);
                setError(error.response?.data?.message || 'Erreur de connexion, veuillez réessayer.');
            } else {
                console.error('Erreur inattendue:', error);
                setError('Une erreur inattendue est survenue.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-4 text-center">Connexion Administrateur</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border w-full p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border w-full p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
