import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { parsePriceToNumber } from "@/lib/utils";

export default async function HomePage() {
  const products = await getAllProducts();


  const productsWithChange = products.map((item) => ({
    ...item,
    numericChange: parsePriceToNumber(
      item.change ?? item.priceChange ?? item.changePercent ?? 0
    ),
  }));


  const topRisers = [...productsWithChange]
    .filter((p) => p.numericChange > 0)
    .sort((a, b) => b.numericChange - a.numericChange)
    .slice(0, 6);


  const topFallers = [...productsWithChange]
    .filter((p) => p.numericChange < 0)
    .sort((a, b) => a.numericChange - b.numericChange)
    .slice(0, 6);

  return (
    <div>

      <Hero />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">

        <section>
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 text-sm font-bold">
              ▲
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              আজ দাম বেড়েছে ▲
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {(topRisers.length > 0 ? topRisers : products.slice(0, 6)).map(
              (product, idx) => (
                <ProductCard
                  key={product.id || product.slug || idx}
                  product={product}
                />
              )
            )}
          </div>
        </section>


        <section>
          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-sm font-bold">
              ▼
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              আজ দাম কমেছে ▼
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {(topFallers.length > 0 ? topFallers : products.slice(6, 12)).map(
              (product, idx) => (
                <ProductCard
                  key={product.id || product.slug || idx}
                  product={product}
                />
              )
            )}
          </div>
        </section>


        <section id="সব-পণ্য" className="scroll-mt-28">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              সব পণ্য
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর ও পরিবর্তনের তালিকা
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id || product.slug || idx}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}