import { createContext, useState } from "react";

export const AccountsContext = createContext({
    email: null,
    isAuth: null,
    role: null,
    login: (user) => null,
    logout: () => null
});

export const AccountsProvider = ({ children }) => {
    const [email, setEmail] = useState(null);
    const [isAuth, setAuth] = useState(false);
    const [role, setRole] = useState(null); 

    const login = (user) => {
        setEmail(user.email);
        setAuth(true);
        setRole(user.roles); 
    }

    const logout = () => {
        setEmail(null);
        setAuth(false);
        setRole(null); 
    }
 
    const value = { email, isAuth, role, login, logout };

    return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>
}
