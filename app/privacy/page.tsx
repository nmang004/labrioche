import { Metadata } from 'next';
import { Shield, Eye, Lock, FileText, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | La Brioche',
  description: 'Privacy policy for La Brioche artisan French bakery.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your information.
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

      {/* Information Collection Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Personal Information We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">When you use our services, we may collect:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Name and contact information (email, phone)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Account credentials (username, password)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Order history and preferences</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Payment information (securely processed)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Delivery or pickup addresses</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Automatically Collected Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">We automatically collect certain information:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Device information (IP address, browser type)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Usage data (pages visited, time spent)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                <span>Cookies and similar tracking technologies</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* How We Use Information */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">How We Use Your Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Service Operations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Process and fulfill your orders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Provide customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Send order confirmations and updates</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Improvement & Communication</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Improve our products and services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Send promotional communications (with consent)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Comply with legal obligations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Prevent fraud and ensure security</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Sharing */}
      <Card className="mb-12 border-amber-200 bg-amber-50/50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Lock className="h-5 w-5 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-serif">Information Sharing</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="font-semibold text-amber-800 mb-2">🛡️ Our Promise to You</p>
            <p className="text-amber-700">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">We may share your information only with:</h4>
            <div className="grid gap-4">
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Service Providers</p>
                  <p className="text-sm text-muted-foreground">
                    Third-party vendors who help us operate our business (payment processors,
                    delivery services)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Legal Requirements</p>
                  <p className="text-sm text-muted-foreground">
                    When required by law or to protect our rights
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium">Business Transfers</p>
                  <p className="text-sm text-muted-foreground">
                    In connection with a merger, acquisition, or sale of assets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Rights Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lock className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-xl">Data Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ Please note: No method of transmission over the internet is 100% secure.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Cookies & Tracking</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We use cookies and similar technologies to enhance your browsing experience. You can
              control cookie settings through your browser preferences.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💡 Essential cookies are necessary for website functionality and cannot be disabled.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Rights */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-serif">Your Rights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Depending on your location, you may have the following rights:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Access to your personal information',
              'Correction of inaccurate information',
              'Deletion of your personal information',
              'Restriction of processing',
              'Data portability',
              'Objection to processing',
              'Withdrawal of consent',
            ].map((right, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm">{right}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Policies */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Data Retention</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this privacy policy, comply with legal obligations, resolve disputes, and
              enforce our agreements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-xl">Children&apos;s Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our services are not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="text-xl">Third-Party Links</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of these external sites. We encourage you to read their privacy
              policies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Policy Updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the effective
              date.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="text-center">
            <CardTitle className="text-2xl font-serif mb-2">
              Questions About Your Privacy?
            </CardTitle>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy or our data practices, we&apos;re
              here to help.
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
    </div>
  );
}
