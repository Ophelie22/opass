import { Routes, Route } from "react-router-dom";
import AccountDetails from "./pages/AccountDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RegionDetails from "./pages/RegionDetails";
import Sites from "./pages/Sites";
import SiteDetails from "./pages/SiteDetails";
import Contact from "./pages/Contact";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Cgvu from "./pages/Cgvu";
import AuthProvider from "./context/authContext";
import Homepage from "./pages/Homepage";
import { CartProvider } from "./context/cartContext";
import ShoppingCart from "./pages/ShoppingCart";

export const PAGE_NOT_FOUND = "*";
export const PAGE_HOME = "/";
export const PAGE_CGVU = "/cgvu";
export const PAGE_PRIVACY_POLICY = "/politique-de-confidentialite";
export const PAGE_CONTACT = "/contact";
export const PAGE_LOGIN = "/connexion";
export const PAGE_REGISTER = "/inscription";
export const PAGE_ACCOUNT_DETAILS = "/mes-informations";
export const PAGE_REGIONS_DETAILS = "/regions/:regionId";
export const PAGE_CATEGORY_DETAILS = "/regions/:regionId/:categoryId";
export const PAGE_SITE_DETAILS = "/regions/:regionId/:categoryId/:siteId";
export const PAGE_SHOPPING_CART = "/panier";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<AuthProvider>
				<CartProvider>
					<Header />
					<div className="flex-grow">
						<Routes>
							<Route path={PAGE_NOT_FOUND} element={<NotFound />} />
							<Route path={PAGE_HOME} element={<Homepage />} />
							<Route path={PAGE_CGVU} element={<Cgvu />} />
							<Route path={PAGE_PRIVACY_POLICY} element={<PrivacyPolicy />} />
							<Route path={PAGE_CONTACT} element={<Contact />} />
							<Route path={PAGE_LOGIN} element={<Login />} />
							<Route path={PAGE_REGISTER} element={<Register />} />
							<Route path={PAGE_ACCOUNT_DETAILS} element={<AccountDetails />} />
							<Route path={PAGE_REGIONS_DETAILS} element={<RegionDetails />} />
							<Route path={PAGE_CATEGORY_DETAILS} element={<Sites />} />
							<Route path={PAGE_SITE_DETAILS} element={<SiteDetails />} />
							<Route path={PAGE_SHOPPING_CART} element={<ShoppingCart />} />
						</Routes>
					</div>
					<Footer />
				</CartProvider>
			</AuthProvider>
		</div>
	);
}
export default App;
