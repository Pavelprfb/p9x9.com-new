// /admin/delete - same as old adminController.dataDelete (first 10 + infinite scroll + search)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Delete Posts"
};

export default async function AdminDeletePage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <div className="admin-delete-body">
      <h1>All Posts - Delete Panel</h1>

      <Suspense fallback={<AdminListSkeleton />}>
        <AdminListLoader apiUrl="/api/admin/posts" type="delete" />
      </Suspense>
    </div>
  );
}