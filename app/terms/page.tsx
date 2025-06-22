import { Metadata } from 'next';
import {
  FileText,
  Users,
  ShoppingCart,
  CreditCard,
  Shield,
  AlertTriangle,
  Scale,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service | La Brioche',
  description: 'Terms of service for La Brioche artisan French bakery.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Terms of Service</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          Please read these terms carefully before using our services. By using La Brioche, you
          agree to these terms.
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Effective Date:</strong>{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Introduction Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Acceptance of Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using the La Brioche website and services, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not agree to abide by
              the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-lg">🥖</span>
              </div>
              <CardTitle className="text-xl">Our Service</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              La Brioche operates an artisan French bakery located in Norfolk, Virginia, offering
              fresh baked goods, online ordering, and pickup/delivery services. We reserve the right
              to modify, suspend, or discontinue any aspect of our service at any time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User Accounts */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-serif">User Accounts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Account Registration</h4>
              <p className="text-muted-foreground mb-4">
                To place orders, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities
                that occur under your account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Your Responsibilities</h4>
              <ul className="space-y-2">
                {[
                  'Provide accurate and complete information',
                  'Maintain the security of your password',
                  'Notify us immediately of any unauthorized use',
                  'You must be at least 18 years old to create an account',
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders and Payment */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif">Orders & Payment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Order Placement</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                All orders are subject to acceptance by La Brioche. We reserve the right to refuse
                or cancel any order for any reason, including but not limited to product
                availability, errors in pricing, or suspected fraudulent activity.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Payment Terms</h4>
              </div>
              <ul className="space-y-2">
                {[
                  'All prices are subject to change without notice',
                  'Payment is required at the time of order placement',
                  'We accept major credit cards and other payment methods as displayed',
                  'All sales are final unless otherwise specified',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Order Fulfillment</h4>
              </div>
              <ul className="space-y-2">
                {[
                  'Orders must be placed by specified cutoff times',
                  'Pickup times are estimates and may vary based on demand',
                  'Special dietary requirements must be communicated at time of order',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Policies */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Cancellation & Refunds</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <p className="text-sm font-medium text-orange-800">🕰️ 24-Hour Notice Required</p>
                <p className="text-xs text-orange-700 mt-1">
                  Order cancellations must be made at least 24 hours before pickup time.
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Refunds will be processed to the original payment method within 5-7 business days.
                We reserve the right to charge a cancellation fee for last-minute cancellations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-xl">Food Safety & Allergies</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-red-200">
                <p className="text-sm font-medium text-red-800">⚠️ Allergy Warning</p>
                <p className="text-xs text-red-700 mt-1">
                  Our facility processes wheat, eggs, dairy, nuts, and other allergens.
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                While we take precautions, we cannot guarantee that any product is completely free
                from allergens. Customers with food allergies should exercise caution and consult
                with our staff.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal & Conduct */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Intellectual Property</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              The content on this website, including but not limited to text, graphics, logos,
              images, and recipes, is the property of La Brioche and is protected by copyright and
              other intellectual property laws. You may not reproduce, distribute, or create
              derivative works without our express written permission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">User Conduct</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-3">You agree not to:</p>
            <ul className="space-y-2">
              {[
                'Use the service for any unlawful purpose',
                'Interfere with or disrupt the service',
                'Attempt to gain unauthorized access to our systems',
                'Post or transmit harmful, offensive, or inappropriate content',
                'Violate any applicable laws or regulations',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Legal Framework */}
      <Card className="mb-12 bg-gray-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Scale className="h-5 w-5 text-gray-600" />
            </div>
            <CardTitle className="text-2xl font-serif">Legal Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Privacy Policy</h4>
                <p className="text-muted-foreground text-sm">
                  Your privacy is important to us. Please review our Privacy Policy, which also
                  governs your use of our services, to understand our practices.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Service Disclaimers</h4>
                <p className="text-muted-foreground text-sm">
                  Our services are provided &ldquo;as is&rdquo; without any warranties, express or
                  implied. We do not warrant that the service will be uninterrupted, secure, or
                  error-free. We disclaim all warranties to the fullest extent permitted by law.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Limitation of Liability</h4>
                <p className="text-muted-foreground text-sm">
                  In no event shall La Brioche be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including but not limited to loss of profits,
                  data, or use, arising out of or relating to your use of our services.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">User Indemnification</h4>
                <p className="text-muted-foreground text-sm">
                  You agree to indemnify and hold harmless La Brioche, its officers, directors,
                  employees, and agents from any claims, damages, or expenses arising from your use
                  of our services or violation of these terms.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Governing Law</h4>
                <p className="text-muted-foreground text-sm">
                  These terms shall be governed by and construed in accordance with the laws of the
                  Commonwealth of Virginia, without regard to its conflict of law provisions. Any
                  disputes shall be resolved in the courts of Norfolk, Virginia.
                </p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-primary">Terms Updates</h4>
                <p className="text-muted-foreground text-sm">
                  We reserve the right to modify these terms at any time. Changes will be effective
                  immediately upon posting on our website. Your continued use of our services
                  constitutes acceptance of any modified terms.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="bg-primary/5 border-primary/20 mb-8">
        <CardHeader>
          <div className="text-center">
            <CardTitle className="text-2xl font-serif mb-2">Questions About Our Terms?</CardTitle>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, we&apos;re here to help.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-6 border border-primary/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🥖</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">La Brioche</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    1415 Colley Avenue
                    <br />
                    Norfolk, Virginia 23517
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:yvanbakery@gmail.com"
                      className="text-primary hover:underline font-medium"
                    >
                      yvanbakery@gmail.com
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a href="tel:+17572269745" className="text-primary hover:underline font-medium">
                      (757) 226-9745
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acknowledgment */}
      <div className="text-center bg-secondary/20 rounded-lg p-6">
        <p className="text-sm text-muted-foreground">
          By using our services, you acknowledge that you have read, understood, and agree to be
          bound by these Terms of Service.
        </p>
      </div>
    </div>
  );
}
