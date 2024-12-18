import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Package {
    id: number;
    regionId: number;
    name: string;
    price: string;
    description: string;
    media: string | null;
    sites?: Site[];
}

interface Site {
    id: number;
    name: string;
    city: string;
}

const PackagesPage: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [sites, setSites] = useState<Site[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [selectedSites, setSelectedSites] = useState<number[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);

    const fetchSites = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/5/sites`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSites(response.data.sites);
        } catch (err) {
            console.error('Erreur lors du chargement des sites:', err);
            setError('Impossible de charger les sites. Veuillez réessayer.');
        }
    };

    const fetchPackages = async () => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/5/packages`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (Array.isArray(response.data.packages)) {
                setPackages(response.data.packages);
            } else {
                setError('Erreur de format de données reçues.');
            }
        } catch (err) {
            handleApiError(err, 'Impossible de charger les packages. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const addOrUpdatePackage = async () => {
        setError('');
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            if (media) {
                formData.append('media', media);
            }

            let response;
            if (editingPackage) {
                // Update existing package
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/5/packages/${editingPackage.id}`,
                    formData,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        } 
                    }
                );
            } else {
                // Create new package
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/5/packages`,
                    formData,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        } 
                    }
                );
            }

            const packageId = editingPackage ? editingPackage.id : response.data.package.id;

            // Update site-package relationships
            await axios.put(
                `${process.env.REACT_APP_API_URL}/5/packages/${packageId}/sites`,
                { siteIds: selectedSites },
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Refresh the packages list
            fetchPackages();
            
            // Reset form
            resetForm();
        } catch (err) {
            handleApiError(err, 'Impossible d\'ajouter/modifier le package. Veuillez réessayer.');
        }
    };

    const deletePackage = async (id: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/5/packages/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== id));
        } catch (err) {
            handleApiError(err, 'Impossible de supprimer le package. Veuillez réessayer.');
        }
    };

    const handleSiteSelection = (siteId: number) => {
        setSelectedSites(prev => {
            if (prev.includes(siteId)) {
                return prev.filter(id => id !== siteId);
            }
            return [...prev, siteId];
        });
    };

    const startEditing = (pkg: Package) => {
        setEditingPackage(pkg);
        setName(pkg.name);
        setPrice(pkg.price);
        setDescription(pkg.description);
        setSelectedSites(pkg.sites?.map(site => site.id) || []);
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setMedia(null);
        setSelectedSites([]);
        setEditingPackage(null);
    };

    const handleApiError = (error: any, defaultMessage: string) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data.message || defaultMessage);
        } else if (error.request) {
            // The request was made but no response was received
            setError('Pas de réponse du serveur. Veuillez réessayer.');
        } else {
            // Something happened in setting up the request that triggered an Error
            setError(defaultMessage);
        }
        console.error('Erreur:', error);
    };

    useEffect(() => {
        fetchPackages();
        fetchSites();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Gestion des Packages</h1>

            {loading && <p className="text-gray-600">Chargement des packages...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {packages.length === 0 && !loading && (
                <p className="text-gray-600">Aucun package disponible.</p>
            )}

            <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        {pkg.media && (
                            <div className="h-64 overflow-hidden">
                                <img 
                                    src={pkg.media}
                                    alt={pkg.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                            <p className="text-green-600 font-medium text-lg mb-3">{pkg.price} €</p>
                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                            {pkg.sites && pkg.sites.length > 0 && (
                                <div className="mb-4">
                                    <p className="font-medium mb-2">Sites inclus:</p>
                                    <ul className="list-disc list-inside">
                                        {pkg.sites.map(site => (
                                            <li key={site.id} className="text-sm text-gray-600">
                                                {site.name} ({site.city})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => startEditing(pkg)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => deletePackage(pkg.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">
                    {editingPackage ? `Modifier le package: ${editingPackage.name}` : 'Ajouter un Package'}
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="number"
                        placeholder="Prix"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-3 rounded-md w-full md:col-span-2 h-32"
                    />
                    <input
                        type="file"
                        onChange={(e) => setMedia(e.target.files ? e.target.files[0] : null)}
                        className="border p-3 rounded-md w-full md:col-span-2"
                        accept="image/*"
                    />
                    
                    <div className="border p-4 rounded-md md:col-span-2">
                        <h3 className="font-medium mb-3">Sélectionner les sites</h3>
                        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
                            {sites.map(site => (
                                <div key={site.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`site-${site.id}`}
                                        checked={selectedSites.includes(site.id)}
                                        onChange={() => handleSiteSelection(site.id)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label 
                                        htmlFor={`site-${site.id}`}
                                        className="text-sm text-gray-700"
                                    >
                                        {site.name} ({site.city})
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-between">
                        <button
                            onClick={addOrUpdatePackage}
                            className={`text-white px-6 py-3 rounded transition-colors ${
                                editingPackage ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {editingPackage ? 'Mettre à jour' : 'Ajouter'}
                        </button>
                        {editingPackage && (
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesPage;
