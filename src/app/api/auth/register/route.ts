import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas/index";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = RegisterSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.issues.map(
        (err: { message: string }) => err.message
      );
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, store } = validated.data;

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        redirectUrl: "/auth/login",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
