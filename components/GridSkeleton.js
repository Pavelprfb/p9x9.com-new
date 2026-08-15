// Skeleton grid fallback for Suspense (professional loading state)
export default function GridSkeleton({ count = 12 }) {
  return (
    <div className="video-grid grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="video-card" key={i}>
          <div className="video-thumb">
            <div className="skeleton" style={{ width: "100%", height: "100%", borderRadius: 0 }}></div>
          </div>
          <div className="video-card-body">
            <div className="skeleton" style={{ width: "80%", height: 14, marginBottom: 8 }}></div>
            <div className="skeleton" style={{ width: "40%", height: 11 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}