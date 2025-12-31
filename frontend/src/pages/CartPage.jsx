import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const standardizeItems = (items, source) => {
    if (source === 'api') {
      return items.map(item => ({
        _id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
        stock: item.product.stock
      }));
    }
    return items.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (user) {
          const { data } = await api.get('/cart');
          setCartItems(standardizeItems(data.items, 'api'));
        } else {
          const items = JSON.parse(localStorage.getItem("cart") || "[]");
          setCartItems(items.map(i => ({ ...i, quantity: i.quantity || 1 })));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      toast.error("Max quantity is 10");
      return;
    }

    try {
      if (user) {
        const { data } = await api.put(`/cart/update/${productId}`, { quantity: newQuantity });
        setCartItems(standardizeItems(data.items, 'api'));
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        const updated = cartItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      if (user) {
        const { data } = await api.delete(`/cart/remove/${productId}`);
        setCartItems(standardizeItems(data.items, 'api'));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Item removed");
      } else {
        const updated = cartItems.filter(item => item._id !== productId);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Item removed");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate('/signin');
      return;
    }
    navigate('/checkout');
  };

  if (loading) return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="h-4 bg-muted rounded w-32 mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map(i => (
                <Card key={i} className="p-6 flex gap-6">
                  <div className="w-24 h-24 bg-muted rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="p-6 h-fit">
              <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-10 bg-muted rounded mt-6"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="link" className="pl-0 text-muted-foreground hover:text-foreground mb-4" asChild>
            <Link to="/products">
              <ArrowLeft size={16} className="mr-2" /> Back to Shop
            </Link>
          </Button>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">You have {cartItems.length} items in your bag.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <ShoppingBag size={64} className="mx-auto text-muted mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looking for inspiration? Browse our latest collections.</p>
            <Button size="lg" className="font-bold shadow-lg" asChild>
              <Link to="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item._id} className="p-6 flex flex-col sm:flex-row gap-6 border-border shadow-sm">
                  <Link to={`/product/${item._id}`} className="w-24 h-24 bg-white rounded-xl p-2 shrink-0 border border-muted">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="font-bold text-foreground hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item._id)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-9 w-9 rounded-none rounded-l-lg hover:bg-muted"
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="h-9 w-9 rounded-none rounded-r-lg hover:bg-muted"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                        <p className="text-xl font-extrabold text-foreground">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <aside>
              <Card className="sticky top-24 border-border shadow-md">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold text-foreground">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-primary">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <Button onClick={handleBuyNow} className="w-full font-bold shadow-lg shadow-primary/25" size="lg">
                    Proceed to Checkout
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Secure Checkout · Fast Shipping · Easy Returns
                  </p>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
