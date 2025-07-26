import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../styles/ProductPage.css";
import FilterPanel from "../components/FilterPanel";
import { Star } from "lucide-react";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1900]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };


  const debouncedSearch = debounce((value) => {
    setSearchedProduct(value);
  }, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://api.npoint.io/a991a2f047edfde77cdc");
        const data = await res.json();
        console.log("API Response:", data); 
        if (!Array.isArray(data.products) && !Array.isArray(data)) {
          throw new Error("Invalid data format from API");
        }
        const productList = Array.isArray(data.products) ? data.products : data;
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        toast.error("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedRating) {
      result = result.filter(
        (product) =>
          product.rating &&
          parseFloat(product.rating) >= parseFloat(selectedRating)
      );
    }

    result = result.filter((product) => {
      const productPrice = product.price ? parseFloat(product.price) : 0;
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });

    if (searchedProduct) {
      result = result.filter(
        (product) =>
          product.title &&
          product.title.toLowerCase().includes(searchedProduct.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedRating, priceRange, searchedProduct]);

  const handleAddToCart = (product) => {
    if (!product._id) {
      console.warn("Product missing _id, skipping add to cart");
      toast.error("Product information is incomplete. Please try again.");
      return;
    }
    const alreadyInCart = cartItems.find((item) => item._id === product._id);
    if (alreadyInCart) {
      toast.error("Item is already in your cart!");
      return;
    }
    setCartItems((prev) => [...prev, product]);
    console.log("Cart items:", cartItems);
    localStorage.setItem("cart", JSON.stringify([...cartItems, product]));
    toast.success(`${product.title} added to cart successfully!`);
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Showing All Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => debouncedSearch(e.target.value)}
        className="search-input"
      />

      <div className="products-container">
        <div className="left-panel">
          <FilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        <div className="right-panel">
          {isLoading ? (
            <p className="loading-text">Loading products...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="loading-text">No products found.</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="rating-badge">
                    <Star
                      size={16}
                      color="var(--primary-color)"
                      fill="var(--primary-color)"
                      style={{ marginRight: "4px" }}
                    />
                    {product.rating || "N/A"} | {product.reviews || 0} reviews
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">₹{product.price || 0}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
