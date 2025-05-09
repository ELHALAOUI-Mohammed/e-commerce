import axiosClient from '@/api/axiosClient';
import { Table } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosClient.get('/orders/1') // Replace `1` with actual user ID or admin endpoint
            .then(response => setOrders(response.data));
    }, []);

    return (
       <div className="flex justify-center w-full px-4">
  <div className="container flex flex-col justify-center w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
    {/* Header Section */}
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Order Management</h2>
            <p className="text-sm text-muted-foreground mt-1">View and process customer orders</p>
          </div>
        </div>
        {/* Optional: Add filter or export buttons here */}
      </div>
    </div>

    {/* Table Section */}
    <div className="rounded-md border shadow-sm overflow-x-auto">
      <Table className="min-w-[800px] sm:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div>#{order.id}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  order.status === 'completed' ? 'success' :
                  order.status === 'processing' ? 'info' :
                  order.status === 'cancelled' ? 'destructive' : 'warning'
                }>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${parseFloat(order.total).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                  >
                    <FiEye className="h-4 w-4" />
                    <span className="hidden sm:ml-2 sm:inline">View</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Optional: Pagination */}
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" disabled>
        Previous
      </Button>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
  </div>
</div>
    );
}
