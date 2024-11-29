import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";

interface AuthContextInterface {
    isAuthenticated: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    user: User | null;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
    isAuthenticated: false,
    token: null,
    login: async () => false,
    user: null,
    isLoading: false
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const url = import.meta.env.VITE_API_URL;

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await response.json();

            if (json && json.token) {
                setToken(json.token);
                setIsAuthenticated(true);
                setUser(json.user);
                return true;
            }
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setIsLoading(false);
        }
        return false;
    };


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                user,
                login,
                isLoading,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
