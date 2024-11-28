// import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { regions } from './data';
import { Package } from "../types/Package";
import { Region } from "../types/Region";
import { SiteCategory } from "../types/SiteCategory";


const RegionDetails = () => {

	// const API_URL = 'http://localhost:3000';
	// const [region, setRegion] = useState({});
	// const [siteCategories, setSiteCategories] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [isLoading1, setIsLoading1] = useState(false);
	// const [error, setError] = useState(null);
	// const [error1, setError1] = useState(null);

	const { regionId } = useParams();

	const region = regions.find((region: Region) => region.id === regionId)

	// const getAllRegionDetails = () => {
	//   setIsLoading(true);
	//   fetch(`${API_URL}/regions/${regionId}/all-relations`)
	//     .then((response) => response.json())
	//     .then((data) => {
	//       setRegion(data);
	//       setIsLoading(false);
	//     })
	//     .catch((error) => {
	//       setError(error.message);
	//       setIsLoading(false)
	//     })
	// }

	// useEffect(() => {
	//   getAllRegionDetails();
	// }, [])

	// if (isLoading) return <span className="loading loading-spinner loading-md"></span>

	// if (error) return <p>Erreur: {error}</p>

	return (
		<main className="main">
			{region &&
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
								<figure>
									<img src={p.media} alt="Illustration du package" />
								</figure>
								<div className="card-body text-center">
									<h3 className="text-2xl">
										{p.nbr_days === 1 ? "Pass 24h" : `Pass ${p.nbr_days} jours`}
									</h3>
									<p className="p">{p.description}</p>
									<span className="my-6 text-lg">{p.price} €</span>
									<button className="btn">Ajouter au panier</button>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-6">
						<h2 className="h2">Catégories de site</h2>

						{region.siteCategory?.map((category: SiteCategory) => (
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
				</>}
		</main>
	);
};

export default RegionDetails;
