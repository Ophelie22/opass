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

function App() {
	return (
		<>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<LegalNotices />} />
        <Route path='/contact' element={<Contact />} />
				<Route path="/connexion" element={<Login />} />
				<Route path="/inscription" element={<Register />} />
				<Route path="/mes-informations" element={<AccountDetails />} />
				<Route path="/regions" element={<Regions />} />
					<Route path="/régions/:regionId" element={<RegionDetails />}>
						<Route path=":categoryId" element={<Sites />}>
							<Route path=":siteId" element={<SiteDetails />} />
						</Route>
					</Route>
			</Routes>
		</>
	);
}

export default App;
