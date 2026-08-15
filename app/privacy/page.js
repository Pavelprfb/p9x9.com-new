// /privacy - same content as old views/partials/privacy.ejs (expanded)
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: `Privacy Policy - ${siteConfig.siteName}`,
  description: `Privacy Policy of ${siteConfig.siteName}. Learn how we collect, use and protect your information - cookies, analytics, third-party services, your rights and more. 18+ Adult Website.`,
  alternates: { canonical: "/privacy" },
  robots: "index, follow",
  keywords: siteConfig.keywords,
  icons: { icon: siteConfig.img },
  openGraph: {
    type: "website",
    title: `Privacy Policy - ${siteConfig.siteName}`,
    url: `${siteConfig.url}/privacy`,
    images: [{ url: siteConfig.img }],
    description: `Privacy Policy of ${siteConfig.siteName}. Learn how we collect, use and protect your information. 18+ Adult Website.`
  }
};

export default function PrivacyPage() {
  const S = siteConfig;

  return (
    <>
      <Header />
      <div className="privacy-container">
        <div className="privacy-card">
          <h1>Privacy and Policy</h1>
          <p>
            <strong>Last Updated:</strong> {S.lastUpdated}
          </p>

          <p>
            This Privacy Policy explains how <strong>{S.siteName}</strong>{" "}
            ("Website", "we", "our", or "us") collects, uses, and protects
            your information when you access our adult content platform.
            Please read this policy carefully. By using the website, you agree
            to the practices described in this policy.
          </p>

          <h2>1. Age Restriction</h2>
          <p>
            This website is strictly intended for users aged 18 years or
            older. We do not knowingly collect personal data from minors. If
            you are under 18, please leave this website immediately. If you
            believe a minor has provided us with information, please contact
            us immediately and we will delete such information without delay.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect only the minimum information needed to operate our service:</p>
          <ul>
            <li>IP address and approximate location (country/region)</li>
            <li>Browser type, operating system, and device information</li>
            <li>Pages visited, videos watched, and usage activity</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Email address (only if you voluntarily contact us)</li>
          </ul>
          <p>
            We do <strong>not</strong> require registration, and we never ask
            for your name, phone number, or payment information.
          </p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To operate, maintain, and improve the website</li>
            <li>To personalize content recommendations</li>
            <li>To analyze traffic and understand how visitors use the site</li>
            <li>To prevent fraud, abuse, and illegal activity</li>
            <li>To respond to support and removal requests</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>
            We do not sell your personal information to anyone. We do not
            share your identity with advertisers — only anonymized, aggregate
            data may be used for analytics.
          </p>

          <h2>4. Cookies Policy</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, remember your preferences, analyze traffic, and keep
            the site secure.
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> required for the website to
              function correctly (for example, remembering your age
              confirmation and viewed videos).
            </li>
            <li>
              <strong>Analytics cookies:</strong> help us understand how the
              site is used so we can improve it.
            </li>
            <li>
              <strong>Advertising cookies:</strong> may be set by third-party
              advertising partners to deliver relevant ads on this and other
              websites.
            </li>
          </ul>
          <p>
            You can disable or delete cookies through your browser settings.
            Please note that blocking essential cookies may affect how the
            website works for you.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics providers,
            hosting services, video hosts, and advertising networks. These
            third parties may collect information in accordance with their own
            privacy policies, which we encourage you to review. We have no
            control over, and are not responsible for, the privacy practices
            of these external services.
          </p>

          <h2>6. Advertising</h2>
          <p>
            The website may display advertisements served by third-party ad
            networks. These networks may use cookies to serve ads based on
            your prior visits to this or other websites (behavioral
            advertising). You can opt out of personalized advertising through
            your browser settings or via industry opt-out tools such as
            www.aboutads.info or www.youronlinechoices.eu.
          </p>

          <h2>7. Data Protection &amp; Security</h2>
          <p>
            We implement reasonable technical and organizational security
            measures to protect your data from unauthorized access, loss,
            alteration, or disclosure. These include secure connections
            (HTTPS) and careful handling of server data. However, no method
            of transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain anonymous usage logs and cookies only as long as
            necessary for the purposes described in this policy, after which
            they are securely deleted or anonymized. If you contact us by
            email, we keep your message only as long as needed to resolve your
            request.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            This website is not directed to children under 18. We do not
            knowingly collect information from minors. If we become aware that
            a user is under 18, we will take steps to remove their information
            and block further access.
          </p>

          <h2>10. International Users</h2>
          <p>
            Our website is accessible worldwide. By using this platform, you
            consent to the processing and storage of your information as
            described in this policy, including any cross-border transfer
            necessary to operate the service. The website is operated from
            Bangladesh.
          </p>

          <h2>11. Your Rights</h2>
          <p>Depending on your jurisdiction (including GDPR and CCPA where applicable), you may have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data where applicable</li>
            <li>Withdraw consent where consent is the legal basis</li>
            <li>Opt out of cookies and personalized advertising</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${S.email}`}>{S.email}</a> and we will respond
            within a reasonable period.
          </p>

          <h2>12. Do Not Track</h2>
          <p>
            Some browsers offer a "Do Not Track" (DNT) setting. Because there
            is not yet an industry standard for honoring DNT signals, our
            website currently does not respond to DNT signals. You can,
            however, control cookies through your browser settings as
            described above.
          </p>

          <h2>13. External Links</h2>
          <p>
            Our website may contain links to external websites that are not
            operated by us. We are not responsible for the content or privacy
            practices of those websites. We encourage you to review the
            privacy policies of any website you visit.
          </p>

          <h2>14. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            When we make changes, we will update the "Last Updated" date at
            the top of this page. Continued use of the website after changes
            are posted constitutes acceptance of the updated policy. We
            encourage you to review this page periodically.
          </p>

          <h2>15. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or your personal data, please contact us:
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