import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://api.npoint.io/a991a2f047edfde77cdc");
        const data = await res.json();
        const products = data.products || data;
        const found = products.find((p) => p._id === id);
        setProduct(found);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="product-details-page">Loading...</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-detail-card">
        <img src={product.image} alt={product.title} className="product-detail-img" />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="product-detail-price">₹{product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating} ({product.reviews} reviews)</p>
          <p className="product-detail-desc">{product.description}</p>
          <button className="product-detail-btn">Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;