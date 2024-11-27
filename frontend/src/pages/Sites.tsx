// import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { sites } from "./data";
import getCategoryName from "../utils/getCategoryName";
import { Site } from "../types/Site";

const Sites = () => {
  // const API_URL = "http://localhost:3000";
  // const [sitesByCategory, setSitesByCategory] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { regionId, categoryId } = useParams();

  const sitesByCategory: Site[] = sites.filter(
    (site: Site) =>
      site.category_id === categoryId && site.region_id === regionId
  );

  const categoryName = getCategoryName(categoryId);

  // const getAllSitesByCategory = () => {
  // 	setIsLoading(true)
  // 	fetch(`${API_URL}/"à définir"`)
  // 		.then((response) => response.json())
  // 		.then((data) => {
  // 			setSitesByCategory(data);
  //       setIsLoading(false);
  // 		})
  // 		.catch((error) => {
  // 			setError(error.message);
  //       setIsLoading(false);
  // 		})
  // };

  // useEffect(() => {
  // 	 getAllSitesByCategory();
  // }, []);

  // if (isLoading) return <span className="loading loading-spinner loading-md"></span>

  // if (error) return <p>Erreur: {error}</p>
  return (
    <main className="main">
      <h1 className="h1">{categoryName} à visiter</h1>

      <div className="w-full flex flex-col gap-8">
        {sitesByCategory.length === 0 ? (
          <p>Aucun site trouvé pour cette catégorie.</p>
        ) : (
          <>
            {sitesByCategory?.map((site) => (
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
