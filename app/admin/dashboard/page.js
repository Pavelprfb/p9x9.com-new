// /admin/dashboard - same as old adminController.adminDashboardGet
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";
import { getTotalCount, getCategories } from "@/lib/data";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard"
};

const TILES = [
  { href: "/admin/add", label: "Add New Post", desc: "Publish a fresh video", icon: "fa-circle-plus", tone: "primary" },
  { href: "/admin/update", label: "Update Posts", desc: "Edit any existing post", icon: "fa-pen-to-square", tone: "blue" },
  { href: "/admin/delete", label: "Delete Posts", desc: "Remove old content", icon: "fa-trash-can", tone: "danger" },
  { href: "/api/data-to-bd-p9x9", label: "Data to Desi", desc: "Sync posts to desi.p9x9.com", icon: "fa-database", tone: "purple" },
  { href: "/admin/p9x9-to-links_p9x9", label: "P9X9 to Links", desc: "Push posts to links.p9x9.com", icon: "fa-share-nodes", tone: "teal" }
];

export default async function AdminDashboardPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  const [total, categories] = await Promise.all([getTotalCount(), getCategories()]);

  return (
    <AdminShell
      title={`Welcome back, ${admin.username} 👋`}
      subtitle="Manage everything on P9X9 from one place."
      actions={
        <a href="/admin/add" className="adm-btn adm-btn-primary">
          <i className="fas fa-plus"></i> New Post
        </a>
      }
    >
      <div className="adm-stats">
        <div className="adm-stat">
          <div className="adm-stat-icon tone-primary">
            <i className="fas fa-film"></i>
          </div>
          <div className="adm-stat-info">
            <b>{total}</b>
            <span>Total Videos</span>
          </div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat-icon tone-purple">
            <i className="fas fa-tags"></i>
          </div>
          <div className="adm-stat-info">
            <b>{categories.length}</b>
            <span>Categories</span>
          </div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat-icon tone-teal">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="adm-stat-info">
            <b>24/7</b>
            <span>Live Site</span>
          </div>
        </div>
      </div>

      <h2 className="adm-section-label">Quick actions</h2>
      <div className="adm-tiles">
        {TILES.map((tile) => (
          <a key={tile.href} href={tile.href} className="adm-tile">
            <span className={`adm-tile-icon tone-${tile.tone}`}>
              <i className={`fas ${tile.icon}`}></i>
            </span>
            <span className="adm-tile-body">
              <b>{tile.label}</b>
              <small>{tile.desc}</small>
            </span>
            <i className="fas fa-chevron-right adm-tile-arrow"></i>
          </a>
        ))}
      </div>
    </AdminShell>
  );
}