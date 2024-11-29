import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { User } from "../types/User";

// ATTENTION LE PROVIDER ENGLOBE TOUTE L'APPLI
// CE QUI FAIT QUE LA REQUETE CHECK EST APPELLEE
// SUR TOUTES LES PAGES. TODO...

interface AuthContextInterface {
	isLoading: boolean;
	isAuthenticated: boolean;
	user: User | null;
}

export const AuthContext = createContext<AuthContextInterface>({
	isLoading: true,
	isAuthenticated: false,
	user: null,
});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const url = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch(`${url}/auth/check`, {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setIsAuthenticated(data.authenticated);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
        setIsLoading(false);
      }
		};
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
        isLoading,
				isAuthenticated,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
