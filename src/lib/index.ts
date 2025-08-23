import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserbyId = async (id: string | number | bigint) => {
  try {
    const idValue =
      typeof id === "string" || typeof id === "number" ? BigInt(id as any) : (id as bigint);
    const user = await db.user.findUnique({ where: { id: idValue } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string | number | bigint };
    if (!decoded?.id) return null;
    const idValue =
      typeof decoded.id === "string" || typeof decoded.id === "number"
        ? BigInt(decoded.id as any)
        : (decoded.id as bigint);
    const user = await db.user.findUnique({ where: { id: idValue } });
    return user;
  } catch {
    return null;
  }
}
