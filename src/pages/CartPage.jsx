import { useState, useEffect } from "react";
export default function Cart() {
  // fetching items from localstorage
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let items = localStorage.getItem("cart");
    if (items) {
      items = JSON.parse(items);
      setCartItems(items);
    } else {
      setCartItems([]);
    }
  }, []);

  return (
    <div>
      {cartItems.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />

          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">₹{product.price || 0}</p>
        </div>
      ))}
    </div>
  );
}
