import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const banglaDate = getBanglaDate();

  return (
    <section className="border-b border-emerald-100 bg-linear-to-br from-emerald-50 via-white to-amber-50/40 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-12">
        {/* বাম পাশের টেক্সট ও বাটন */}
        <div className="md:col-span-7 space-y-4 text-center md:text-left">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs sm:text-sm font-semibold text-emerald-800">
            📅 {banglaDate}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            {/* অ্যাঙ্কর লিংক যা একই পেজের #সব-পণ্য সেকশনে নিয়ে যাবে */}
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              সব পণ্য দেখুন ↓
            </a>
          </div>
        </div>


        <div className="md:col-span-5">
          <div className="mx-auto max-w-sm rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-md">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { emoji: "🍚", label: "চাল", price: "৬৬-১৪৮৳" },
                { emoji: "🫘", label: "ডাল", price: "১২০-১৪২৳" },
                { emoji: "🫙", label: "তেল", price: "১৬৮-২১৫৳" },
                { emoji: "🥔", label: "সবজি", price: "৩০-৮৫৳" },
                { emoji: "🐟", label: "মাছ", price: "২২৫-১৮৫০৳" },
                { emoji: "🥚", label: "ডিম-দুধ", price: "১৪৫-১৫৮৳" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50/60 p-3 border border-emerald-100"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="mt-1.5 text-xs font-bold text-gray-800">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-gray-500">
              সারা দেশের প্রধান বাজারগুলোর প্রতিদিনের হালনাগাদ দরপত্র
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}