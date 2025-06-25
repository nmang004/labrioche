'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShoppingCart,
  Clock,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Save,
  RefreshCw,
} from 'lucide-react';

// Sample business settings data
const businessHours = [
  { day: 'Monday', open: '7:00 AM', close: '6:00 PM', isOpen: true },
  { day: 'Tuesday', open: '7:00 AM', close: '6:00 PM', isOpen: true },
  { day: 'Wednesday', open: '7:00 AM', close: '6:00 PM', isOpen: true },
  { day: 'Thursday', open: '7:00 AM', close: '6:00 PM', isOpen: true },
  { day: 'Friday', open: '7:00 AM', close: '7:00 PM', isOpen: true },
  { day: 'Saturday', open: '8:00 AM', close: '7:00 PM', isOpen: true },
  { day: 'Sunday', open: '8:00 AM', close: '5:00 PM', isOpen: true },
];

const contactInfo = {
  phone: '(757) 555-0123',
  email: 'hello@labriochenorfolk.com',
  address: '123 Main Street, Norfolk, VA 23510',
};

export default function SettingsPage() {
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true);
  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingConfirmation, setIsSavingConfirmation] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [lastUpdatedConfirmation, setLastUpdatedConfirmation] = useState<Date | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSystemSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSystemSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .in('key', ['is_ordering_enabled', 'is_confirmation_required']);

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = row not found
        console.error('Error fetching system settings:', error);
      } else if (data) {
        data.forEach((setting) => {
          if (setting.key === 'is_ordering_enabled') {
            setIsOrderingEnabled(setting.value === 'true');
            setLastUpdated(new Date(setting.updated_at));
          } else if (setting.key === 'is_confirmation_required') {
            setIsConfirmationRequired(setting.value === 'true');
            setLastUpdatedConfirmation(new Date(setting.updated_at));
          }
        });
      }
    } catch (error) {
      console.error('Error fetching system settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderingEnabled = async (enabled: boolean) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('system_settings')
        .upsert({ key: 'is_ordering_enabled', value: enabled.toString() }, { onConflict: 'key' });

      if (error) {
        console.error('Error updating setting:', error);
        // Revert the switch if there was an error
        setIsOrderingEnabled(!enabled);
      } else {
        setIsOrderingEnabled(enabled);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error updating setting:', error);
      setIsOrderingEnabled(!enabled);
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfirmationRequired = async (required: boolean) => {
    setIsSavingConfirmation(true);
    try {
      const { error } = await supabase
        .from('system_settings')
        .upsert(
          { key: 'is_confirmation_required', value: required.toString() },
          { onConflict: 'key' }
        );

      if (error) {
        console.error('Error updating confirmation setting:', error);
        // Revert the switch if there was an error
        setIsConfirmationRequired(!required);
      } else {
        setIsConfirmationRequired(required);
        setLastUpdatedConfirmation(new Date());
      }
    } catch (error) {
      console.error('Error updating confirmation setting:', error);
      setIsConfirmationRequired(!required);
    } finally {
      setIsSavingConfirmation(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your bakery&apos;s online ordering system and business settings
        </p>
      </div>

      {/* Online Ordering Control */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Online Ordering System
          </CardTitle>
          <CardDescription>
            Control whether customers can place orders through your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-medium">Enable Online Ordering</h4>
              <p className="text-sm text-muted-foreground">
                When disabled, customers will see a message directing them to call the bakery
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              {isSaving && <RefreshCw className="h-4 w-4 animate-spin" />}
              <Switch
                checked={isOrderingEnabled}
                onCheckedChange={updateOrderingEnabled}
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Badge variant={isOrderingEnabled ? 'default' : 'destructive'}>
                {isOrderingEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
              {!isOrderingEnabled && (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Customers cannot place orders online</span>
                </div>
              )}
            </div>
            {lastUpdated && (
              <span className="text-muted-foreground text-center sm:text-right">
                Last updated: {lastUpdated.toLocaleString()}
              </span>
            )}
          </div>

          {/* Confirmation Required Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-medium">Confirmation Required?</h4>
              <p className="text-sm text-muted-foreground">
                When enabled, orders will require manual confirmation before processing payment
                through Stripe
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              {isSavingConfirmation && <RefreshCw className="h-4 w-4 animate-spin" />}
              <Switch
                checked={isConfirmationRequired}
                onCheckedChange={updateConfirmationRequired}
                disabled={isSavingConfirmation || !isOrderingEnabled}
              />
            </div>
          </div>

          {isConfirmationRequired && isOrderingEnabled && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800">
                Orders will be held for manual confirmation before payment processing
              </span>
            </div>
          )}

          {lastUpdatedConfirmation && (
            <div className="text-sm text-muted-foreground text-center sm:text-right">
              Confirmation setting last updated: {lastUpdatedConfirmation.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Business Hours
          </CardTitle>
          <CardDescription>
            Set your bakery&apos;s operating hours for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Day</TableHead>
                  <TableHead className="min-w-[120px]">Opening Time</TableHead>
                  <TableHead className="min-w-[120px]">Closing Time</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessHours.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        defaultValue={day.open}
                        className="w-full sm:w-32"
                        disabled={!day.isOpen}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        defaultValue={day.close}
                        className="w-full sm:w-32"
                        disabled={!day.isOpen}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant={day.isOpen ? 'default' : 'secondary'}>
                        {day.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-center sm:justify-end">
            <Button className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Hours
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Update your bakery&apos;s contact details displayed to customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                Phone Number
              </label>
              <Input defaultValue={contactInfo.phone} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                Email Address
              </label>
              <Input defaultValue={contactInfo.email} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              Business Address
            </label>
            <Input defaultValue={contactInfo.address} />
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Contact Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management Settings</CardTitle>
          <CardDescription>Configure how orders are handled and processed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Order Amount</label>
              <Input type="number" defaultValue="15.00" step="0.01" />
              <p className="text-xs text-muted-foreground">
                Minimum amount required for online orders
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Pickup Time (minutes)</label>
              <Input type="number" defaultValue="30" />
              <p className="text-xs text-muted-foreground">
                Default time customers should wait for order pickup
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Order Notifications</h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm">Email notifications for new orders</span>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm">SMS notifications for order updates</span>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm">Auto-confirm orders after payment</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Button className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Order Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Mode */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Settings
          </CardTitle>
          <CardDescription>
            Use these settings only in case of emergencies or special circumstances
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <h4 className="font-medium text-destructive mb-2">Temporary Closure</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Immediately disable all online ordering and display a closure message to customers
            </p>
            <Button variant="destructive" size="sm" className="w-full sm:w-auto">
              Enable Emergency Closure
            </Button>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">Limited Menu Mode</h4>
            <p className="text-sm text-amber-700 mb-3">
              Temporarily restrict available products (useful for inventory shortages)
            </p>
            <Button variant="outline" size="sm" className="border-amber-300 w-full sm:w-auto">
              Configure Limited Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
