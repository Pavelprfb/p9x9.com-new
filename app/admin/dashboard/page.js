// /admin/dashboard - same as old adminController.adminDashboardGet
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard"
};

export default async function AdminDashboardPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  return (
    <div className="admin-body">
      <div className="container">
        <div className="card">
          <h2>👋 Welcome, {admin.username}</h2>

          <ul>
            <li>
              <a href="/admin/dashboard">
                <i className="fas fa-chart-line"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/add">
                <i className="fas fa-plus-circle"></i> Add
              </a>
            </li>
            <li>
              <a href="/admin/update">
                <i className="fas fa-pen-to-square"></i> Update
              </a>
            </li>
            <li>
              <a href="/api/data-to-bd-p9x9">
                <i className="fas fa-database"></i> Data To BD Desi.P9X9
              </a>
            </li>
            <li>
              <a href="/admin/delete">
                <i className="fas fa-trash-alt"></i> Delete
              </a>
            </li>
            <li>
              <a href="/admin/p9x9-to-links_p9x9">
                <i className="fas fa-trash-alt"></i> P9X9 to Links.P9X9
              </a>
            </li>
            <li>
              <a href="/admin/logout" className="logout">
                <i className="fas fa-right-from-bracket"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}
