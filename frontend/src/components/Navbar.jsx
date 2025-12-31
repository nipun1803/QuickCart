import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  Heart,
  Menu,
  User,
  Package,
  Home,
  ShoppingCart
} from "lucide-react";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/cn";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    const fetchCartCount = async () => {
      if (user) {
        try {
          const { data } = await api.get('/cart');
          setCartCount(data.items?.length || 0);
        } catch (error) {
          console.error("Failed to fetch cart count");
        }
      } else {
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(items.length);
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchCartCount();
    window.addEventListener("storage", fetchCartCount);
    window.addEventListener("cartUpdated", fetchCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", fetchCartCount);
      window.removeEventListener("cartUpdated", fetchCartCount);
    };
  }, [location, user]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Shop', icon: ShoppingBag },
    { path: '/about', label: 'About', icon: null },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "h-16 bg-background/80 backdrop-blur-md border-border"
          : "h-20 bg-background border-transparent"
      )}
    >
      <div className="container h-full px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <ShoppingBag size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Quick<span className="text-primary">Cart</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          {user && isAdmin() && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
              title="Admin Dashboard"
            >
              <Link to="/admin">
                <LayoutDashboard className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild title="Wishlist">
            <Link to="/wishlist" className={isActive('/wishlist') ? "text-red-500" : ""}>
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild title="Cart" className="relative">
            <Link to="/cart">
              <ShoppingCart className={cn("h-5 w-5", isActive('/cart') ? "text-primary" : "text-muted-foreground")} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <Button asChild size="sm">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <ShoppingBag size={16} />
                  </div>
                  QuickCart
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 text-lg font-medium transition-colors hover:text-primary",
                      isActive(link.path) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.icon && <link.icon size={20} />}
                    {link.label}
                  </Link>
                ))}

                <div className="my-2 border-t" />

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 text-lg font-medium text-muted-foreground hover:text-primary"
                    >
                      <User size={20} />
                      Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2 text-lg font-medium text-muted-foreground hover:text-primary"
                    >
                      <Package size={20} />
                      Orders
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="justify-start px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut size={20} className="mr-3" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Button asChild className="w-full mt-4">
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;