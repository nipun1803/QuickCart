/* eslint-disable react-refresh/only-export-components */
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
        const initAuth = async () => {
            try {
                // 🔹 Step 1: check if coming from Google OAuth
                const params = new URLSearchParams(window.location.search);
                const temp = params.get('temp');

                if (temp) {
                    // 🔹 Step 2: finalize OAuth → backend sets cookie
                    await api.get(`/auth/oauth/finalize?temp=${temp}`);

                    // 🔹 Step 3: clean URL (remove ?temp)
                    window.history.replaceState({}, document.title, '/');
                }

                // 🔹 Step 4: fetch logged-in user using cookie
                const { data } = await api.get('/auth/profile');
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async () => {
        // Optional helper (email/password login)
        const { data } = await api.get('/auth/profile');
        setUser(data);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (_error) {
            console.error('Logout failed', _error);
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