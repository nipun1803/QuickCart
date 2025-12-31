import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Package, ShoppingCart, Users, BarChart2, Settings, ShoppingBag, LogOut, ArrowLeft } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const AdminNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
        { path: '/admin/products', label: 'Products', icon: Package },
        { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
        { path: '/admin/users', label: 'Users', icon: Users },
    ];

    const toolItems = [
        { path: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const MobileNav = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 text-primary-foreground">
                        <ShoppingBag size={20} />
                    </div>
                    <div>
                        <span className="text-lg font-extrabold text-foreground">QuickCart</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Admin</span>
                    </div>
                </Link>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto space-y-6">
                <div>
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Management</p>
                    <div className="space-y-1">
                        {navItems.map(item => (
                            <NavLink key={item.path} to={item.path} end={item.exact} className="block">
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={`w-full justify-start gap-3 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <Separator />
                <div>
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Insights</p>
                    <div className="space-y-1">
                        {toolItems.map(item => (
                            <NavLink key={item.path} to={item.path} className="block">
                                {({ isActive }) => (
                                    <Button
                                        variant={isActive ? "default" : "ghost"}
                                        className={`w-full justify-start gap-3 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="p-4 border-t border-border space-y-2 bg-muted/10">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" asChild>
                    <Link to="/">
                        <ArrowLeft size={18} />
                        Back to Store
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                    <LogOut size={18} />
                    Sign Out
                </Button>
            </div>
        </div>
    );

    return (
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-all">
            {/* Mobile Menu Trigger */}
            <div className="lg:hidden mr-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <MobileNav />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-sm lg:max-w-md hidden sm:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 bg-muted/50 focus:bg-background border-transparent focus:border-primary transition-all rounded-full"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4 ml-auto">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted hover:text-foreground rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card"></span>
                </Button>

                <div className="flex items-center gap-3 pl-4 border-l border-border/50">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-foreground">{user?.name || 'Administrator'}</p>
                        <p className="text-xs text-muted-foreground">System Admin</p>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <Avatar className="h-8 w-8 lg:h-10 lg:w-10 border-2 border-primary/20 shadow-sm">
                            <AvatarImage src="" alt={user?.name || "Admin"} />
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <ChevronDown size={14} className="text-muted-foreground hidden lg:block" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
