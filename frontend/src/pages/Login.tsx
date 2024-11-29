import { useState } from "react";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

interface InitialValues {
	email: string;
	password: string;
}

const Login: React.FC = () => {

	const navigate = useNavigate();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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

	const handleSubmit = async (values: InitialValues) => {
		setIsLoading(true)
		try {
			const { email, password } = values;
			const success = await login(email, password);
			if (success) {
				navigate("/");
				setIsLoading(false);
			} else {
				setError("Erreur lors de la connexion");
			}
		} catch (err) {
			console.log(
				"Erreur lors de la connexion. Veuillez vérifier vos identifiants."
			);
		}
	};

	return (
		<main className="main">
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
							Connexion
						</button>
					</Form>
				)}
			</Formik>
			{error && <p>{error}</p>}
		</main>
	);
};

export default Login;
