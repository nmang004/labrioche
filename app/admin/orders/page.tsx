'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Download, Eye, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';

// Sample bakery orders data
const generateSampleOrders = () => {
  const orders = [];
  const customerNames = [
    'Marie Dubois',
    'Jean-Pierre Martin',
    'Sophie Laurent',
    'Thomas Bernard',
    'Emma Rousseau',
    'Lucas Moreau',
    'Julie Petit',
    'Antoine Durand',
    'Camille Robert',
    'Hugo Simon',
    'Sarah Thompson',
    'Mike Johnson',
    'Emily Davis',
    'Chris Wilson',
    'Alex Chen',
    'Maria Garcia',
  ];

  const products = [
    { name: 'Croissant', price: 3.5 },
    { name: 'Pain au Chocolat', price: 4.0 },
    { name: 'Baguette', price: 2.5 },
    { name: 'Éclair au Chocolat', price: 5.5 },
    { name: 'Macaron Box (12)', price: 28.0 },
    { name: 'Tarte aux Fruits', price: 32.0 },
    { name: 'Quiche Lorraine', price: 8.5 },
    { name: 'Sourdough Loaf', price: 6.0 },
    { name: 'Almond Croissant', price: 4.5 },
    { name: 'French Onion Soup', price: 9.5 },
  ];

  const statuses = ['pending', 'confirmed', 'ready', 'completed', 'cancelled'];

  for (let i = 0; i < 50; i++) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));
    orderDate.setHours(Math.floor(Math.random() * 12) + 7); // 7 AM to 7 PM

    const numItems = Math.floor(Math.random() * 4) + 1;
    const orderItems = [];
    let totalPrice = 0;

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const itemTotal = product.price * quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product: product.name,
        quantity,
        price: product.price,
        total: itemTotal,
      });
    }

    const customer = customerNames[Math.floor(Math.random() * customerNames.length)];
    const isManual = Math.random() > 0.8;
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    orders.push({
      id: `LB${orderDate.getFullYear()}${(orderDate.getMonth() + 1).toString().padStart(2, '0')}${orderDate.getDate().toString().padStart(2, '0')}${(i + 1).toString().padStart(4, '0')}`,
      customer,
      email: isManual ? null : `${customer.toLowerCase().replace(' ', '.')}@email.com`,
      phone: `(757) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      date: orderDate,
      items: orderItems,
      totalPrice,
      status,
      type: isManual ? 'manual' : 'online',
      pickupTime:
        status === 'ready' || status === 'completed'
          ? new Date(orderDate.getTime() + 30 * 60000) // 30 minutes after order
          : null,
      notes: Math.random() > 0.7 ? 'Please add extra napkins' : null,
    });
  }

  return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const sampleOrders = generateSampleOrders();

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  ready: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage all customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="sm:inline">Export</span>
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="sm:inline">Create Manual Order</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>Create Manual Order</DialogTitle>
                <DialogDescription>
                  Create a new order for walk-in or phone customers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Customer Name</label>
                    <Input placeholder="Enter customer name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="(757) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Products</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="croissant">Croissant - $3.50</SelectItem>
                          <SelectItem value="pain-chocolat">Pain au Chocolat - $4.00</SelectItem>
                          <SelectItem value="baguette">Baguette - $2.50</SelectItem>
                          <SelectItem value="eclair">Éclair - $5.50</SelectItem>
                          <SelectItem value="macaron">Macaron Box - $28.00</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="Qty" className="w-20 flex-shrink-0" />
                        <Button variant="outline" className="flex-shrink-0">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Order Total</label>
                  <div className="text-2xl font-bold mt-1">$0.00</div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateModalOpen(false)} className="w-full sm:w-auto">
                  Create Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Order ID</TableHead>
                  <TableHead className="min-w-[150px]">Customer</TableHead>
                  <TableHead className="min-w-[100px]">Date & Time</TableHead>
                  <TableHead className="min-w-[80px]">Items</TableHead>
                  <TableHead className="min-w-[80px]">Total</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          {order.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {order.email}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.phone}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{format(order.date, 'MMM dd, yyyy')}</div>
                        <div className="text-sm text-muted-foreground">
                          {format(order.date, 'h:mm a')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.items.length} items
                        <div className="text-muted-foreground">
                          {order.items[0].product} {order.items.length > 1 && '...'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.type === 'manual' ? 'outline' : 'default'}>
                        {order.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedOrder(order)}
                          className="w-full sm:w-auto justify-start sm:justify-center"
                        >
                          <Eye className="h-4 w-4 sm:mr-0 mr-2" />
                          <span className="sm:hidden">View</span>
                        </Button>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order.id, value)}
                        >
                          <SelectTrigger className="h-8 w-full sm:w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of{' '}
            {filteredOrders.length} orders
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1"
            >
              Previous
            </Button>
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            <div className="sm:hidden text-sm text-muted-foreground px-2">
              {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Order Details - {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name:</span> {selectedOrder.customer}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{' '}
                      {selectedOrder.email || 'N/A'}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {selectedOrder.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Date:</span>{' '}
                      {format(selectedOrder.date, 'PPP')}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Time:</span>{' '}
                      {format(selectedOrder.date, 'p')}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Status:</span>{' '}
                      <Badge
                        className={statusColors[selectedOrder.status as keyof typeof statusColors]}
                      >
                        {selectedOrder.status}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold">
                    Total: ${selectedOrder.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
