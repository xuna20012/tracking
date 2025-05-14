import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oh Pieces Logistique - Suivi de colis",
  description: "Application de suivi de colis en temps réel pour Oh Pieces Logistique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full bg-white text-gray-900`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 overflow-auto bg-white" style={{ paddingTop: "49px" }}>
        {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
