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
// SUR TOUTES LES PAGES, MEME CELLES QUI NE NECESSITENT PAS L'AUTH. TODO...

interface AuthContextInterface {
	isLoadingAuth: boolean;
	isAuthenticated: boolean;
	user: User | null;
  loginAuth: (user: User) => void;
  logoutAuth:() => void;
}

export const AuthContext = createContext<AuthContextInterface>({
	isLoadingAuth: true,
	isAuthenticated: false,
	user: null,
  loginAuth: () => {},
  logoutAuth: () => {},

});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
 	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const url = import.meta.env.VITE_API_URL;

  const loginAuth = (user: User) => {
    setIsAuthenticated(true);
	setUser(user);
  }

  const logoutAuth = () => {
    setIsAuthenticated(false);
  }

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
        setIsLoadingAuth(false);
      }
		};
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
        isLoadingAuth,
				isAuthenticated,
				user,
        loginAuth,
        logoutAuth
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
