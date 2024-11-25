import { NavLink } from "react-router-dom";
import { PAGE_CONTACT, PAGE_HOME } from "../App";

const NotFound = () => {
  return (
    <main className='main'>
      <h1 className='h1'>❌ Erreur 404</h1>

      <p className='p mt-12 font-bold'> 🚧 Oups, perdu en chemin ! 🚧</p>
      <p className='p mt-4'>  Pas de panique, vous n'avez pas besoin de guide touristique pour vous en sortir. Voici quelques pistes :
      </p>
      <ul className='ul'>
        <li className='li'>- Vous cherchez un pass magique ? Retournez à l'<NavLink to={PAGE_HOME} className="link link-hover">accueil 🏡</NavLink> et découvrez toutes nos offres !</li>
        <li className='li'>- Un problème d'orientation ? Peut-être qu’un clic un peu trop enthousiaste vous a mené ici. Respirez, tout va bien.</li>
        <li className='li'>- Encore perdu ? <NavLink to={PAGE_CONTACT} className="link link-hover">Contactez</NavLink> notre équipe de choc !</li>
      </ul>
      <p className='p mt-4'>Allez, repartez à l'aventure ! </p>
      <p className='p mt-4'>L'exploration, c'est notre spécialité, après tout. 🌍
      </p>
    </main>
  )
}

export default NotFound;