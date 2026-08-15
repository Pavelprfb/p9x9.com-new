import AdminListSkeleton from "@/components/AdminListSkeleton";

export default function AdminLoading() {
  return (
    <div className="admin-list-body">
      <div className="container">
        <div className="skeleton" style={{ width: 200, height: 24, margin: "0 auto 20px" }}></div>
        <AdminListSkeleton />
      </div>
    </div>
  );
}