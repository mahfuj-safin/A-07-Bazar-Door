// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

// স্ট্যাটিক ক্যাটাগরি লিস্ট (যাতে বিল্ডের সময় কোনো API ফেচ করে প্রি-রেন্ডার ক্র্যাশ না করে)
const fallbackCategories = [
  { id: 1, name: "চাল", slug: "chal", icon: "🍚" },
  { id: 2, name: "ডাল", slug: "dal", icon: "🫘" },
  { id: 3, name: "তেল", slug: "tel", icon: "🫙" },
  { id: 4, name: "সবজি", slug: "sobji", icon: "🥔" },
  { id: 5, name: "মাছ", slug: "mach", icon: "🐟" },
  { id: 6, name: "মাংস", slug: "mangsho", icon: "🍗" },
  { id: 7, name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥚" },
  { id: 8, name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export const metadata = {
  title: "বাজার দর | প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক আজকের দাম",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Toaster position="top-right" />

        {/* ন্যাভবার ও প্রাইস টিকারে সেফ ফলব্যাক ক্যাটাগরি পাস করা হলো */}
        <Navbar categories={fallbackCategories} />
        <PriceTicker products={[]} />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}