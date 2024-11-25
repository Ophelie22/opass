import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Créer des utilisateurs
    const users = await prisma.user.createMany({
      data: [
        { name: "Alice", email: "alice@example.com", password: "password123" },
        { name: "Bob", email: "bob@example.com", password: "password123" },
        { name: "Charlie", email: "charlie@example.com", password: "password123" },
      ],
    });
  
    // Créer des régions
    const regions = await prisma.region.createMany({
      data: [
        { name: "Region Nord", email: "nord@example.com", password: "password" },
        { name: "Region Sud", email: "sud@example.com", password: "password" },
      ],
    });
  
    // Créer des sites
    const sites = await prisma.site.createMany({
      data: [
        { name: "Site A", regionId: 1, city: "Paris" },
        { name: "Site B", regionId: 2, city: "Marseille" },
      ],
    });
  
    // Créer des catégories de sites
    const siteCategories = await prisma.siteCategory.createMany({
      data: [
        { name: "Culture" },
        { name: "Nature" },
        { name: "Historique" },
      ],
    });
  
    // Créer des événements pour chaque site
    const events = await prisma.event.createMany({
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
    });
  
    // Créer des packages pour chaque région
    const packages = await prisma.package.createMany({
      data: [
        { name: "Pack Découverte", region_id: 1, price: 29.99, description: "Pour explorer les sites" },
        { name: "Pack VIP", region_id: 2, price: 59.99, description: "Accès VIP pour tous les événements" },
      ],
    });
  
    // Créer des associations Site-Package
    const sitePackages = await prisma.sitePackage.createMany({
      data: [
        { siteId: 1, packageId: 1 },
        { siteId: 2, packageId: 2 },
      ],
    });
  
    // Créer des passes pour les utilisateurs
    const passes = await prisma.pass.createMany({
      data: [
        { codePass: "PASS2024A", orderId: 1, packageId: 1 },
        { codePass: "PASS2024B", orderId: 2, packageId: 2 },
      ],
    });
  
    // Créer des commandes pour les utilisateurs
    const orders = await prisma.order.createMany({
      data: [
        { userId: 1, date: new Date(), amount: 29.99, status: "paid" },
        { userId: 2, date: new Date(), amount: 59.99, status: "pending" },
      ],
    });
  
    // Associer des utilisateurs à des sites (SiteUser)
    const siteUsers = await prisma.siteUser.createMany({
      data: [
        { site_id: 1, name: "Alice Site", email: "alice.site@example.com", password: "password" },
        { site_id: 2, name: "Bob Site", email: "bob.site@example.com", password: "password" },
      ],
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