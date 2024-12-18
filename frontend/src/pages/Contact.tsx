const Contact = () => {
  return (
    <main className="main">
      <h1 className="h1">Contactez-Nous</h1>

      <section className="contact-intro mt-12">
        <h2 className="h2">Nous sommes là pour vous aider</h2>
        <p className="p mt-4">
          Que vous ayez des questions sur nos services, des demandes 
          spécifiques ou que vous souhaitiez simplement en savoir plus, 
          notre équipe est à votre écoute. Contactez-nous dès aujourd'hui, 
          et nous ferons de notre mieux pour vous répondre rapidement et efficacement.
        </p>
      </section>

      <section className="contact-info mt-12">
        <h2 className="h2">Nos coordonnées</h2>
        <div className="info-grid mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="h3">Par Email</h3>
            <p className="p mt-2">
              Envoyez-nous un courriel à l'adresse suivante : 
              <a className="font-bold" href="mailto:contact@opasstourisme.com">
                contact@opasstourisme.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="h3">Par Téléphone</h3>
            <p className="p mt-2">
              Appelez-nous directement au : 
              <span className="font-bold">+33 1 23 45 67 89</span>
            </p>
          </div>
          <div>
            <h3 className="h3">Suivez-nous</h3>
            <p className="p mt-2">Restez connectés sur nos réseaux sociaux :</p>
            <ul className="social-icons mt-4">
              <li className="mb-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-pink-600"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="h3">Adresse</h3>
            <p className="p mt-2">
              OPASS Tourisme <br />
              123 Rue de l'Exemple <br />
              75000 Paris, France
            </p>
          </div>
        </div>
      </section>

      <section className="contact-form mt-12">
        <h2 className="h2">Envoyez-nous un message</h2>
        <p className="p mt-4">
          Remplissez le formulaire ci-dessous, et nous vous répondrons dans les plus 
          brefs délais. Votre satisfaction est notre priorité.
        </p>
        <form action="#" method="POST" className="form mt-6">
          <div className="form-group mb-6">
            <label htmlFor="name" className="form-label">
              Votre Nom : 
            </label>
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
            <label htmlFor="email" className="form-label">
              Votre Email : 
            </label>
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
            <label htmlFor="message" className="form-label">
              Votre Message : 
            </label>
            <textarea
              id="message"
              name="message"
              className="form-input"
              rows="5"
              placeholder="Décrivez votre demande"
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
