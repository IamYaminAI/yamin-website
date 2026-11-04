import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** A navigation link styled as a button. Use AppButton for in-page actions. */
export default function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
