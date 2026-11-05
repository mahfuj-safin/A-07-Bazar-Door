// src/lib/api.js
// This file is used to fetch product and category data from three different base URLs safely.

const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchWithFallback(endpoint) {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (response.ok) {
        const json = await response.json();

        return json?.data || json?.products || json?.categories || json;
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${baseUrl}${endpoint}, trying next...`);
    }
  }
  return null;
}

//Function to fetch all products (/products)
export async function getAllProducts() {
  const data = await fetchWithFallback("/products");
  return Array.isArray(data) ? data : [];
}

//
export async function getProductsByCategory(categorySlug) {
  const data = await fetchWithFallback(`/products?category=${encodeURIComponent(categorySlug)}`);
  if (Array.isArray(data) && data.length > 0) return data;


  const allProducts = await getAllProducts();
  return allProducts.filter(
    (item) =>
      item.category === categorySlug ||
      item.categorySlug === categorySlug ||
      item.category_slug === categorySlug
  );
}

//Function to fetch details of a single product (/products/1 or /products/[slug])
export async function getSingleProduct(slugOrId) {
  const data = await fetchWithFallback(`/products/${encodeURIComponent(slugOrId)}`);
  if (data && !Array.isArray(data) && (data.id || data.name || data.title)) {
    return data;
  }


  const allProducts = await getAllProducts();
  return (
    allProducts.find(
      (item) =>
        String(item.id) === String(slugOrId) ||
        item.slug === slugOrId ||
        item.name === decodeURIComponent(slugOrId)
    ) || null
  );
}

//Function to retrieve all categories (/categories)
export async function getAllCategories() {
  const data = await fetchWithFallback("/categories");
  if (Array.isArray(data) && data.length > 0) return data;

  return [
    { id: 1, name: "চাল", slug: "chal", icon: "🍚" },
    { id: 2, name: "ডাল", slug: "dal", icon: "🫘" },
    { id: 3, name: "তেল", slug: "tel", icon: "🫙" },
    { id: 4, name: "সবজি", slug: "sobji", icon: "🥔" },
    { id: 5, name: "মাছ", slug: "mach", icon: "🐟" },
    { id: 6, name: "মাংস", slug: "mangsho", icon: "🍗" },
    { id: 7, name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥚" },
    { id: 8, name: "মসলা", slug: "mosla", icon: "🌶️" },
  ];
}