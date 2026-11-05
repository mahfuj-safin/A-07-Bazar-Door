import Link from "next/link";
import { getAllCategories, getProductsByCategory } from "@/lib/api";
import CategoryClient from "@/components/CategoryClient";
import { toBengaliNumber } from "@/lib/utils";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const [categories, products] = await Promise.all([
    getAllCategories(),
    getProductsByCategory(decodedSlug),
  ]);


  const currentCategory = categories.find(
    (c) =>
      c.slug === decodedSlug ||
      String(c.id) === decodedSlug ||
      c.name === decodedSlug
  );


  if (!currentCategory && (!products || products.length === 0)) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
          🔍
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          ৪০৪ - কোনো পণ্য পাওয়া যায়নি!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          আপনি যে ক্যাটাগরি খুঁজছেন তা খুঁজে পাওয়া যায়নি অথবা এই বিভাগে বর্তমানে কোনো পণ্য নেই।
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

  const title = currentCategory?.name || decodedSlug;
  const icon = currentCategory?.icon || currentCategory?.emoji || "📦";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* ক্যাটাগরি হেডার */}
      <div className="mb-8 flex items-center gap-3.5 border-b border-gray-200 pb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl border border-emerald-100">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {title}
          </h1>
          <p className="text-sm text-gray-600">
            {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>


      <CategoryClient products={products} />
    </div>
  );
}