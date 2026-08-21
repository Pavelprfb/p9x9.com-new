export default function AdminListSkeleton() {
  return (
    <div className="adm-cards">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="adm-post-card" key={i}>
          <div className="skeleton adm-skel-thumb"></div>
          <div className="adm-post-card-body">
            <div className="skeleton" style={{ width: "70%", height: 14, marginBottom: 10 }}></div>
            <div className="skeleton" style={{ width: "45%", height: 11 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}