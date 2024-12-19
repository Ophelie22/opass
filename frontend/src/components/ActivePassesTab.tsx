import React, { useState, useEffect } from 'react';
import { CalendarDays,Info, Package } from 'lucide-react';
import { formatDateTime } from "../utils/FormatDateTime";

interface Package {
    id: number;
    name: string;
    description?: string;
    price: number;
}

interface Pass {
    id: number;
    packageId?: number;
    codePass: string;
    isActive: boolean;
    package?: Package;
    createdAt: Date;
}


const ActivePassesTab: React.FC = () => {
    const [passes, setPasses] = useState<Pass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivePasses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/passes/active`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Échec de la récupération des passes actifs');
                }

                const data = await response.json();
                setPasses(data);
            } catch (err) {
                setError('Erreur lors de la récupération des passes actifs. Veuillez réessayer plus tard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivePasses();
    }, []);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Mes Pass Actifs</h2>
            {passes.length > 0 ? (
                <ul className="space-y-6">
                    {passes.map((pass) => (
                        <li key={pass.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{pass.package?.name || 'Pass sans nom'}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{pass.package?.description || 'Aucune description disponible'}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    Actif
                                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <Package className="w-4 h-4" />
                                    Code du pass: {pass.codePass}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <CalendarDays className="w-4 h-4" />
                                    Activé le: {formatDateTime(pass.createdAt)}
                                </p>
                                {pass.package?.price && (
                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                        <Info className="w-4 h-4" />
                                        Prix: {pass.package.price.toFixed(2)} €
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Vous n'avez aucun pass actif pour le moment.</p>
                </div>
            )}
        </div>
    );
};

export default ActivePassesTab;