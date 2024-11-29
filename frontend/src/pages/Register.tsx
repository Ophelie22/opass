import { Form, Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";

const Register = () => {
	interface initialValues {
		name: string;
		email: string;
		confirmEmail: string;
		password: string;
		gcu: boolean;
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
			.max(255, "L'e-mail ne doit pas dépasser 255 caractères")
			.required("Champs requis"),
		password: yup
			.string()
			.min(8, "Le mot de passe doit contenir au moins 8 caractères")
			.max(32, "Le mot de passe ne doit pas dépasser 32 caractères")
			.required("Champ requis"),
		gcu: yup.boolean().required("Champs requis"),
	});

	const initialValues: initialValues = {
		name: "",
		email: "",
		confirmEmail: "",
		password: "",
		gcu: false,
	};

	const handleSubmit = (values: initialValues) => {
		register(values);
	};

	const url = import.meta.env.VITE_API_URL;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
  
  const navigate = useNavigate();

	const register = (values: initialValues) => {
		setIsLoading(true);
		fetch(`${url}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values, null, 2),
		})
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((data) => {
          console.log(data);
          navigate("/connexion");
        });
      }
    })
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
						<h1 className="h1">Page d'inscription</h1>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">
									Prénom<span className="text-red-600">*</span>
								</span>
							</div>
							<input
								type="text"
								placeholder="John"
								name="name"
								id="name"
								className="input input-bordered w-full"
								value={values.name}
								onChange={handleChange}
							/>
							{errors.name && touched.name ? (
								<span className="text-red-600 text-sm">{errors.name}</span>
							) : null}
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">
									E-mail<span className="text-red-600">*</span>
								</span>
							</div>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="exemple@mail.com"
								className="input input-bordered w-full"
								value={values.email}
								onChange={handleChange}
							/>
							{errors.email && touched.email ? (
								<span className="text-red-600 text-sm">{errors.email}</span>
							) : null}
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">
									Confirmation e-mail<span className="text-red-600">*</span>
								</span>
							</div>
							<input
								type="email"
								name="confirmEmail"
								id="confirmEmail"
								placeholder="exemple@mail.com"
								className="input input-bordered w-full"
								value={values.confirmEmail}
								onChange={handleChange}
							/>
							{errors.confirmEmail && touched.confirmEmail ? (
								<span className="text-red-600 text-sm">
									{errors.confirmEmail}
								</span>
							) : null}
						</label>

						<label className="form-control w-full">
							<div className="label">
								<span className="label-text">
									Mot de passe<span className="text-red-600">*</span>
								</span>
							</div>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Mot de passe"
								className="input input-bordered w-full"
								value={values.password}
								onChange={handleChange}
							/>
							{errors.password && touched.password ? (
								<span className="text-red-600 text-sm">{errors.password}</span>
							) : null}
						</label>

						<div className="form-control w-full">
							<label className="label cursor-pointer">
								<input
									type="checkbox"
									name="gcu"
									id="gcu"
									className="checkbox mr-2"
									checked={values.gcu}
									onChange={handleChange}
								/>
								<span className="label-text text-sm">
									J'accepte les conditions d'utilisation
									<span className="text-red-600">*</span>
								</span>
							</label>
							{errors.gcu && touched.gcu ? (
								<span className="text-red-600 text-sm">{errors.gcu}</span>
							) : null}
						</div>

						<NavLink to="/connexion">Je possède déjà un compte</NavLink>

						<button
							type="submit"
							disabled={
								!values.gcu ||
								!values.name ||
								!values.email ||
								!values.confirmEmail ||
								!values.password
							}
							className={
								!values.gcu ||
								!values.name ||
								!values.email ||
								!values.confirmEmail ||
								!values.password
									? "btn btn-disabled"
									: "btn"
							}
						>
							Je m'inscris
						</button>
					</Form>
				)}
			</Formik>
		</main>
	);
};

export default Register;
