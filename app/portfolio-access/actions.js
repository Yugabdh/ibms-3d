"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, accessCookieOptions, createAccessToken, safeNextPath } from "../lib/portfolio-access";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/yugabdhppashte@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR = "We couldn't send that just now. Please try again in a moment.";

export async function requestPortfolioAccess(previousState, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const next = safeNextPath(formData.get("next"));

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { email, error: "Please enter a valid email address." };
  }

  // Honeypot: bots fill this in, people never see it.
  if (formData.get("_honey")) {
    return { email, error: GENERIC_ERROR };
  }

  const token = await createAccessToken();
  if (!token) {
    console.error("Portfolio gate: PORTFOLIO_ACCESS_SECRET is not set.");
    return { email, error: GENERIC_ERROR };
  }

  // FormSubmit links a form to the site that sends it, so pass our own origin.
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = requestHeaders.get("origin") ?? `${protocol}://${host}`;

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/portfolio-access`,
      },
      body: JSON.stringify({
        email,
        "Requested page": next,
        _subject: "New IBMS3D portfolio access",
        _template: "table",
        _captcha: "false",
      }),
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || String(result.success) !== "true") {
      console.error("Portfolio gate: FormSubmit rejected the submission.", response.status, result.message);
      return { email, error: GENERIC_ERROR };
    }
  } catch (error) {
    console.error("Portfolio gate: FormSubmit request failed.", error);
    return { email, error: GENERIC_ERROR };
  }

  (await cookies()).set(ACCESS_COOKIE, token, accessCookieOptions);

  // Outside the try block: redirect() works by throwing.
  redirect(next, "replace");
}
