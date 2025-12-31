import React, { useEffect, useState } from 'react';
import { Filter, Eye, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import api from '../../utils/api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/admin/all');
            setOrders(data.orders || []);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/orders/${id}/status`, { status: newStatus });
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
            toast.success('Order status updated');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent';
            case 'processing': return 'bg-blue-500 hover:bg-blue-600 text-white border-transparent';
            case 'shipped': return 'bg-purple-500 hover:bg-purple-600 text-white border-transparent';
            case 'pending': return 'bg-amber-500 hover:bg-amber-600 text-white border-transparent';
            case 'cancelled': return 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent';
            default: return 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent';
        }
    };

    const filteredOrders = Array.isArray(orders) && filterStatus === 'all'
        ? orders
        : Array.isArray(orders) ? orders.filter(o => o.status.toLowerCase() === filterStatus.toLowerCase()) : [];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Orders</h1>
                    <p className="text-muted-foreground">Track and manage customer orders and status.</p>
                </div>
            </div>

            {/* Toolbar */}
            <Card className="mb-6 border-border shadow-sm">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                        <Filter size={18} className="text-muted-foreground" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 bg-background border border-input rounded-xl text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <Card className="border-border shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-mono text-sm font-bold text-primary">#{order._id.substring(0, 8)}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-semibold text-foreground">{order.user?.name || 'Unknown User'}</p>
                                                <p className="text-xs text-muted-foreground">{order.user?.email || 'N/A'}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-extrabold text-foreground">₹{order.totalAmount?.toFixed(2) || '0.00'}</TableCell>
                                        <TableCell>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase border-0 outline-none cursor-pointer ${getStatusClass(order.status)}`}
                                                style={{ WebkitAppearance: 'none', appearance: 'none' }}
                                            >
                                                <option value="pending" className="text-black bg-white">Pending</option>
                                                <option value="processing" className="text-black bg-white">Processing</option>
                                                <option value="shipped" className="text-black bg-white">Shipped</option>
                                                <option value="delivered" className="text-black bg-white">Delivered</option>
                                                <option value="cancelled" className="text-black bg-white">Cancelled</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" title="View Details">
                                                <Eye size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredOrders.length === 0 && (
                            <div className="py-16 text-center">
                                <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No orders found.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </AdminLayout>
    );
};

export default AdminOrders;
