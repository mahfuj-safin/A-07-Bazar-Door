// src/lib/api.js
export const dynamic = 'force-dynamic';

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const rawList = data.data || data.products || data;

    return Array.isArray(rawList)
      ? rawList.map((item) => ({
        ...item,
        name: item.nameBn || item.name || "পণ্য",
        price: item.today || item.price || 0,
        unit: item.unit === "kg" ? "প্রতি কেজি" : item.unit === "litre" ? "প্রতি লিটার" : `প্রতি ${item.unit || "কেজি"}`,
        emoji: item.image || item.emoji || "🛒",
        change: item.change?.pct || 0,
        changeDir: item.change?.dir || "flat",
      }))
      : [];
  } catch (error) {
    return []; // বিল্ডের সময় ক্র্যাশ এড়াতে খালি অ্যারে রিটার্ন করবে
  }
}

export async function getProductsByCategory(categorySlug) {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${categorySlug}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const rawList = data.data || data.products || data;

    return Array.isArray(rawList)
      ? rawList.map((item) => ({
        ...item,
        name: item.nameBn || item.name || "পণ্য",
        price: item.today || item.price || 0,
        unit: item.unit === "kg" ? "প্রতি কেজি" : item.unit === "litre" ? "প্রতি লিটার" : `প্রতি ${item.unit || "কেজি"}`,
        emoji: item.image || item.emoji || "🛒",
        change: item.change?.pct || 0,
        changeDir: item.change?.dir || "flat",
      }))
      : [];
  } catch (error) {
    return [];
  }
}

export async function getSingleProduct(slugOrId) {
  try {
    const allProducts = await getAllProducts();
    const found = allProducts.find(
      (item) =>
        String(item.id) === String(slugOrId) ||
        String(item.slug) === String(slugOrId) ||
        String(item.nameBn) === decodeURIComponent(slugOrId)
    );

    if (found) return found;

    const res = await fetch(`${BASE_URL}/products/${slugOrId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.data || data.product || data;
    if (!item) return null;

    return {
      ...item,
      name: item.nameBn || item.name || "পণ্য",
      price: item.today || item.price || 0,
      unit: item.unit === "kg" ? "প্রতি কেজি" : item.unit === "litre" ? "প্রতি লিটার" : `প্রতি ${item.unit || "কেজি"}`,
      emoji: item.image || item.emoji || "🛒",
      change: item.change?.pct || 0,
      changeDir: item.change?.dir || "flat",
      categoryName: item.categoryNameBn || item.category || "নিত্যপণ্য",
    };
  } catch (error) {
    return null;
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    const rawList = data.data || data.categories || data;

    return Array.isArray(rawList)
      ? rawList.map((cat) => ({
        ...cat,
        name: cat.nameBn || cat.name || "ক্যাটাগরি",
        slug: cat.slug || cat.id,
        icon: cat.icon || "📦",
      }))
      : [];
  } catch (error) {
    return [];
  }
}