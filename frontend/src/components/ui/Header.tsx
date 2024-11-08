import Navbar from "./Navbar";
import logoRectangle from "../../assets/logo-rectangle.svg";
import { PAGE_HOME } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import NavbarDesktop from "./NavbarDesktop";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false); // Close the menu when switching to desktop view
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<header className="flex items-center justify-between px-4 py-2 bg-white border-b-2 border-[#F5F5F5] relative h-20">
			{isMobile === true ? (
				<>
					<button
						onClick={toggleMenu}
						className="btn btn-square btn-ghost items-center"
						aria-label="Toggle navigation menu"
					>
						{isMenuOpen ? <X /> : <Menu />}
					</button>
					<NavLink
						to={PAGE_HOME}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
					>
						<img
							src={logoRectangle}
							alt="Logo OPass rectangulaire"
							className="w-52"
						/>
					</NavLink>

          <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				</>
			) : <>
        <NavLink
						to={PAGE_HOME}
						className="w-48"
					>
						<img
							src={logoRectangle}
							alt="Logo OPass rectangulaire"
							className="w-52"
						/>
					</NavLink>
          <NavbarDesktop />
      </>}

			{/* condition panier (authentifié ou non) */}
			<ShoppingCart />

		</header>
	);
};

export default Header;
