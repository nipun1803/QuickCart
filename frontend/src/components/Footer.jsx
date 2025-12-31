import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", path: "/products" },
      { label: "New Arrivals", path: "/products" },
      { label: "Best Sellers", path: "/products" },
      { label: "Sale Items", path: "/products" },
    ],
    support: [
      { label: "Contact Us", path: "/about" },
      { label: "FAQ", path: "/about" },
      { label: "Shipping Info", path: "/about" },
      { label: "Returns", path: "/about" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/about" },
      { label: "Press", path: "/about" },
      { label: "Blog", path: "/about" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", color: "hover:text-sky-500" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-600" },
    { icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container px-4 lg:px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground text-sm">Get the latest updates on new products and sales</p>
            </div>
            <form className="flex w-full lg:w-auto max-w-md gap-3">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-4 pr-4 bg-background"
                />
              </div>
              <Button type="submit" className="gap-2">
                <Send size={16} />
                <span className="hidden sm:inline">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 lg:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Quick<span className="text-primary">Cart</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Your one-stop destination for quality products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>123 Commerce Street, Tech City</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <span>support@quickcart.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="icon"
                  className={`h-10 w-10 hover:bg-background ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </Button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-foreground mb-5">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-foreground mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-foreground mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} QuickCart. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;