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
    <main className="main px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {categoryName} à visiter
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.length === 0 ? (
          <p className="text-center text-gray-600">
            Aucun site trouvé pour cette catégorie.
          </p>
        ) : (
          sites.map((site) => (
            <NavLink
              to={`/regions/${regionId}/${categoryId}/${site.id}`}
              key={site.id}
              className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <figure className="h-48 bg-gray-200">
                <img
                  className="w-full h-full object-cover"
                  src={`${site.media}`}
                  alt={`Image de ${site.name}`}
                />
              </figure>
              <div className="bg-white text-center p-4">
                <h3 className="text-lg font-bold">{site.name}</h3>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </main>
  );
};

export default Sites;