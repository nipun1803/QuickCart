import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [placing, setPlacing] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: profile } = await api.get('/auth/profile');
                if (profile.address) {
                    // Ensure profile.address properties are not undefined
                    setAddress(prev => ({
                        ...prev,
                        ...profile.address,
                        name: profile.address.name || profile.name || "",
                        phone: profile.address.phone || profile.phone || ""
                    }));
                } else {
                    setAddress(prev => ({
                        ...prev,
                        name: profile.name || "",
                        phone: profile.phone || ""
                    }));
                }

                const { data: cart } = await api.get('/cart');
                setCartItems(cart.items || []);

                if (!cart.items || cart.items.length === 0) {
                    toast.error("Cart is empty");
                    navigate('/cart');
                }
            } catch (error) {
                toast.error("Failed to load checkout data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.zipCode) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            setPlacing(true);
            await api.put('/auth/profile', { address });
            const orderItems = cartItems.map(item => ({
                product: item.product?._id || item._id,
                quantity: item.quantity
            }));

            await api.post('/orders', {
                items: orderItems,
                shippingAddress: address,
                paymentMethod: 'cash'
            });

            toast.success("Order placed successfully!");
            window.dispatchEvent(new Event("cartUpdated"));
            navigate('/my-orders');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setPlacing(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pt-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground">Checkout</h1>
                    <p className="text-muted-foreground mt-1">Complete your purchase by providing shipping information.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Section */}
                        <Card className="border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center gap-4 bg-muted/20 pb-4 border-b">
                                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-muted-foreground" />
                                    <CardTitle>Shipping Information</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form id="checkout-form" className="space-y-4" onSubmit={handlePlaceOrder}>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Recipient Full Name</Label>
                                            <Input id="name" type="text" name="name" value={address.name} onChange={handleAddressChange} placeholder="Enter recipient's name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Contact Number</Label>
                                            <Input id="phone" type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="+91 00000 00000" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="street">Street Address</Label>
                                        <Input id="street" type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Flat, House no., Building, Company, Apartment" required />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">Town / City</Label>
                                            <Input id="city" type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="City" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input id="state" type="text" name="state" value={address.state} onChange={handleAddressChange} placeholder="State" required />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="zipCode">PIN Code</Label>
                                            <Input id="zipCode" type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange} placeholder="6-digit PIN code" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Input id="country" type="text" name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" required />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Payment Section */}
                        <Card className="border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center gap-4 bg-muted/20 pb-4 border-b">
                                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                                <div className="flex items-center gap-2">
                                    <CreditCard size={18} className="text-muted-foreground" />
                                    <CardTitle>Payment Method</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 p-4 bg-orange-500/10 border-2 border-primary rounded-xl">
                                    <div className="w-5 h-5 rounded-full border-4 border-primary bg-background"></div>
                                    <div>
                                        <p className="font-bold text-foreground">Cash on Delivery (COD)</p>
                                        <p className="text-sm text-muted-foreground">Pay when your order arrives at your doorstep.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside>
                        <Card className="sticky top-24 border-border shadow-md">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item._id} className="flex gap-4">
                                            <div className="relative w-16 h-16 bg-white rounded-xl border border-border p-1 shrink-0">
                                                <img src={item.product?.image} alt={item.product?.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate">{item.product?.title}</p>
                                                <p className="text-sm font-bold text-muted-foreground">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-foreground">₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="font-bold text-emerald-600">FREE</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="font-bold text-foreground">Order Total</span>
                                        <span className="text-2xl font-extrabold text-foreground">₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-4">
                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    className="w-full font-bold shadow-lg shadow-primary/25"
                                    size="lg"
                                    disabled={placing}
                                >
                                    {placing ? 'Processing...' : 'Place Your Order'}
                                </Button>

                                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                                    <ShieldCheck size={14} /> Secure Encryption & SSL Guaranteed
                                </p>
                            </CardFooter>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}
