// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Créer des utilisateurs

    const [alice, bob, charlie] = await Promise.all([
      prisma.user.upsert({
          where: { email: "alice@example.com" }, // Identifier l'utilisateur existant par son email
          update: { name: "Alice", password: bcrypt.hashSync("password", 10) },
          create: { name: "Alice", email: "alice@example.com", password: bcrypt.hashSync("password", 10) },
      }),
      prisma.user.upsert({
          where: { email: "bob@example.com" },
          update: { name: "Bob", password: bcrypt.hashSync("password", 10) },
          create: { name: "Bob", email: "bob@example.com", password: bcrypt.hashSync("password", 10) },
      }),
      prisma.user.upsert({
          where: { email: "charlie@example.com" },
          update: { name: "Charlie", password: bcrypt.hashSync("password", 10) },
          create: { name: "Charlie", email: "charlie@example.com", password: bcrypt.hashSync("password", 10) },
      }),
  ]);

  const [
    regionAlsace,
    regionIledeFrance,
    regionProvence,
    regionBretagne,
    regionSavoie,
    regionLoire,
  ] = await Promise.all([
    prisma.region.upsert({
      where: { name: "Alsace" },
      update: {},
      create: {
        id: 1,
        name: "Alsace",
        email: "alsace@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "Située à l'est de la France, l'Alsace est célèbre pour ses villages pittoresques, ses vins blancs et son patrimoine culturel riche.",
        //media: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        media:"https://unsplash.com/fr/photos/coucher-de-soleil-colore-dans-la-region-de-la-petite-france-dans-la-ville-de-strasbourg-celebres-maisons-a-colombages-la-riviere-ill-et-le-pont-de-saint-martin-destinations-touristiques-populaires-en-europe-4fAL_g5XHOE"
      },
    }),
    prisma.region.upsert({
      where: { name: "Île-de-France" },
      update: {},
      create: {
        id: 2,
        name: "Île-de-France",
        email: "iledefrance@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "L'Île-de-France, autour de Paris, est un centre culturel, économique et historique important de la France.",
        media: "https://voyagesmicheline.com/wp-content/uploads/2021/06/Journee-11-Versailles-scaled.jpeg",
      },
    }),
    prisma.region.upsert({
      where: { name: "Provence-Alpes-Côte d'Azur" },
      update: {},
      create: {
        id: 3,
        name: "Provence-Alpes-Côte d'Azur",
        email: "provence@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "La région Provence-Alpes-Côte d'Azur est connue pour ses paysages spectaculaires, ses plages et ses villages pittoresques.",
        media: "https://www.voyageavecnous.fr/wp-content/uploads/2021/06/calanque-den-vau.jpg",
      },
    }),
    prisma.region.upsert({
      where: { name: "Bretagne" },
      update: {},
      create: {
        id: 4,
        name: "Bretagne",
        email: "bretagne@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "La Bretagne est célèbre pour ses côtes sauvages, ses traditions et son riche patrimoine historique.",
        media: "https://france3-regions.francetvinfo.fr/image/vLPdhwWwks11dGjwVSpmaIAADiI/2048x1152/regions/2020/06/09/5edf4332a367a_saint_mathieu_avec_les_armeries_yann_quiviger-3215501.jpg",
      },
    }),
    prisma.region.upsert({
      where: { name: "Savoie" },
      update: {},
      create: {
        id: 5,
        name: "Savoie",
        email: "savoie@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "La Savoie est une région montagneuse, idéale pour le ski et offrant des paysages alpins spectaculaires.",
        media: "https://www.grenier-alpin.com/blog/wp-content/uploads/2017/08/lac-montagne.jpg",
      },
    }),
    prisma.region.upsert({
      where: { name: "Loire" },
      update: {},
      create: {
        id: 6,
        name: "Loire",
        email: "loire@example.com",
        password: bcrypt.hashSync("password123"),
        description:
          "La Loire est connue pour ses châteaux majestueux, ses paysages verdoyants et son patrimoine historique unique.",
        media: "https://www.roannais-tourisme.com/wp-content/uploads/2021/05/roanne-tourisme-saint-priest-la-roche-loire-245-1600x900.jpg",
      },
    }),
  ]);

    // Créer des catégories de sites
    const [
        culture,
        nature,
        gastronomie,
        sport,
        patrimoine,
      ] = await Promise.all([
        prisma.siteCategory.create({
          data: {
            name: "Culture",
            regionId: regionAlsace.id, // Référence à l'Alsace
          },
        }),
        prisma.siteCategory.create({
          data: {
            name: "Nature",
            regionId: regionProvence.id, // Référence à la Provence-Alpes-Côte d'Azur
          },
        }),
        prisma.siteCategory.create({
          data: {
            name: "Gastronomie",
            regionId: regionAlsace.id, // Référence à l'Alsace
          },
        }),
        prisma.siteCategory.create({
          data: {
            name: "Sport et Loisirs",
            regionId: regionIledeFrance.id, // Référence à l'Île-de-France
          },
        }),
        prisma.siteCategory.create({
          data: {
            name: "Patrimoine",
            regionId: regionIledeFrance.id, // Référence à l'Île-de-France
          },
        }),
      ]);
      const [_ecomuseeAlsace, chateauVersailles, _calanquesMarseille] = await Promise.all([
        prisma.site.create({
            data: {
                name: "Écomusée d'Alsace",
                regionId: regionAlsace.id,
                categoryId: culture.id,
                city: "Ungersheim",
                postalCode: "68190",
                address: "Chemin du Grosswald, 68190 Ungersheim, France",
                latitude: 47.862778,
                longitude: 7.293611,
                description: "Un musée vivant qui présente les traditions alsaciennes dans un cadre authentique.",
                media: "https://www.ecomusee.alsace/wp-content/uploads/2021/11/place-charpentierssteevejosch-1600x900.jpg",
                contact: "info@ecomusee.alsace | +33 3 89 74 44 74",
                information: "Horaires : 10h - 18h, fermé le lundi. Accessible en famille.",
            },
        }),
        prisma.site.create({
            data: {
                name: "Château de Versailles",
                regionId: regionIledeFrance.id,
                categoryId: patrimoine.id,
                city: "Versailles",
                postalCode: "78000",
                address: "Place d'Armes, 78000 Versailles, France",
                latitude: 48.804865,
                longitude: 2.120355,
                description: "Ancienne résidence royale, célèbre pour ses jardins et la Galerie des Glaces.",
                media: "https://voyagesmicheline.com/wp-content/uploads/2021/06/Journee-11-Versailles-scaled.jpeg",
                contact: "contact@chateauversailles.fr | +33 1 30 83 78 00",
                information: "Ouvert tous les jours sauf le lundi. Tarif réduit pour les enfants.",
            },
        }),
        prisma.site.create({
            data: {
                name: "Calanques de Marseille",
                regionId: regionProvence.id,
                categoryId: nature.id,
                city: "Marseille",
                postalCode: "13009",
                address: "Route des Calanques, 13009 Marseille, France",
                latitude: 43.215909,
                longitude: 5.434285,
                description: "Un parc national côtier offrant des paysages époustouflants et des eaux turquoise.",
                media: "https://www.voyageavecnous.fr/wp-content/uploads/2021/06/calanque-den-vau.jpg",
                contact: "parc.calanques@onf.fr | +33 4 91 73 06 00",
                information: "Accès limité pendant l'été en raison des risques d'incendie.",
            },
        }),
    ]);


