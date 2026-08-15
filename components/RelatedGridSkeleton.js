// Skeleton fallback for Related Videos (React Suspense)
export default function RelatedGridSkeleton({ count = 6 }) {
  return (
    <div className="related-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="video-card" key={i}>
          <div className="video-thumb">
            <div
              className="skeleton"
              style={{ width: "100%", height: "100%", borderRadius: 0 }}
            ></div>
          </div>
          <div className="video-card-body">
            <div
              className="skeleton"
              style={{ width: "80%", height: 12, marginBottom: 8 }}
            ></div>
            <div className="skeleton" style={{ width: "40%", height: 10 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}