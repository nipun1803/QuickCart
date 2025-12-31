import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../utils/api';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const token = searchParams.get('token');
    const hasProcessed = useRef(false);

    useEffect(() => {
        const processLogin = async () => {
            // Prevent duplicate execution (React StrictMode / re-renders)
            if (hasProcessed.current) return;
            hasProcessed.current = true;

            if (token) {
                try {
                    const { data } = await api.get('/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    login(data);
                    localStorage.setItem('token', token);

                    toast.success("Welcome! Logged in successfully.");
                    navigate('/');
                } catch (error) {
                    console.error("Auth callback error:", error);
                    toast.error("Failed to complete login.");
                    navigate('/signin');
                }
            } else {
                navigate('/signin');
            }
        };

        processLogin();
    }, [token, login, navigate]);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-zinc-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-zinc-600 font-medium">Completing secure sign in...</p>
            </div>
        </div>
    );
};

export default AuthCallback;