// Créer des événements pour chaque site
await prisma.event.createMany({
    data: [
      {
        name: "Concert 2024",
        description: "Un concert exceptionnel",
        siteId: _ecomuseeAlsace.id, // Référence au site Écomusée d'Alsace
        startDate: new Date("2024-05-20"),
        endDate: new Date("2024-05-21"),
      },
      {
        name: "Festival Nature",
        description: "Festival en plein air",
        siteId: _calanquesMarseille.id, // Référence au site Calanques de Marseille
        startDate: new Date("2024-06-10"),
        endDate: new Date("2024-06-15"),
      },
    ],
    skipDuplicates: true,
  });
  
  // Créer des packages pour chaque région
  const [packAlsaceDecouverte, packAlsaceGourmet, packVIPProvence, packFamilleIDF] = await Promise.all([
    prisma.package.create({
      data: {
        name: "Pack Découverte Alsace",
        regionId: regionAlsace.id, // Référence à l'Alsace
        price: 39.99,
        description:
          "Découvrez les villages pittoresques, musées et traditions alsaciennes avec ce pack tout inclus.",
        media: "https://static.visit.alsace/wp-content/uploads/lei/pictures/223008552-batorama-decouverte-de-strasbourg-en-bateau-1-1600x900.jpg",
      },
    }),
    prisma.package.create({
      data: {
        name: "Pack Gourmet Alsace",
        regionId: regionAlsace.id, // Référence à l'Alsace
        price: 49.99,
        description:
          "Explorez les saveurs de l'Alsace avec des dégustations de vins et des spécialités locales.",
        media: "https://www.civitatis.com/f/francia/ungersheim/pass-alsace-589x392.jpg",
      },
    }),
    prisma.package.create({
      data: {
        name: "Pack VIP Provence",
        regionId: regionProvence.id, // Référence à la Provence-Alpes-Côte d'Azur
        price: 89.99,
        description:
          "Accédez à des expériences exclusives comme des croisières privées dans les calanques et des dégustations de rosé.",
        media: "https://cdn.getyourguide.com/img/tour/5b44dfd8f3979.jpeg/146.jpg",
      },
    }),
    prisma.package.create({
      data: {
        name: "Pack Famille Île-de-France",
        regionId: regionIledeFrance.id, // Référence à l'Île-de-France
        price: 59.99,
        description:
          "Parfait pour une journée en famille, avec accès à des parcs d'attractions et des monuments emblématiques.",
        media: "https://cdn.civitatis.com/francia/eguisheim/pass-alsace.jpg",
      },
    }),
  ]);

  // Générer un numéro de pass aléatoire
