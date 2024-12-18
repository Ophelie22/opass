import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Pass {
    id: number;
    packageId: number | null;
    codePass: string;
    orderId: number;
    createdAt: string;
    updatedAt: string;
}

const PassDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pass, setPass] = useState<Pass | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPassDetails = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/2/passes/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPass(response.data.data); // Adapter selon votre API
        } catch (err) {
            console.error('Erreur lors de la récupération du pass :', err);
            setError('Impossible de charger le pass.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPassDetails();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Détails du Pass</h1>
            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && pass && (
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-bold">Pass #{pass.id}</h2>
                    <p>Code : {pass.codePass}</p>
                    <p>Package ID : {pass.packageId || 'Non associé'}</p>
                    <p>Order ID : {pass.orderId}</p>
                    <p>Créé le : {new Date(pass.createdAt).toLocaleDateString()}</p>
                    <p>Mise à jour le : {new Date(pass.updatedAt).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

export default PassDetails;