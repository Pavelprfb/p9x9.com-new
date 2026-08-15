// /contact - new page (SEO, new design, rich content)
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: `Contact Us - ${siteConfig.siteName}`,
  description: `Contact ${siteConfig.siteName} - support, feedback, copyright/DMCA removal requests, advertising and partnership enquiries. We reply within 24-48 hours.`,
  alternates: { canonical: "/contact" },
  robots: "index, follow",
  keywords: siteConfig.keywords,
  icons: { icon: siteConfig.img },
  openGraph: {
    type: "website",
    title: `Contact Us - ${siteConfig.siteName}`,
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.img }],
    description: `Contact ${siteConfig.siteName} - support, feedback, copyright/DMCA removal requests, advertising and partnership enquiries.`
  }
};

export default function ContactPage() {
  const S = siteConfig;

  return (
    <>
      <Header />
      <div className="terms-container">
        <div className="terms-card">
          <h1>Contact Us</h1>

          <p>
            Have a question, feedback, a broken-link report, or a content
            removal request? We read every single message. Reach us through
            any of the options below and our team will get back to you as
            soon as possible — usually within 24 to 48 hours.
          </p>

          <h2>Email</h2>
          <p>
            The fastest and most reliable way to reach us is by email:{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a>
          </p>

          <h2>Why Contact Us</h2>
          <ul>
            <li>Content removal or DMCA/copyright requests</li>
            <li>Reporting broken video links or playback issues</li>
            <li>Reporting suspicious, illegal or inappropriate content</li>
            <li>General feedback and feature suggestions</li>
            <li>Partnership, advertising and business enquiries</li>
            <li>Technical support and website issues</li>
          </ul>

          <h2>Copyright / DMCA Removal Requests</h2>
          <p>
            We take copyright matters very seriously. If you are a content
            owner and believe your work appears on {S.siteName} without
            authorization, please send us a removal request containing:
          </p>
          <ul>
            <li>The exact URL(s) of the video(s) on our website</li>
            <li>A short description of the copyrighted work</li>
            <li>Proof of ownership or authorization to act on behalf of the owner</li>
            <li>Your contact information (name and email)</li>
          </ul>
          <p>
            Send your request to{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a>. Valid requests are
            processed as quickly as possible, usually within 24 hours. Please
            note that incomplete requests may take longer to process.
          </p>

          <h2>Report a Broken Video</h2>
          <p>
            If a video is not loading, playing slowly, or showing an error,
            help us fix it faster by including:
          </p>
          <ul>
            <li>The page URL of the video</li>
            <li>The device and browser you are using</li>
            <li>A short description of the problem (error message, buffering, etc.)</li>
          </ul>

          <h2>Report Inappropriate Content</h2>
          <p>
            {S.siteName} has zero tolerance for content involving minors,
            non-consensual acts, violence, or anything illegal. If you come
            across such material anywhere on our platform, please report it
            immediately with the video URL. We investigate every report and
            act on it right away.
          </p>

          <h2>Advertising &amp; Partnerships</h2>
          <p>
            Interested in advertising, sponsorships, or other business
            opportunities? Email us at{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a> with a short
            description of your proposal and we will get back to you. We look
            forward to exploring ways to work together.
          </p>

          <h2>Other Ways To Reach Us</h2>
          <ul>
            <li>
              Telegram:{" "}
              <a href={S.telegramLink} target="_blank" rel="noopener noreferrer">
                Join our channel
              </a>{" "}
              for updates and announcements
            </li>
            <li>
              Website:{" "}
              <a href={`https://${S.siteDomain.replace("https://", "")}`}>
                {S.siteDomain.replace("https://", "")}
              </a>
            </li>
          </ul>

          <h2>What To Include In Your Message</h2>
          <p>
            To help us respond faster, please include as much detail as
            possible: exact page URL, what you expected to happen, and what
            actually happened. Clear, complete messages allow us to resolve
            issues in a single reply.
          </p>

          <h2>Response Time</h2>
          <p>
            We usually reply within 24–48 hours. Removal requests are handled
            with priority. During busy periods responses may take slightly
            longer — please avoid sending duplicate messages, as that can
            delay our reply.
          </p>

          <h2>Before You Contact Us</h2>
          <ul>
            <li>
              <strong>Broken video?</strong> Try refreshing the page first,
              or try a different browser.
            </li>
            <li>
              <strong>Looking for a video?</strong> Use our search box at the
              top of the page.
            </li>
            <li>
              <strong>Forgot how to browse?</strong> All categories are
              available on the homepage.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}