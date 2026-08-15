// Server component: cached video data (unstable_cache) + Suspense streaming
import { getPostsPage, getHomeVideos, getCategories, getTotalCount } from "@/lib/data";
import HomeGrid from "./HomeGrid";

export default async function VideoSection({ query, category }) {
  let allData;

  if (query || category) {
    const res = await getPostsPage({
      page: 1,
      limit: 10,
      q: query || "",
      category: category || ""
    });
    allData = res.items;
  } else {
    allData = await getHomeVideos(10);
  }

  const [categories, total] = await Promise.all([
    getCategories(),
    getTotalCount()
  ]);

  return (
    <HomeGrid
      query={query || ""}
      firstCategory={categories[0] || ""}
      initialData={allData}
      total={total}
    />
  );
}