
"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getSingleProduct } from "@/lib/api";
import { toBengaliNumber, parsePriceToNumber } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ProductDetailsPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);


  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("পণ্যের বিস্তারিত দাম দেখতে অনুগ্রহ করে আগে সাইন ইন করুন!");
      router.replace("/signin");
    }
  }, [isPending, session, router]);


  useEffect(() => {
    async function loadProduct() {
      if (!session?.user) return;
      setLoadingProduct(true);
      const data = await getSingleProduct(decodeURIComponent(slug));
      setProduct(data);
      setLoadingProduct(false);
    }
    if (session?.user) {
      loadProduct();
    }
  }, [slug, session]);

  if (isPending || loadingProduct) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
        <div className="h-40 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
        </div>
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (!session?.user) return null;


  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-gray-900">
          ৪০৪ - পণ্যটি খুঁজে পাওয়া যায়নি!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          আপনি যে পণ্যের বিস্তারিত তথ্য খুঁজছেন তা আমাদের তালিকায় নেই।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const name = product.name || product.title || "পণ্য";
  const emoji = product.emoji || product.icon || "🛒";
  const unit = product.unit || "প্রতি কেজি";
  const categoryName = product.categoryName || product.category || "নিত্যপণ্য";
  const price = parsePriceToNumber(
    product.price ?? product.todayPrice ?? product.averagePrice ?? 66
  );
  const minPrice = parsePriceToNumber(
    product.minPrice ?? product.minimumPrice ?? Math.round(price * 0.9)
  );
  const maxPrice = parsePriceToNumber(
    product.maxPrice ?? product.maximumPrice ?? Math.round(price * 1.1)
  );
  const avgPrice = parsePriceToNumber(product.averagePrice ?? price);
  const change = parsePriceToNumber(
    product.change ?? product.priceChange ?? product.changePercent ?? 0
  );


  const marketPrices =
    Array.isArray(product.markets) && product.markets.length > 0
      ? product.markets
      : Array.isArray(product.bazarPrices) && product.bazarPrices.length > 0
        ? product.bazarPrices
        : [
          { market: "মাঠ বাজার", division: "ময়মনসিংহ", min: minPrice, max: minPrice + 6, avg: minPrice + 3 },
          { market: "সদর বাজার", division: "রাজশাহী", min: minPrice + 1, max: minPrice + 7, avg: minPrice + 4 },
          { market: "বাজারহাট", division: "খুলনা", min: minPrice + 1, max: minPrice + 8, avg: minPrice + 4.5 },
          { market: "আমতলী বাজার", division: "চট্টগ্রাম", min: minPrice + 3, max: maxPrice - 2, avg: avgPrice },
          { market: "চৌরাস্তা বাজার", division: "সিলেট", min: minPrice + 4, max: maxPrice - 1, avg: avgPrice + 1 },
          { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: minPrice + 5, max: maxPrice, avg: avgPrice + 1.5 },
          { market: "কারওয়ান বাজার", division: "ঢাকা", min: minPrice + 6, max: maxPrice, avg: avgPrice + 2 },
        ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* ব্রেডক্রাম্ব (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700">
          হোম
        </Link>
        <span>/</span>
        <span className="text-gray-700">{categoryName}</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">{name}</span>
      </nav>

      {/* Top — Summary Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl border border-emerald-100">
            {emoji}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                {categoryName}
              </span>
              <span className="text-xs text-gray-500">{unit}</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-gray-900">
              {name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              {product.description ||
                product.subtitle ||
                `গতকালের তুলনায় আজ দাম পরিবর্তনের হার ${toBengaliNumber(Math.abs(change).toFixed(1))}%`}
            </p>
          </div>
        </div>

        <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto">
          <span className="text-xs text-gray-500">আজকের দাম</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {toBengaliNumber(price)}{" "}
            <span className="text-sm font-medium text-gray-600">
              টাকা/{unit.replace("প্রতি ", "")}
            </span>
          </div>
          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${change > 0
              ? "bg-emerald-50 text-emerald-700"
              : change < 0
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-600"
              }`}
          >
            {change > 0 ? "▲ " : change < 0 ? "▼ " : "— "}
            {toBengaliNumber(Math.abs(change).toFixed(1))}%
          </span>
        </div>
      </div>


      <div>
        <h2 className="mb-4 text-lg sm:text-xl font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <span className="text-xs font-medium text-gray-500">সর্বনিম্ন দাম</span>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">
              {toBengaliNumber(minPrice)} টাকা
            </p>
            <span className="mt-1 block text-xs text-gray-400">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <span className="text-xs font-medium text-gray-500">সর্বাধিক দাম</span>
            <p className="mt-1 text-2xl font-extrabold text-red-600">
              {toBengaliNumber(maxPrice)} টাকা
            </p>
            <span className="mt-1 block text-xs text-gray-400">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <span className="text-xs font-medium text-gray-500">গড় দাম</span>
            <p className="mt-1 text-2xl font-extrabold text-gray-900">
              {toBengaliNumber(avgPrice)} টাকা
            </p>
            <span className="mt-1 block text-xs text-gray-400">
              {unit}-এর হিসাবে
            </span>
          </div>
        </div>
      </div>


      <div>
        <h2 className="mb-4 text-lg sm:text-xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs sm:text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-5 py-3.5">বাজার</th>
                <th className="px-5 py-3.5">বিভাগ</th>
                <th className="px-5 py-3.5">সর্বনিম্ন</th>
                <th className="px-5 py-3.5">সর্বাধিক</th>
                <th className="px-5 py-3.5">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {marketPrices.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50/80">
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {row.market || row.bazar || row.name}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {row.division || row.location || "ঢাকা"}
                  </td>
                  <td className="px-5 py-3.5 text-emerald-700 font-medium">
                    {toBengaliNumber(row.min ?? row.minPrice ?? minPrice)} টাকা
                  </td>
                  <td className="px-5 py-3.5 text-red-600 font-medium">
                    {toBengaliNumber(row.max ?? row.maxPrice ?? maxPrice)} টাকা
                  </td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">
                    {toBengaliNumber(row.avg ?? row.averagePrice ?? avgPrice)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}