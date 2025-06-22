import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | La Brioche',
  description: 'Terms of service for La Brioche artisan French bakery.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="prose prose-lg mx-auto">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">
          <strong>Effective Date:</strong>{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the La Brioche website and services, you accept and agree to be
          bound by the terms and provision of this agreement. If you do not agree to abide by the
          above, please do not use this service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          La Brioche operates an artisan French bakery located in Norfolk, Virginia, offering fresh
          baked goods, online ordering, and pickup/delivery services. We reserve the right to
          modify, suspend, or discontinue any aspect of our service at any time.
        </p>

        <h2>3. User Accounts</h2>
        <h3>3.1 Account Registration</h3>
        <p>
          To place orders, you may need to create an account. You are responsible for maintaining
          the confidentiality of your account credentials and for all activities that occur under
          your account.
        </p>

        <h3>3.2 Account Responsibilities</h3>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your password</li>
          <li>Notify us immediately of any unauthorized use</li>
          <li>You must be at least 18 years old to create an account</li>
        </ul>

        <h2>4. Orders and Payment</h2>
        <h3>4.1 Order Placement</h3>
        <p>
          All orders are subject to acceptance by La Brioche. We reserve the right to refuse or
          cancel any order for any reason, including but not limited to product availability, errors
          in pricing, or suspected fraudulent activity.
        </p>

        <h3>4.2 Pricing and Payment</h3>
        <ul>
          <li>All prices are subject to change without notice</li>
          <li>Payment is required at the time of order placement</li>
          <li>We accept major credit cards and other payment methods as displayed</li>
          <li>All sales are final unless otherwise specified</li>
        </ul>

        <h3>4.3 Order Fulfillment</h3>
        <ul>
          <li>Orders must be placed by specified cutoff times</li>
          <li>Pickup times are estimates and may vary based on demand</li>
          <li>Special dietary requirements must be communicated at time of order</li>
        </ul>

        <h2>5. Cancellation and Refund Policy</h2>
        <p>
          Order cancellations must be made at least 24 hours before the scheduled pickup time.
          Refunds will be processed to the original payment method within 5-7 business days. We
          reserve the right to charge a cancellation fee for last-minute cancellations.
        </p>

        <h2>6. Food Safety and Allergies</h2>
        <p>
          Our products are prepared in a facility that processes wheat, eggs, dairy, nuts, and other
          allergens. While we take precautions, we cannot guarantee that any product is completely
          free from allergens. Customers with food allergies should exercise caution and consult
          with our staff.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          The content on this website, including but not limited to text, graphics, logos, images,
          and recipes, is the property of La Brioche and is protected by copyright and other
          intellectual property laws. You may not reproduce, distribute, or create derivative works
          without our express written permission.
        </p>

        <h2>8. User Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose</li>
          <li>Interfere with or disrupt the service</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Post or transmit harmful, offensive, or inappropriate content</li>
          <li>Violate any applicable laws or regulations</li>
        </ul>

        <h2>9. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy, which also governs your
          use of our services, to understand our practices.
        </p>

        <h2>10. Disclaimers</h2>
        <p>
          Our services are provided &ldquo;as is&rdquo; without any warranties, express or implied.
          We do not warrant that the service will be uninterrupted, secure, or error-free. We
          disclaim all warranties to the fullest extent permitted by law.
        </p>

        <h2>11. Limitation of Liability</h2>
        <p>
          In no event shall La Brioche be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to loss of profits, data, or
          use, arising out of or relating to your use of our services.
        </p>

        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless La Brioche, its officers, directors, employees,
          and agents from any claims, damages, or expenses arising from your use of our services or
          violation of these terms.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the laws of the
          Commonwealth of Virginia, without regard to its conflict of law provisions. Any disputes
          shall be resolved in the courts of Norfolk, Virginia.
        </p>

        <h2>14. Severability</h2>
        <p>
          If any provision of these terms is found to be invalid or unenforceable, the remaining
          provisions shall remain in full force and effect.
        </p>

        <h2>15. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective
          immediately upon posting on our website. Your continued use of our services constitutes
          acceptance of any modified terms.
        </p>

        <h2>16. Contact Information</h2>
        <p>If you have any questions about these Terms of Service, please contact us:</p>
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

        <p className="text-sm text-muted-foreground mt-8">
          By using our services, you acknowledge that you have read, understood, and agree to be
          bound by these Terms of Service.
        </p>
      </div>
    </div>
  );
}
