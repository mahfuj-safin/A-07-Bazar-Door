
// This component is used to display the product card for each item on the home page and category pages.

import Link from "next/link";
import { toBengaliNumber, parsePriceToNumber } from "@/lib/utils";

export default function ProductCard({ product }) {
  const idOrSlug = product.slug || product.id;
  const name = product.name || product.title || "পণ্য";
  const emoji = product.emoji || product.icon || "🛒";
  const unit = product.unit || "প্রতি কেজি";
  const price = product.price ?? product.todayPrice ?? product.averagePrice ?? 0;
  const change = parsePriceToNumber(product.change ?? product.priceChange ?? product.changePercent ?? 0);

  let badgeStyle = "bg-gray-100 text-gray-600";
  let prefix = "— ";

  if (change > 0) {
    badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200";
    prefix = "▲ ";
  } else if (change < 0) {
    badgeStyle = "bg-red-50 text-red-600 border border-red-200";
    prefix = "▼ ";
  }

  return (
    <Link
      href={`/product/${idOrSlug}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md"
    >

      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl">
          {emoji}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 text-base sm:text-lg">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">{unit}</p>
        </div>
      </div>


      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="block text-xs text-gray-500">আজকের দাম</span>
          <span className="text-lg sm:text-xl font-extrabold text-gray-900">
            {toBengaliNumber(price)} টাকা
          </span>
        </div>

        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyle}`}>
          {prefix}{toBengaliNumber(Math.abs(change).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
}