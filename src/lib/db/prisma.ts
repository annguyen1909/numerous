/**
 * Prisma Client Instance
 * Singleton pattern để tránh tạo nhiều instance trong development
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Khai báo global type cho PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// Tạo Prisma client instance hoặc sử dụng instance đã có
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Trong development mode, lưu instance vào global để tránh hot reload tạo nhiều connection
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
