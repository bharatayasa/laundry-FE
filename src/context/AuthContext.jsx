import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ROLES = {
    ADMIN: 'Admin',
    KASIR: 'Kasir',
    PENGOLAHAN: 'Pengolahan',
    KURIR: 'Kurir'
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
    const [userRole, setUserRole] = useState(() => {
        const user = Cookies.get('User');
        const role = user ? JSON.parse(user).role : null;
        return Object.values(ROLES).includes(role) ? role : null;
    });

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));
            const user = Cookies.get('User');
            const role = user ? JSON.parse(user).role : null;
            setUserRole(Object.values(ROLES).includes(role) ? role : null);
        };

        window.addEventListener('storage', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
            {children}
        </AuthContext.Provider>
    );
};
