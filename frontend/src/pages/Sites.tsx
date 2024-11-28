import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Site } from "../types/Site";

const Sites = () => {
  const url = import.meta.env.VITE_API_URL;
	const [sites, setSites] = useState<Site[]>([]);
	const [categoryName, setCategoryName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { regionId, categoryId } = useParams();

	// const categoryName = getCategoryName(categoryId);

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

	const getAllSitesByCategory = () => {
		setIsLoading(true);
		fetch(`${url}/sites/${regionId}/${categoryId}`)
			.then((response) => response.json())
			.then((data) => {
				setSites(data.data);
				console.log(data.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getCategoryById();
		getAllSitesByCategory();
	}, [regionId, categoryId]);

	if (isLoading)
		return <span className="loading loading-spinner loading-md"></span>;

	if (error) return <p>Erreur: {error}</p>;
	return (
		<main className="main">
			<h1 className="h1">{categoryName} à visiter</h1>

			<div className="w-full flex flex-col gap-8">
				{sites.length === 0 ? (
					<p>Aucun site trouvé pour cette catégorie.</p>
				) : (
					<>
						{sites?.map((site) => (
							<NavLink to={`/regions/${regionId}/${categoryId}/${site.id}`}>
								<div className="card image-full h-48">
									<figure>
										<img
											className="w-full"
											src={`${site.media}`}
											alt={`Image de ${site.name}`}
										/>
									</figure>
									<div className="card-body items-center text-center justify-center">
										<h3 className="card-title">{site.name}</h3>
									</div>
								</div>
							</NavLink>
						))}
					</>
				)}
			</div>
		</main>
	);
};

export default Sites;
