import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Mail, Lock, User, ShoppingBag, ShieldCheck, Sparkles, Package, Truck, CreditCard } from "lucide-react";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function AccountPage() {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(searchParams.get('mode') === 'admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminMode(searchParams.get('mode') === 'admin');
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const { data } = await api.post(endpoint, formData);

      if (isAdminMode) {
        if (data.role !== 'admin') {
          setError('Unauthorized: Admin access only.');
          toast.error("Access denied. This portal is for administrators only.");
          setLoading(false);
          return;
        }
        login(data);
        toast.success("Welcome to Admin Dashboard");
        navigate("/admin");
      } else {
        if (data.role === 'admin') {
          login(data);
          toast.success("Admin account detected. Redirecting to dashboard...");
          navigate("/admin");
          return;
        }
        login(data);
        toast.success(isRegister ? "Registered successfully!" : "Welcome back!");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
      toast.error(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast("Password reset feature coming soon!", { icon: "🔧" });
  };

  const features = isAdminMode
    ? [
      { icon: ShieldCheck, text: "Full Dashboard Access" },
      { icon: Package, text: "Product & Order Management" },
      { icon: Sparkles, text: "User Analytics & Reports" },
    ]
    : [
      { icon: Package, text: "Verified Quality Products" },
      { icon: Truck, text: "Fast & Free Shipping" },
      { icon: CreditCard, text: "Secure Payment Options" },
    ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 pt-24 pb-12 px-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left Side - Branding */}
        <div className="flex-1 hidden lg:block">
          <div className="flex items-center gap-3 text-primary mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <ShoppingBag size={24} className="text-primary-foreground" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              Quick<span className="text-primary">Cart</span>
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
            {isAdminMode ? (
              <>Admin <span className="text-primary">Control</span> Center.</>
            ) : (
              <>The Smart Way to <span className="text-primary">Shop</span>.</>
            )}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
            {isAdminMode
              ? "Access your administrative dashboard to manage products, orders, and users with complete control."
              : "Join thousands of satisfied customers and enjoy exclusive benefits, fast shipping, and premium support."
            }
          </p>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon size={20} className="text-primary" />
                </div>
                <span className="font-semibold text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form Card */}
        <div className="w-full max-w-md">
          <Card className="border-border/60 shadow-xl shadow-black/5">
            <CardHeader className="text-center pb-2">
              <div className="flex gap-2 mb-6">
                <Button
                  variant={!isAdminMode ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => { setIsAdminMode(false); setError(''); setIsRegister(false); }}
                >
                  <User size={16} className="mr-2" /> Customer
                </Button>
                <Button
                  variant={isAdminMode ? "default" : "ghost"}
                  className="flex-1"
                  onClick={() => { setIsAdminMode(true); setError(''); setIsRegister(false); }}
                >
                  <ShieldCheck size={16} className="mr-2" /> Admin
                </Button>
              </div>
              <CardTitle className="text-2xl font-bold">
                {isAdminMode ? 'Admin Sign In' : (isRegister ? 'Create Account' : 'Welcome Back')}
              </CardTitle>
              <CardDescription>
                {isAdminMode
                  ? 'Enter your administrative credentials'
                  : (isRegister ? 'Start your premium shopping journey' : 'Please enter your account details')
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Auth Tabs (Customer Mode Only) */}
              {!isAdminMode && (
                <div className="flex bg-muted p-1 rounded-lg mb-6">
                  <Button
                    variant={!isRegister ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-1"
                    onClick={() => { setIsRegister(false); setError(''); }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={isRegister ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-1"
                    onClick={() => { setIsRegister(true); setError(''); }}
                  >
                    Register
                  </Button>
                </div>
              )}

              {/* Social Login (Customer Mode Only) */}
              {!isAdminMode && (
                <>
                  <Button
                    variant="outline"
                    className="w-full mb-6"
                    onClick={() => {
                      window.location.replace(
                        "https://quickcart-vr59.onrender.com/api/auth/google"
                      );
                    }}
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                    </div>
                  </div>
                </>
              )}

              {/* Demo Credentials */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-2">
                  <Sparkles size={16} />
                  Quick Demo Access
                </div>
                <Button
                  size="sm"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setFormData({
                    name: '',
                    email: isAdminMode ? 'admin@quickcart.com' : 'demo@user.com',
                    password: isAdminMode ? 'adminpassword' : 'admin123'
                  })}
                >
                  {isAdminMode ? 'Fill Demo Admin' : 'Fill Demo User'}
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && !isAdminMode && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{isAdminMode ? 'Admin Email' : 'Email Address'}</Label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={isAdminMode ? "admin@quickcart.com" : "name@email.com"}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {!isRegister && !isAdminMode && (
                      <Button type="button" variant="link" size="sm" onClick={handleForgotPassword} className="px-0 h-auto text-xs text-primary">
                        Forgot Password?
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm font-semibold px-4 py-3 rounded-md text-center">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading} size="lg">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isAdminMode ? 'Access Dashboard' : (isRegister ? 'Create Free Account' : 'Sign In Now')}
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              {!isAdminMode && (
                <p className="text-center text-sm text-muted-foreground">
                  {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                  <Button variant="link" className="p-0 h-auto font-bold text-primary" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Log in here' : 'Register now'}
                  </Button>
                </p>
              )}
              {isAdminMode && (
                <div className="w-full pt-4 border-t text-center">
                  <p className="text-xs text-muted-foreground font-medium">
                    🔒 Secure Admin Portal • All sessions are logged
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
