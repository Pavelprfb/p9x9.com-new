// /admin/add - same as old adminController.addPage
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminAddForm from "@/components/AdminAddForm";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Add New Post"
};

export default async function AdminAddPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <AdminShell
      title="Add New Post"
      subtitle="Fill in the details below to publish a new video."
      wide
    >
      <div className="adm-narrow">
        <AdminAddForm />
      </div>
    </AdminShell>
  );
}