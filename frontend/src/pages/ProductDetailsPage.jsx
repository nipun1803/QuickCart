import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, ShieldCheck, RotateCcw, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                toast.error('Product not found');
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please login to add to cart');
            navigate('/signin');
            return;
        }
        try {
            await api.post('/cart/add', { productId: product._id, quantity });
            toast.success('Added to cart');
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            toast.error('Please login to use wishlist');
            navigate('/signin');
            return;
        }
        try {
            await api.post(`/wishlist/${product._id}`);
            toast.success('Added to wishlist');
        } catch (error) {
            toast.error('Failed to add to wishlist');
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-20 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return null;

    const rating = product.rating?.rate || product.rating || 0;
    const reviewCount = product.rating?.count || product.reviews || 0;

    return (
        <div className="min-h-screen pt-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8 py-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 pl-0 hover:pl-2 text-muted-foreground hover:text-foreground transition-all"
                >
                    <ArrowLeft size={18} className="mr-2" /> Back to Shop
                </Button>

                <div className="grid lg:grid-cols-2 gap-12 text-foreground">
                    {/* Left: Image */}
                    <Card className="border-border overflow-hidden bg-card">
                        <div className="aspect-square flex items-center justify-center p-8 lg:p-12 bg-white">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                        </div>
                    </Card>

                    {/* Right: Info */}
                    <div className="space-y-6">
                        <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold uppercase tracking-wider">
                            {product.category}
                        </Badge>

                        <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < Math.floor(rating) ? "currentColor" : "none"}
                                        className={i < Math.floor(rating) ? "text-orange-500" : "text-muted"}
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground font-medium">
                                {rating} <span className="text-muted-foreground/60">({reviewCount} Reviews)</span>
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-extrabold text-foreground">
                                ₹{(product.price || 0).toFixed(2)}
                            </span>
                            {product.oldPrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    ₹{product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <Separator />

                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        <Separator />

                        {/* Controls */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <div className="flex items-center border border-border rounded-lg bg-card">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="h-12 w-12 rounded-none rounded-l-lg hover:bg-muted"
                                >
                                    <Minus size={18} />
                                </Button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="h-12 w-12 rounded-none rounded-r-lg hover:bg-muted"
                                >
                                    <Plus size={18} />
                                </Button>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 h-12 gap-2 text-base font-bold shadow-lg shadow-primary/25"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 border-2 hover:bg-muted hover:text-red-500 transition-colors"
                                onClick={handleAddToWishlist}
                            >
                                <Heart size={24} />
                            </Button>
                        </div>

                        {/* Perks */}
                        <div className="grid sm:grid-cols-3 gap-4 pt-6">
                            {[
                                { icon: Truck, title: "Free Shipping", sub: "Orders over ₹1000" },
                                { icon: ShieldCheck, title: "1 Year Warranty", sub: "Brand protection" },
                                { icon: RotateCcw, title: "Easy Returns", sub: "30-day policy" }
                            ].map((perk, idx) => (
                                <Card key={idx} className="bg-card border-border shadow-sm">
                                    <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                            <perk.icon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground text-sm">{perk.title}</p>
                                            <p className="text-xs text-muted-foreground">{perk.sub}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
