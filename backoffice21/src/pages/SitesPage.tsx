import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Site {
    id: number;
    name: string;
    city: string;
    postalCode: string;
    address: string;
    description?: string;
    latitude?: string;
    longitude?: string;
    contact?: string;
    information?: string;
    media?: string;
}

const SitesPage: React.FC = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [contact, setContact] = useState('');
    const [information, setInformation] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingSite, setEditingSite] = useState<Site | null>(null);

    const fetchSites = async () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/5/sites`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSites(response.data.sites);
        } catch (error) {
            console.error('Erreur lors de la récupération des sites :', error);
            setError('Impossible de charger les sites. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const addSite = async () => {
        setError('');
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('city', city);
            formData.append('postalCode', postalCode);
            formData.append('address', address);

            if (description) formData.append('description', description);
            if (latitude) formData.append('latitude', latitude);
            if (longitude) formData.append('longitude', longitude);
            if (contact) formData.append('contact', contact);
            if (information) formData.append('information', information);
            if (media) {
                formData.append('media', media);
            }

            await axios.post(
                `${process.env.REACT_APP_API_URL}/4/sites`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            resetForm();
            fetchSites();
        } catch (err) {
            console.error('Erreur lors de l\'ajout du site :', err);
            setError('Impossible d\'ajouter le site. Veuillez réessayer.');
        }
    };

    const updateSite = async () => {
        if (!editingSite) return;

        setError('');
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('city', city);
            formData.append('postalCode', postalCode);
            formData.append('address', address);

            if (description) formData.append('description', description);
            if (latitude) formData.append('latitude', latitude);
            if (longitude) formData.append('longitude', longitude);
            if (contact) formData.append('contact', contact);
            if (information) formData.append('information', information);
            if (media) {
                formData.append('media', media);
            }

            await axios.put(
                `${process.env.REACT_APP_API_URL}/5/sites/${editingSite.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            resetForm();
            fetchSites();
        } catch (err) {
            console.error('Erreur lors de la mise à jour du site :', err);
            setError('Impossible de mettre à jour le site. Veuillez réessayer.');
        }
    };

    const deleteSite = async (siteId: number) => {
        setError('');
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/5/sites/${siteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSites();
        } catch (err) {
            console.error('Erreur lors de la suppression du site :', err);
            setError('Impossible de supprimer le site. Veuillez réessayer.');
        }
    };

    const resetForm = () => {
        setName('');
        setCity('');
        setPostalCode('');
        setAddress('');
        setDescription('');
        setLatitude('');
        setLongitude('');
        setContact('');
        setInformation('');
        setMedia(null);
        setEditingSite(null);
    };

    const startEditing = (site: Site) => {
        setEditingSite(site);
        setName(site.name);
        setCity(site.city);
        setPostalCode(site.postalCode);
        setAddress(site.address);
        setDescription(site.description || '');
        setLatitude(site.latitude || '');
        setLongitude(site.longitude || '');
        setContact(site.contact || '');
        setInformation(site.information || '');
    };

    useEffect(() => {
        fetchSites();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Gestion des Sites</h1>

            {loading && <p className="text-gray-600">Chargement des sites...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {sites.length === 0 && !loading && (
                <p className="text-gray-600">Aucun site disponible.</p>
            )}

            <div className="grid gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {sites.map((site) => (
                    <div key={site.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        {site.media && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={site.media}
                                    alt={site.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
                            <p className="text-gray-600 mb-2">{site.city}, {site.address}</p>
                            <p className="text-gray-600 mb-2">Code Postal: {site.postalCode}</p>
                            {site.description && <p className="text-gray-600 mb-2">Description: {site.description}</p>}
                            {site.contact && <p className="text-gray-600 mb-2">Contact: {site.contact}</p>}
                            {site.information && <p className="text-gray-600 mb-2">Information: {site.information}</p>}
                            {site.latitude && site.longitude && (
                                <p className="text-gray-600 mb-2">Coordonnées: {site.latitude}, {site.longitude}</p>
                            )}
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => startEditing(site)}
                                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => deleteSite(site.id)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
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
                    {editingSite ? `Modifier le site: ${editingSite.name}` : 'Ajouter un Site'}
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Nom (obligatoire)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Ville (obligatoire)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Adresse (obligatoire)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Code Postal (obligatoire)"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-3 rounded-md w-full md:col-span-2 h-32"
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="border p-3 rounded-md w-full"
                    />
                    <textarea
                        placeholder="Information"
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        className="border p-3 rounded-md w-full md:col-span-2 h-32"
                    />
                    <input
                        type="file"
                        onChange={(e) => setMedia(e.target.files ? e.target.files[0] : null)}
                        className="border p-3 rounded-md w-full md:col-span-2"
                        accept="image/*"
                    />
                    {editingSite ? (
                        <div className="md:col-span-2 flex justify-between">
                            <button
                                onClick={updateSite}
                                className="bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition-colors"
                            >
                                Mettre à jour
                            </button>
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Annuler
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={addSite}
                            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
                        >
                            Ajouter
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SitesPage;
