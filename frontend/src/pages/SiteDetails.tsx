import { NavLink, useParams } from "react-router-dom";
import { regions, sites } from './data.js';

interface Site {
  id: string;
  region_id: string;
  category_id: string;
  name: string;
  description: string;
  city: string;
  postal_code: string;
  address: string;
  latitude: string;
  longitude: string;
  media: string;
  contact: string;
  information: string;
}

interface Package {
  id: string;
  region_id: string;
  price: string;
  description: string;
  nbr_visits: string;
  nbr_days: number;
  media: string;
}

interface SiteCategory {
  id: string;
  name: string,
  created_at: string;
  updated_at: string;
}

interface Region {
  id: string;
  name: string;
  description: string;
  media: string;
  packages: Package[];
  siteCategory: SiteCategory[]
}


const SiteDetails = () => {

  const { regionId, categoryId, siteId } = useParams();
  console.log("regionId", regionId)

  const site = sites.find((site: Site) => site.id === siteId && site.category_id === categoryId)
  const region = regions.find((region: Region) => region.id === regionId)

  console.log("site", site)
  return (
    <main className="main">
      {!site ?
        <p>Aucun site trouvé pour cette catégorie.</p>
        :
        <>

          {/* TODO: A modeliser mais pour un côté pratique j'ai mis ces raccourcis pour faire mes essais */}
          <NavLink to={'/'}><p>Accueil</p></NavLink>
          <NavLink to={`/regions/${site.id}`}><p>Retour à la région {region?.name}</p></NavLink>
          <NavLink to={`/regions/${site.id}/${site.category_id}`}><p>Retour à la page Les sites à visiter</p></NavLink>
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