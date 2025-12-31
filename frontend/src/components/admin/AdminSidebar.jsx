import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut,
    BarChart2,
    ArrowLeft,
    Settings,
    ShoppingBag
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

const AdminSidebar = () => {
    const { logout } = useAuth();
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

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-40 shadow-sm">
            {/* Header */}
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

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto space-y-6">
                <div>
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Management</p>
                    <div className="space-y-1">
                        {navItems.map(item => (
                            <div key={item.path}>
                                <NavLink to={item.path} end={item.exact}>
                                    {({ isActive }) => (
                                        <Button
                                            variant={isActive ? "default" : "ghost"}
                                            className={`w-full justify-start gap-3 ${isActive ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </Button>
                                    )}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div>
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Insights</p>
                    <div className="space-y-1">
                        {toolItems.map(item => (
                            <div key={item.path}>
                                <NavLink to={item.path}>
                                    {({ isActive }) => (
                                        <Button
                                            variant={isActive ? "default" : "ghost"}
                                            className={`w-full justify-start gap-3 ${isActive ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </Button>
                                    )}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer */}
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
        </aside>
    );
};

export default AdminSidebar;
