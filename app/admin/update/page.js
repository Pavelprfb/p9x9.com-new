// /admin/update - same as old adminController.listPage (first 10 + infinite scroll + search)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Posts"
};

export default async function AdminUpdateListPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <div className="admin-list-body">
      <div className="container">
        <h2>📄 All Posts</h2>

        <Suspense fallback={<AdminListSkeleton />}>
          <AdminListLoader apiUrl="/api/admin/posts" type="update" />
        </Suspense>

        <a href="/admin/add" className="add-btn">
          <i className="fas fa-plus"></i> Add New
        </a>
      </div>
    </div>
  );
}