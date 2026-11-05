"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("তথ্য আপডেট করতে সাইন ইন করুন!");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) return null;
  if (!session?.user) return null;

  return <UpdateProfileForm key={session.user.id} initialName={session.user.name ?? ""} />;
}

function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleUpdateInformation = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন!");
      return;
    }

    setLoading(true);
    try {
      // BetterAuth ডকুমেন্টেশন অনুযায়ী updateUser মেথড কল করা হচ্ছে
      const { error } = await updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি!");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
          তথ্য আপডেট করুন
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার প্রোফাইলের নাম পরিবর্তন করে নিচের বাটনে ক্লিক করুন।
        </p>

        <form onSubmit={handleUpdateInformation} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              নাম (Name)
            </label>
            <input
              type="text"
              required
              placeholder="আপনার নতুন নাম লিখুন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "আপডেট হচ্ছে..." : "Update Information (আপডেট)"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/profile"
            className="text-sm font-medium text-gray-500 hover:text-emerald-700"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}