import { NavLink } from "react-router-dom";
import { PAGE_LOGIN, PAGE_REGIONS, PAGE_REGISTER } from "../../App";
import { useState, useEffect } from "react";

const Navbar = () => {
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
        <>
            {isMobile ? (
                <>
                    {/* Burger Menu in Mobile Version */}
                    <button
                        onClick={toggleMenu}
                        className="btn btn-square btn-ghost items-center"
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? (
                            // Icône croix
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 text-primary stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 6l12 12M6 18L18 6"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 text-primary stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>)}
                    </button>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <nav className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 w-50 flex flex-col items-start transition-transform transform translate-y-2">
                            <NavLink to={PAGE_REGIONS} onClick={toggleMenu} className="py-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide">Régions</NavLink>
                            <NavLink to={PAGE_LOGIN} onClick={toggleMenu} className="py-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide">Se connecter</NavLink>
                            <NavLink to={PAGE_REGISTER} onClick={toggleMenu} className="py-2 w-full text-left text-blueText font-sans uppercase text-lg font-semibold tracking-wide">Créer son compte</NavLink>
                        </nav>
                    )}
                </>
            ) : (
                /* Desktop Menu */
                <nav className="flex gap-8">
                    <NavLink to={PAGE_REGIONS} className="py-2 text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText">Régions</NavLink>
                    <NavLink to={PAGE_LOGIN} className="py-2 text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText">Se connecter</NavLink>
                    <NavLink to={PAGE_REGISTER} className="py-2 text-blueText font-sans uppercase text-lg font-medium tracking-wide border-b-2 border-transparent hover:border-y-blueText">Créer son compte</NavLink>
                </nav >
            )}
        </>
    );
}

export default Navbar;
