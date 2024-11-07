import { useFormik } from "formik";

const Register = () => {

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			confirmEmail: "",
			password: "",
			gcu: false,
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<main className="flex flex-col items-center px-6 mt-12 ">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<h1>Page d'inscription</h1>

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
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
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
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
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
						onChange={formik.handleChange}
						value={formik.values.confirmEmail}
					/>
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
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
				</label>

				<div className="form-control w-full">
					<label className="label cursor-pointer">
						<input
							type="checkbox"
							name="gcu"
							id="gcu"
							className="checkbox mr-2"
							onChange={formik.handleChange}
							checked={formik.values.gcu}
						/>
						<span className="label-text text-sm">
							J'accepte les conditions d'utilisation
							<span className="text-red-600">*</span>
						</span>
					</label>
				</div>

				<button
					type="submit"
					className="btn"
				>
					Inscription
				</button>
			</form>
		</main>
	);
};

export default Register;
