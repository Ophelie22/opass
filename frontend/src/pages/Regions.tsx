// import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { regions } from './data.js';

const Regions = () => {
	// const API_URL = "http://localhost:3000";
	// const [regions, setRegions] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	// const getAllRegions = () => {
	// 	setIsLoading(true);
	// 	fetch(`${API_URL}/regions/visitors`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setRegions(data);
	//       setIsLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			setError(error.message);
	//       setIsLoading(false);
	// 		})
	// };

	// useEffect(() => {
	// 	 getAllRegions();
	// }, []);

	// if (isLoading) return <span className="loading loading-spinner loading-md"></span>

	// if (error) return <p>Erreur: {error}</p>

	return (
		<main className="main">
			<h1 className="h1">Nos partenaires</h1>

			<div className="w-full flex flex-col gap-8">
				{regions?.map((region) => (
					<NavLink to={`/regions/${region.id}`}>
						<div className="card image-full h-48">
							<figure>
								<img className="w-full" src={`${region.media}`} alt={`Image de ${region.name}`} />
							</figure>
							<div className="card-body items-center text-center justify-center">
								<h3 className="card-title">{region.name}</h3>
							</div>
						</div>
					</NavLink>
				))}
			</div>
		</main>
	);
};

export default Regions;
