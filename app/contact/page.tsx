'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Implement form submission to backend
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We&apos;d love to hear from you! Visit our bakery in Norfolk or send us a message.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Visit Our Bakery</CardTitle>
              <CardDescription>
                Stop by for fresh pastries and the aroma of French baking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Main Street<br />
                    Norfolk, VA 23510
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Hours</p>
                  <div className="text-muted-foreground space-y-1">
                    <p>Monday - Friday: 7:00 AM - 7:00 PM</p>
                    <p>Saturday: 8:00 AM - 8:00 PM</p>
                    <p>Sunday: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a 
                    href="tel:+17575551234" 
                    className="text-muted-foreground hover:text-primary"
                  >
                    (757) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:hello@labriochenorfolk.com" 
                    className="text-muted-foreground hover:text-primary"
                  >
                    hello@labriochenorfolk.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardContent className="p-0">
              <div className="h-[300px] bg-gradient-to-br from-secondary to-accent/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Interactive Map</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Send Us a Message</CardTitle>
            <CardDescription>
              Have a question or special request? We&apos;ll get back to you soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
                  There was an error sending your message. Please try again.
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                loading={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Catering Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Planning an event? We offer catering for weddings, corporate events, 
              and special occasions.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Custom Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Need something special? We accept custom orders with 48 hours notice 
              for most items.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Gift Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Give the gift of French pastries! Gift cards available in-store 
              in any denomination.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}