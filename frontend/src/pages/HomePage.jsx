import React, { useEffect, useState } from "react";
import { Truck, ShieldCheck, BadgeCheck, ArrowRight, ShoppingBag, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import api from "../utils/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/products");
        if (data && Array.isArray(data.products)) {
          setFeaturedProducts(data.products.slice(0, 4));
        } else {
          setFeaturedProducts([]);
        }
      } catch (err) {
        // console.error("Failed to fetch featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="min-h-screen pt-20"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-primary/5 overflow-hidden">
        <div className="container px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={containerVariants} className="space-y-8">
              <motion.div variants={itemVariants}>
                <Badge variant="secondary" className="px-4 py-2 text-sm font-bold gap-2 text-primary bg-primary/10 hover:bg-primary/20">
                  <Zap size={14} fill="currentColor" /> Exclusive 2025 Collection
                </Badge>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Elevate Your <span className="text-primary">Shopping</span> Experience.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-lg">
                Discover a curated selection of premium products designed for quality, performance, and style. Fast delivery, secure payments, and 24/7 support.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Button size="lg" className="px-8 py-6 text-base font-bold shadow-lg shadow-primary/25 rounded-xl gap-2" asChild>
                  <Link to="/products">
                    Shop All Products <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-base font-bold bg-background/50 backdrop-blur-sm rounded-xl border-2" asChild>
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-card rounded-xl shadow-sm flex items-center justify-center text-primary border border-border">
                    <Truck size={24} />
                  </div>
                  <span className="font-semibold text-foreground">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-card rounded-xl shadow-sm flex items-center justify-center text-primary border border-border">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-semibold text-foreground">Secure Payment</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] rotate-6 scale-95 opacity-20"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/20 rounded-[3rem] p-8">
                <motion.img
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"
                  alt="Premium Product"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-8 -right-4"
              >
                <Badge className="px-4 py-2 text-sm font-bold shadow-lg gap-2 bg-primary text-primary-foreground">
                  <Zap size={16} fill="white" /> Limited Offer
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Shop By <span className="text-primary">Category</span>
            </h2>
            <p className="text-muted-foreground">Explore our diverse range of premium collections</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { name: "Men's Wear", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=400", link: "/products?category=Men" },
              { name: "Women's Wear", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400", link: "/products?category=Women" },
              { name: "Kids Collection", img: "https://images.unsplash.com/photo-1519704943920-1844783b7511?auto=format&fit=crop&w=400", link: "/products?category=Kids" },
              { name: "View All", icon: <ShoppingBag size={32} />, link: "/products", isAll: true }
            ].map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Link to={cat.link} className="group block text-center">
                  <div className={`w-full aspect-square rounded-2xl overflow-hidden mb-4 ${cat.isAll ? 'bg-zinc-900 flex items-center justify-center text-white' : 'bg-muted'}`}>
                    {cat.img ? (
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="group-hover:scale-110 transition-transform text-white">{cat.icon}</div>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                Featured <span className="text-primary">Products</span>
              </h2>
              <p className="text-muted-foreground">High demand items selected for you</p>
            </div>
            <Button variant="link" className="hidden sm:flex text-primary font-bold gap-2 p-0 h-auto hover:no-underline hover:gap-3 transition-all" asChild>
              <Link to="/products">
                View All <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <Card key={n} className="overflow-hidden border-border bg-card">
                  <div className="aspect-square bg-muted animate-pulse"></div>
                  <CardContent className="p-5 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <Link to={`/product/${product._id}`} className="group block h-full">
                    <Card className="h-full overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:border-primary/50">
                      <div className="aspect-square bg-white p-6 relative overflow-hidden flex items-center justify-center">
                        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                      </div>
                      <CardContent className="p-5">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                        <h3 className="font-bold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">{product.title}</h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xl font-extrabold text-foreground">₹{product.price}</span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star size={14} fill="currentColor" className="text-orange-500" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>

          <Button className="sm:hidden w-full mt-8" asChild>
            <Link to="/products">
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 bg-background">
        <div className="container px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Truck size={32} />, title: "Express Shipping", desc: "Reliable global delivery network for all orders." },
              { icon: <ShieldCheck size={32} />, title: "Encrypted Payments", desc: "Your security is our top priority with bank-level encryption." },
              { icon: <BadgeCheck size={32} />, title: "Quality Guaranteed", desc: "Every product is hand-checked by our experts." },
            ].map((item, idx) => (
              <Card key={idx} className="text-center p-8 bg-muted/30 border-none shadow-none">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;