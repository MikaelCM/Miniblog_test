import type { User } from "firebase/auth";
import type { ReactNode } from "react";

export interface AuthContextType {
    user: User | null | undefined;
    loading?: boolean;

    login?: (email: string, password: string) => Promise<void>;
    logout?: () => void;
};

export interface AuthProviderProps {
    children: ReactNode;
    value: AuthContextType;
};