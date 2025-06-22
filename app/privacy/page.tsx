import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | La Brioche',
  description: 'Privacy policy for La Brioche artisan French bakery.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-lg mx-auto">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">
          <strong>Effective Date:</strong>{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Personal Information</h3>
        <p>When you use our services, we may collect the following personal information:</p>
        <ul>
          <li>Name and contact information (email address, phone number)</li>
          <li>Account credentials (username, password)</li>
          <li>Order history and preferences</li>
          <li>Payment information (processed securely through third-party payment processors)</li>
          <li>Delivery or pickup addresses</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <p>We automatically collect certain information when you visit our website:</p>
        <ul>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, time spent, clickstream data)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Provide customer support</li>
          <li>Send order confirmations and updates</li>
          <li>Improve our products and services</li>
          <li>Send promotional communications (with your consent)</li>
          <li>Comply with legal obligations</li>
          <li>Prevent fraud and ensure security</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share
          your information with:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who help us operate our business
            (payment processors, delivery services)
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law or to protect our rights
          </li>
          <li>
            <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
            of assets
          </li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal information against unauthorized access, alteration, disclosure, or destruction.
          However, no method of transmission over the internet is 100% secure.
        </p>

        <h2>5. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to enhance your browsing experience. You can
          control cookie settings through your browser preferences. Essential cookies are necessary
          for website functionality and cannot be disabled.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access to your personal information</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your personal information</li>
          <li>Restriction of processing</li>
          <li>Data portability</li>
          <li>Objection to processing</li>
          <li>Withdrawal of consent</li>
        </ul>

        <h2>7. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes
          outlined in this privacy policy, comply with legal obligations, resolve disputes, and
          enforce our agreements.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of these external sites. We encourage you to read their privacy
          policies.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our services are not intended for children under 13 years of age. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any material
          changes by posting the new policy on this page and updating the effective date.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our data practices, please contact
          us:
        </p>
        <div className="bg-secondary/20 p-6 rounded-lg">
          <p>
            <strong>La Brioche</strong>
          </p>
          <p>
            1415 Colley Avenue
            <br />
            Norfolk, Virginia 23517
          </p>
          <p>
            Email:{' '}
            <a href="mailto:yvanbakery@gmail.com" className="text-primary hover:underline">
              yvanbakery@gmail.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href="tel:+17572269745" className="text-primary hover:underline">
              (757) 226-9745
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
