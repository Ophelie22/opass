import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import type { Region } from "../types/Region";

const Homepage = () => {
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
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllRegions();
  }, []);

  if (isLoading) return <span className="loading loading-spinner loading-md"></span>;

  if (error) return <p>Erreur: {error}</p>;

  return (
    <main className="main px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">Nos partenaires</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {regions &&
          regions.map((region: Region) => (
            <NavLink
              key={region.id}
              to={`/regions/${region.id}`}
              className="hover:scale-105 transition-transform"
            >
              <div className="card bg-base-100 shadow-lg overflow-hidden">
                <figure className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={`${region.media}`}
                    alt={`Image de ${region.name}`}
                  />
                </figure>
                <div className="card-body items-center text-center p-4">
                  <h3 className="card-title text-lg font-semibold">{region.name}</h3>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </main>
  );
};

export default Homepage;