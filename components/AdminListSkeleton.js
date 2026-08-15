export default function AdminListSkeleton() {
  return (
    <div className="admin-cards">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="card" key={i}>
          <div className="skeleton" style={{ width: 90, height: 90, borderRadius: 10 }}></div>
          <div className="content" style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: "70%", height: 14, marginBottom: 10 }}></div>
            <div className="skeleton" style={{ width: "45%", height: 11 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}