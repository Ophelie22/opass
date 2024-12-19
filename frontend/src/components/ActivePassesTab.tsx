import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/FormatDateTime";
import { Pass } from "../types/Pass";
import { LockKeyhole, CalendarDays, Wrench, TicketCheck } from "lucide-react";

const ActivePassesTab: React.FC = () => {
    const [activePasses, setActivePasses] = useState<Pass[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/connexion');
        } else {
            fetchActivePasses();
        }
    }, [isAuthenticated]);

    const fetchActivePasses = async () => {
        try {
            const res = await fetch(`${url}/passes/active-passes/${user?.id}`, {
                credentials: "include",
            });

            if (!res.ok) {

                const data = await res.json();
                throw new Error(data.message || "Une erreur est survenue.");
            }

            const { data } = await res.json();
            setActivePasses(data);

        } catch (error: any) {
            setError(error.message);
        }
    };

    if (error) return <p>Erreur: {error}</p>;

    return (
        <>
            <h1 className="h1 flex items-center justify-center pb-8 gap-3">
                <TicketCheck className="icon" />
                Mes pass actifs
            </h1>
            <section className="flex flex-col items-center bg-white p-6 border-t rounded-lg shadow-md  w-full">
                {activePasses?.length === 0 ? (
                    <p className="p">Aucun pass actif trouvé.</p>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="td-title px-4 py-2 w-1/4 sm:w-1/5 md:w-1/5 text-left">
                                        <div className="flex items-center gap-2">
                                            <LockKeyhole className="icon-small-bis text-blueText" />
                                            Code du pass
                                        </div>
                                    </th>
                                    <th className="td-title px-4 py-2 w-1/2 sm:w-2/5 md:w-1/3 text-left">
                                        <div className="flex items-center gap-2">
                                            <TicketCheck className="icon-small-bis text-blueText" />
                                            Nom du pass
                                        </div>
                                    </th>
                                    <th className="td-title px-4 py-2 w-1/4 sm:w-1/5 md:w-1/4 text-left">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="icon-small-bis text-blueText" />
                                            Date de création
                                        </div>
                                    </th>
                                    <th className="td-title px-4 py-2 w-1/4 sm:w-1/5 md:w-1/4 text-left">
                                        <div className="flex items-center gap-2">
                                            <Wrench className="icon-small-bis text-blueText" />
                                            Dernière mise à jour
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {activePasses?.map((pass) => (
                                    <tr key={pass.id} className="border-t">
                                        <td className="td-content px-4 py-2 text-sm">{pass.codePass}</td>
                                        <td className="td-content px-4 py-2 text-sm">{pass.name || "Non défini"}</td>
                                        <td className="td-content px-4 py-2 text-sm">{formatDateTime(pass.createdAt)}</td>
                                        <td className="td-content px-4 py-2 text-sm">{formatDateTime(pass.updatedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    );
};

export default ActivePassesTab;