const Register = () => {
	return (
		<main className="flex flex-col items-center px-6 mt-12 ">
			<form className="flex flex-col gap-4">
				<h1>Page d'inscription</h1>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Prénom<span className="text-red-600">*</span></span>
					</div>
					<input
						type="text"
						placeholder="John"
						className="input input-bordered w-full"
					/>
				</label>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">E-mail<span className="text-red-600">*</span></span>
					</div>
					<input
						type="email"
						placeholder="exemple@mail.com"
						className="input input-bordered w-full"
					/>
				</label>

        <label className="form-control w-full">
					<div className="label">
						<span className="label-text">Confirmation e-mail<span className="text-red-600">*</span></span>
					</div>
					<input
						type="email"
						placeholder="exemple@mail.com"
						className="input input-bordered w-full"
					/>
				</label>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Mot de passe<span className="text-red-600">*</span></span>
					</div>
					<input
						type="password"
						placeholder="Mot de passe"
						className="input input-bordered w-full"
					/>
				</label>

				<div className="form-control w-full">
					<label className="label cursor-pointer">
						<input type="checkbox" defaultChecked className="checkbox mr-2" />
						<span className="label-text text-sm">J'accepte les conditions d'utilisation<span className="text-red-600">*</span></span>
					</label>
				</div>
        
        <button className='btn'>Je m'inscris</button>
			</form>
		</main>
	);
};

export default Register;
