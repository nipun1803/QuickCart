import React, { useState, useEffect } from 'react';
import { Package, Clock, ShoppingBag, ExternalLink, Truck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders');
                setOrders(data);
            } catch (error) {
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusVariant = (status) => {
        const variants = {
            pending: 'secondary',
            processing: 'default',
            shipped: 'default', // blue-ish? default is primary. I can customize if needed.
            delivered: 'success', // need to check if badge supports success variant, usually only default, secondary, outline, destructive. I'll use default or outline with custom class.
            cancelled: 'destructive',
        };
        return variants[status?.toLowerCase()] || 'secondary';
    };

    // Helper for badge color if variant isn't enough
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent';
            case 'processing': return 'bg-blue-500 hover:bg-blue-600 text-white border-transparent';
            case 'shipped': return 'bg-purple-500 hover:bg-purple-600 text-white border-transparent';
            case 'pending': return 'bg-amber-500 hover:bg-amber-600 text-white border-transparent';
            default: return '';
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-foreground mb-2">My Orders</h1>
                    <p className="text-muted-foreground">Track, manage and view your order history.</p>
                </div>

                {orders.length === 0 ? (
                    <Card className="p-16 text-center border-border shadow-sm">
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Looks like you haven't placed any orders. Start shopping today!</p>
                        <Button
                            size="lg"
                            className="font-bold shadow-lg shadow-primary/20"
                            asChild
                        >
                            <Link to="/products">Start Shopping</Link>
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order._id} className="overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                {/* Order Header */}
                                <CardHeader className="bg-muted/30 px-6 py-4 border-b border-border flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
                                    <div className="flex flex-wrap gap-6 lg:gap-10">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Order Placed</p>
                                            <p className="text-sm font-semibold text-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Order Total</p>
                                            <p className="text-sm font-bold text-foreground">₹{(order.totalAmount || 0).toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Order ID</p>
                                            <p className="text-sm font-mono font-semibold text-foreground">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <Badge className={`${getStatusClass(order.status)} uppercase tracking-wide px-3 py-1`}>
                                        {order.status}
                                    </Badge>
                                </CardHeader>

                                {/* Order Items */}
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border/50">
                                                <div className="w-20 h-20 bg-background rounded-lg p-2 border border-border shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-foreground truncate mb-1">{item.title}</h4>
                                                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-primary">₹{(item.price || 0).toFixed(2)}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hidden sm:flex gap-2"
                                                    asChild
                                                >
                                                    <Link to={`/product/${item.product?._id || item.product}`}>
                                                        View Product <ExternalLink size={14} />
                                                    </Link>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                {/* Order Footer */}
                                <CardFooter className="bg-muted/30 px-6 py-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <Truck size={18} className="text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Shipping To</p>
                                            <p className="text-sm font-semibold text-foreground truncate max-w-xs">
                                                {order.shippingAddress?.name}, {order.shippingAddress?.street}, {order.shippingAddress?.city}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Get Support
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
