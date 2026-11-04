"use client";
import { Message, type MessageProps } from "primereact/message";
import { cn } from "@/lib/class-names";

const severities = {
  error: "text-error",
  info: "text-cream/85",
} as const;

type AppMessageProps = Omit<MessageProps, "unstyled" | "pt" | "severity"> & {
  severity?: keyof typeof severities;
};

/**
 * Inline status message (PrimeReact Message: role="alert", polite live region).
 * Styled for dark brand surfaces.
 */
export default function AppMessage({
  severity = "error",
  className,
  ...props
}: AppMessageProps) {
  return (
    <Message
      unstyled
      severity={severity}
      className={cn(
        "flex items-center gap-2 text-sm",
        severities[severity],
        className,
      )}
      pt={{ icon: { className: "size-4 shrink-0" } }}
      {...props}
    />
  );
}
