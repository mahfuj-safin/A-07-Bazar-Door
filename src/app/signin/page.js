"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন হ্যান্ডলার
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      toast.error("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        const message = error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়!";
        setErrorMsg(message);
        toast.error(message);
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google বা GitHub দিয়ে সোশ্যাল লগইন হ্যান্ডলার
  const handleSocialLogin = async (provider) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      toast.error(`${provider} দিয়ে লগইন করতে সমস্যা হয়েছে!`);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {/* হেডার অংশ */}
      <div className="mb-6 text-center">
        <p className="text-sm font-medium text-emerald-700">
          🛒 বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>


      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {errorMsg && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>


        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* সোশ্যাল লগইন বাটন */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span>G</span> Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <span>🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* সাইন আপ লিংক */}
        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-emerald-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-emerald-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}