// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Créer des utilisateurs

    const [alice, bob, charlie] = await Promise.all([
        prisma.user.create({ data: { name: "Alice", email: "alice@example.com", password: bcrypt.hashSync("password") } }),
        prisma.user.create({ data: { name: "Bob", email: "bob@example.com", password: bcrypt.hashSync("password") } }),
        prisma.user.create({ data: { name: "Charlie", email: "charlie@example.com", password: bcrypt.hashSync("password") } }),
    ]);

    // Créer des régions
    const [regionAlsace, regionIledeFrance, regionProvence] = await Promise.all([
        prisma.region.create({
            data: {
                name: "Alsace",
                email: "alsace@example.com",
                password: bcrypt.hashSync("password123"),
                description: "Située à l'est de la France, l'Alsace est célèbre pour ses villages pittoresques, ses vins blancs et son patrimoine culturel riche.",
                media: "https://a.cdn-hotels.com/gdcs/production9/d314/551f2674-6301-42c1-90f1-ce47fadbc229.jpg",
            },
        }),
        prisma.region.create({
            data: {
                name: "Île-de-France",
                email: "iledefrance@example.com",
                password: bcrypt.hashSync("password123"),
                description: "Région de la capitale française, elle abrite Paris et des sites emblématiques comme la Tour Eiffel et le Château de Versailles.",
                media: "https://cdn1.matadornetwork.com/blogs/1/2020/09/Loire-Valley-France-castle-over-river-1200x853.jpg",
            },
        }),
        prisma.region.create({
            data: {
                name: "Provence-Alpes-Côte d'Azur",
                email: "provence@example.com",
                password: bcrypt.hashSync("password123"),
                description: "Réputée pour son littoral méditerranéen, ses champs de lavande et ses villages pittoresques comme Saint-Tropez et Gordes.",
                media: "https://i.pinimg.com/originals/36/53/82/36538200011d9039593e7b57bb7cbd0c.jpg",
            },
        }),
    ]);

    // Créer des catégories de sites
    const [culture, nature, gastronomie, sport, patrimoine] = await Promise.all([
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
    // Créer des sites
    const [ecomuseeAlsace, chateauVersailles, calanquesMarseille] = await Promise.all([
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
                siteId: ecomuseeAlsace.id, // Référence correcte au site
                startDate: new Date("2024-05-20"),
                endDate: new Date("2024-05-21"),
            },
            {
                name: "Festival Nature",
                description: "Festival en plein air",
                siteId: calanquesMarseille.id, // Référence correcte au site
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
                description: "Découvrez les villages pittoresques, musées et traditions alsaciennes avec ce pack tout inclus.",
                //media: "https://static.visit.alsace/wp-content/uploads/lei/pictures/223008552-batorama-decouverte-de-strasbourg-en-bateau-1-1600x900.jpg",
            },
        }),
        prisma.package.create({
            data: {
                name: "Pack Gourmet Alsace",
                regionId: regionAlsace.id, // Référence à l'Alsace
                price: 49.99,
                description: "Explorez les saveurs de l'Alsace avec des dégustations de vins et des spécialités locales.",
                //media: "https://www.civitatis.com/f/francia/ungersheim/pass-alsace-589x392.jpg",
            },
        }),
        prisma.package.create({
            data: {
                name: "Pack VIP Provence",
                regionId: regionProvence.id, // Référence à la Provence-Alpes-Côte d'Azur
                price: 89.99,
                description: "Accédez à des expériences exclusives comme des croisières privées dans les calanques et des dégustations de rosé.",
                //media: "https://cdn.getyourguide.com/img/tour/5b44dfd8f3979.jpeg/146.jpg",
            },
        }),
        prisma.package.create({
            data: {
                name: "Pack Famille Île-de-France",
                regionId: regionIledeFrance.id, // Référence à l'Île-de-France
                price: 59.99,
                description: "Parfait pour une journée en famille, avec accès à des parcs d'attractions et des monuments emblématiques.",
                //media: "https://cdn.civitatis.com/francia/eguisheim/pass-alsace.jpg",
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
                status: "paid", // PASS-ABCDE123 : "Pack Découverte Alsace" || PASS-FGHIJ456 : "Pack Gourmet Alsace"
                passes: {
                    create: [
                        {
                            codePass: generateUniquePassCode(), // Code unique pour le pass
                            packageId: packAlsaceDecouverte.id, // Référence au package
                        },
                        {
                            codePass: generateUniquePassCode(), // Un autre pass pour la même commande
                            packageId: packAlsaceGourmet.id, // Référence à un autre package
                        },
                    ],
                },
            },
        }),
        prisma.order.create({
            data: {
                userId: bob.id, // PASS-KLMNO789 : "Pack VIP Provence" || 
                amount: 59.99,
                status: "pending",
                passes: {
                    create: [
                        {
                            codePass: generateUniquePassCode(), // Code unique
                            packageId: packVIPProvence.id, // Référence au package VIP
                        },
                    ],
                },

            },
        }),
    ]);

    // Associer des utilisateurs à des sites (SiteUser)
    // Créer des utilisateurs associés à des sites
    // Créer des utilisateurs associés à des sites
    await Promise.all([
        prisma.siteUser.create({
            data: {
                name: "Alice Responsable",
                email: "alice.responsable@ecomusee.com",
                password: bcrypt.hashSync("password"),
                site: {
                    connect: { id: ecomuseeAlsace.id }, // Référence au site "Écomusée d'Alsace"
                },
            },
        }),
        prisma.siteUser.create({
            data: {
                name: "Bob Gestionnaire",
                email: "bob.gestionnaire@chateauversailles.com",
                password: bcrypt.hashSync("password"),
                site: {
                    connect: { id: chateauVersailles.id }, // Référence au site "Château de Versailles"
                },
            },
        }),
        prisma.siteUser.create({
            data: {
                name: "Charlie Animateur",
                email: "charlie.animateur@calanques.com",
                password: bcrypt.hashSync("password"),
                site: {
                    connect: { id: calanquesMarseille.id }, // Référence au site "Calanques de Marseille"
                },
            },
        }),
    ]);
    ///Site Package
    await Promise.all([
        prisma.sitePackage.create({
            data: {
                siteId: ecomuseeAlsace.id, // Référence au site "Écomusée d'Alsace"
                packageId: packAlsaceDecouverte.id, // Référence au package "Pack Découverte Alsace"
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: ecomuseeAlsace.id, // Même site "Écomusée d'Alsace"
                packageId: packAlsaceGourmet.id, // Référence au package "Pack Gourmet Alsace"FP
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: chateauVersailles.id, // Référence au site "Château de Versailles"
                packageId: packFamilleIDF.id, // Référence au package "Pack Famille Île-de-France"
            },
        }),
        prisma.sitePackage.create({
            data: {
                siteId: calanquesMarseille.id, // Référence au site "Calanques de Marseille"
                packageId: packVIPProvence.id, // Référence au package "Pack VIP Provence"
            },
        }),
    ]);


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