export async function fetchSharedFeed() {
  // Phase 1: default OFF (empty URL => no shared feed)
  const url = localStorage.getItem("marketplace_feed_url") || "";
  if (!url) return [];
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    return [];
  } catch (_err) {
    return [];
  }
}

export async function publishToWebhook(item) {
  // Phase 1: no webhook publishing by default
  const hook = localStorage.getItem("marketplace_webhook_url") || "";
  if (!hook) return { ok: false, reason: "no-webhook" };
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item),
    });
    return { ok: res.ok, status: res.status };
  } catch (_err) {
    return { ok: false, reason: "network-error" };
  }
}

export async function getMarketplaceFeed() {
  const local = JSON.parse(localStorage.getItem("listings") || "[]");
  const shared = await fetchSharedFeed();
  const merged = [...local, ...shared].sort(
    (a, b) => (b?.createdAt || 0) - (a?.createdAt || 0)
  );
  return merged;
}

// Phase 1: seed local sample listings for demo
export function seedLocalSamples() {
  const now = Date.now();
  const samples = [
    {
      id: crypto.randomUUID(),
      title: "Farm fresh eggs (dozen)",
      category: "Produce",
      price: 6,
      tradePrice: 7,
      desc: "Free-range eggs. Weekly pickup.",
      imageName: "eggs.jpg",
      city: "Athens",
      createdAt: now - 3600e3,
      published: true,
      source: "local",
    },
    {
      id: crypto.randomUUID(),
      title: "Tractor brush hogging (1 acre)",
      category: "Services",
      price: 120,
      tradePrice: 130,
      desc: "Field mowing. 15-mile radius.",
      imageName: "hogging.jpg",
      city: "Macon",
      createdAt: now - 7200e3,
      published: true,
      source: "local",
    },
    {
      id: crypto.randomUUID(),
      title: "Surplus tomatoes (20 lb)",
      category: "Produce",
      price: 18,
      tradePrice: 20,
      desc: "Heirloom mix. Today only.",
      imageName: "tomatoes.jpg",
      city: "Savannah",
      createdAt: now - 10800e3,
      published: true,
      source: "local",
    },
  ];
  const current = JSON.parse(localStorage.getItem("listings") || "[]");
  const merged = [...samples, ...current];
  localStorage.setItem("listings", JSON.stringify(merged));
  return samples.length;
}