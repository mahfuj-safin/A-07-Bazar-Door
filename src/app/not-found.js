import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <span className="text-6xl">🛒</span>
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900">৪০৪</h1>
      <h2 className="mt-2 text-xl font-bold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি সরিয়ে ফেলা হয়েছে অথবা এর ঠিকানা পরিবর্তন করা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}