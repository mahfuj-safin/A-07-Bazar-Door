import { toBengaliNumber, parsePriceToNumber } from "@/lib/utils";

export default function PriceTicker({ products = [] }) {
  if (!products.length) return null;

  const tickerItems = [...products.slice(0, 12), ...products.slice(0, 12)];

  return (
    <div className="overflow-hidden border-b border-emerald-900/10 bg-emerald-950 py-2 text-white">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap text-xs sm:text-sm">
        {tickerItems.map((item, idx) => {
          const name = item.name || item.title;
          const emoji = item.emoji || item.icon || "🛒";
          const price = item.price ?? item.todayPrice ?? item.averagePrice ?? 0;
          const unitShort = (item.unit || "কেজি").replace("প্রতি ", "");
          const change = parsePriceToNumber(item.change ?? item.priceChange ?? item.changePercent ?? 0);

          const isUp = change > 0;
          const isDown = change < 0;

          return (
            <div key={idx} className="inline-flex items-center gap-2">
              <span>{emoji}</span>
              <span className="font-medium text-gray-100">{name}</span>
              <span className="font-bold text-amber-300">
                {toBengaliNumber(price)} টাকা/{unitShort}
              </span>
              <span
                className={`font-semibold ${isUp ? "text-emerald-400" : isDown ? "text-red-400" : "text-gray-400"
                  }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{toBengaliNumber(Math.abs(change).toFixed(1))}%
              </span>
              <span className="ml-4 text-emerald-700">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}