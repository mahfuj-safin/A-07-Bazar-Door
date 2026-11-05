// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getAllCategories, getAllProducts } from "@/lib/api";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক আজকের দাম",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Toaster position="top-right" />
        <Navbar categories={categories} />
        <PriceTicker products={products} />


        <main className="flex-1">{children}</main>

        {/* ফুটার */}
        <Footer />
      </body>
    </html>
  );
}