import React, { useState, useEffect } from 'react';
import { CalendarDays, CreditCard, Package } from 'lucide-react';
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
}

interface Order {
    id: number;
    userId: number;
    date: Date;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    passes: Pass[];
}

const OrderHistoryTab: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError('Erreur lors de la récupération des commandes. Veuillez réessayer plus tard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Historique des commandes</h2>
            {orders.length > 0 ? (
                <ul className="space-y-8">
                    {orders.map((order) => (
                        <li key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-semibold text-lg">Commande #{order.id}</p>
                                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {order.status === 'completed' ? 'Complétée' :
                                        order.status === 'pending' ? 'En attente' : 'Annulée'}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <CalendarDays className="w-4 h-4" />
                                    Commandé le: {formatDateTime(order.createdAt.toString())}
                                </p>

                                <p className="flex items-center gap-2 text-gray-600">
                                    <CreditCard className="w-4 h-4" />
                                    Montant: {order.amount.toFixed(2)} €
                                </p>

                                <div className="mt-4">
                                    <p className="font-semibold mb-2">Pass inclus :</p>
                                    <ul className="space-y-2">
                                        {order.passes.map((pass) => (
                                            <li key={pass.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                <Package className="w-4 h-4 mt-1 text-gray-500" />
                                                <div>
                                                    <p className="font-medium">
                                                        {pass.package?.name || 'Package non disponible'}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Code: {pass.codePass}
                                                    </p>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${pass.isActive
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {pass.isActive ? 'Actif' : 'Inactif'}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Aucune commande trouvée.</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryTab;

