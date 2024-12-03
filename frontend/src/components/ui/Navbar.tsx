import { NavLink, useNavigate } from "react-router-dom";
import {
	PAGE_ACCOUNT_DETAILS,
	PAGE_HOME,
	PAGE_LOGIN,
	PAGE_REGISTER,
} from "../../App";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { House, LogOut, UserRound, UserRoundPen, UserRoundPlus, X } from "lucide-react";

const Navbar = ({
	toggleMenu,
	isMenuOpen,
}: {
	toggleMenu: () => void;
	isMenuOpen: boolean;
}) => {
	const url = import.meta.env.VITE_API_URL;
	const { isAuthenticated, logoutAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const navigate = useNavigate();

	const handleLogout = async () => {
		setIsLoading(true)
		try {
			const res = await fetch(`${url}/auth/logout`, {
				method: "POST",
				credentials: "include",
			})
			res.json()
			if (res.ok) {
				navigate('/connexion')
				logoutAuth();
				toggleMenu();
			}
		} catch (err) {
			setError(err as string)
		} finally {
			setIsLoading(false)
		}

	};

	return (
		<div className="drawer-side" style={{ zIndex: 50 }}>
			<label htmlFor="my-drawer" className="drawer-overlay"></label>
			<nav className="menu p-4 w-80 bg-base-100 text-base-content h-full">
				<button onClick={toggleMenu} className="w-full flex justify-end">
					<X />
				</button>
				<NavLink
					to={PAGE_HOME}
					onClick={toggleMenu}
					className="navbarText"
				>
					<House className="icon-large text-blueText" /> <p>Accueil</p>
				</NavLink>

				{isAuthenticated === false ? (
					<>
						<NavLink
							to={PAGE_LOGIN}
							onClick={toggleMenu}
							className="navbarText"
						>
							<UserRound className="icon-large" /> <p>Se connecter</p>
						</NavLink>
						<NavLink
							to={PAGE_REGISTER}
							onClick={toggleMenu}
							className="navbarText"
						>
							<UserRoundPlus className="icon-large" /> <p>Créer un compte</p>
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							to={PAGE_ACCOUNT_DETAILS}
							onClick={toggleMenu}
							className="navbarText"
						>
							<UserRoundPen className="icon-large" />  <p>Mes informations</p>
						</NavLink>

						<button
							onClick={handleLogout
							}
							className="navbarText"
						>
							<LogOut className="icon-large" /> <p>Deconnexion</p>
						</button>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
