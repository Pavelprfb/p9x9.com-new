// /about - new page (SEO, new design, rich content)
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: `About Us - ${siteConfig.siteName}`,
  description: `About ${siteConfig.siteName} - a free adult video platform from around the world. HD quality, daily updates, thousands of categories, fast streaming and no sign-up required.`,
  alternates: { canonical: "/about" },
  robots: "index, follow",
  keywords: siteConfig.keywords,
  icons: { icon: siteConfig.img },
  openGraph: {
    type: "website",
    title: `About Us - ${siteConfig.siteName}`,
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.img }],
    description: `About ${siteConfig.siteName} - a free adult video platform from around the world. HD quality, daily updates, thousands of categories, fast streaming and no sign-up required.`
  }
};

export default function AboutPage() {
  const S = siteConfig;

  return (
    <>
      <Header />
      <div className="terms-container">
        <div className="terms-card">
          <h1>About {S.siteName}</h1>

          <p>
            <strong>{S.siteName}</strong> is a free adult video platform
            offering one of the largest and fastest-growing collections of
            explicit entertainment on the internet. Visitors from every corner
            of the world come to {S.siteName} to watch fresh HD videos across
            hundreds of categories — with no account, no subscription and no
            hidden fees. Just open the site, click, and watch.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to give every adult user a fast, free, and
            private place to enjoy high-quality adult entertainment. We
            believe adult content should be accessible, well-organized, and
            easy to browse — so we built a platform that loads quickly on any
            device, updates every single day, and lets you find exactly what
            you want in seconds.
          </p>

          <h2>Who We Are</h2>
          <p>
            {S.siteName} is operated by the P9x9 Team, a small group of
            developers and content curators who work around the clock to keep
            the site running smoothly. We source, verify, and organize
            hand-picked videos from around the world so you never have to dig
            through messy, broken pages elsewhere. Our library is growing
            daily with thousands of videos covering every taste and preference.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>Free streaming in HD quality — no account or sign-up required</li>
            <li>Daily updates with dozens of fresh videos every single day</li>
            <li>Hundreds of categories: Desi, Amateur, MILF, Asian, Hardcore, Viral and many more</li>
            <li>Fast, responsive design that works beautifully on mobile and desktop</li>
            <li>Powerful search by title, category and tags</li>
            <li>Related videos, recommended content and infinite scroll browsing</li>
            <li>Safe, malware-free environment with strict content moderation</li>
          </ul>

          <h2>Why Choose {S.siteName}?</h2>
          <ul>
            <li>
              <strong>Speed:</strong> Our pages are optimized for instant
              loading — no waiting, no buffering, no frustrating delays.
            </li>
            <li>
              <strong>Variety:</strong> From desi videos to international
              studio productions, there is something for everyone.
            </li>
            <li>
              <strong>Freshness:</strong> New videos are added every single
              day, so there is always something new to discover.
            </li>
            <li>
              <strong>Privacy:</strong> You can browse and watch without
              creating an account. We never ask for personal information.
            </li>
            <li>
              <strong>Reliability:</strong> Broken links are fixed quickly,
              and our team continuously monitors the platform.
            </li>
          </ul>

          <h2>Content Categories</h2>
          <p>
            Our collection covers a massive range of categories including but
            not limited to: Desi videos, Bangladeshi and Indian clips,
            amateur content, MILF and mature videos, Asian beauties, European
            productions, hardcore scenes, viral clips, romantic videos, and
            everything in between. Whatever your taste, our search and
            category pages make it easy to find your next favorite video.
          </p>

          <h2>Quality &amp; Technology</h2>
          <p>
            We put a strong focus on performance. Every page is built with a
            modern, lightweight design that loads fast even on slow
            connections. Videos stream smoothly in HD, images are optimized
            for quick loading, and the entire site is fully responsive — it
            looks and works great on phones, tablets, laptops, and desktops.
            Lazy loading and smart caching mean you spend less time waiting
            and more time watching.
          </p>

          <h2>Our Standards &amp; Content Policy</h2>
          <p>
            {S.siteName} is committed to safe and legal adult entertainment.
            We strictly prohibit:
          </p>
          <ul>
            <li>Any content involving minors — zero tolerance policy</li>
            <li>Non-consensual, forced or exploitative material</li>
            <li>Violent, illegal or bestiality content</li>
            <li>Copyrighted material posted without authorization</li>
          </ul>
          <p>
            Every video that appears on our platform is carefully reviewed.
            We cooperate fully with law enforcement and take immediate action
            on any reported content that violates these rules.
          </p>

          <h2>18+ Age Warning</h2>
          <p>
            This website contains explicit adult material. It is intended
            solely for adults aged 18 or older (21 in some jurisdictions). By
            continuing to use this website you confirm that you are of legal
            age, that you agree to view adult content, and that adult
            entertainment is legal in your country or region. If you are
            under 18, please leave this website immediately.
          </p>

          <h2>Copyright &amp; Content Removal</h2>
          <p>
            We respect the rights of content owners. If you believe your
            copyrighted material appears on our website without your
            permission, or if you want any video removed, contact us at{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a> with the video URL and
            we will process your request as quickly as possible — usually
            within 24 hours.
          </p>

          <h2>Frequently Asked Questions</h2>
          <ul>
            <li>
              <strong>Is {S.siteName} really free?</strong> Yes. 100% free —
              no subscriptions, no hidden charges, no premium paywalls.
            </li>
            <li>
              <strong>Do I need an account?</strong> No. You can browse, watch
              and enjoy everything without registering.
            </li>
            <li>
              <strong>Can I watch on my phone?</strong> Absolutely. The site
              is fully mobile-friendly.
            </li>
            <li>
              <strong>How often are videos added?</strong> New videos are
              added every single day.
            </li>
            <li>
              <strong>Is it safe?</strong> Yes — we keep the platform clean
              and free of malware, and moderate all content strictly.
            </li>
          </ul>

          <h2>Get In Touch</h2>
          <p>
            Questions, feedback or removal requests? Contact us at{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a> or visit our{" "}
            <a href="/contact">Contact page</a>. We read every message and
            usually reply within 24–48 hours.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}