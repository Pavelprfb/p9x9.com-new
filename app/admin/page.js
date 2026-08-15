// /admin - same as old adminController.adminLoginPage
import AdminLogin from "@/components/AdminLogin";

export const metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-body">
      <AdminLogin />
    </div>
  );
}
