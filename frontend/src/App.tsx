import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import AccountDetails from "./pages/AccountDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Regions from "./pages/Regions";
import RegionDetails from "./pages/RegionDetails";
import Sites from "./pages/Sites";
import SiteDetails from "./pages/SiteDetails";
import LegalNotices from "./pages/LegalNotices";
import Contact from "./pages/Contact";
import Header from "./components/ui/Header";

export const PAGE_NOT_FOUND = '*';
export const PAGE_HOME = '/';
export const PAGE_LEGAL_NOTICES = '/mentions-legales';
export const PAGE_CONTACT = '/contact';
export const PAGE_LOGIN = '/connexion';
export const PAGE_REGISTER = '/inscription';
export const PAGE_ACCOUNT_DETAILS = '/mes-informations';
export const PAGE_REGIONS = '/regions';
export const PAGE_REGIONS_DETAILS = '/regions/:regionId';
export const PAGE_SITES = ':categoryId';
export const PAGE_SITE_DETAILS = ':siteId';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path={PAGE_NOT_FOUND} element={<NotFound />} />
				<Route path={PAGE_HOME} element={<Home />} />
				<Route path={PAGE_LEGAL_NOTICES} element={<LegalNotices />} />
				<Route path={PAGE_CONTACT} element={<Contact />} />
				<Route path={PAGE_LOGIN} element={<Login />} />
				<Route path={PAGE_REGISTER} element={<Register />} />
				<Route path={PAGE_ACCOUNT_DETAILS} element={<AccountDetails />} />
				<Route path={PAGE_REGIONS} element={<Regions />} />
				<Route path={PAGE_REGIONS_DETAILS} element={<RegionDetails />}>
					<Route path={PAGE_SITES} element={<Sites />}>
						<Route path={PAGE_SITE_DETAILS} element={<SiteDetails />} />
					</Route>
				</Route>
			</Routes>
		</>
	);

}
export default App;
