export default function Loading() {
  return (
    <div
      role="status"
      className="text-label flex min-h-[60svh] items-center justify-center gap-3 pt-24 text-bronze"
    >
      <span
        aria-hidden="true"
        className="size-2 animate-blink rounded-full bg-gold motion-reduce:animate-none"
      />
      Loading page…
    </div>
  );
}
