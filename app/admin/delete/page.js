// /admin/delete - same as old adminController.dataDelete (first 10 + infinite scroll + search)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Delete Posts"
};

export default async function AdminDeletePage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <AdminShell
      title="Delete Posts"
      subtitle="Browse posts and remove the ones you no longer need."
      wide
    >
      <Suspense fallback={<AdminListSkeleton />}>
        <AdminListLoader apiUrl="/api/admin/posts" type="delete" />
      </Suspense>
    </AdminShell>
  );
}