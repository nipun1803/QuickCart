import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="loading-spinner">Loading...</div>; // You can replace with a spinner component
    }

    if (!user || !isAdmin()) {
        // Redirect to home if not authorized
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
