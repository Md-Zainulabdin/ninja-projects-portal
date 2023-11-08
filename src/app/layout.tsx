import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import ToastProvider from "@/providers/toast-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Innovate.dev",
  description: "Developed by ~ Zain-ul-Abdin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
