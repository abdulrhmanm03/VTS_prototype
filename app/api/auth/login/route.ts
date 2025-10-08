import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// POST /api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 });
    }

    // 2. Verify password using bcrypt
    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) {
      return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 });
    }

    // 3. Generate JWT token including username (fullName)
    const token = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      username: user.fullName, // include username in token
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // 4. Create response with token and user info
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });

    // 5. Set token as cookie for secure backend usage
    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
  }
}