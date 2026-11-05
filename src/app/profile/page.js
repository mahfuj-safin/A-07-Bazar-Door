"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন!");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e) => {
    e.preventEvent();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    if (!name) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }
    setUpdating(true);
    try {
      const { error } = await updateUser({ name });
      if (error) {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      }
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে!");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট সম্পন্ন হয়েছে!");
    router.push("/");
  };

  if (isPending || !session?.user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
        <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>


      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-2xl font-bold text-white">
            {session.user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {session.user.name}
            </h2>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Challenge C3: বাটন যা ইউজারকে আলাদা আপডেট রাউটে নিয়ে যাবে */}
          <Link
            href="/profile/update"
            className="rounded-xl border border-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            ✎ তথ্য আপডেট পেজ
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
          >
            ← সাইন আউট
          </button>
        </div>
      </div>

      {/* তথ্য আপডেট ফর্ম (Figma: Profile.pdf ডিজাইন অনুযায়ী) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <h3 className="mb-4 text-base font-bold text-gray-900">তথ্য</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 cursor-pointer"
          >
            {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}