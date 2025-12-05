import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/pages/navBar";

export const metadata: Metadata = {
  title: "Evangadi Forum",
  description: "Ask, Answer & Share Knowledge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />

        <main >{children}</main>
      </body>
    </html>
  );
}
