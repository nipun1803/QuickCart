import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-muted/20">
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>
            <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
                <AdminNavbar />
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
