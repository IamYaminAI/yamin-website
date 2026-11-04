"use client";
import { PrimeReactProvider } from "primereact/api";
import StoreProvider from "@/store/StoreProvider";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {/* Unstyled: every PrimeReact component is styled by its App* wrapper. */}
      <PrimeReactProvider value={{ unstyled: true, ripple: false }}>
        {children}
      </PrimeReactProvider>
    </StoreProvider>
  );
}
