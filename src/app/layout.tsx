import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemePanel } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ninja Projects Portal",
  description: "Developed by ~ Zain-ul-Abdin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="light" accentColor="blue">
          {children}
        </Theme>
      </body>
    </html>
  );
}
