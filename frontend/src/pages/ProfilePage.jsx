import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import {
    Package, User, Edit2, Save, LogOut, Home
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
    const { user, login, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    zipCode: user.address?.zipCode || '',
                    country: user.address?.country || ''
                }
            });
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        try {
            const { data } = await api.put('/auth/profile', formData);
            login(data);
            toast.success('Profile updated successfully');
            setEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/signin");
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
                <Card className="max-w-md w-full text-center p-6 bg-card border-border">
                    <CardHeader>
                        <User size={48} className="mx-auto text-muted mb-4" />
                        <CardTitle>Please log in</CardTitle>
                        <CardDescription>You need to be logged in to view your profile.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" asChild>
                            <Link to="/signin">Sign In</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 pb-8 border-b border-border">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground mb-1">Account Dashboard</h1>
                        <p className="text-muted-foreground">Manage your profile, orders, and preferences</p>
                    </div>
                    <div className="flex gap-3">
                        {!editing ? (
                            <Button
                                onClick={() => setEditing(true)}
                                className="shadow-lg shadow-primary/20 gap-2"
                            >
                                <Edit2 size={16} /> Edit Profile
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="gap-2 shadow-lg shadow-primary/20"
                                >
                                    <Save size={16} /> Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-24 border-border bg-card shadow-sm">
                            <CardContent className="p-6">
                                {/* User Mini Profile */}
                                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-border">
                                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-extrabold text-xl shadow-lg shadow-primary/25">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-foreground truncate">{user.name}</h3>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                </div>

                                {/* Nav Links */}
                                <nav className="space-y-2 mb-6">
                                    <Button variant="default" className="w-full justify-start gap-3" >
                                        <User size={18} /> Personal Details
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start gap-3" asChild>
                                        <Link to="/my-orders">
                                            <Package size={18} /> Purchase History
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={18} /> Log Out
                                    </Button>
                                </nav>

                                {/* Stats */}
                                <div className="bg-muted/50 rounded-xl p-4 text-center border border-border">
                                    <div className="text-3xl font-extrabold text-primary">{orders.length}</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">Total Orders</div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <Card className="border-border bg-card shadow-sm">
                            <CardContent className="p-8 lg:p-10">
                                {/* Personal Details Section */}
                                <section className="mb-10">
                                    <h2 className="text-lg font-extrabold text-foreground mb-6 flex items-center gap-2">
                                        <User size={20} className="text-primary" /> Personal Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            {editing ? (
                                                <Input name="name" value={formData.name} onChange={handleInputChange} />
                                            ) : (
                                                <p className="text-base font-semibold text-foreground">{user.name}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email Address</Label>
                                            <p className="text-base font-medium text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone Number</Label>
                                            {editing ? (
                                                <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 00000 00000" />
                                            ) : (
                                                <p className="text-base font-semibold text-foreground">{user.phone || 'Not linked'}</p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <Separator className="my-8" />

                                {/* Shipping Address Section */}
                                <section>
                                    <h2 className="text-lg font-extrabold text-foreground mb-6 flex items-center gap-2">
                                        <Home size={20} className="text-primary" /> Shipping Address
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label>Street / Landmark</Label>
                                            {editing ? (
                                                <Textarea name="address.street" value={formData.address.street} onChange={handleInputChange} rows="2" />
                                            ) : (
                                                <p className="text-base font-semibold text-foreground">{user.address?.street || 'Not provided'}</p>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>City</Label>
                                                {editing ? (
                                                    <Input name="address.city" value={formData.address.city} onChange={handleInputChange} />
                                                ) : (
                                                    <p className="text-base font-semibold text-foreground">{user.address?.city || '-'}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>State</Label>
                                                {editing ? (
                                                    <Input name="address.state" value={formData.address.state} onChange={handleInputChange} />
                                                ) : (
                                                    <p className="text-base font-semibold text-foreground">{user.address?.state || '-'}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>ZIP Code</Label>
                                                {editing ? (
                                                    <Input name="address.zipCode" value={formData.address.zipCode} onChange={handleInputChange} />
                                                ) : (
                                                    <p className="text-base font-semibold text-foreground">{user.address?.zipCode || '-'}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Country</Label>
                                                {editing ? (
                                                    <Input name="address.country" value={formData.address.country} onChange={handleInputChange} />
                                                ) : (
                                                    <p className="text-base font-semibold text-foreground">{user.address?.country || '-'}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
