import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  GATE_PATH,
  accessCookieOptions,
  isValidAccessToken,
  safeNextPath,
} from "./app/lib/portfolio-access";

// Gates /portfolio and everything under it behind the email form at /portfolio-access.
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  const hasAccess = await isValidAccessToken(token);

  if (pathname === GATE_PATH) {
    // Already unlocked: skip the form.
    if (hasAccess) {
      const next = safeNextPath(request.nextUrl.searchParams.get("next"));
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  if (!hasAccess) {
    const gateUrl = new URL(GATE_PATH, request.url);
    gateUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(gateUrl);
  }

  // Renew the cookie so regular visitors never hit the 400-day cap.
  const response = NextResponse.next();
  response.cookies.set(ACCESS_COOKIE, token, accessCookieOptions);
  return response;
}

export const config = {
  // "/portfolio/:path*" also matches "/portfolio" itself, but not "/portfolio-access".
  matcher: ["/portfolio/:path*", "/portfolio-access"],
};
