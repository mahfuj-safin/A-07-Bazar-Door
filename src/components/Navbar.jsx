// src/components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { ChevronDown, User, LogOut } from "lucide-react";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const banglaDate = getBanglaDate();

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex flex-col">
            <span className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-emerald-800">
              <span>🛒</span> বাজার দর
            </span>
            <span className="text-xs text-gray-500 mt-0.5">{banglaDate}</span>
          </Link>

          <div className="relative">
            {isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200" />
            ) : session?.user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-xs text-white">
                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                  <span className="max-w-[120px] truncate">{session.user.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg z-50">
                    <div className="border-b border-gray-100 pb-2.5 mb-2">
                      <p className="font-bold text-sm text-gray-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <User className="h-4 w-4" /> আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" /> সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto border-t border-gray-100 py-2.5 no-scrollbar">
          {categories.map((cat) => {
            const slug = cat.slug || cat.id;
            const isActive = pathname === `/category/${slug}`;
            return (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition ${isActive
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
              >
                <span>{cat.icon || cat.emoji || "📦"}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}