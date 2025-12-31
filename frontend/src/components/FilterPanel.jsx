import React, { useEffect } from "react";
import { Star, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function FilterPanel({
  selectedCategory,
  setSelectedCategory,
  selectedRating,
  setSelectedRating,
  priceRange,
  setPriceRange,
  onClose
}) {
  useEffect(() => {
    if (!Array.isArray(priceRange) || priceRange.length !== 2) {
      setPriceRange([0, 10000]);
    }
  }, [priceRange, setPriceRange]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedRating(0);
    setPriceRange([0, 10000]);
  };

  const categories = ["Men", "Women", "Kids"];

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border space-y-0">
        <CardTitle className="text-lg font-bold">Filters</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </Button>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Category */}
        <div className="space-y-4">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Category</Label>
          <RadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="cat-all" />
              <Label htmlFor="cat-all" className="cursor-pointer font-normal">All Categories</Label>
            </div>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <RadioGroupItem value={cat} id={`cat-${cat}`} />
                <Label htmlFor={`cat-${cat}`} className="cursor-pointer font-normal">{cat}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price Range</Label>
            <Badge variant="outline" className="font-mono text-xs">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Badge>
          </div>
          <Slider
            defaultValue={[0, 10000]}
            value={priceRange}
            max={10000}
            min={0}
            step={50}
            onValueChange={setPriceRange}
            className="py-4"
          />
        </div>

        {/* Rating */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Min Rating</Label>
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedRating} <Star size={10} fill="currentColor" />
            </Badge>
          </div>
          <Slider
            defaultValue={[0]}
            value={[selectedRating]}
            max={5}
            min={0}
            step={0.5}
            onValueChange={(val) => setSelectedRating(val[0])}
            className="py-4"
          />
        </div>

        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}

export default FilterPanel;