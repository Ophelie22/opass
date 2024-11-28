import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Site } from "../types/Site.js";
import { BookOpenText, Contact, Info, Map } from "lucide-react";

const SiteDetails = () => {
  const url = import.meta.env.VITE_API_URL;
	const [site, setSite] = useState<Site>();
  const [categoryName, setCategoryName] = useState("");
  const [regionName, setRegionName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { regionId, categoryId, siteId } = useParams();

  const getRegionById = () => {
    fetch(`${url}/regions/${regionId}`)
      .then((response) => response.json())
      .then((data) => {
        setRegionName(data.data.name);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const getCategoryById = () => {
		fetch(`${url}/siteCategories/${categoryId}`)
			.then((response) => response.json())
			.then((data) => {
				setCategoryName(data.data.name);
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const getSiteById = () => {
		setIsLoading(true);
		fetch(`${url}/sites/${siteId}`)
			.then((response) => response.json())
			.then((data) => {
				setSite(data.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

  useEffect(() => {
    getRegionById();
    getCategoryById();
    getSiteById();
  }, [regionId, categoryId, siteId]);

	if (isLoading)
		return <span className="loading loading-spinner loading-md"></span>;

	if (error) return <p>Erreur: {error}</p>;

	return (
		<main className="main">
			{site && (
				<>
					<p className="text-xs font-medium text-gray-500">
						<NavLink to={"/"}>Accueil</NavLink>
						{` > `}
						<NavLink to={`/regions/${regionId}`}> {regionName}</NavLink>
						{` > `}
						<NavLink to={`/regions/${regionId}/${categoryId}`}>
							{categoryName} 
						</NavLink>
					</p>
					<br />

					<h1 className="h1">{site.name}</h1>

					<section>
						<img
							className="w-full"
							src={`${site.media}`}
							alt={`Image de ${site.name}`}
						/>
						<h2 className="h2">
							<BookOpenText className="icon-medium" /> Description
						</h2>
						<p className="p mt-5">{site.description}</p>
					</section>

					<section className="mt-5">
						<h2 className="h2">
							<Map className="icon-medium" /> Adresse du site
						</h2>
						<p className="p">{site.address}</p>
						<p className="p">
							{site.postal_code} {site.city}
						</p>
						{/* TODO: Introduire la maps avec latitude et longitude */}
						<p className="p">Latitude : {site.latitude}</p>
						<p className="p">Longitude : {site.longitude}</p>
					</section>

					<section className="mt-5">
						<h2 className="h2">
							<Info className="icon-medium" /> Informations
						</h2>
						<p className="p">{site.information}</p>
						<h2 className="h2">
							<Contact className="icon-medium" /> Contact
						</h2>
						<p className="p">{site.contact}</p>
					</section>
				</>
			)}
		</main>
	);
};

export default SiteDetails;
