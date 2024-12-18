import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Pass {
    id: number;
    packageId: number | null;
    codePass: string;
    orderId: number;
    createdAt: string;
    updatedAt: string;
}

const PassList: React.FC = () => {
    const [passes, setPasses] = useState<Pass[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchCode, setSearchCode] = useState(''); // Champ de recherche
    const [singlePass, setSinglePass] = useState<Pass | null>(null); // Résultat de la recherche d'un pass

    const fetchPasses = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/2/passes`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPasses(response.data.data);
        } catch (err) {
            console.error('Erreur lors de la récupération des passes :', err);
            setError('Impossible de charger les passes.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPassByCode = async () => {
        setError(null);
        setSinglePass(null);

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/2/passes/${searchCode}`, // Rechercher par ID ou Code
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSinglePass(response.data.data); // Résultat de la recherche
        } catch (err) {
            console.error('Erreur lors de la recherche du pass :', err);
            setError('Aucun pass trouvé pour ce code.');
        }
    };

    useEffect(() => {
        fetchPasses();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Liste des Passes</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher un pass par code ou ID"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="border p-2 rounded mr-2"
                />
                <button
                    onClick={fetchPassByCode}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Rechercher
                </button>
            </div>
            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {singlePass && (
                <div className="bg-white shadow rounded p-4 mb-4">
                    <h2 className="text-lg font-bold">Pass #{singlePass.id}</h2>
                    <p>Code : {singlePass.codePass}</p>
                    <p>Package ID : {singlePass.packageId || 'Non associé'}</p>
                    <p>Order ID : {singlePass.orderId}</p>
                    <p>Créé le : {new Date(singlePass.createdAt).toLocaleDateString()}</p>
                    <p>Mise à jour le : {new Date(singlePass.updatedAt).toLocaleDateString()}</p>
                </div>
            )}
            <div className="grid gap-4">
                {passes.map((pass) => (
                    <div key={pass.id} className="bg-white shadow rounded p-4">
                        <h2 className="text-lg font-bold">Pass #{pass.id}</h2>
                        <p>Code : {pass.codePass}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PassList;