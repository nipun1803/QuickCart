import React, { useState, useEffect } from "react";
import "./Product.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchedProduct, setSearchedProduct] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleDescription = (productId) => {
    setSelectedProductId((prevId) => (prevId === productId ? null : productId));
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Products</h1>
      <input
        onChange={(e) => {
          setSearchedProduct(e.target.value);
        }}
        className="search-input"
      ></input>
      {products.length === 0 ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="products-grid">
          {products
            .filter((e) => {
              if (searchedProduct) {
                return e.title.toLowerCase().trim().includes(searchedProduct);
              } else {
                return true;
              }
            })
            .map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => toggleDescription(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-rating">
                  Rating: {product.rating.rate}⭐️ ({product.rating.count})
                </p>
                {selectedProductId === product.id && (
                  <p className="product-description">{product.description}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
