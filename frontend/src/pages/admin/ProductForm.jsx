import React, { useState, useEffect } from 'react';
import { Upload, Save, Loader } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const ProductForm = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
    });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                image: product.image,
                stock: product.stock,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageFormData = new FormData();
        imageFormData.append('image', file);
        setUploading(true);

        try {
            const { data } = await api.post('/upload', imageFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, image: data.imageUrl }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (product) {
                const { data } = await api.put(`/products/${product._id}`, formData);
                onSave(data, 'update');
                toast.success('Product updated successfully');
            } else {
                const { data } = await api.post('/products', formData);
                onSave(data, 'create');
                toast.success('Product created successfully');
            }
            // onClose() is handled by parent, but for Dialog, we might need to handle it carefully.
            // But since parent conditionally mounts, onClose called here is fine.
        } catch (error) {
            toast.error(product ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        {product ? 'Update product details below.' : 'Fill in the details to add a new product.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label>Product Title</Label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Price (₹)</Label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Stock</Label>
                            <Input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Product Image</Label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-32 h-32 bg-muted rounded-xl border-2 border-dashed border-border flex items-center justify-center shrink-0 overflow-hidden">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-muted-foreground text-center px-2">No image</span>
                                )}
                            </div>
                            <div className="flex-1 space-y-3">
                                <Label className="inline-flex items-center gap-2 px-4 py-2.5 bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 font-semibold text-sm rounded-xl cursor-pointer transition-colors border border-border">
                                    {uploading ? <Loader className="animate-spin" size={18} /> : <Upload size={18} />}
                                    {uploading ? 'Uploading...' : 'Upload Image'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        hidden
                                        disabled={uploading}
                                    />
                                </Label>
                                <Input
                                    type="text"
                                    name="image"
                                    placeholder="Or enter image URL"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || uploading}
                            className="gap-2"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;
