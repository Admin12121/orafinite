"use server";

import { cookies } from "next/headers";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export interface RegistrationDraft {
  name?: string | null;
  store?: string | null;
  phone?: string | null;
  email?: string | null;
}

const COOKIE = "regDraft";
const MAX_AGE = 60 * 15;

function serializeDraft(d: RegistrationDraft) {
  return encodeURIComponent(
    JSON.stringify({
      name: d.name ?? "",
      store: d.store ?? "",
      phone: d.phone ?? "",
      email: d.email ?? "",
    })
  );
}

async function readDraft() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE)?.value;
  if (!raw) return {};
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return {};
  }
}

async function applyDraft(userId: bigint, draft: RegistrationDraft) {
  await db.clientData.upsert({
    where: { userId },
    update: {
      storeName: draft.store ?? "",
      phone: draft.phone ?? "",
    },
    create: {
      userId,
      storeName: draft.store ?? "",
      phone: draft.phone ?? "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      taxId: "",
    },
  });

  const defaultRole = await db.role.findFirst({
    where: { OR: [{ isDefault: true }, { name: "client" }] },
    select: { id: true },
  });
  if (defaultRole) {
    await db.userRole.upsert({
      where: {
        userId_roleId: {
          userId,
          roleId: defaultRole.id,
        },
      },
      update: {},
      create: {
        userId,
        roleId: defaultRole.id,
      },
    });
  }

  await db.user.update({
    where: { id: userId },
    data: {
      name: draft.name || undefined,
      email: draft.email || undefined,
      state: "active",
    },
  });
}

export async function setRegistrationDraft(draft: RegistrationDraft) {
  (await cookies()).set(COOKIE, serializeDraft(draft), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: MAX_AGE,
  });
  return { ok: true };
}

export async function clearRegistrationDraft() {
  (await cookies()).set(COOKIE, "", { path: "/", maxAge: 0 });
  return { ok: true };
}

export async function finalizeOnboardingAction() {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, reason: "unauthenticated" };
  const draft = await readDraft();
  await applyDraft(BigInt(session.user.id), draft);
  (await cookies()).set(COOKIE, "", { path: "/", maxAge: 0 });
  return { ok: true };
}