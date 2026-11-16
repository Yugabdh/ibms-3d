// Portfolio email gate: shared by proxy.js and the /portfolio-access server action.
//
// There is no database. Access is a signed cookie, "<issuedAt>.<signature>",
// where the signature is an HMAC-SHA256 of issuedAt made with
// PORTFOLIO_ACCESS_SECRET. The cookie is HttpOnly, so page scripts can't read it,
// and it can't be forged without the secret. Any value that fails the check is
// treated as no cookie at all.

export const ACCESS_COOKIE = "ibms3d_portfolio_access";
export const GATE_PATH = "/portfolio-access";

// Browsers cap cookie lifetime at 400 days. proxy.js renews it on every portfolio visit.
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 400;

export const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: ACCESS_MAX_AGE,
};

const encoder = new TextEncoder();

async function hmacKey() {
  const secret = process.env.PORTFOLIO_ACCESS_SECRET;
  if (!secret) return null;
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toBase64Url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

// Returns null when PORTFOLIO_ACCESS_SECRET is missing, so the gate stays shut.
export async function createAccessToken() {
  const key = await hmacKey();
  if (!key) return null;
  const issuedAt = String(Date.now());
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(issuedAt));
  return `${issuedAt}.${toBase64Url(signature)}`;
}

export async function isValidAccessToken(token) {
  if (!token) return false;
  const [issuedAt, signature, extra] = token.split(".");
  if (!issuedAt || !signature || extra !== undefined || !/^\d+$/.test(issuedAt)) return false;

  const key = await hmacKey();
  if (!key) return false;

  try {
    // crypto.subtle.verify compares in constant time.
    return await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(issuedAt));
  } catch {
    return false;
  }
}

// Only same-site portfolio paths are allowed as the post-submit destination,
// so ?next= can't be used to redirect visitors to another site.
export function safeNextPath(value) {
  if (typeof value !== "string") return "/portfolio";
  if (!/^\/portfolio(?:[/?#]|$)/.test(value) || value.includes("\\")) return "/portfolio";
  return value;
}
