import { NextResponse } from "next/server";
import * as jose from "jose";
// import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Hardcoded user for demo purposes
const demoUser = {
  id: "1",
  email: "vts@gmail.com",
  fullName: "VTS",
  password: "jkfjajl;jkfdajkkkkkkdjfj",
};

// POST /api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check if user exists (hardcoded for demo)
    if (email !== demoUser.email) {
      return NextResponse.json(
        { detail: "Invalid credentials" },
        { status: 401 }
      );
    }
    if (password !== demoUser.password) {
      return NextResponse.json(
        { detail: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Generate JWT token including username (fullName)
    const token = await new jose.SignJWT({
      id: demoUser.id,
      email: demoUser.email,
      username: demoUser.fullName,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // 4. Create response with token and user info
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        fullName: demoUser.fullName,
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
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
