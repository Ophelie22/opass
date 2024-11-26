import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs
  async function main() {
    // Créer des utilisateurs
    const [alice, bob, charlie] = await Promise.all([
      prisma.user.create({ data: { name: "Alice", email: "alice@example.com", password: "password123" } }),
      prisma.user.create({ data: { name: "Bob", email: "bob@example.com", password: "password123" } }),
      prisma.user.create({ data: { name: "Charlie", email: "charlie@example.com", password: "password123" } }),
    ]);

  // Créer des régions
  const [regionNord, regionSud] = await Promise.all([
    prisma.region.create({ data: { name: "Region Nord", email: "nord@example.com", password: "password" } }),
    prisma.region.create({ data: { name: "Region Sud", email: "sud@example.com", password: "password" } }),
  ]);
// Créer des catégories de sites
const [culture, nature, historique] = await Promise.all([
  prisma.siteCategory.create({ data: { name: "Culture" } }),
  prisma.siteCategory.create({ data: { name: "Nature" } }),
  prisma.siteCategory.create({ data: { name: "Historique" } }),
]);
  // Créer des sites
  const [siteA, siteB] = await Promise.all([
    prisma.site.create({
      data: { name: "Site A", regionId: regionNord.id, city: "Paris", categoryId: culture.id },
    }),
    prisma.site.create({
      data: { name: "Site B", regionId: regionSud.id, city: "Marseille", categoryId: nature.id },
    }),
  ]);


  // Créer des événements pour chaque site
  await prisma.event.createMany({
    data: [
      {
        name: "Concert 2024",
        description: "Un concert exceptionnel",
        siteId: siteA.id, // Site B a l'id 
        startDate: new Date("2024-05-20"),
        endDate: new Date("2024-05-21"),
      },
      {
        name: "Festival Nature",
        description: "Festival en plein air",
        siteId: siteB.id,
        startDate: new Date("2024-06-10"),
        endDate: new Date("2024-06-15"),
      },
    ],
    skipDuplicates: true,
  });

  
  // Créer des packages pour chaque région
  const [packDecouverte, packVIP] = await Promise.all([
    prisma.package.create({
      data: { name: "Pack Découverte", region_id: regionNord.id, price: 29.99, description: "Pour explorer les sites" },
    }),
    prisma.package.create({
      data: { name: "Pack VIP", region_id: regionSud.id, price: 59.99, description: "Accès VIP pour tous les événements" },
    }),
  ])


 // Créer des commandes pour les utilisateurs
 const [order1, order2] = await Promise.all([
  prisma.order.create({ data: { userId: alice.id, amount: 29.99, status: "paid" } }),
  prisma.order.create({ data: { userId: bob.id, amount: 59.99, status: "pending" } }),
]);

  // Créer des passes pour les utilisateurs
  await Promise.all([
    prisma.pass.create({ data: { codePass: "PASS2024A", orderId: order1.id, packageId: packDecouverte.id } }),
    prisma.pass.create({ data: { codePass: "PASS2024B", orderId: order2.id, packageId: packVIP.id } }),
  ]);

  // Associer des utilisateurs à des sites (SiteUser)
  await prisma.siteUser.createMany({
    data: [
      { site_id: 1, name: "Alice Site", email: "alice.site@example.com", password: "password" },
      { site_id: 2, name: "Bob Site", email: "bob.site@example.com", password: "password" },
    ],
    skipDuplicates: true,
  });

  console.log("Données de seed insérées avec succès");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
