import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                { email, password },
                config
            );

            setUser(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true, role: data.role };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message,
                requiresVerification: error.response?.data?.requiresVerification,
                email: error.response?.data?.email
            };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('userInfo');
        setUser(null);
        window.location.href = '/';
    };

    const updateUserData = (newData) => {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        sessionStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
