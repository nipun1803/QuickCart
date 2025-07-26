import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
      setCartItems(items);
      const initialQuantities = {};
      items.forEach(item => {
        initialQuantities[item._id] = 1;
      });
      setQuantities(initialQuantities);
    } else {
      setCartItems([]);
      setQuantities({});
    }
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > 10) {
      toast.error("Maximum quantity allowed is 10");
      return;
    }
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
    toast.success("Quantity updated successfully!");
  };

  const removeItem = (productId) => {
    const updatedItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];
    setQuantities(updatedQuantities);
    
    toast.success("Item removed from cart!");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item._id] || 1;
      return total + (parseFloat(item.price) * quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.18;
    return subtotal + shipping + tax;
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Redirecting to checkout...");

  };

  const handleContinueShopping = () => {
    toast.success("Happy shopping!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-navbar">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="cart-title">Shopping Cart</h1>
          <div className="cart-icon">
            <ShoppingBag size={24} />
            <span className="cart-count">0</span>
          </div>
        </div>
        
        <div className="empty-cart">
          <ShoppingBag size={80} color="var(--primary-color)" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="start-shopping-btn" onClick={handleContinueShopping}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-navbar">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
        <h1 className="cart-title">Shopping Cart ({cartItems.length} items)</h1>
        <div className="cart-icon">
          <ShoppingBag size={24} />
          <span className="cart-count">{cartItems.length}</span>
        </div>
      </div>

      <div className="cart-container">
        <div className="cart-items-section">
          <div className="cart-header">
            <h2>Cart Items</h2>
            <span className="item-count">{cartItems.length} items</span>
          </div>
          
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">₹{item.price}</p>
                  
                  <div className="quantity-controls">
                    <span className="quantity-label">Quantity:</span>
                    <div className="quantity-buttons">
                      <button
                        onClick={() => updateQuantity(item._id, (quantities[item._id] || 1) - 1)}
                        className="quantity-btn"
                        disabled={(quantities[item._id] || 1) <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{quantities[item._id] || 1}</span>
                      <button
                        onClick={() => updateQuantity(item._id, (quantities[item._id] || 1) + 1)}
                        className="quantity-btn"
                        disabled={(quantities[item._id] || 1) >= 10}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    Total: ₹{(parseFloat(item.price) * (quantities[item._id] || 1)).toFixed(2)}
                  </div>
                </div>
                
                <button
                  onClick={() => removeItem(item._id)}
                  className="remove-btn"
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-item">
            <span>Subtotal ({cartItems.length} items):</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <div className="summary-item">
            <span>Shipping:</span>
            <span>{calculateSubtotal() > 500 ? "FREE" : "₹50.00"}</span>
          </div>
          
          <div className="summary-item">
            <span>Tax (18% GST):</span>
            <span>₹{(calculateSubtotal() * 0.18).toFixed(2)}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
          
          <div className="free-shipping-notice">
            {calculateSubtotal() < 500 && (
              <p>Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for FREE shipping!</p>
            )}
          </div>
          
          <button onClick={handleBuyNow} className="buy-now-btn">
            Proceed to Buy ({cartItems.length} items)
          </button>
          
          <div className="secure-checkout">
            <p>Secure checkout powered by QuickCart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
