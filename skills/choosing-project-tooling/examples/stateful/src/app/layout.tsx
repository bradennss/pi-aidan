import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@/components/arc/foundation.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A persistent task tracker.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-accent="neutral">
      <body>{children}</body>
    </html>
  );
}
