import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Créer des utilisateurs
  await prisma.user.createMany({
    data: [
      { name: "Alicez", email: "alice@example.com", password: "password123" },
      { name: "Bob", email: "bob@example.com", password: "password123" },
      { name: "Charlie", email: "charlie@example.com", password: "password123" },
    ],
    skipDuplicates: true,
  });

  // Créer des régions
  await prisma.region.createMany({
    data: [
      { name: "Region Nord", email: "nord@example.com", password: "password" },
      { name: "Region Sud", email: "sud@example.com", password: "password" },
    ],
    skipDuplicates: true,
  });

  // Créer des sites
  await prisma.site.createMany({
    data: [
      { name: "Site A", regionId: 1, city: "Paris" },
      { name: "Site B", regionId: 2, city: "Marseille" },
    ],
    skipDuplicates: true,
  });

  // Créer des catégories de sites
  await prisma.siteCategory.createMany({
    data: [
      { name: "Culture" },
      { name: "Nature" },
      { name: "Historique" },
    ],
    skipDuplicates: true,
  });

  // Créer des événements pour chaque site
  await prisma.event.createMany({
    data: [
      {
        name: "Concert 2024",
        description: "Un concert exceptionnel",
        siteId: 1,
        startDate: new Date("2024-05-20"),
        endDate: new Date("2024-05-21"),
      },
      {
        name: "Festival Nature",
        description: "Festival en plein air",
        siteId: 2,
        startDate: new Date("2024-06-10"),
        endDate: new Date("2024-06-15"),
      },
    ],
    skipDuplicates: true,
  });

  // Créer des packages pour chaque région
  await prisma.package.createMany({
    data: [
      { name: "Pack Découverte", region_id: 1, price: 29.99, description: "Pour explorer les sites" },
      { name: "Pack VIP", region_id: 2, price: 59.99, description: "Accès VIP pour tous les événements" },
    ],
    skipDuplicates: true,
  });

  // Créer des associations Site-Package
  await prisma.sitePackage.createMany({
    data: [
      { siteId: 1, packageId: 1 },
      { siteId: 2, packageId: 2 },
    ],
    skipDuplicates: true,
  });

  // Créer des commandes pour les utilisateurs (assurez-vous que ces commandes existent avant d'insérer les passes)
  const orders = await prisma.order.createMany({
    data: [
      { userId: 1, date: new Date(), amount: 29.99, status: "paid" },
      { userId: 2, date: new Date(), amount: 59.99, status: "pending" },
    ],
    skipDuplicates: true,
  });

  // Créer des passes pour les utilisateurs après avoir créé les commandes (l'orderId doit correspondre)
  await prisma.pass.createMany({
    data: [
      { codePass: "PASS2024A", orderId: 1, packageId: 1 },
      { codePass: "PASS2024B", orderId: 2, packageId: 2 },
    ],
    skipDuplicates: true,
  });

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
