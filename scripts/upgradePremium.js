// Upgrade a user to Premium for 30 days.
// Usage: node ./scripts/upgradePremium.js free_user@example.com

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/upgradePremium.js <email>');
    process.exit(1);
  }

  const until = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const user = await prisma.user.update({
    where: { email },
    data: { isPremium: true, premiumUntil: until },
    select: { id: true, email: true, isPremium: true, premiumUntil: true },
  });
  console.log('Upgraded:', user);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
