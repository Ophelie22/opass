import { NavLink, useNavigate } from "react-router-dom";
import {
	PAGE_ACCOUNT_DETAILS,
	PAGE_HOME,
	PAGE_LOGIN,
	PAGE_REGISTER,
} from "../../App";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import {
	House,
	LogOut,
	UserRound,
	UserRoundPen,
	UserRoundPlus,
	X,
} from "lucide-react";

const Navbar = () => {
	const url = import.meta.env.VITE_API_URL;
	const { isAuthenticated, logoutAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const navigate = useNavigate();

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(`${url}/auth/logout`, {
				method: "POST",
				credentials: "include",
			});
			res.json();
			if (res.ok) {
				navigate(PAGE_LOGIN);
				logoutAuth();
			}
		} catch (err) {
			setError(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	// Gérer la fermeture du drawer
	const closeDrawer = () => {
		const drawerCheckbox = document.getElementById("my-drawer") as HTMLInputElement;
		if (drawerCheckbox) drawerCheckbox.checked = false;
	};

	return (
		<div className="drawer-side" style={{ zIndex: 50 }}>
			<label htmlFor="my-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
			<nav className="menu p-4 w-72 bg-base-100 text-base-content h-full shadow-lg">
				<div className="flex justify-between items-center mb-4">
					<p className="text-lg font-bold">Menu</p>
					<button onClick={closeDrawer} className="btn btn-circle btn-sm">
						<X className="icon-large text-gray-700" />
					</button>
				</div>

				<NavLink
					to={PAGE_HOME}
					className="navbarText flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-200"
					onClick={closeDrawer}
				>
					<House className="icon-large text-blueText" />
					<p>Accueil</p>
				</NavLink>

				{!isAuthenticated ? (
					<>
						<NavLink
							to={PAGE_LOGIN}
							className="navbarText flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-200"
							onClick={closeDrawer}
						>
							<UserRound className="icon-large" />
							<p>Se connecter</p>
						</NavLink>
						<NavLink
							to={PAGE_REGISTER}
							className="navbarText flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-200"
							onClick={closeDrawer}
						>
							<UserRoundPlus className="icon-large" />
							<p>Créer un compte</p>
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							to={PAGE_ACCOUNT_DETAILS}
							className="navbarText flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-200"
							onClick={closeDrawer}
						>
							<UserRoundPen className="icon-large" />
							<p>Mes informations</p>
						</NavLink>

						<button
							onClick={() => {
								handleLogout();
								closeDrawer();
							}}
							className="navbarText flex items-center gap-3 py-2 px-4 rounded-md hover:bg-gray-200"
						>
							<LogOut className="icon-large" />
							<p>Déconnexion</p>
						</button>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;