import "./globals.css";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
