import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getValidSessionUserId } from "@/lib/auth-helper";


export async function GET() {
  try {
    const userId = await getValidSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized or session expired" },
        { status: 401 }
      );
    }
    console.log(userId)
    const keys = await db.authenticator.findMany({
      where: { userId },
      select: {
        credentialID: true,
        label: true,
        createdAt: true,
        lastUsedAt: true,
        lastUsedUserAgent: true,
        lastUsedOs: true,
        lastUsedCountry: true,
        lastUsedCity: true,
      },
    });
    console.log(keys)
    return NextResponse.json({ keys });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const userId = await getValidSessionUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized or session expired" },
        { status: 401 }
      );
    }
    const { credentialID } = await req.json().catch(() => ({}));
    if (!credentialID)
      return NextResponse.json(
        { error: "Missing credentialID" },
        { status: 400 }
      );
    try {
      await db.authenticator.delete({ where: { credentialID, userId } });
      return NextResponse.json({ message: "Credential deleted successfully" }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
