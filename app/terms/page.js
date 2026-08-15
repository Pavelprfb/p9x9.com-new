// /terms - same content as old views/partials/terms.ejs (expanded)
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: `Terms and Conditions - ${siteConfig.siteName}`,
  description: `Official Terms and Conditions of ${siteConfig.siteName}. Read about age restrictions, user responsibilities, prohibited content, copyright policy and more. 18+ Adult Website.`,
  alternates: { canonical: "/terms" },
  robots: "index, follow",
  keywords: siteConfig.keywords,
  icons: { icon: siteConfig.img },
  openGraph: {
    type: "website",
    title: `Terms and Conditions - ${siteConfig.siteName}`,
    url: `${siteConfig.url}/terms`,
    images: [{ url: siteConfig.img }],
    description: `Official Terms and Conditions of ${siteConfig.siteName}. 18+ Adult Website.`
  }
};

export default function TermsPage() {
  const S = siteConfig;

  return (
    <>
      <Header />
      <div className="terms-container">
        <div className="terms-card">
          <h1>Terms and Conditions</h1>
          <p>
            <strong>Last Updated:</strong> {S.lastUpdated}
          </p>

          <p>
            Welcome to <strong>{S.siteName}</strong>. These Terms and
            Conditions govern your use of this website. By accessing,
            browsing, or using this platform, you acknowledge that you have
            read, understood, and agreed to be legally bound by these terms.
            If you do not agree with any part of these terms, you must
            immediately discontinue use of the website.
          </p>

          <h2>1. Age Restriction (18+ Only)</h2>
          <p>
            This website contains explicit adult material intended solely for
            individuals who are at least 18 years of age (or the age of
            majority in their jurisdiction, whichever is higher).
          </p>
          <ul>
            <li>You confirm that you are 18 years of age or older.</li>
            <li>
              You confirm that accessing adult material is legal in your
              country or region.
            </li>
            <li>You agree not to permit any minor to access this website.</li>
            <li>
              You understand that falsely declaring your age may violate
              applicable laws and that we may block your access at any time.
            </li>
          </ul>

          <h2>2. Acceptance of Adult Content</h2>
          <p>
            By entering this website, you acknowledge that you may be exposed
            to adult-oriented, sexually explicit material. You voluntarily
            choose to access such content and accept full responsibility for
            your decision. You agree that {S.siteName} shall not be
            responsible for any consequences resulting from your voluntary
            access to adult content.
          </p>

          <h2>3. User Responsibilities</h2>
          <ul>
            <li>You agree to use the website only for lawful purposes.</li>
            <li>
              You will not upload, share, or distribute illegal or prohibited
              content.
            </li>
            <li>
              You will not attempt to hack, disrupt, overload, damage, or
              interfere with the platform or its servers.
            </li>
            <li>
              You will not scrape, copy, reproduce, or redistribute website
              content without permission.
            </li>
            <li>
              You will not use automated tools or bots to access or collect
              data from the website.
            </li>
            <li>
              You will not misrepresent yourself or attempt to access areas of
              the website restricted to administrators.
            </li>
            <li>
              You are solely responsible for your actions while using the
              site.
            </li>
          </ul>

          <h2>4. Prohibited Content</h2>
          <p>The following content is strictly prohibited on this platform:</p>
          <ul>
            <li>Any content involving minors in any way.</li>
            <li>Non-consensual, forced, or exploitative material.</li>
            <li>Violent, degrading, or illegal sexual acts.</li>
            <li>
              Content that violates copyright or intellectual property rights.
            </li>
            <li>Content that promotes hate, abuse, discrimination, or harassment.</li>
            <li>Bestiality, incest, or any other content that violates the law.</li>
          </ul>
          <p>
            We actively moderate all content and cooperate fully with law
            enforcement agencies. Any user found attempting to introduce
            prohibited content will be permanently blocked.
          </p>

          <h2>5. Intellectual Property Rights</h2>
          <p>
            All trademarks, branding, logos, design elements, software, and
            original content displayed on <strong>{S.siteName}</strong> are
            protected by intellectual property laws. Unauthorized
            reproduction, redistribution, or commercial use is strictly
            prohibited. Nothing in these terms grants you any license or right
            to use our branding or content for any commercial purpose.
          </p>

          <h2>6. Third-Party Links and Services</h2>
          <p>
            Our website may contain links to third-party websites, video
            hosts, advertising partners, and external services. We are not
            responsible for the content, privacy practices, or policies of any
            external platform. Users access third-party sites entirely at
            their own risk, and these terms do not apply to those sites.
          </p>

          <h2>7. No Account Required</h2>
          <p>
            {S.siteName} does not require you to create an account to watch
            videos. All content is available free of charge. We never ask for
            personal information to access the platform. Be cautious of any
            third-party service that claims to be affiliated with us and asks
            for payment or personal details — those are not us.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            All content and services on this website are provided "as is" and
            "as available" without warranties of any kind, whether express or
            implied, including but not limited to implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not guarantee uninterrupted access,
            error-free performance, or the accuracy of content. Video links
            may be removed by third-party hosts without notice.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law,{" "}
            <strong>{S.siteName}</strong>, its owners, employees, and agents
            shall not be liable for any direct, indirect, incidental,
            consequential, or special damages arising from the use or
            inability to use this website, including loss of data, loss of
            profits, or damages caused by third-party content or links.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {S.siteName} and its
            owners, employees, and agents from any claims, losses, damages,
            liabilities, or expenses (including legal fees) arising out of
            your use of the website, your violation of these terms, or your
            violation of any rights of a third party.
          </p>

          <h2>11. Privacy</h2>
          <p>
            Your use of this website is also governed by our Privacy Policy.
            By using the site, you consent to the collection and use of
            information as described in our Privacy Policy. Please read it
            carefully before using the website.
          </p>

          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access to any user
            who violates these Terms and Conditions without prior notice.
            We may also restrict access to certain regions or IP addresses at
            any time for security or legal reasons. Upon termination, the
            terms that by their nature should survive termination shall
            remain in effect.
          </p>

          <h2>13. Compliance with Local Laws</h2>
          <p>
            {S.siteName} is a global platform, and you are solely responsible
            for complying with the laws of your own country or region.
            Accessing adult content may be restricted or illegal in some
            jurisdictions. By using this website, you confirm that viewing
            adult material is lawful where you live. This website is operated
            from Bangladesh.
          </p>

          <h2>14. Advertising</h2>
          <p>
            The website may display advertisements and promotional links from
            third parties. We are not responsible for the products, services,
            or content promoted by advertisers. Clicking on advertising links
            may redirect you to external websites governed by their own terms
            and privacy policies. Your interaction with any advertiser is
            solely between you and that third party.
          </p>

          <h2>15. Content Removal Requests</h2>
          <p>
            If you believe any content on {S.siteName} infringes your rights,
            you may request its removal by contacting us at{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a>. Please include the
            exact URL(s) and proof of ownership. We process valid requests
            promptly and in good faith.
          </p>

          <h2>16. Changes to Terms</h2>
          <p>
            We reserve the right to update, modify, or replace these Terms at
            any time. Changes take effect as soon as they are published on
            this page. Continued use of the website after changes are posted
            constitutes acceptance of those changes. We encourage you to
            review this page periodically.
          </p>

          <h2>17. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, illegal,
            or unenforceable, the remaining provisions shall continue in full
            force and effect. The invalid provision shall be replaced with a
            valid one that comes closest to the original intent.
          </p>

          <h2>18. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the
            entire agreement between you and {S.siteName} regarding your use
            of the website and supersede any prior agreements or
            understandings, whether written or oral.
          </p>

          <h2>19. No Waiver</h2>
          <p>
            Our failure to enforce any provision of these Terms does not
            constitute a waiver of that provision. Any waiver must be in
            writing and signed by an authorized representative of {S.siteName}.
          </p>

          <h2>20. Governing Law</h2>
          <p>
            These Terms shall be governed and interpreted in accordance with
            applicable laws. Users are responsible for ensuring that accessing
            adult content is legal within their own jurisdiction. In the event
            of any dispute, both parties agree to attempt to resolve it
            amicably before pursuing any legal action.
          </p>

          <h2>21. Contact Information</h2>
          <p>
            If you have any questions regarding these Terms and Conditions,
            please contact us:
          </p>
          <p>
            Website:{" "}
            <a href={`https://${S.siteDomain.replace("https://", "")}`}>
              {S.siteDomain.replace("https://", "")}
            </a>
            <br />
            Email: <a href={`mailto:${S.email}`}>{S.email}</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}