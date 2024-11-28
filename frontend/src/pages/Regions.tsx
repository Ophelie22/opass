import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { Region } from "../types/Region";
// import { regions } from './data.js';

const Regions = () => {
	const [regions, setRegions] = useState<Region[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

  const url = import.meta.env.VITE_API_URL;

	const getAllRegions = () => {
		setIsLoading(true);
		fetch(`${url}/regions/visitors`)
			.then((response) => response.json())
			.then((data) => {
				setRegions(data.data);
        console.log(data.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		getAllRegions();
	}, []);

	if (isLoading) return <span className="loading loading-spinner loading-md"></span>

	if (error) return <p>Erreur: {error}</p>

	return (
		<main className="main">
			<h1 className="h1">Nos partenaires</h1>

			<div className="w-full flex flex-col gap-8">
				{regions && regions?.map((region: Region) => (
					<NavLink key={region.id} to={`/regions/${region.id}`}>
						<div  className="card image-full h-48">
							<figure>
								<img
									className="w-full"
									src={`${region.media}`}
									alt={`Image de ${region.name}`}
								/>
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
