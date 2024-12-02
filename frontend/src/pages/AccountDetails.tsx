import { Form, Formik } from "formik";
import {
	CalendarDays,
	Check,
	CircleCheckBig,
	CircleX,
	LockKeyhole,
	Mail,
	Pencil,
	TriangleAlert,
	UserRound,
	Wrench,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/FormatDateTime";

interface User {
	name: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
	createAt: string;
	updatedAt: string;
}

interface initialValues {
	name: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
}

type ToastType = "success" | "error" | "warning";

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
		.oneOf([yup.ref("email"), undefined], "Les e-mails ne correspondent pas")
		.required("Champ requis"),
	password: yup
		.string()
		.min(8, "Le mot de passe doit contenir au moins 8 caractères")
		.max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
		.required("Champ requis"),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref("password"), undefined],
			"Les mots de passe ne correspondent pas"
		)
		.required("Champ requis"),
});

const AccountDetails = () => {
	const url = import.meta.env.VITE_API_URL;
	const [toastMessage, setToastMessage] = useState<React.ReactNode>(null);
	const [toastType, setToastType] = useState<React.ReactNode>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [userInfos, setUserInfos] = useState<Partial<User>>({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { isAuthenticated, isLoadingAuth } = useAuth();
	const navigate = useNavigate();

	const initialValues: initialValues = {
		name: userInfos.name || "",
		email: userInfos.email || "",
		confirmEmail: "",
		password: "",
		confirmPassword: "",
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSubmit = async (_values: initialValues) => {
		showToast("success", "Modifications sauvegardées !");

		setIsEditing(false);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		showToast("warning", "Modifications annulées.");
	};

	const showToast = (type: ToastType, message: string) => {
		setToastType(type);
		setToastMessage(message);

		setTimeout(() => {
			setToastMessage(null);
			setToastType(null);
		}, 4000);
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
			});
	};

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate('/connexion');
		} else {
			getConnectedUserInfos();
		}
	}, [isAuthenticated]);

	if (isLoading)
		return <span className="loading loading-spinner loading-md"></span>;

	if (error) return <p>Erreur: {error}</p>;

	return (
		<main className="main flex flex-col">
			{userInfos && (
				<>
					<h1 className="h1 flex items-center pb-8 gap-3">
						<UserRound className="icon" />
						Mes informations
					</h1>

					{toastMessage && (
						<div className="toast toast-top toast-end">
							{toastType === "success" && (
								<div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
									<CircleCheckBig
										className="icon-medium text-green-500"
										style={{ color: "rgb(34, 197, 94)" }}
									/>{" "}
									{toastMessage}
								</div>
							)}
							{toastType === "error" && (
								<div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
									<CircleX
										className="icon-medium text-red-500"
										style={{ color: "rgb(239, 68, 68)" }}
									/>{" "}
									{toastMessage}
								</div>
							)}
							{toastType === "warning" && (
								<div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
									<TriangleAlert
										className="icon-medium text-yellow-500"
										style={{ color: "rgb(234, 179, 8)" }}
									/>{" "}
									{toastMessage}
								</div>
							)}
						</div>
					)}

					<section className="flex flex-col items-center bg-white p-6 border-t rounded-lg shadow-md max-w-xl">
						<Formik
							initialValues={initialValues}
							enableReinitialize
							validationSchema={RegisterSchema}
							onSubmit={handleSubmit}
						>
							{({ errors, touched, values, handleChange }) => (
								<Form className="flex flex-col gap-4 items-center">
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
																Mot de passe :
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
																Confirmation mot de passe :
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
								</Form>
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
			)}
		</main>
	);
};

export default AccountDetails;
