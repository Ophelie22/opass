import { NavLink, useParams } from "react-router-dom";
import { regions, sites } from './data.js';
import getCategoryName from "../utils/getCategoryName.js";
import { Site } from "../types/Site.js";
import { Region } from "../types/Region.js";

const SiteDetails = () => {

  const { regionId, categoryId, siteId } = useParams();
  console.log("regionId", regionId)

  const site = sites.find((site: Site) => site.id === siteId && site.category_id === categoryId)
  const region = regions.find((region: Region) => region.id === regionId)

  const categoryName = getCategoryName(categoryId);

  console.log("site", site)
  return (
    <main className="main">
      {!site ?
        <p>Aucun site trouvé pour cette catégorie.</p>
        :
        <>

          {/* TODO: A modeliser mais pour un côté pratique j'ai mis ces raccourcis pour faire mes essais */}
          <p className="text-xs font-medium text-gray-500"><NavLink to={'/'}>Accueil</NavLink>
            {` > `}
            <NavLink to={`/regions/${site.id}`}> {region?.name}</NavLink>
            {` > `}
            <NavLink to={`/regions/${site.id}/${site.category_id}`}>{categoryName} à visiter</NavLink></p>
          < br />< br />

          <h1 className="h1">{site.name}</h1>
          <section>
            <img className="w-full" src={`${site.media}`} alt={`Image de ${site.name}`} />
            <p className="p mt-5">{site.description}</p>
          </section>
          <section className="mt-5">
            <p className="p">Adresse du site :</p>
            <p className="p">{site.address}</p>
            <p className="p">{site.postal_code} {site.city}</p>
            {/* TODO: Introduire la maps avec latitude et longitude */}
            <p className="p">Latitude : {site.latitude}</p>
            <p className="p">Longitude : {site.longitude}</p>
          </section>
          <section className="mt-5">
            <p className="p">Informations : {site.information}</p>
            <p className="p">Contact : {site.contact}</p>
          </section>

        </>
      }
    </main >
  )
}

export default SiteDetails;