import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/profile');
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    const login = async () => {
        const { data } = await api.get('/auth/profile');
        setUser(data);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
        }
        setUser(null);
        localStorage.removeItem('cart');
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    const isAdmin = () => user?.role === 'admin';

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        isAdmin,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};