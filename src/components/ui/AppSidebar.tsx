"use client";
import { Sidebar, type SidebarProps } from "primereact/sidebar";
import { cn } from "@/lib/class-names";

type AppSidebarProps = Omit<SidebarProps, "unstyled" | "pt" | "position"> & {
  position?: "left" | "right";
};

/** PrimeReact Sidebar (focus trap, Escape, mask) as a brand drawer. */
export default function AppSidebar({
  position = "right",
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar
      unstyled
      position={position}
      pt={{
        mask: {
          className: cn(
            "fixed inset-0 flex bg-night/60 backdrop-blur-sm",
            position === "right" ? "justify-end" : "justify-start",
          ),
        },
        root: {
          className:
            "flex h-full w-[min(320px,85vw)] flex-col bg-paper text-ink shadow-2xl",
        },
        header: {
          className:
            "text-label flex items-center justify-between px-6 pt-6 pb-2 text-bronze",
        },
        closeButton: {
          className:
            "inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-gold",
        },
        closeButtonIcon: { className: "size-4" },
        content: { className: "flex-1 overflow-y-auto px-6 py-4" },
      }}
      {...props}
    />
  );
}
