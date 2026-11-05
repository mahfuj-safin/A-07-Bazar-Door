
"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { parsePriceToNumber, toBengaliNumber } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function CategoryClient({ products }) {
  const [sortBy, setSortBy] = useState("default");


  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "low-to-high") {
      return list.sort((a, b) => {
        const priceA = parsePriceToNumber(a.price ?? a.todayPrice ?? a.averagePrice);
        const priceB = parsePriceToNumber(b.price ?? b.todayPrice ?? b.averagePrice);
        return priceA - priceB;
      });
    }
    if (sortBy === "high-to-low") {
      return list.sort((a, b) => {
        const priceA = parsePriceToNumber(a.price ?? a.todayPrice ?? a.averagePrice);
        const priceB = parsePriceToNumber(b.price ?? b.todayPrice ?? b.averagePrice);
        return priceB - priceA;
      });
    }
    return list;
  }, [products, sortBy]);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          মোট <span className="font-semibold text-gray-900">{toBengaliNumber(sortedProducts.length)}টি</span>
        </p>

        {/* Challenge C1: Sort Dropdown with Chevron Icon */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
            সাজান
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-800 shadow-xs focus:border-emerald-600 focus:outline-none"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, idx) => (
          <ProductCard key={product.id || product.slug || idx} product={product} />
        ))}
      </div>
    </div>
  );
}