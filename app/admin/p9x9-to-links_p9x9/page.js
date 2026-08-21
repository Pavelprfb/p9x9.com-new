// /admin/p9x9-to-links_p9x9 - same as old adminController.linksP9X9 (first 10 + infinite scroll + search)
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminListLoader from "@/components/AdminListLoader";
import AdminListSkeleton from "@/components/AdminListSkeleton";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "P9X9 to Links.P9X9"
};

export default async function AdminLinksP9X9Page() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <AdminShell
      title="P9X9 to Links.P9X9"
      subtitle="Review each post and publish it to links.p9x9.com."
      wide
    >
      <Suspense fallback={<AdminListSkeleton />}>
        <AdminListLoader apiUrl="/api/admin/posts" type="links" />
      </Suspense>
    </AdminShell>
  );
}