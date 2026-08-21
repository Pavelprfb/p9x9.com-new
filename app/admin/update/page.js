// /admin/update - same as old adminController.listPage (first 10 + infinite scroll + search)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Posts"
};

export default async function AdminUpdateListPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <AdminShell
      title="All Posts"
      subtitle="Search, scroll and pick a post to edit."
      wide
      actions={
        <a href="/admin/add" className="adm-btn adm-btn-primary">
          <i className="fas fa-plus"></i> Add New
        </a>
      }
    >
      <Suspense fallback={<AdminListSkeleton />}>
        <AdminListLoader apiUrl="/api/admin/posts" type="update" />
      </Suspense>
    </AdminShell>
  );
}