const generateUniquePassCode = () => `PASS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

const [order1, order2] = await Promise.all([
    prisma.order.create({
        data: {
            userId: alice.id,
            amount: 89.99,
            status: "paid",
            passes: {
                create: [
                    {
                        name: "Pass Découverte Alsace", // Nom pour le pass
                        codePass: generateUniquePassCode(), // Code unique pour le pass
                        userId: alice.id, // ID de l'utilisateur associé
                        packageId: packAlsaceDecouverte.id, // Référence au package
                    },
                    {
                        name: "Pass Gourmet Alsace", // Nom pour le pass
                        codePass: generateUniquePassCode(),
                        userId: alice.id,
                        packageId: packAlsaceGourmet.id,
                    },
                ],
            },
        },
    }),
    prisma.order.create({
        data: {
            userId: bob.id,
            amount: 59.99,
            status: "pending",
            passes: {
                create: [
                    {
                        name: "Pass VIP Provence", // Nom pour le pass
                        codePass: generateUniquePassCode(),
                        userId: bob.id,
                        packageId: packVIPProvence.id,
                    },
                ],
            },
        },
    }),
]);


// Créer les utilisateurs et les associer aux sites
try {
    await Promise.all([
        prisma.siteUser.create({
            data: {
                name: "Alice Responsable",
                email: "alice.responsable@ecomusee.com",
                password: bcrypt.hashSync("password", 10), // Utilisation d'un salt de 10
                site: {
                    connect: { id: _ecomuseeAlsace.id }, // Vérification préalable que ecomuseeAlsace.id existe
                },
            },
        }),
        prisma.siteUser.create({
            data: {
                name: "Bob Gestionnaire",
                email: "bob.gestionnaire@chateauversailles.com",
                password: bcrypt.hashSync("password", 10), // Hashage avec un salt de 10
                site: {
                    connect: { id: chateauVersailles.id }, // Vérification préalable que chateauVersailles.id existe
                },
            },
        }),
        prisma.siteUser.create({
            data: {
                name: "Charlie Animateur",
                email: "charlie.animateur@calanques.com",
                password: bcrypt.hashSync("password", 10), // Hashage avec un salt de 10
                site: {
                    connect: { id: _calanquesMarseille.id }, // Vérification préalable que calanquesMarseille.id existe
                },
            },
        }),
    ]);
} catch (error) {
    console.error("Erreur lors de la création des utilisateurs:", error);
}

// Associer des packages aux sites
try {
    await Promise.all([
        prisma.sitePackage.create({
            data: {
                siteId: _ecomuseeAlsace.id, // Vérification préalable que ecomuseeAlsace.id existe
                packageId: packAlsaceDecouverte.id, // Vérification préalable que packAlsaceDecouverte.id existe
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: _ecomuseeAlsace.id, // Même site "Écomusée d'Alsace"
                packageId: packAlsaceGourmet.id, // Vérification préalable que packAlsaceGourmet.id existe
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: chateauVersailles.id, // Vérification préalable que chateauVersailles.id existe
                packageId: packFamilleIDF.id, // Vérification préalable que packFamilleIDF.id existe
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: _calanquesMarseille.id, // Vérification préalable que calanquesMarseille.id existe
                packageId: packVIPProvence.id, // Vérification préalable que packVIPProvence.id existe
            },
        }),
    ]);
} catch (error) {
    console.error("Erreur lors de l'association des packages aux sites:", error);
}

    console.log("Données de seed insérées avec succès");
}

main()
    .catch((e) => {
        console.error(e);
        //process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });