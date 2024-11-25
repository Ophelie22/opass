import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const regions = [
	{
		id: 1,
		name: "Pass Alsace",
		media:
			"https://www.visitfrenchwine.com/sites/default/files/niedermorschwihr-photo-zvardon-conseil-vins-alsace.jpg",
		description: "",
	},
	{
		id: 2,
		name: "Toulouse Pass Tourisme",
		media:
			"https://www.toulouse-tourisme.com/assets/uploads/sites/3/2023/11/toulouse-vue-aerienne.jpg",
		description: "",
	},
	{
		id: 3,
		name: "Pass Côte d'Azur France",
		media:
			"https://media.ouest-france.fr/v1/pictures/MjAyMzA2YjQ0YTM3MGMxYTI2NDM5M2I2YjA5OTNkNzAzMmZkOGU?width=1260&height=708&focuspoint=53%2C52&cropresize=1&client_id=bpeditorial&sign=7865be6b96808dde047dd691e72695a50900455c55e3b9a7a5127dec3ee3ac6e",
		description: "",
	},
	{
		id: 4,
		name: "La Rochelle Océan Pass",
		media:
			"https://i.notretemps.com/1400x787/smart/2022/07/19/la-rochelle.jpeg",
		description: "",
	},
	{
		id: 5,
		name: "Pass Bourgogne-Franche-Comté",
		media:
			"https://www.bourgognefranchecomte.com/uploads/2020/10/alain_doire__bourgogne-franche-comte_tourisme-bfc_0019884a4-1600x900.jpg",
		description: "",
	},
];

const Regions = () => {
	// const API_URL = "http://localhost:3000";
	// const [regions, setRegions] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	// const getAllRegions = () => {
	// 	setIsLoading(true);
	// 	fetch(`${API_URL}/regions`)
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
								<img src={`${region.media}`} alt={`Image de ${region.name}`} />
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
