import { useFormik } from "formik";

const Login = () => {

  const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
		},
	});

  return (
    <main className="flex flex-col items-center px-6 mt-12 ">
			<form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
				<h1>Page de connexion</h1>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">
							E-mail
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
							Mot de passe
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

				<button
					type="submit"
					className="btn"
				>
				  Connexion
				</button>
			</form>
		</main>
  )
}

export default Login;