import React, { useEffect } from "react";
import { Slider } from "@mui/material";
import { Star } from "lucide-react";
import "../styles/FilterPanel.css";

function FilterPanel({
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
}) {
  useEffect(() => {
    if (!Array.isArray(priceRange) || priceRange.length !== 2) {
      console.warn("Invalid priceRange prop, resetting to default [0, 1900]");
      setPriceRange([0, 1900]);
    }
  }, [priceRange, setPriceRange]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedRating(0);
    setPriceRange([0, 1900]);
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      {/* Filter for the category section */}
      <div className="filter-group">
        <p>Category:</p>
        {["Men", "Women", "Kids"].map((cat) => (
          <label key={cat}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
            />
            {cat}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ""}
            onChange={() => setSelectedCategory("")}
          />
          All
        </label>
      </div>

      {/* slider for rating bar*/}
      <div className="filter-group">
        <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Minimum Rating: {selectedRating}
          <Star size={16} color="#007bff" fill="#007bff" />
        </p>
        <Slider
          value={selectedRating}
          onChange={(e, newValue) => setSelectedRating(newValue)}
          min={0}
          max={5}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </div>

      {/* Slider for price range*/}
      <div className="filter-group">
        <p>
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>
        <Slider
          value={priceRange}
          onChange={(e, newRange) => setPriceRange(newRange)}
          min={400}
          max={1900}
          step={50}
          valueLabelDisplay="auto"
        />
      </div>

      <button className="clear-filters-btn" onClick={handleClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
}

export default FilterPanel;