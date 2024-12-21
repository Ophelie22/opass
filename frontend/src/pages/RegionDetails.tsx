import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Package } from "../types/Package";
import type { Region } from "../types/Region";
import type { SiteCategory } from "../types/SiteCategory";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const RegionDetails = () => {
  const url = import.meta.env.VITE_API_URL;
  const [region, setRegion] = useState<Region>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { regionId } = useParams();

  const getAllRegionDetails = () => {
    setIsLoading(true);
    fetch(`${url}/regions/${regionId}/all-relations`)
      .then((response) => response.json())
      .then((data) => {
        setRegion(data.data);
        console.log(data.data)
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
    <main className="main px-4 py-8">
      {region && (
        <>
          <div
            className="relative w-full h-64 bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${region.media})` }}
          >
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-6 py-3 rounded-md shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold">{region.name}</h1>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">{region?.description}</p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Forfaits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {region.packages?.map((p: Package) => (
                <div
                  key={p.id}
                  className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                  <p className="text-gray-600 mb-4">{p.description}</p>
                  <p className="text-gray-600 mb-4">{p.media}</p>
                  <span className="block font-bold text-lg mb-4">
                    {p.price} €
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="btn w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Catégories de site</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {region.categories?.map((category: SiteCategory) => (
                <NavLink
                  to={`/regions/${regionId}/${category.id}`}
                  key={category.id}
                  className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <figure className="h-48 bg-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      src={category.media}
                      alt={category.name}
                    />
                  </figure>
                  <div className="bg-white text-center p-4">
                    <h3 className="text-lg font-bold">{category.name}</h3>
                  </div>
                </NavLink>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default RegionDetails;