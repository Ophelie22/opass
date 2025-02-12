import React, { useEffect, useState } from 'react';
import { fetchPackages, fetchSites } from '../api';

const DashboardPage: React.FC = () => {
    const [packagesCount, setPackagesCount] = useState(0);
    const [totalPackagePrice, setTotalPackagePrice] = useState(0); // Nouvel état pour le prix total
    const [sitesCount, setSitesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        try {
            // Récupérer les données des packages et des sites
            const packages = await fetchPackages(5, token!); // Récupérer les packages pour la région 5
            const sites = await fetchSites(5, token!); // Récupérer les sites pour la région 5

            // Calculer le nombre de packages
            setPackagesCount(packages.length);

            // Calculer le prix total des packages
            const totalPrice = packages.reduce((acc: number, pkg: any) => acc + parseFloat(pkg.price || 0), 0);
            setTotalPackagePrice(totalPrice);

            // Mettre à jour le nombre de sites
            setSitesCount(sites.length);
        } catch (error) {
            console.error('Erreur lors de la récupération des données du tableau de bord :', error);
            setError("Impossible de charger les données.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Tableau de Bord</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Carte Nombre de Packages */}
                    <div className="bg-white shadow rounded-lg p-6 flex items-center">
                        <div className="p-4 bg-blue-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.293 15.707a1 1 0 010-1.414l4.95-4.95H3a1 1 0 110-2h12.243l-4.95-4.95a1 1 0 011.414-1.414l6.364 6.364a1 1 0 010 1.414l-6.364 6.364a1 1 0 01-1.414 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-700">Nombre de Packages</p>
                            <p className="text-2xl font-bold text-blue-600">{packagesCount}</p>
                        </div>
                    </div>

                    {/* Carte Prix Total des Packages */}
                    <div className="bg-white shadow rounded-lg p-6 flex items-center">
                        <div className="p-4 bg-yellow-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-yellow-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2h-2v-2zm0-10h2v6h-2V4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-700">Prix Total des Packages</p>
                            <p className="text-2xl font-bold text-yellow-600">{totalPackagePrice.toFixed(2)} €</p>
                        </div>
                    </div>

                    {/* Carte Nombre de Sites */}
                    <div className="bg-white shadow rounded-lg p-6 flex items-center">
                        <div className="p-4 bg-green-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5zm2 2a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-700">Nombre de Sites</p>
                            <p className="text-2xl font-bold text-green-600">{sitesCount}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;