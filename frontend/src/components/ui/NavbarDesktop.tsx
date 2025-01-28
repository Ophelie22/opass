import { NavLink, useNavigate } from "react-router-dom";
import {
  PAGE_LOGIN,
  PAGE_HOME,
  PAGE_REGISTER,
  PAGE_ACCOUNT_DETAILS,
} from "../../App";
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";

const NavbarDesktop: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { isAuthenticated, logoutAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<null | string>(null);
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

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `uppercase text-lg font-medium tracking-wide transition-colors duration-200 ${
      isActive ? "text-green border-b-2 border-green" : "text-blueText"
    } hover:text-green hover:border-b-2 hover:border-green`;

  return (
    <nav className="flex items-center gap-8 w-full px-6 h-full">
      <NavLink to={PAGE_HOME} className={navLinkClasses}>
        Accueil
      </NavLink>

      {isAuthenticated === false ? (
        <>
          <NavLink to={PAGE_LOGIN} className={navLinkClasses}>
            Se connecter
          </NavLink>
          <NavLink to={PAGE_REGISTER} className={navLinkClasses}>
            Créer un compte
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={PAGE_ACCOUNT_DETAILS} className={navLinkClasses}>
            Mes informations
          </NavLink>
          <button
            onClick={handleLogout}
            className="uppercase text-lg font-medium tracking-wide text-blueText border-b-2 border-transparent hover:text-green hover:border-green transition-colors duration-200"
          >
            {isLoading ? "Déconnexion..." : "Déconnexion"}
          </button>
        </>
      )}
    </nav>
  );
};

export default NavbarDesktop;