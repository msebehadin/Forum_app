import type { Metadata } from "next";
import { Instrument_Sans, Sora } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/pages/navBar";
import Footer from "@/components/pages/footer";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

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
      <body className={`${instrumentSans.variable} ${sora.variable}`}>
        <NavBar />
        <main className="main-shell">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
