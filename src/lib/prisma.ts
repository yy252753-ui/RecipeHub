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

  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  url.searchParams.set("pgbouncer", "true");
  // Build: 30개 페이지 동시 렌더링 대응, Runtime: 서버리스 효율
  url.searchParams.set("connection_limit", isBuild ? "30" : "1");
  url.searchParams.set("pool_timeout", isBuild ? "60" : "30");

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
