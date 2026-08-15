// 404 page - same as old views/404.ejs
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdultWarning from "@/components/AdultWarning";

export default function NotFound() {
  return (
    <>
      <Header />

      <div className="section-d9374">
        <div className="card-d9374">
          <div className="icon-d9374">😵</div>
          <div className="title-d9374">404</div>
          <div className="subtitle-d9374">Oops! Page Not Found</div>
          <div className="desc-d9374">
            The page you are looking for could not be found. The link may be
            broken or the page may have been deleted.
          </div>
          <a href="/" className="btn-d9374">
            ← Back to Home
          </a>
        </div>
      </div>

      <Footer />
      <AdultWarning />
    </>
  );
}
