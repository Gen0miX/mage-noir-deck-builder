import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  display: "swap",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les Arcanes du Mage",
  description: "Un site de deck building pour le jeu Mage Noir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${montserrat.variable} antialiased`}
      >
        <div className="flex flex-col h-svh">
          <NavBar></NavBar>
          <main className="flex-1 overflow-y-auto">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
