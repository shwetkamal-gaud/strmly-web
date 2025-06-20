import { createContext, useContext, useState, type ReactNode } from "react";

type GlobalContextType = {
    userId: string | null;
    login: (id: string) => void;
    logout: () => void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    const login = (id: string) => {
        localStorage.setItem("userId", id);
        setUserId(id);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        setUserId(null);
    };

    return (
        <GlobalContext.Provider value={{ userId, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobal must be used inside GlobalProvider");
    return context;
};
