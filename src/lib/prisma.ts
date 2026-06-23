import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getPrismaDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return databaseUrl;

  const url = new URL(databaseUrl);
  const usesPooler =
    url.hostname.includes("pooler.supabase.com") || url.port === "6543";

  if (!usesPooler) return databaseUrl;

  url.searchParams.set("pgbouncer", "true");
  url.searchParams.set("connection_limit", "1");
  url.searchParams.set("pool_timeout", "30");

  return url.toString();
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getPrismaDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
