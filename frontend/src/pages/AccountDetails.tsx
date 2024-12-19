import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import { UserDetails } from "../types/User";
import Toast from "../components/Toast";
import ActivePassesTab from "../components/ActivePassesTab";
import OrderHistoryTab from "../components/OrderHistoryTab";
import ProfileTab from "../components/ProfileTab";

const AccountDetails = () => {
    const url = import.meta.env.VITE_API_URL;
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<"success" | "error" | "warning" | null>(null);
    const [userInfos, setUserInfos] = useState<Partial<UserDetails>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"profile" | "activePass" | "history">("profile"); // Contrôle strict des valeurs
    const [indicatorStyle, setIndicatorStyle] = useState({ left: "0", width: "0" });
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const tabRefs: Record<string, HTMLButtonElement | null> = {
        profile: null,
        activePass: null,
        history: null,
    };

    const getConnectedUserInfos = () => {
        setIsLoading(true);
        fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfos(data.user);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setToastMessage("La récupération des données utilisateur a échoué.");
                setToastType("error");
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const updateIndicator = () => {
            const activeTabRef = tabRefs[activeTab];
            if (activeTabRef) {
                const { offsetLeft, offsetWidth } = activeTabRef;
                setIndicatorStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                });
            }
        };
        updateIndicator();

        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [activeTab]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion");
        } else {
            getConnectedUserInfos();
        }
    }, [isAuthenticated]);

    if (isLoading) return <span className="loading loading-spinner loading-md"></span>;
    if (error) return <p>Erreur: {error}</p>;

    return (
        <main className="main flex flex-col">
            {userInfos && (
                <>
                    {toastType && toastMessage && <Toast type={toastType} message={toastMessage} />}

                    <div role="tablist" className="tabs">
                        <button
                            ref={(element) => (tabRefs.profile = element)}
                            role="tab"
                            className={`tab ${activeTab === "profile" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            Mes informations
                        </button>
                        <button
                            ref={(element) => (tabRefs.activePass = element)}
                            role="tab"
                            className={`tab ${activeTab === "activePass" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("activePass")}
                        >
                            Mes pass actifs
                        </button>
                        <button
                            ref={(element) => (tabRefs.history = element)}
                            role="tab"
                            className={`tab ${activeTab === "history" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("history")}
                        >
                            Mon historique de commande
                        </button>

                        <span className="tab-indicator" style={indicatorStyle}></span>
                    </div>

                    <div className="py-12">
                        {activeTab === "activePass" ? <ActivePassesTab /> : (activeTab === "history" ? <OrderHistoryTab /> : <ProfileTab />)}
                    </div>
                    <Outlet />
                </>
            )}
        </main>
    );
};

export default AccountDetails;