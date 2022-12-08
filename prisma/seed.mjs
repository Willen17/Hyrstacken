// @ts-check
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const locations = [
  'Älvsborg',
  'Angered',
  'Bergsjön',
  'Biskopsgården',
  'Centrum',
  'Haga',
  'Kortedala',
  'Linné',
  'Lövgärdet',
  'Lundby',
  'Maria',
  'Östra Frölunda',
  'Västra Frölunda',
  'Sävedalen',
  'Torslanda',
  'Tuve',
  "Askim",
  "Backa",
  "Gunnared",
  "Härlanda",
  "Högsbo",
  "Kärra-Rödbo",
  "Lärjedalen",
  "Linnestaden",
  "Majorna",
  "Örgryte",
  "Styrsö",
  "Torslanda",
  "Tuve-Säve ",
  "Tynnered",
];

const categories = [
  "Verktyg",
  "Hem",
  "Sport",
  "Friluftsliv",
  "Övrigt"
];

async function main() {
    console.log('Seeding...');
    for (const location of locations) {
        console.log(`Seeding location ${location}`);
        await prisma.location.upsert({
            where: { name: location },
            update: {},
            create: { name: location },
        });
    }

    for (const category of categories) {
        console.log(`Seeding category ${category}`);
        await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: { name: category },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });