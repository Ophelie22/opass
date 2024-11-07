import { NavLink } from "react-router-dom";
import { PAGE_LOGIN, PAGE_REGIONS, PAGE_REGISTER } from "../../App";

const Navbar = () => {

    return (
        <>
            <NavLink to={PAGE_REGIONS}>Régions</NavLink>
            <NavLink to={PAGE_LOGIN}>Se connecter</NavLink>
            <NavLink to={PAGE_REGISTER}>Créer son compte</NavLink>


        </>
    );
}

export default Navbar;