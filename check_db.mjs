import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkDatabase() {
  try {
    const blogCount = await prisma.blogPost.count();
    console.log('Blog posts in database:', blogCount);
    
    if (blogCount === 0) {
      console.log('\n⚠️  No blog posts found! You need to run the SQL insert script.');
      console.log('Open Supabase SQL Editor and run: insert_blogs.sql');
    }
    
    const users = await prisma.user.findMany({
      select: { id: true, email: true, isPremium: true }
    });
    console.log('\nUsers:', JSON.stringify(users, null, 2));
    
    const reports = await prisma.report.count();
    console.log('\nReports in database:', reports);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

checkDatabase();
