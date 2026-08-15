import GridSkeleton from "@/components/GridSkeleton";

export default function Loading() {
  return (
    <main>
      <div className="hero">
        <div className="skeleton" style={{ width: 340, maxWidth: "80%", height: 30, margin: "0 auto 14px" }}></div>
        <div className="skeleton" style={{ width: 480, maxWidth: "85%", height: 14, margin: "0 auto 18px" }}></div>
        <div className="hero-stats">
          <span><b className="skeleton" style={{ display: "inline-block", width: 30, height: 16 }}></b> Videos</span>
          <span><b className="skeleton" style={{ display: "inline-block", width: 30, height: 16 }}></b> Categories</span>
          <span><b>24/7</b> Free</span>
        </div>
      </div>
      <div className="indexContainer">
        <GridSkeleton />
      </div>
    </main>
  );
}