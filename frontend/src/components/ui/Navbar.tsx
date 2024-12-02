import { NavLink, useNavigate } from "react-router-dom";
import {
	PAGE_ACCOUNT_DETAILS,
	PAGE_HOME,
	PAGE_LOGIN,
	PAGE_REGISTER,
} from "../../App";
import { useAuth } from "../../context/auth-context";
import { useState } from "react";
import { House, LogOut, UserRound, UserRoundPen, UserRoundPlus } from "lucide-react";

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
		<nav
			className={
				isMenuOpen
					? "navbar flex flex-col gap-2 absolute w-fit top-full left-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2 z-40"
					: "navbar flex flex-col gap-2 absolute w-fit top-full left-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2 z-40 -translate-x-[102%]"
			}
		>
			<NavLink
				to={PAGE_HOME}
				onClick={toggleMenu}
				className="navbarText"
			>
				<House className="icon-medium text-blueText mx-2" /> Accueil
			</NavLink>

			{isAuthenticated === false ? (
				<>
					<NavLink
						to={PAGE_LOGIN}
						onClick={toggleMenu}
						className="navbarText"
					>
						<UserRound className="icon-medium mx-2" /> Se connecter
					</NavLink>
					<NavLink
						to={PAGE_REGISTER}
						onClick={toggleMenu}
						className="navbarText"
					>
						<UserRoundPlus className="icon-medium mx-2" /> Créer son compte
					</NavLink>
				</>
			) : (
				<>
					<NavLink
						to={PAGE_ACCOUNT_DETAILS}
						onClick={toggleMenu}
						className="navbarText"
					>
						<UserRoundPen className="icon-medium mx-2" />  Mes informations
					</NavLink>

					<button
						onClick={handleLogout
						}
						className="navbarText"
					>
						<LogOut className="icon-medium mx-2" /> Deconnexion
					</button>
				</>
			)}
		</nav>
	);
};

export default Navbar;
