import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const isLoggedIn = token && token.length > 0;

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 