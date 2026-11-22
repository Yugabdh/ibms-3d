"use client";

import { useActionState } from "react";
import { Button } from "./buttons";
import { grantPortfolioAccess } from "../portfolio-access/actions";
import { EMAIL_PATTERN } from "../lib/portfolio-access";

// Sent from the browser: FormSubmit (behind Cloudflare) rejects server-side requests with 403.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/sales@ibms3d.com";
const GENERIC_ERROR = "We couldn't send that just now. Please try again in a moment.";

async function requestPortfolioAccess(previousState, formData) {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { email, error: "Please enter a valid email address." };
  }

  // Honeypot: bots fill this in, people never see it.
  if (formData.get("_honey")) {
    return { email, error: GENERIC_ERROR };
  }

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        "Requested page": formData.get("next"),
        _subject: "New IBMS3D portfolio access",
        _template: "table",
        _captcha: "false",
      }),
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

  // Sets the signed access cookie and redirects to the portfolio.
  return grantPortfolioAccess(formData);
}

const fieldClasses =
  "block min-h-11.5 w-full rounded-lg border border-field bg-white px-3.5 text-[15px] text-brand-dark transition-colors placeholder:text-[#81a09e] focus:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-primary";

export default function PortfolioAccessForm({ next = "/portfolio" }) {
  const [state, formAction, isPending] = useActionState(requestPortfolioAccess, { email: "", error: "" });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />
      {/* Honeypot: bots fill this in, people never see it */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="access-email" className="text-sm font-medium">
          Work email
        </label>
        <input
          id="access-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          placeholder="you@company.com"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "access-error" : undefined}
          className={fieldClasses}
        />
        {state.error && (
          <p id="access-error" role="alert" className="text-sm text-[#b42318]">
            {state.error}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" arrow={!isPending} disabled={isPending} className="self-start disabled:opacity-60">
        {isPending ? "Unlocking…" : "View the portfolio"}
      </Button>
    </form>
  );
}
