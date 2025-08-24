import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { cookies, headers } from "next/headers";
import { db } from "@/lib/db";
import { getRequestMeta } from "@/helper";

export default function PrismaAdapterWithGuard(): Adapter {
  const base = PrismaAdapter(db) as any;

  return {
    ...base,
    async createUser(data) {
      const cookieStore = await cookies();
      const ck = cookieStore.get("regDraft");
      if (!ck?.value) {
        cookieStore.set("deny_create", "1", {
          path: "/",
          maxAge: 60,
          sameSite: "lax",
          httpOnly: false,
        });
        throw new Error("NoRegistrationCookie");
      }
      if (!base.createUser) {
        throw new Error("Adapter error: createUser is not implemented.");
      }
      const user = await base.createUser(data);
      cookieStore.set("regDraft", "", { path: "/", maxAge: 0 });
      return user;
    },

    async createAuthenticator(data) {
      const meta = getRequestMeta();
      const created = await base.createAuthenticator(data);
      await db.authenticator.update({
        where: {
          userId_credentialID: {
            userId: BigInt(created.userId),
            credentialID: created.credentialID,
          },
        },
        data: {
          label: (await meta).os,
          createdAt: new Date(),
        },
        select: { credentialID: true },
      });
      return created;
    },

    async updateAuthenticatorCounter(credentialID: string, counter: number) {
      const meta = getRequestMeta();
      await db.authenticator
        .update({
          where: {
            credentialID,
          },
          data: {
            lastUsedAt: new Date(),
            lastUsedUserAgent: (await meta).client,
            lastUsedOs: (await meta).os,
            lastUsedCountry: (await meta).country,
            lastUsedCity: (await meta).city,
          },
        })
        .catch(async () => {
          const record = await db.authenticator.findUnique({
            where: { credentialID },
            select: { userId: true },
          });
          if (record) {
            await db.authenticator.update({
              where: {
                userId_credentialID: {
                  userId: record.userId,
                  credentialID,
                },
              },
              data: {
                lastUsedAt: new Date(),
                lastUsedUserAgent: (await meta).client,
                lastUsedOs: (await meta).os,
                lastUsedCountry: (await meta).country,
                lastUsedCity: (await meta).city,
              },
            });
          }
        });
      return;
    },
  };
}
