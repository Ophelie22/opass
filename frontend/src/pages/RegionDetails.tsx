import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Package } from "../types/Package";
import type { Region } from "../types/Region";
import type { SiteCategory } from "../types/SiteCategory";
import { useAuth } from "../context/authContext";

const RegionDetails = () => {
	const url = import.meta.env.VITE_API_URL;
	const [region, setRegion] = useState<Region>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const { regionId } = useParams();

	const getAllRegionDetails = () => {
		setIsLoading(true);
		fetch(`${url}/regions/${regionId}/all-relations`)
			.then((response) => response.json())
			.then((data) => {
				setRegion(data.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getAllRegionDetails();
	}, [regionId]);

	if (isLoading)
		return <span className="loading loading-spinner loading-md"></span>;

	if (error) return <p>Erreur: {error}</p>;

	return (
		<main className="main">
			{region && (
				<>
					<div
						className="bg-auto bg-no-repeat bg-center w-full h-64 relative"
						style={{ backgroundImage: `url(${region.media})` }}
					>
						<h1 className="text-4xl text-white bottom-0 absolute px-4 py-2">
							{region.name}
						</h1>
					</div>

					<div>
						<h2 className="h2">Description</h2>
						<p className="p">{region?.description}</p>
					</div>

					<div className="flex flex-col gap-6 px-2">
						<h2 className="h2">Forfaits</h2>
						{region.packages?.map((p: Package) => (
							<div className="card border w-full"> 
								<div className="card-body text-center">
									<h3 className="text-2xl">
										{p.name}
									</h3>
									<p className="p">{p.description}</p>
									<span className="my-6 text-lg">{p.price} €</span>
									<button
										onClick={() => {
											if (isAuthenticated === false) {
												navigate("/connexion");
											} else {
												alert('ajouté au panier')
											}
										}}
										className="btn"
									>
										Ajouter au panier
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-6">
						<h2 className="h2">Catégories de site</h2>

						{region.categories?.map((category: SiteCategory) => (
							<NavLink to={`/regions/${regionId}/${category.id}`}>
								<div className="card image-full h-48">
									<figure>
										<img className="w-full" src="" alt="" />
									</figure>
									<div className="card-body items-center text-center justify-center">
										<h3 className="card-title">{category.name}</h3>
									</div>
								</div>
							</NavLink>
						))}
					</div>
				</>
			)}
		</main>
	);
};

export default RegionDetails;
