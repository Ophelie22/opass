import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    PAGE_ACCOUNT_DETAILS,
    PAGE_CGVU,
    PAGE_CONTACT,
    PAGE_HOME,
    PAGE_LOGIN,
    PAGE_PRIVACY_POLICY,
    PAGE_REGISTER
} from "../../App";
import { useAuth } from "../../context/authContext";

const Footer: React.FC = () => {
    const url = import.meta.env.VITE_API_URL;
    const { isAuthenticated, logoutAuth } = useAuth();
    const [isLoading, setIsLoading]  = useState(false);
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
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <footer className="bg-lightGray text-blueText w-full">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-6 text-center md:text-left">

                {!isAuthenticated ? (
                    <div>
                        <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Liens utiles</h6>
                        <ul className="space-y-2 ">
                            <li>
                                <NavLink to={PAGE_HOME} className="link link-hover">Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to={PAGE_LOGIN} className="link link-hover">Se connecter</NavLink>
                            </li>
                            <li>
                                <NavLink to={PAGE_REGISTER} className="link link-hover">Créer un compte</NavLink>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h6 className="ftext-center py-4 border-t border-gray-300 mt-6">Liens utiles</h6>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <NavLink to={PAGE_HOME} className="link link-hover">Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to={PAGE_ACCOUNT_DETAILS} className="link link-hover">Mes informations</NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => { handleLogout() }} to={PAGE_LOGIN} className="link link-hover">Déconnexion</NavLink>
                            </li>
                        </ul>
                    </div>
                )}

                <div>
                    <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Support</h6>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to={PAGE_CONTACT} className="link link-hover">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to={PAGE_PRIVACY_POLICY} className="link link-hover">Politique de confidentialité</NavLink>
                        </li>
                        <li>
                            <NavLink to={PAGE_CGVU} className="link link-hover">Conditions générales de vente</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center py-4 border-t border-gray-300 mt-6">
                <p className="text-sm text-gray-500">
                    © 2024 O'Pass. Tous droits réservés.
                </p>
            </div>
              {/* Affichage des erreurs et du chargement */}
            {isLoading && <p className="text-center text-blue-500">Déconnexion en cours...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
        </footer >
    );
}

export default Footer;