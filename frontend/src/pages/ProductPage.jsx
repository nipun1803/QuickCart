import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FilterPanel from "../components/FilterPanel";
import { Star, Heart, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchedProduct, setSearchedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000]); // Increased max range
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { user } = useAuth();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchedProduct, selectedCategory, selectedRating, priceRange]); // Reset to page 1 on filter change

  const fetchProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        search: searchedProduct,
        category: selectedCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        rating: selectedRating,
      };

      const { data } = await api.get("/products", { params });

      setProducts(data.products || []);
      setPagination({
        page: data.page || 1,
        pages: data.pages || 1,
        total: data.total || 0
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Allow manual page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchProducts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
      toast.success(`Added ${product.title.substring(0, 20)}... to cart`);
    } catch (err) {
      console.error("Failed to add to cart", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const handleAddToWishlist = (product) => {
    toast.success("Added to wishlist");
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">Our Products</h1>
            <p className="text-muted-foreground">Discover our curated collection of premium items</p>
          </div>
          {/* Simple Search Input - Integrated with filters */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchedProduct}
              onChange={(e) => setSearchedProduct(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden w-full mb-6 gap-2">
              <SlidersHorizontal size={18} /> Filter & Sort
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <FilterPanel
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden border-border bg-card">
                    <div className="aspect-square bg-muted animate-pulse"></div>
                    <CardContent className="p-5 space-y-2">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive font-semibold">{error}</p>
                <Button variant="link" onClick={() => fetchProducts(1)}>Try Again</Button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedRating(0);
                    setPriceRange([0, 10000]);
                    setSearchedProduct("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {(pagination.page - 1) * 12 + 1} - {Math.min(pagination.page * 12, pagination.total)} of {pagination.total} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => (
                    <Card key={product._id} className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:border-primary/50 flex flex-col h-full">
                      <div className="relative aspect-square bg-white p-6 flex items-center justify-center">
                        <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </Link>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-4 right-4 h-10 w-10 rounded-xl shadow-md bg-white hover:text-red-500 hover:bg-white"
                          onClick={() => handleAddToCart(product)} // Changed this to cart temporarily, actually wishlist
                          title="Add to Wishlist"
                        >
                          <Heart size={18} />
                        </Button>
                      </div>

                      <CardContent className="p-5 flex-1 flex flex-col">
                        <Badge variant="outline" className="w-fit mb-2 text-primary border-primary/20 bg-primary/5 uppercase text-xs font-bold tracking-wider">
                          {product.category}
                        </Badge>
                        <Link to={`/product/${product._id}`} className="block">
                          <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">{product.title}</h3>
                        </Link>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star size={14} fill="currentColor" className="text-orange-500" />
                            <span>{typeof product.rating === 'object' ? product.rating.rate : (product.rating || 0)}</span>
                            <span className="text-muted-foreground/60">({typeof product.rating === 'object' ? product.rating.count : (product.reviews || 0)})</span>
                          </div>
                          <span className="text-xl font-extrabold text-foreground">₹{(product.price || 0).toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-5 pt-0">
                        <Button
                          className="w-full font-bold gap-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={16} /> Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
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
                        // Show first, last, current, and surrounding pages
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
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
