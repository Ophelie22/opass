import { NavLink } from "react-router-dom";
import { PAGE_LOGIN, PAGE_REGIONS, PAGE_REGISTER } from "../../App";

const Navbar = ({
    toggleMenu,
    isMenuOpen,
}: {
    toggleMenu: () => void;
    isMenuOpen: boolean;
}) => {
    return (
        <nav
            className={
                isMenuOpen
                    ? "navbar flex flex-col gap-2 absolute w-fit top-full left-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2"
                    : "navbar flex flex-col gap-2 absolute w-fit top-full left-0 right-0 bg-white shadow-md border-t-2 border-[#F5F5F5] transition p-2 -translate-x-[102%]"
            }
        >
            <NavLink
                to={PAGE_REGIONS}
                onClick={toggleMenu}
                className="p-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide"
            >
                Régions
            </NavLink>
            <NavLink
                to={PAGE_LOGIN}
                onClick={toggleMenu}
                className="p-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide"
            >
                Se connecter
            </NavLink>
            <NavLink
                to={PAGE_REGISTER}
                onClick={toggleMenu}
                className="p-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide"
            >
                Créer son compte
            </NavLink>
        </nav>
    );
};

export default Navbar;
