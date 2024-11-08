const PrivacyPolicy = () => {
    return (
        <main>
            <h1>Politique de confidentialité</h1>

            <section>
                <h2>Introduction</h2>
                <p>
                    Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention
                    particulière à la protection de la vie privée. C'est pourquoi, nous nous engageons à respecter la
                    confidentialité des renseignements personnels que nous collectons.
                </p>
            </section>

            <section>
                <h2>Collecte des renseignements personnels</h2>
                <p>Nous collectons les renseignements suivants :</p>
                <ul>
                    <li>Nom</li>
                    <li>Prénom</li>
                    <li>Adresse postale</li>
                    <li>Code postal</li>
                    <li>Adresse électronique</li>
                    <li>Numéro de téléphone / télécopieur</li>
                    <li>Numéro de carte de crédit</li>
                </ul>
                <p>
                    Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à
                    l'interactivité établie entre vous et notre site Web. Nous utilisons également des fichiers témoins et/ou
                    journaux pour réunir des informations vous concernant.
                </p>
            </section>

            <section>
                <h2>Formulaires et interactivité</h2>
                <p>Vos renseignements personnels sont collectés par le biais de formulaire, à savoir :</p>
                <ul>
                    <li>Formulaire d'inscription au site Web</li>
                    <li>Formulaire de commande</li>
                    <li>Sondage d'opinion</li>
                    <li>Concours</li>
                </ul>
                <p>Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :</p>
                <ul>
                    <li>Suivi de la commande</li>
                    <li>Informations / Offres promotionnelles</li>
                    <li>Statistiques</li>
                    <li>Contact</li>
                    <li>Gestion du site Web (présentation, organisation)</li>
                </ul>
            </section>

            <section>
                <h2>Fichiers journaux et témoins</h2>
                <p>Nous recueillons certaines informations par le biais de fichiers journaux (log file) et de fichiers témoins (cookies) :</p>
                <ul>
                    <li>Adresse IP</li>
                    <li>Système d'exploitation</li>
                    <li>Pages visitées et requêtes</li>
                    <li>Heure et jour de connexion</li>
                </ul>
                <p>Le recours à de tels fichiers nous permet :</p>
                <ul>
                    <li>Amélioration du service et accueil personnalisé</li>
                    <li>Profil personnalisé de consommation</li>
                    <li>Suivi de commande</li>
                    <li>Statistique</li>
                </ul>
            </section>

            <section>
                <h2>Droit d'opposition et de retrait</h2>
                <p>
                    Nous nous engageons à vous offrir un droit d'opposition et de retrait quant à vos renseignements personnels.
                </p>
                <p>Pour pouvoir exercer ces droits, vous pouvez nous contacter :</p>
                <ul className="contact-info">
                    <li>Courrier postal : Otipass 8 rue du 45ème Régiment de Transmissions – Immeuble “Le Septan” – 26200 Montélimar</li>
                    <li>Courriel : dataprivacy@otipass.com</li>
                    <li>Téléphone : + 33 (0)475512940</li>
                    <li>Section du site web : www.pass-france.com</li>
                </ul>
            </section>

            <section>
                <h2>Sécurité</h2>
                <p>
                    Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes
                    travaillant pour nous sont tenues de respecter la confidentialité de vos informations. Nous avons recours aux
                    mesures suivantes :
                </p>
                <ul>
                    <li>Gestion des accès - personne autorisée</li>
                    <li>Gestion des accès - personne concernée</li>
                    <li>Sauvegarde informatique</li>
                    <li>Développement de certificat numérique</li>
                    <li>Identifiant / mot de passe</li>
                    <li>Pare-feu (Firewalls)</li>
                </ul>
                <p>
                    Nous nous engageons à maintenir un haut degré de confidentialité, mais une part de risque est toujours présente.
                </p>
            </section>

            <section>
                <h2>Règlement Européen sur la Protection des Données</h2>
                <p>
                    Conformément au Règlement Européen sur la Protection des Données 2016/679, vous disposez d’un droit d’accès,
                    de modification, de rectification, d’opposition et d’effacement des données vous concernant. Pour exercer ces
                    droits, contactez-nous à <a href="mailto:dataprivacy@otipass.com">dataprivacy@otipass.com</a>.
                </p>
                <p>OTIPASS a désigné un Délégué à la Protection des Données à Caractère Personnel : <a href="mailto:dataprivacy@otipass.com">dataprivacy@otipass.com</a></p>
                <p>Vous êtes en droit d’introduire une réclamation auprès de la CNIL, autorité de contrôle.</p>
            </section>
        </main>
    );
}

export default PrivacyPolicy;
