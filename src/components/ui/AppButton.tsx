"use client";
import { Button, type ButtonProps } from "primereact/button";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/buttonStyles";
import { cn } from "@/lib/class-names";

type AppButtonProps = Omit<
  ButtonProps,
  | "unstyled"
  | "pt"
  | "size"
  | "severity"
  | "text"
  | "outlined"
  | "rounded"
  | "raised"
  | "link"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * PrimeReact Button in unstyled mode with the brand button styles, so it
 * matches ButtonLink. Use ButtonLink for navigation, AppButton for actions.
 */
export default function AppButton({
  variant,
  size,
  className,
  type = "button",
  iconPos,
  ...props
}: AppButtonProps) {
  return (
    <Button
      unstyled
      type={type}
      iconPos={iconPos}
      // Unstyled mode leaves icon placement to us; the icon renders first.
      className={buttonClassName({
        variant,
        size,
        className: cn(iconPos === "right" && "flex-row-reverse", className),
      })}
      pt={{ icon: { className: "leading-none" } }}
      {...props}
    />
  );
}
