const PrivacyPolicy = () => {
    return (
        <main className={'main'}>
            <h1 className={'h1'}>Politique de confidentialité</h1>

            <section>
                <h2 className={'h2'}>Introduction</h2>
                <p className={'p'}>
                    Devant le développement des nouveaux outils de communication, il est nécessaire de porter une attention
                    particulière à la protection de la vie privée. C'est pourquoi, nous nous engageons à respecter la
                    confidentialité des renseignements personnels que nous collectons.
                </p>
            </section>

            <section>
                <h2 className={'h2'}>Collecte des renseignements personnels</h2>
                <p className={'p'}>Nous collectons les renseignements suivants :</p>
                <ul className={'ul'}>
                    <li className={'li'}>- Prénom,</li>
                    <li className={'li'}>- Adresse électronique,</li>
                    <li className={'li'}>- Numéro de carte de crédit.</li>
                </ul>
                <p className={'p'}>
                    Les renseignements personnels que nous collectons sont recueillis au travers de formulaires et grâce à
                    l'interactivité établie entre vous et notre site Web. Nous utilisons également des fichiers témoins et/ou
                    journaux pour réunir des informations vous concernant.
                </p>
            </section>

            <section>
                <h2 className={'h2'}>Formulaires et interactivité</h2>
                <p className={'p'}>Vos renseignements personnels sont collectés par le biais de formulaire, à savoir :</p>
                <ul className={'ul'}>
                    <li className={'li'}>- Formulaire d'inscription au site Web,</li>
                    <li className={'li'}>- Formulaire de commande.</li>
                </ul>
                <p className={'p'}>Nous utilisons les renseignements ainsi collectés pour les finalités suivantes :</p>
                <ul className={'ul'}>
                    <li className={'li'}>- Suivi de la commande,</li>
                    <li className={'li'}>- Informations,</li>
                    <li className={'li'}>- Statistiques,</li>
                    <li className={'li'}>- Contact,</li>
                    <li className={'li'}>- Gestion du site Web (présentation, organisation).</li>
                </ul>
            </section>

            <section>
                <h2 className={'h2'}>Fichiers journaux et témoins</h2>
                <p className={'p'}>Nous recueillons certaines informations par le biais de fichiers journaux (log file) et de fichiers témoins (cookies) :</p>
                <ul className={'ul'}>
                    <li className={'li'}>- Adresse IP,</li>
                    <li className={'li'}>- Système d'exploitation,</li>
                    <li className={'li'}>- Pages visitées et requêtes,</li>
                    <li className={'li'}>- Heure et jour de connexion.</li>
                </ul>
                <p className={'p'}>Le recours à de tels fichiers nous permet :</p>
                <ul className={'ul'}>
                    <li className={'li'}>- Amélioration du service et accueil personnalisé,</li>
                    <li className={'li'}>- Profil personnalisé de consommation,</li>
                    <li className={'li'}>- Suivi de commande,</li>
                    <li className={'li'}>- Statistique.</li>
                </ul>
            </section>

            <section>
                <h2 className={'h2'}>Droit d'opposition et de retrait</h2>
                <p className={'p'}>
                    Nous nous engageons à vous offrir un droit d'opposition et de retrait quant à vos renseignements personnels.
                </p>
                <p className={'p'}>Pour pouvoir exercer ces droits, vous pouvez nous contacter par courriel : <a className='font-bold' href="mailto:contact@opass.com">contact@opass.com</a>.</p>
            </section>

            <section>
                <h2 className={'h2'}>Sécurité</h2>
                <p className={'p'}>
                    Les renseignements personnels que nous collectons sont conservés dans un environnement sécurisé. Les personnes
                    travaillant pour nous sont tenues de respecter la confidentialité de vos informations. Nous avons recours aux
                    mesures suivantes :
                </p>
                <ul className={'ul'}>
                    <li className={'li'}>- Gestion des accès - personne autorisée,</li>
                    <li className={'li'}>- Gestion des accès - personne concernée,</li>
                    <li className={'li'}>- Sauvegarde informatique,</li>
                    <li className={'li'}>- Développement de certificat numérique,</li>
                    <li className={'li'}>- Identifiant / mot de passe,</li>
                    <li className={'li'}>- Pare-feu (Firewalls).</li>
                </ul>
                <p className={'p'}>
                    Nous nous engageons à maintenir un haut degré de confidentialité, mais une part de risque est toujours présente.
                </p>
            </section>

            <section>
                <h2 className={'h2'}>Règlement Européen sur la Protection des Données</h2>
                <p className={'p'}>
                    Conformément au Règlement Européen sur la Protection des Données 2016/679, vous disposez d’un droit d’accès,
                    de modification, de rectification, d’opposition et d’effacement des données vous concernant. Pour exercer ces
                    droits, contactez-nous à <a className='font-bold' href="mailto:contact@opass.com">dataprivacy@opass.com</a>.
                </p>
                <br />
                <p className={'p'}>OPASS a désigné un Délégué à la Protection des Données à Caractère Personnel : <a className='font-bold' href="mailto:contact@opass.com">dataprivacy@opass.com</a>.</p>
                <br />
                <p className={'p'}>Vous êtes en droit d’introduire une réclamation auprès de la CNIL, autorité de contrôle.</p>
            </section>
        </main>
    );
}

export default PrivacyPolicy;
