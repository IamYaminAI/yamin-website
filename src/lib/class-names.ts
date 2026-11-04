/** Join truthy class names. Conditional classes only; no conflict resolution. */
export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
