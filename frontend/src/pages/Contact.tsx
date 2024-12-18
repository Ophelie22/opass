const Contact = () => {
	return (
	  <main className="main">
		<h1 className="h1">Contactez-Nous</h1>
  
		<section className="contact-info mt-12">
		  <h2 className="h2">Nous Contacter</h2>
		  <p className="p mt-4">
			Vous avez des questions sur nos pass touristiques, les offres spéciales ou nos services ? N'hésitez pas à nous contacter !
		  </p>
		  
		  <p className="p mt-6">
			Par courriel : <a className="font-bold" href="mailto:contact@opasstourisme.com">contact@opasstourisme.com</a>
		  </p>
		  
		  <p className="p mt-4">
			Par téléphone : <span className="font-bold">+33 1 23 45 67 89</span>
		  </p>
		  
		  <div className="social-links mt-6">
			<p className="p">Suivez-nous sur les réseaux sociaux :</p>
			<ul className="social-icons mt-2">
			  <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
			  <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
			  <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
			</ul>
		  </div>
		</section>
  
		<section className="contact-form mt-12">
  <h2 className="h2">Envoyez-nous un Message</h2>
  <form action="#" method="POST" className="form mt-4">
    <div className="form-group mb-6">
      <label htmlFor="name" className="form-label">Votre Nom : </label>
      <input
        type="text"
        id="name"
        name="name"
        className="form-input"
        placeholder="Entrez votre nom"
        required
      />
    </div>

    <div className="form-group mb-6">
      <label htmlFor="email" className="form-label">Votre Email : </label>
      <input
        type="email"
        id="email"
        name="email"
        className="form-input"
        placeholder="Entrez votre email"
        required
      />
    </div>

    <div className="form-group mb-6">
      <label htmlFor="message" className="form-label">Votre Message : </label>
      <textarea
        id="message"
        name="message"
        className="form-input"
        rows="4"
        placeholder="Votre message ici"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      className="btn-submit px-8 py-3 rounded bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700"
    >
      Envoyer
    </button>
  </form>
</section>

	  </main>
	);
  };
  
  export default Contact;
  