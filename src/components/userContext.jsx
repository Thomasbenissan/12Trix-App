import React, { createContext, useState, useContext } from 'react';

const UsernameContext = createContext();

export const useUsername = () => useContext(UsernameContext);

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUsername(userData.nickname);
        setUser(userData);
    };

    const logout = () => {
        setUsername('');
        setUser(null);
    };

    return (
        <UsernameContext.Provider value={{ username, user, setUsername, login, logout }}>
            {children}
        </UsernameContext.Provider>
    );
};

export { UsernameContext };
