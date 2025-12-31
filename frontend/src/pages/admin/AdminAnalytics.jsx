import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import api from '../../utils/api';
import { DollarSign, ShoppingBag, BarChart3 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AdminAnalytics = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [period, setPeriod] = useState('month');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, [period]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/admin/analytics/revenue?period=${period}`);
            setRevenueData(data);
        } catch (error) {
            console.error('Failed to load analytics', error);
        } finally {
            setLoading(false);
        }
    };

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1);
    const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalOrders = revenueData.reduce((acc, curr) => acc + curr.orders, 0);

    const periodButtons = [
        { value: 'week', label: '7 Days' },
        { value: 'month', label: '30 Days' },
        { value: 'year', label: '12 Months' },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Monitor your store's performance and revenue trends.</p>
                </div>
                <div className="flex bg-muted p-1 rounded-xl">
                    {periodButtons.map(btn => (
                        <Button
                            key={btn.value}
                            variant={period === btn.value ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setPeriod(btn.value)}
                            className={period === btn.value ? "shadow-sm bg-background text-foreground" : "text-muted-foreground hover:text-foreground"}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card className="border-border shadow-sm">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                                    <DollarSign size={24} className="text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                                    <p className="text-2xl font-extrabold text-foreground">₹{totalRevenue.toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-border shadow-sm">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                                    <ShoppingBag size={24} className="text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Total Orders</p>
                                    <p className="text-2xl font-extrabold text-foreground">{totalOrders}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bar Chart (Visual Only - kept from original design but customized) */}
                    <Card className="border-border shadow-sm">
                        <CardHeader>
                            <CardTitle>Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-2 h-52 overflow-x-auto pb-4 custom-scrollbar">
                                {revenueData.length > 0 ? (
                                    revenueData.map((item, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2 min-w-[48px]">
                                            <div className="relative group w-full flex justify-center">
                                                <div
                                                    className="w-8 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all hover:to-primary"
                                                    style={{ height: `${Math.max((item.revenue / maxRevenue) * 180, 4)}px` }}
                                                ></div>
                                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                                                    ₹{item.revenue.toLocaleString()}
                                                </div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium truncate max-w-[48px]">{item._id}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="text-center">
                                            <BarChart3 size={48} className="mx-auto text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground">No transaction data for this period.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Table */}
                    <Card className="border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 py-4 border-b border-border">
                            <CardTitle className="text-lg">Detailed Performance Report</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead>Date / Period</TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Avg. Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {revenueData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium text-foreground">{item._id}</TableCell>
                                            <TableCell className="font-bold text-muted-foreground">{item.orders}</TableCell>
                                            <TableCell className="font-extrabold text-primary">₹{item.revenue.toLocaleString()}</TableCell>
                                            <TableCell className="text-muted-foreground">₹{(item.revenue / (item.orders || 1)).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {revenueData.length === 0 && (
                                <div className="py-12 text-center text-muted-foreground">No data available.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminAnalytics;
