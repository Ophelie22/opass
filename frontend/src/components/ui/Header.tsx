import Navbar from "./Navbar";
import logoRectangle from "../../assets/logo-rectangle.svg";

const Header = () => {

    return (
        <header className="flex items-center h-24">
            <img src={logoRectangle} alt='Logo OPass rectangulaire' className="h-24" />
            <Navbar />
        </header>
    );
}

export default Header;