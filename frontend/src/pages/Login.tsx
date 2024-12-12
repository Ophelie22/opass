import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Toast from "../components/Toast";

interface InitialValues {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	const url = import.meta.env.VITE_API_URL;
	const [error, setError] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [toastType, setToastType] = useState<"success" | "error" | "warning" | null>(null);

	const { isAuthenticated, loginAuth } = useAuth();

	const RegisterSchema = yup.object({
		email: yup
			.string()
			.email("L'e-mail n'est pas valide")
			.required("Champ requis"),
		password: yup.string().required("Champ requis"),
	});

	const initialValues: InitialValues = {
		email: "",
		password: "",
	};

	const login = async (values: InitialValues) => {
		setIsLoading(true);
		const { email, password } = values;
		try {
			const res = await fetch(`${url}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
				credentials: "include",
			});

			res.json();

			if (res.ok) {
				setToastMessage("Connexion réussie !");
				setToastType("success");
				navigate("/");
				loginAuth();

			}

		} catch (err) {
			setError(err as string);
			setToastMessage("Une erreur est survenue. Veuillez réessayer.");
			setToastType("error");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (values: InitialValues) => {
		login(values);
	};

	useEffect(() => {
		if (isAuthenticated === true) {
			navigate("/");
		}
	}, [isAuthenticated]);

	if (!isAuthenticated)
		return (
			<main className="main">
				{toastType && toastMessage && (
					<Toast type={toastType} message={toastMessage} />
				)}

				<Formik
					initialValues={initialValues}
					validationSchema={RegisterSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, values, handleChange }) => (
						<Form className="flex flex-col gap-4 items-center">
							<h1 className="h1">Page de connexion</h1>

							<label className="form-control w-full">
								<div className="label">
									<span className="label-text">E-mail</span>
								</div>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="exemple@mail.com"
									className="input input-bordered w-full"
									onChange={handleChange}
									value={values.email}
								/>
								{errors.email && touched.email ? (
									<span className="text-red-600 text-sm">{errors.email}</span>
								) : null}
							</label>

							<label className="form-control w-full">
								<div className="label">
									<span className="label-text">Mot de passe</span>
								</div>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Mot de passe"
									className="input input-bordered w-full"
									onChange={handleChange}
									value={values.password}
								/>
								{errors.password && touched.password ? (
									<span className="text-red-600 text-sm">{errors.password}</span>
								) : null}
							</label>

							<NavLink to="/inscription">Je n'ai pas de compte</NavLink>

							<button
								type="submit"
								disabled={!values.email || !values.password}
								className={
									!values.email || !values.password ? "btn btn-disabled" : "btn"
								}
							>
								{!isLoading ? (
									"Connexion"
								) : (
									<span className="loading loading-spinner loading-md"></span>
								)}
							</button>
						</Form>
					)}
				</Formik>
			</main>
		);
};

export default Login;
