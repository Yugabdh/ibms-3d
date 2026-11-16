"use client";

import { useActionState } from "react";
import { Button } from "./buttons";
import { requestPortfolioAccess } from "../portfolio-access/actions";

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
