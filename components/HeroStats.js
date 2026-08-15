// Server component: hero stats (cached, streamed via Suspense)
import { getTotalCount, getCategories } from "@/lib/data";

export default async function HeroStats() {
  const [total, categories] = await Promise.all([
    getTotalCount(),
    getCategories()
  ]);

  return (
    <div className="hero-stats">
      <span>
        <b>{total}</b> Videos
      </span>
      <span>
        <b>{categories.length}</b> Categories
      </span>
      <span>
        <b>24/7</b> Free
      </span>
    </div>
  );
}