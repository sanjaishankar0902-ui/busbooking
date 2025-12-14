import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        // Mock validation against registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password, ...userWithoutPass } = foundUser;
            setUser(userWithoutPass);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
            return true;
        }
        return false;
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === userData.email)) {
            return false; // User exists
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after register
        const { password, ...userWithoutPass } = userData;
        setUser(userWithoutPass);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
