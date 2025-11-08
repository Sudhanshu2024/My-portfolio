import { PrismaClient } from '@prisma/client'

// Add type to global object
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'], // remove 'query' for cleaner logs on prod
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
