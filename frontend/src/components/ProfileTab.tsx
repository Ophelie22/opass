import { Formik } from "formik";
import { CalendarDays, Check, LockKeyhole, Mail, Pencil, UserRound, Wrench, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/FormatDateTime";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { UserDetails } from "../types/User";
import * as yup from "yup";
interface initialValues {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}
const RegisterSchema = yup.object({
    name: yup
        .string()
        .min(3, "Le prénom doit contenir au moins 3 caractères")
        .max(50, "Le prénom ne doit pas dépasser 50 caractères")
        .required("Champ requis"),
    email: yup
        .string()
        .email("L'e-mail n'est pas valide")
        .required("Champ requis"),
    confirmEmail: yup
        .string()
        .email("L'e-mail n'est pas valide")
        .oneOf([yup.ref("email"), undefined], "Les e-mails ne correspondent pas"),
    password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
        .required("Champ requis"),
    newPassword: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(32, "Le mot de passe ne doit pas dépasser 32 caractères"),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("newPassword"), undefined],
            "Les mots de passe ne correspondent pas"
        )
});
// TODO :
// Rajouter un système de conditions pour les modifications
// Si l'email de l'input est différent de l'email que j'ai obtenu via le GET
// Alors vérifier que les deux inputs de mail soient identiques et le mot de passe actuel est requis.
// Si on modifie le champ mdp actuel, et qu'il est différent du mdp qu'on a GET
// Alors ça ne doit pas marcher.
// Il faut a tout prix le mdp actuel dans ce champ pour valider la demande.
// Trouver le moyen de rerender automatiquement la fiche de l'user quand on clique
// sur "Valider les modifications" car on est obligés de recharger la page à la main.
const ProfileTab: React.FC = () => {
    const url = import.meta.env.VITE_API_URL;
    const [, setToastMessage] = useState<string | null>(null);
    const [, setToastType] = useState<"success" | "error" | "warning" | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userInfos, setUserInfos] = useState<Partial<UserDetails>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const initialValues: initialValues = {
        name: userInfos.name || "",
        email: userInfos.email || "",
        confirmEmail: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSubmit = async (values: initialValues) => {
        setIsEditing(false);
        try {
            setIsLoading(true);
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password ? values.password : undefined,
            };
            const res = await fetch(`${url}/users/${userInfos.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
                credentials: "include",
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Une erreur est survenue. Veuillez réessayer.");
            }
            setToastMessage("Les informations ont été mises à jour avec succès !");
            setToastType("success");
        } catch (error: any) {
            setError(error.message);
            setToastMessage("Une erreur est survenue. Veuillez réessayer.");
            setToastType("error");
        } finally {
            setIsLoading(false);
        }
    };
    const handleCancelClick = () => {
        setIsEditing(false);
        setToastMessage("Modifications annulées.");
        setToastType("warning");
    };
    const getConnectedUserInfos = () => {
        fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfos(data.user);
            })
            .catch((error) => {
                setError(error.message)
                setToastMessage("La récupération des données utilisateur a échoué.");
                setToastType("error");
            });
    };
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/connexion');
        } else {
            getConnectedUserInfos();
        }
    }, [isAuthenticated]);
    if (isLoading)
        return <span className="loading loading-spinner loading-md"></span>;
    if (error) return <p>Erreur: {error}</p>;
    return (
        <>
            <h1 className="h1 flex items-center justify-center pb-8 gap-3">
                <UserRound className="icon" />
                Mes informations
            </h1>
            <section className="flex flex-col items-center bg-white p-6 border-t rounded-lg shadow-md max-w-xl">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange, handleSubmit }) => (
                        <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                            <div overflow-x-auto>
                                <table className="table-auto w-full border-collapse">
                                    <tbody className="w-full">
                                        <tr>
                                            <td className="td-title">
                                                <Pencil className="icon-small text-blueText" />{" "}
                                                Prénom :
                                            </td>
                                            <td className="td-content-disabled">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={values.name}
                                                    disabled={!isEditing}
                                                    onChange={handleChange}
                                                    className={`w-full p-2 border rounded-lg  ${isEditing
                                                        ? "td-content-enabled border-secondary"
                                                        : "border-gray-300 bg-gray-100"
                                                        }`}
                                                />
                                                {errors.name && touched.name ? (
                                                    <span className="text-red-600 text-sm">
                                                        {errors.name}
                                                    </span>
                                                ) : null}
                                            </td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="td-title">
                                                <Mail className="icon-small text-blueText" /> E-mail
                                                :
                                            </td>
                                            <td className="td-content-disabled">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={values.email}
                                                    disabled={!isEditing}
                                                    onChange={handleChange}
                                                    className={`w-full p-2 border rounded-lg ${isEditing
                                                        ? "td-content-enabled border-secondary"
                                                        : "border-gray-300 bg-gray-100"
                                                        }`}
                                                />
                                                {errors.email && touched.email ? (
                                                    <span className="text-red-600 text-sm">
                                                        {errors.email}
                                                    </span>
                                                ) : null}
                                            </td>
                                        </tr>
                                        {isEditing && (
                                            <>
                                                <tr className="border-t">
                                                    <td className="td-title">
                                                        <Mail className="icon-small text-blueText" />{" "}
                                                        Confirmation e-mail :
                                                    </td>
                                                    <td className="td-content-disabled">
                                                        <input
                                                            type="email"
                                                            name="confirmEmail"
                                                            id="confirmEmail"
                                                            value={values.confirmEmail}
                                                            disabled={!isEditing}
                                                            onChange={handleChange}
                                                            className={`w-full p-2 border rounded-lg ${isEditing
                                                                ? "td-content-enabled border-secondary"
                                                                : "border-gray-300 bg-gray-100"
                                                                }`}
                                                        />
                                                        {errors.confirmEmail && touched.confirmEmail ? (
                                                            <span className="text-red-600 text-sm">
                                                                {errors.confirmEmail}
                                                            </span>
                                                        ) : null}
                                                    </td>
                                                </tr>
                                                <tr className="border-t">
                                                    <td className="td-title">
                                                        <LockKeyhole className="icon-small text-blueText" />{" "}
                                                        Mot de passe actuel :
                                                    </td>
                                                    <td className="td-content-disabled">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            value={values.password}
                                                            disabled={!isEditing}
                                                            onChange={handleChange}
                                                            className={`w-full p-2 border rounded-lg ${isEditing
                                                                ? "td-content-enabled border-secondary"
                                                                : "border-gray-300 bg-gray-100"
                                                                }`}
                                                        />
                                                        {errors.password && touched.password ? (
                                                            <span className="text-red-600 text-sm">
                                                                {errors.password}
                                                            </span>
                                                        ) : null}
                                                    </td>
                                                </tr>
                                                <tr className="border-t">
                                                    <td className="td-title">
                                                        <LockKeyhole className="icon-small text-blueText" />{" "}
                                                        Nouveau mot de passe :
                                                    </td>
                                                    <td className="td-content-disabled">
                                                        <input
                                                            type="password"
                                                            name="newPassword"
                                                            id="newPassword"
                                                            value={values.newPassword}
                                                            disabled={!isEditing}
                                                            onChange={handleChange}
                                                            className={`w-full p-2 border rounded-lg ${isEditing
                                                                ? "td-content-enabled border-secondary"
                                                                : "border-gray-300 bg-gray-100"
                                                                }`}
                                                        />
                                                        {errors.newPassword && touched.newPassword ? (
                                                            <span className="text-red-600 text-sm">
                                                                {errors.newPassword}
                                                            </span>
                                                        ) : null}
                                                    </td>
                                                </tr>
                                                    <tr className="border-t">
                                                    <td className="td-title">
                                                        <LockKeyhole className="icon-small text-blueText" />{" "}
                                                        Confirmation du nouveau mot de passe :
                                                    </td>
                                                    <td className="td-content-disabled">
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            id="confirmPassword"
                                                            value={values.confirmPassword}
                                                            disabled={!isEditing}
                                                            onChange={handleChange}
                                                            className={`w-full p-2 border rounded-lg ${isEditing
                                                                ? "td-content-enabled border-secondary"
                                                                : "border-gray-300 bg-gray-100"
                                                                }`}
                                                        />
                                                        {errors.confirmPassword &&
                                                            touched.confirmPassword ? (
                                                            <span className="text-red-600 text-sm">
                                                                {errors.confirmPassword}
                                                            </span>
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {!isEditing && (
                                            <tr className="border-t">
                                                <td className="td-title">
                                                    <LockKeyhole className="icon-small text-blueText" />{" "}
                                                    Mot de passe :
                                                </td>
                                                <td className="td-content-disabled">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        value='*********'
                                                        disabled={!isEditing}
                                                        onChange={handleChange}
                                                        className={`w-full p-2 border rounded-lg ${isEditing
                                                            ? "td-content-enabled border-secondary"
                                                            : "border-gray-300 bg-gray-100"
                                                            }`}
                                                    />
                                                    {errors.password && touched.password ? (
                                                        <span className="text-red-600 text-sm">
                                                            {errors.password}
                                                        </span>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        )}
                                            <tr className="border-t">
                                            <td className="td-title">
                                                <CalendarDays className="icon-small text-blueText" />{" "}
                                                Compte créé le :
                                            </td>
                                            <td className="td-content-disabled">
                                                {formatDateTime(userInfos.createAt)}
                                            </td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="td-title">
                                                <Wrench className="icon-small text-blueText" />{" "}
                                                Dernière mise à jour :
                                            </td>
                                            <td className="td-content-disabled">
                                                {formatDateTime(userInfos.updatedAt)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex space-x-4 mt-8">
                                {!isEditing ? null : (
                                    <>
                                        <button type="submit" className="btn">
                                            <Check className="icon-small text-green" /> Valider
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={handleCancelClick}
                                        >
                                            <X className="icon-small text-red-500" /> Annuler
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    )}
                </Formik>
                {!isEditing && (
                    <button type="button" className="btn" onClick={handleEditClick}>
                        <Pencil className="icon-small text-blueText" />
                        Modifier
                    </button>
                )}
            </section>
        </>
    );
};
export default ProfileTab;