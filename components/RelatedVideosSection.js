// Server component: first 10 related videos (SSR, cached) — the rest loads
// client-side via infinite scroll (React Suspense wraps this on the video page)
import { getPostsPage } from "@/lib/data";
import RelatedVideos from "./RelatedVideos";

export default async function RelatedVideosSection({ routeName }) {
  const data = await getPostsPage({ page: 1, limit: 10, exclude: routeName });

  return (
    <RelatedVideos
      currentRouteName={routeName}
      initialItems={data.items}
      total={data.total}
    />
  );
}