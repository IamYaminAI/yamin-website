"use client";

// Replaces the root layout when it fails, so global CSS may be missing:
// styles are inline, using the brand colours.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b0e1f",
          color: "#f5efe0",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <main style={{ padding: "4rem 1.5rem", maxWidth: 520 }}>
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 1rem" }}>
            Yamin is having a moment.
          </h1>
          <p style={{ margin: "0 0 2rem", lineHeight: 1.6, opacity: 0.8 }}>
            Something went wrong while loading the site. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 48,
              padding: "0 24px",
              border: 0,
              borderRadius: 999,
              background: "#c9a86a",
              color: "#12162c",
              font: "inherit",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
