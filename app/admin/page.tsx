'use client';

import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, TrendingUp, Croissant, CreditCard } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, subDays } from 'date-fns';

// Sample data for La Brioche bakery
const generateSampleOrders = () => {
  const orders = [];

  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();

    // More orders on weekends
    const baseOrders = dayOfWeek === 0 || dayOfWeek === 6 ? 40 : 25;
    const orderCount = baseOrders + Math.floor(Math.random() * 15);
    const avgOrderValue = 25 + Math.random() * 20;

    orders.push({
      date: format(date, 'MMM dd'),
      orders: orderCount,
      revenue: orderCount * avgOrderValue,
      avgOrderValue: avgOrderValue.toFixed(2),
    });
  }

  return orders;
};

const sampleOrderData = generateSampleOrders();

// Calculate totals from sample data
const totalRevenue = sampleOrderData.reduce((sum, day) => sum + day.revenue, 0);
const totalOrders = sampleOrderData.reduce((sum, day) => sum + day.orders, 0);
const avgOrderValue = totalRevenue / totalOrders;
const netProfit = totalRevenue * 0.97; // After 3% processing fee
const profitReclaimed = totalOrders * 10.8;

// Product popularity data
const productPopularity = [
  { name: 'Croissant', value: 450, percentage: 22 },
  { name: 'Pain au Chocolat', value: 380, percentage: 18 },
  { name: 'Baguette', value: 320, percentage: 16 },
  { name: 'Macaron Box', value: 280, percentage: 14 },
  { name: 'Éclair', value: 220, percentage: 11 },
  { name: 'Other', value: 390, percentage: 19 },
];

// Peak hours data
const peakHoursData = [
  { hour: '7 AM', orders: 45 },
  { hour: '8 AM', orders: 82 },
  { hour: '9 AM', orders: 96 },
  { hour: '10 AM', orders: 64 },
  { hour: '11 AM', orders: 78 },
  { hour: '12 PM', orders: 112 },
  { hour: '1 PM', orders: 98 },
  { hour: '2 PM', orders: 56 },
  { hour: '3 PM', orders: 42 },
  { hour: '4 PM', orders: 38 },
  { hour: '5 PM', orders: 65 },
  { hour: '6 PM', orders: 48 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('30');
  const [orderData, setOrderData] = useState(sampleOrderData);

  useEffect(() => {
    // Filter data based on time range
    const days = parseInt(timeRange);
    setOrderData(sampleOrderData.slice(-days));
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to La Brioche admin dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          description="Last 30 days"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Net Profit"
          value={`$${netProfit.toFixed(2)}`}
          description="After 3% processing fee"
          icon={TrendingUp}
          trend={{ value: 11.8, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          description="Last 30 days"
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Average Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          description="Per transaction"
          icon={CreditCard}
          trend={{ value: 3.1, isPositive: true }}
        />
      </div>

      {/* Special Profit Reclaimed Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Croissant className="h-5 w-5" />
            Profit Reclaimed from Third-Party Fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">${profitReclaimed.toFixed(2)}</div>
          <p className="mt-2 text-purple-100">
            Saved by using our in-house ordering system instead of third-party platforms
          </p>
          <p className="mt-1 text-sm text-purple-200">
            Based on {totalOrders} orders × $10.80 average third-party fee
          </p>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Over Time</CardTitle>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Popularity */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPopularity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productPopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Ordering Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-2">Busiest Days</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Saturdays: Average 52 orders</li>
                <li>• Sundays: Average 48 orders</li>
                <li>• Fridays: Average 38 orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customer Favorites</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Morning: Croissants & Coffee</li>
                <li>• Lunch: Quiche & Sandwiches</li>
                <li>• Afternoon: Macarons & Pastries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Growth Opportunities</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Increase weekday lunch offerings</li>
                <li>• Promote catering services</li>
                <li>• Add seasonal specials</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
