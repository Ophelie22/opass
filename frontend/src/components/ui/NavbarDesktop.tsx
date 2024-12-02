import { NavLink, useNavigate } from "react-router-dom";
import {
	PAGE_LOGIN,
	PAGE_HOME,
	PAGE_REGISTER,
	PAGE_ACCOUNT_DETAILS,
} from "../../App";
import React, { useState } from "react";
import { useAuth } from "../../context/auth-context";

const NavbarDesktop: React.FC = () => {
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
				navigate("/");
				logoutAuth();
			}
		} catch (err) {
			setError(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<nav className="navbar flex items-center gap-8 w-full px-6 h-full">
			<NavLink
				to={PAGE_HOME}
				className={({ isActive }) => {
					return isActive
						? " text-green font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText"
						: " text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText";
				}}
			>
				Accueil
			</NavLink>

			{isAuthenticated === false ? (
				<>
					<NavLink
						to={PAGE_LOGIN}
						className={({ isActive }) => {
							return isActive
								? " text-green font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText"
								: " text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText";
						}}
					>
						Se connecter
					</NavLink>
					<NavLink
						to={PAGE_REGISTER}
						className={({ isActive }) => {
							return isActive
								? " text-green font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText"
								: " text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText";
						}}
					>
						Créer son compte
					</NavLink>
				</>
			) : (
				<>
					<NavLink
						to={PAGE_ACCOUNT_DETAILS}
						className={({ isActive }) => {
							return isActive
								? " text-green font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText"
								: " text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText";
						}}
					>
						Mes informations
					</NavLink>
					<button onClick={handleLogout} className="text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText">
						Deconnexion
					</button>
				</>
			)}
		</nav>
	);
};

export default NavbarDesktop;
