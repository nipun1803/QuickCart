import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const { data } = await api.get('/wishlist');
            setWishlist(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (id) => {
        try {
            await api.delete(`/wishlist/${id}`);
            setWishlist(wishlist.filter(item => item._id !== id));
            toast.success('Removed from wishlist');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const moveToCart = async (product) => {
        try {
            await api.post('/cart/add', { productId: product._id, quantity: 1 });
            toast.success('Moved to cart');
            removeFromWishlist(product._id);
        } catch (error) {
            toast.error('Failed to add to cart: ' + (error.response?.data?.message || error.message));
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-zinc-50">
                <div className="text-center">
                    <Heart size={64} className="mx-auto text-zinc-200 mb-4" />
                    <h2 className="text-2xl font-bold text-zinc-900 mb-4">Please login to view your wishlist</h2>
                    <button
                        className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
                        onClick={() => navigate('/signin')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    if (loading) return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-zinc-50">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pt-20 bg-zinc-50">
            <div className="container mx-auto px-4 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900">My Wishlist</h1>
                    <p className="text-zinc-500 mt-1">Your favorite items, saved for later.</p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-zinc-200">
                        <Heart size={64} className="mx-auto text-zinc-200 mb-4" />
                        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-zinc-500 mb-8">Start adding items you love to your wishlist!</p>
                        <button
                            className="inline-flex px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
                            onClick={() => navigate('/products')}
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <div key={product._id} className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-shadow">
                                <Link to={`/product/${product._id}`} className="block aspect-square bg-zinc-100 p-6">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                    />
                                </Link>
                                <div className="p-5">
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="font-bold text-zinc-900 line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <p className="text-xl font-extrabold text-zinc-900 mb-4">₹{product.price}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => moveToCart(product)}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-sm"
                                        >
                                            <ShoppingCart size={16} /> Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product._id)}
                                            className="w-12 h-12 flex items-center justify-center border-2 border-zinc-200 rounded-xl text-zinc-400 hover:text-red-500 hover:border-red-200 transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
