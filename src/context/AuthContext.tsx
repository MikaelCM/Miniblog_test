import { useContext, createContext } from "react";

import type { AuthContextType, AuthProviderProps } from "../types/AuthContextTypes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, value }) => {
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export const useAuthValue = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error("useAuthValue deve ser usado dentro de um AuthProvider")
    };

    return context;
}