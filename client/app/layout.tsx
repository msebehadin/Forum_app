import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/pages/navBar";
import Footer from "@/components/pages/footer";

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
        <Footer/>
      </body>
    </html>
  );
}
