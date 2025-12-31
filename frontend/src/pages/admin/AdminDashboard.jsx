import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { RevenueChart, OrderStatusChart, CategoryPieChart } from '../../components/admin/AdminCharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function AdminDashboard() {
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: [],
        ordersByStatus: [],
    });
    const [revenueData, setRevenueData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [revenuePeriod, setRevenuePeriod] = useState("month");
    const [chartType, setChartType] = useState("area");

    useEffect(() => {
        if (!isAdmin()) {
            toast.error('Access denied. Admin only.');
            navigate('/');
            return;
        }
        fetchStats();
        fetchCategoryData();
    }, [isAdmin, navigate]);

    useEffect(() => {
        fetchRevenue(revenuePeriod);
    }, [revenuePeriod]);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevenue = async (period) => {
        try {
            const { data } = await api.get(`/admin/analytics/revenue?period=${period}`);
            setRevenueData(data);
        } catch (error) {
            console.error('Failed to load revenue data', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const { data } = await api.get('/admin/analytics/category');
            // Format for chart: { name: 'Cat', value: 10 }
            const formatted = data.map(item => ({ name: item._id, value: item.count }));
            setCategoryData(formatted);
        } catch (error) {
            console.error('Failed to load category data', error);
        }
    };

    const formatStatusData = (statusList) => {
        if (!statusList || !Array.isArray(statusList)) return [];
        return statusList.map(item => ({
            name: item._id,
            value: item.count
        }));
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

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Revenue', value: `₹${stats.totalRevenue?.toFixed(2) || '0.00'}`, icon: DollarSign, color: 'text-orange-500', bg: 'bg-orange-500/10', trend: true },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm text-foreground font-medium shadow-sm">
                    <Calendar size={16} className="text-muted-foreground" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, idx) => (
                    <Card key={idx} className="border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                            </div>
                            {stat.trend && <TrendingUp size={20} className="text-emerald-500" />}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2 border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Revenue Overview</CardTitle>
                        <div className="flex gap-2">
                            <Select value={chartType} onValueChange={setChartType}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="area">Area</SelectItem>
                                    <SelectItem value="bar">Bar</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={revenuePeriod} onValueChange={setRevenuePeriod}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Last 24h</SelectItem>
                                    <SelectItem value="week">Last 7 days</SelectItem>
                                    <SelectItem value="month">Last 30 days</SelectItem>
                                    <SelectItem value="year">Last Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <RevenueChart data={revenueData} type={chartType} />
                    </CardContent>
                </Card>

                {/* Sales by Category (New) */}
                <Card className="border-border shadow-sm">
                    <CardHeader>
                        <CardTitle>Sales by Category</CardTitle>
                        <CardDescription>Distribution of sold items</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CategoryPieChart data={categoryData} />
                    </CardContent>
                </Card>

                {/* Order Status Chart (Moved or kept? User asked for dashboard enhancements. Keeping it is fine, or replacing. I'll add it below or alongside) */}
                {/* Let's put Order Status in a new row or just replace it if Space is tight, but we have space in a dashboard. */}
                {/* I will add Order Status below in a 3-grid with recent orders if needed, or just let it be. */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="border-border shadow-sm">
                    <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <OrderStatusChart data={formatStatusData(stats.ordersByStatus)} />
                    </CardContent>
                </Card>

                {/* Recent Orders - Takes 2 cols */}
                <Card className="lg:col-span-2 border-border shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/20 py-4">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button
                            variant="ghost"
                            className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-1"
                            onClick={() => navigate('/admin/orders')}
                        >
                            View All <ArrowUpRight size={14} />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {stats.recentOrders && stats.recentOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-muted/50">
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recentOrders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell className="font-mono font-semibold text-foreground">#{order._id.slice(-6).toUpperCase()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-bold text-xs">
                                                            {order.user?.name?.charAt(0) || 'U'}
                                                        </div>
                                                        <span className="text-sm font-medium text-foreground">{order.user?.name || 'Guest'}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-bold text-foreground">₹{(order.totalAmount || 0).toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <Badge className={`${getStatusClass(order.status)} border-0`}>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="p-12 text-center text-muted-foreground">
                                No recent orders found.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
