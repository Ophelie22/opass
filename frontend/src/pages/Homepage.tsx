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
      <section className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Explorez nos régions partenaires</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Découvrez des destinations uniques et enrichissantes, et planifiez votre prochaine
          aventure en explorant nos régions partenaires.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl md:text-3xl font-semibold text-center mb-6">Pourquoi choisir nos régions ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Richesse culturelle</h3>
            <p className="text-gray-600">
              Explorez des sites historiques, des musées et des événements culturels qui racontent
              l’histoire et le patrimoine de chaque région.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Beauté naturelle</h3>
            <p className="text-gray-600">
              Plongez dans des paysages spectaculaires, des montagnes majestueuses aux plages de
              sable doré.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">Expériences locales</h3>
            <p className="text-gray-600">
              Profitez d’une immersion totale avec des activités locales, de la gastronomie aux
              artisanats.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl md:text-3xl font-semibold text-center mb-6">Nos Régions</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {regions &&
            regions.map((region: Region) => (
              <NavLink
                key={region.id}
                to={`/regions/${region.id}`}
                className="hover:scale-105 transition-transform"
              >
                <div className="card bg-white shadow-lg overflow-hidden rounded-lg">
                  <figure className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${region.media}`}
                      alt={`Image de ${region.name}`}
                    />
                  </figure>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{region.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Découvrez les merveilles de {region.name} et profitez d'activités uniques dans
                      cette région.
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Homepage;