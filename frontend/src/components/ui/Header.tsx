import Navbar from "./Navbar";
import logoRectangle from "../../assets/logo-rectangle.svg";
import { PAGE_HOME } from "../../App";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import NavbarDesktop from "./NavbarDesktop";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col" style={{ zIndex: 10 }}>
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b-2 border-[#F5F5F5] relative h-20">
          {isMobile ? (
            <>
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost items-center"
                aria-label="Toggle navigation menu"
              >
                <Menu />
              </label>
              <NavLink
                to={PAGE_HOME}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <img
                  src={logoRectangle}
                  alt="Logo OPass rectangulaire"
                  className="w-52"
                />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={PAGE_HOME} className="w-48">
                <img
                  src={logoRectangle}
                  alt="Logo OPass rectangulaire"
                  className="w-52"
                />
              </NavLink>
              <NavbarDesktop />
            </>
          )}
          <NavLink to="/panier" className="relative">
            <ShoppingCart className="cursor-pointer w-6 h-6" />
            {cart.length > 0 ? (
              <div className="badge badge-error badge-sm absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                {cart.length}
              </div>
            ) : null}
          </NavLink>
        </header>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;