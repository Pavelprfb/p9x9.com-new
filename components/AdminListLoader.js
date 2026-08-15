// Server component: first 10 posts only (infinite scroll loads the rest, cached)
import { getPostsPage } from "@/lib/data";
import AdminDataList from "./AdminDataList";

export default async function AdminListLoader({ apiUrl, type }) {
  const data = await getPostsPage({ page: 1, limit: 10 });

  return (
    <AdminDataList
      apiUrl={apiUrl}
      initialData={data.items}
      total={data.total}
      type={type}
    />
  );
}