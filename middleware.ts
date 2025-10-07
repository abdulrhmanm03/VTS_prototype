// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
// const encoder = new TextEncoder();
// const PUBLIC_PATHS = ["/auth", "/api/auth/", "/favicon.ico", "/_next", "/images"];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   // Skip public paths
//   if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // Require token
//   if (!token) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   try {
//     // Verify token using jose (Edge compatible)
//     const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));
//     return NextResponse.next();
//   } catch (err) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
// };
export async function middleware(req: NextRequest) {}