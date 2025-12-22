import { app } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    type User,
} from 'firebase/auth'

import { useState } from 'react'

import type { userData } from '../types/useAutheticationTypes';
import { FirebaseError } from 'firebase/app';

type UseAuthenticationReturn = {
    auth: ReturnType<typeof getAuth>;
    createUser: (data: userData) => Promise<User | null>;
    login: (data: userData) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null;
};

export const useAuthentication = (): UseAuthenticationReturn => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const auth = getAuth(app);

    // Register
    const createUser = async (data: userData): Promise<User | null> => {
        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );

            if (data.displayName) {
                await updateProfile(user, {
                    displayName: data.displayName,
                });
            };

            setLoading(false);

            return user;

        } catch (error) {

            let systemErrorMessage = "Ocorreu um erro. Tente mais tarde.";

            if (error instanceof Error) {
                if (error.message.includes("Password")) {
                    systemErrorMessage =
                        "A senha precisa conter pelo menos 6 caracteres.";

                } else if (error.message.includes("email-already")) {
                    systemErrorMessage = "E-mail já cadastrado.";
                };
            };

            setError(systemErrorMessage);
            setLoading(false);
            return null;
        };
    };

    // Logout
    const logout = () => {
        signOut(auth);
    };

    // Login
    const login = async (data: userData) => {
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);

        } catch (error) {

            let systemErrorMessage =
                "Ocorreu um erro desconhecido. Tente novamente.";

            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {

                    systemErrorMessage = "Login inválido. Verifique seu e-mail e sua senha.";

                };

                setError(systemErrorMessage);
                setLoading(false);
            };
        };

    };
    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};