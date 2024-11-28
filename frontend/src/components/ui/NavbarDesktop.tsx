import { NavLink } from "react-router-dom";
import { PAGE_LOGIN, PAGE_REGIONS, PAGE_REGISTER } from "../../App";
import React from "react";

const NavbarDesktop: React.FC = () => {
	return (
		<nav className="navbar flex items-center gap-8 w-full px-6 h-full">
			<NavLink
				to={PAGE_REGIONS}
				className={({ isActive }) => {
					return isActive
						? " text-green font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText"
						: " text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText";
				}}
			>
				Régions
			</NavLink>
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
		</nav>
	);
};

export default NavbarDesktop;
