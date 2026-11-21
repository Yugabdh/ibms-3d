"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  EMAIL_PATTERN,
  accessCookieOptions,
  createAccessToken,
  safeNextPath,
} from "../lib/portfolio-access";

const GENERIC_ERROR = "We couldn't send that just now. Please try again in a moment.";

// Called by PortfolioAccessForm after the browser has sent the email to FormSubmit.
// FormSubmit sits behind Cloudflare, which blocks requests from server/datacenter IPs
// (e.g. Vercel), so the email notification has to be sent client-side.
export async function grantPortfolioAccess(formData) {
  const email = String(formData.get("email") ?? "").trim();
  const next = safeNextPath(formData.get("next"));

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { email, error: "Please enter a valid email address." };
  }

  const token = await createAccessToken();
  if (!token) {
    console.error("Portfolio gate: PORTFOLIO_ACCESS_SECRET is not set.");
    return { email, error: GENERIC_ERROR };
  }

  (await cookies()).set(ACCESS_COOKIE, token, accessCookieOptions);

  // redirect() works by throwing, so it must stay outside any try block.
  redirect(next, "replace");
}
