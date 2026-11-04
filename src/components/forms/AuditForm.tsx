"use client";
import { useId, useRef, useState, type SubmitEvent } from "react";
import TypewriterInput from "@/components/forms/TypewriterInput";
import AppButton from "@/components/ui/AppButton";
import AppMessage from "@/components/ui/AppMessage";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/class-names";
import { normalizeWebsiteUrl } from "@/lib/website-url";

const EXAMPLE_SITES = [
  "yourbrand.com",
  "yourbrand.com/products/bestseller",
  "yourbrand.com/checkout",
] as const;

/**
 * "Run a free audit" form for dark surfaces. There is no audit API or contact
 * page yet, so a valid address is not sent anywhere: the visitor is told that
 * audits are not open. Connect a submission endpoint here before launch.
 */
export default function AuditForm({
  variant = "pill",
  className,
}: {
  variant?: "pill" | "inline";
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReceived, setIsReceived] = useState(false);
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("site");
    const site = typeof value === "string" ? normalizeWebsiteUrl(value) : null;
    if (!site) {
      setError("Enter a valid website address, for example yourbrand.com.");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setIsReceived(true);
  };

  const isPill = variant === "pill";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      <div
        className={
          isPill
            ? "flex w-full gap-1.5 rounded-full border border-cream/20 bg-night/70 p-1.5 transition-colors duration-[250ms] focus-within:border-gold has-[[aria-invalid=true]]:border-error max-xs:flex-col max-xs:rounded-[28px]"
            : "flex flex-wrap gap-2.5"
        }
      >
        <label htmlFor={inputId} className="sr-only">
          Your website address
        </label>
        <TypewriterInput
          ref={inputRef}
          id={inputId}
          name="site"
          type="text"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          phrases={EXAMPLE_SITES}
          prefix="Enter your website: "
          staticPlaceholder="Enter your website, e.g. yourbrand.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={() => {
            setError(null);
            setIsReceived(false);
          }}
          appearance={isPill ? "bare" : "outlined"}
          className={isPill ? "min-w-0 flex-1" : "min-w-[220px] flex-1"}
        />
        <AppButton
          type="submit"
          size="lg"
          className={cn(isPill && "font-semibold max-xs:w-full")}
          icon={isPill ? <Icon name="arrow-right" size={16} /> : undefined}
          iconPos="right"
        >
          Run a free audit
        </AppButton>
      </div>
      {error && <AppMessage id={errorId} text={error} />}
      {isReceived && (
        <AppMessage
          severity="info"
          text="Thanks. Free audits are not open yet, so nothing was sent. Please check back soon."
        />
      )}
    </form>
  );
}
