// /admin/update/:id - same as old adminController.editPage (form posts to /api/admin/update/:id)
import { redirect, notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { getAdmin } from "@/lib/adminAuth";
import AdminShell from "@/components/AdminShell";
import AdminPostForm from "@/components/AdminPostForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Update Post"
};

export default async function AdminUpdatePostPage({ params }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  const { id } = await params;

  await connectDB();
  const doc = await Post.findById(id).lean();

  if (!doc) notFound();

  // plain object only (ObjectId / Date are not serializable across the RSC boundary)
  const post = {
    routeName: doc.routeName ?? "",
    title: doc.title ?? "",
    description: doc.description ?? "",
    imageLink: doc.imageLink ?? "",
    videoLink: doc.videoLink ?? "",
    totalView: doc.totalView ?? 0,
    duration: doc.duration ?? "",
    category: Array.isArray(doc.category) ? doc.category.map((c) => String(c)) : []
  };

  return (
    <AdminShell
      title="Update Post"
      subtitle={post.title || post.routeName || ""}
      wide
      actions={
        <a href={`/videos/${post.routeName}`} className="adm-btn adm-btn-ghost" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-eye"></i> View on site
        </a>
      }
    >
      <div className="adm-narrow">
        <AdminPostForm id={id} post={post} />
      </div>
    </AdminShell>
  );
}