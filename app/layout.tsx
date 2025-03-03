import { Poppins } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import Sidebar from "@/components/HomeView/Sidebar";
import Navbar from "@/components/HomeView/Navbar";
import Footer from "@/components/HomeView/Footer";
import LoadingTransition from "@/components/HomeView/Loading_Transition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gudang-Seni",
  description: "Gudang-Seni",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased flex flex-col min-h-screen">
        <LoadingTransition>
          <Navbar />
          <Sidebar />
          <div className="flex flex-1 w-full">
            <main className="w-full">{children}</main>
          </div>
          <Footer />
        </LoadingTransition>
      </body>
    </html>
  );
}