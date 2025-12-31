import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import api from '../../utils/api';
import ProductForm from './ProductForm';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isWrapperOpen, setIsWrapperOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchProducts(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 10,
                search: searchTerm,
            };
            const { data } = await api.get('/products', { params });
            // Handle new response format
            setProducts(data.products || []);
            setPagination({
                page: data.page || 1,
                pages: data.pages || 1,
                total: data.total || 0,
            });
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchProducts(newPage);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsWrapperOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsWrapperOpen(true);
    };

    const handleSave = (savedProduct, mode) => {
        if (mode === 'create') {
            setProducts([savedProduct, ...products]);
        } else {
            setProducts(products.map(p => p._id === savedProduct._id ? savedProduct : p));
        }
        setIsWrapperOpen(false);
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground">Products</h1>
                    <p className="text-muted-foreground">Manage your store catalog and inventory.</p>
                </div>
                <Button
                    onClick={handleAddProduct}
                    className="shadow-lg shadow-primary/20 gap-2"
                >
                    <Plus size={18} /> Add New Product
                </Button>
            </div>

            {/* Toolbar */}
            <Card className="mb-6 border-border shadow-sm">
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <Card className="border-border shadow-sm overflow-hidden">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-muted/50">
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Rating</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product._id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-muted rounded-lg p-1.5 shrink-0 border border-border">
                                                            <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                        <span className="font-semibold text-foreground truncate max-w-xs" title={product.title}>{product.title}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className="rounded-full">
                                                        {product.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="font-bold text-foreground">₹{product.price}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 font-bold text-muted-foreground">
                                                        {typeof product.rating === 'object' ? product.rating.rate : (product.rating || 0)}
                                                        <Star size={14} fill="currentColor" className="text-orange-500" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditProduct(product)}
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(product._id)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {products.length === 0 && (
                                <div className="py-16 text-center">
                                    <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No products found matching your search.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagination Controls */}
                    {
                        pagination.pages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6">
                                <Button
                                    variant="outline"
                                    disabled={pagination.page === 1}
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {[...Array(pagination.pages)].map((_, idx) => {
                                        const pageNum = idx + 1;
                                        if (
                                            pageNum === 1 ||
                                            pageNum === pagination.pages ||
                                            (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                                        ) {
                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={pagination.page === pageNum ? "default" : "ghost"}
                                                    size="sm"
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        } else if (
                                            pageNum === pagination.page - 2 ||
                                            pageNum === pagination.page + 2
                                        ) {
                                            return <span key={pageNum} className="px-1 text-muted-foreground">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    disabled={pagination.page === pagination.pages}
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        )
                    }
                </>
            )}

            {
                isWrapperOpen && (
                    <ProductForm
                        product={editingProduct}
                        onClose={() => setIsWrapperOpen(false)}
                        onSave={handleSave}
                    />
                )
            }
        </AdminLayout >
    );
};

export default AdminProducts;
