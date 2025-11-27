// Upgrade a user to Premium for 30 days using raw SQL via `pg`.
// Usage: node ./scripts/upgradePremiumSql.js user@example.com

// Load .env into process.env when running the script directly
try {
  require('dotenv').config();
} catch (e) {
  // dotenv is optional; if it's not installed, the script will fall back to existing env vars
}

const { Pool } = require('pg');

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/upgradePremiumSql.js <email>');
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Please set DATABASE_URL environment variable');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: databaseUrl });
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        `UPDATE "User" SET "isPremium" = true, "premiumUntil" = NOW() + INTERVAL '30 days' WHERE email = $1 RETURNING id, email, "isPremium", "premiumUntil"`,
        [email]
      );
      if (res.rowCount === 0) {
        console.error('No user found with that email');
        process.exitCode = 2;
      } else {
        console.log('Upgraded user:', res.rows[0]);
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('DB error', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
