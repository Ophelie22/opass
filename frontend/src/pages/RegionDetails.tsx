import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const RegionDetails = () => {
	const region = {
		id: "1",
		name: "Pass Alsace",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit ante lorem, in vulputate arcu sagittis ac. Aenean maximus lorem sit amet fermentum cursus. Curabitur quis convallis nulla. Suspendisse varius lorem quis est euismod commodo. Duis suscipit laoreet enim nec pretium. Nam scelerisque iaculis ipsum, sit amet ultricies arcu tincidunt sed. Suspendisse aliquam tellus nec erat blandit tristique. Etiam sit amet tortor mauris. Suspendisse potenti. Vestibulum quis ornare enim. Aenean nec ullamcorper est. ",
		media:
			"https://www.visitfrenchwine.com/sites/default/files/niedermorschwihr-photo-zvardon-conseil-vins-alsace.jpg",
		packages: [
			{
				id: "1",
				region_id: "1",
				price: "30,00",
				description: "MiniPass idéal pour visiter l'Alsace en 24 heures !",
				nbr_visits: "",
				nbr_days: 1,
				media:
					"https://www.visitfrenchwine.com/sites/default/files/niedermorschwihr-photo-zvardon-conseil-vins-alsace.jpg",
			},
			{
				id: "2",
				region_id: "1",
				price: "40,00",
				description:
					"Le bon plan pour visiter l'Alsace un week-end ou en 48h !",
				nbr_visits: "",
				nbr_days: 2,
				media:
					"https://www.visitfrenchwine.com/sites/default/files/niedermorschwihr-photo-zvardon-conseil-vins-alsace.jpg",
			},
			{
				id: "3",
				region_id: "1",
				price: "50,00",
				description:
					"Pass valable 3 jours sur une période de 14 jours à partir de la première utilisation.",
				nbr_visits: "",
				nbr_days: 3,
				media:
					"https://www.visitfrenchwine.com/sites/default/files/niedermorschwihr-photo-zvardon-conseil-vins-alsace.jpg",
			},
		],
		siteCategory: [
			{
        id: 1,
				name: "Musées",
				created_at: "",
				updated_at: "",
			},
			{
        id: 2,
				name: "Chateaux",
				created_at: "",
				updated_at: "",
			},
			{
        id: 3,
				name: "Parcs animaliers",
				created_at: "",
				updated_at: "",
			},
		],
	};

	// const API_URL = 'http://localhost:3000';
	// const [region, setRegion] = useState({});
	// const [siteCategories, setSiteCategories] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [isLoading1, setIsLoading1] = useState(false);
	// const [error, setError] = useState(null);
	// const [error1, setError1] = useState(null);

	 const params = useParams();
	 const regionId = params.id

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
				<p className="p">{region.description}</p>
			</div>

			<div className="flex flex-col gap-6 px-2">
				<h2 className="h2">Forfaits</h2>
				{region.packages?.map((p) => (
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

				{region.siteCategory?.map((category) => (
					<NavLink to={`/region/${regionId}/${category.id}`}>
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
		</main>
	);
};

export default RegionDetails;
