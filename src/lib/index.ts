import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

function toUserId(id: string | number | bigint): bigint | null {
  if (typeof id === "bigint") return id;
  if (typeof id === "number") return BigInt(id);
  if (typeof id === "string") {
    if (/^\d+$/.test(id)) return BigInt(id);
    return null;
  }
  return null;
}

export const getUserbyEmail = async (email: string) => {
  try {
    return await db.user.findFirst({ where: { email } });
  } catch (error) {
    return null;
  }
};

export const getUserbyId = async (id: string | number | bigint) => {
  try {
    const idValue = toUserId(id);
    if (idValue === null) return null;
    return await db.user.findUnique({ where: { id: idValue } });
  } catch (error) {
    return null;
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id?: string | number | bigint };
    if (!decoded?.id) return null;
    const idValue = toUserId(decoded.id);
    if (idValue === null) return null;
    return await db.user.findUnique({ where: { id: idValue } });
  } catch {
    return null;
  }
}
