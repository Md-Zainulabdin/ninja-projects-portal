import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import ToastProvider from "@/providers/toast-provider";

import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";

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
        <head>
          <link rel="shortcut icon" href="/idea.png" type="image/x-icon" />
        </head>
        <body>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
