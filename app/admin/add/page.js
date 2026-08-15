// /admin/add - same as old adminController.addPage
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import AdminAddForm from "@/components/AdminAddForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Add New Post"
};

export default async function AdminAddPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <div className="admin-add-body">
      <AdminAddForm />
    </div>
  );
}
