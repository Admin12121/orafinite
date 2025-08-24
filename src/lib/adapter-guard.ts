import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { cookies } from "next/headers";
import { db } from "@/lib/db";


export default function PrismaAdapterWithGuard(): Adapter {
  const base = PrismaAdapter(db);

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
  };
}