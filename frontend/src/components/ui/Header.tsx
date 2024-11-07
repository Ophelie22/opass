import Navbar from "./Navbar";
import logoRectangle from "../../assets/logo-rectangle.svg";
import { PAGE_HOME } from "../../App";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <NavLink to={PAGE_HOME}>
                <img src={logoRectangle} alt='Logo OPass rectangulaire' className="h-24" />
            </NavLink>
            <div className="flex items-center space-x-4">
                <Navbar />
            </div>
        </header>
    );
}

export default Header;