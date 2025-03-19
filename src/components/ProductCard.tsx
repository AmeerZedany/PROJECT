import React from "react";
import { ShoppingCart, Info } from "lucide-react";
import { Product, PRICING_TIERS, formatPrice } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [showPricingTiers, setShowPricingTiers] = React.useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Name & ID */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.id}</p>
          </div>

          {/* Price & Pricing Info */}
          <div className="text-right">
            <span className="text-xl font-bold text-blue-600">{formatPrice(product.basePrice)}</span>
            <button
              onClick={() => setShowPricingTiers(!showPricingTiers)}
              className="ml-2 text-gray-500 hover:text-blue-700 transition"
              title="Show bulk pricing"
            >
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Bulk Pricing Tiers */}
        {showPricingTiers && (
          <div className="mt-3 bg-gray-50 p-3 rounded-lg shadow-inner animate-fadeIn">
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Bulk Pricing:</h4>
            <div className="space-y-1">
              {PRICING_TIERS.map((tier, index) => (
                <div key={index} className="text-sm flex justify-between">
                  <span className="text-gray-600">{tier.label}</span>
                  <span className="font-medium text-green-600">
                    {formatPrice(product.basePrice * (1 - tier.discount))}/each
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3">{product.description}</p>

        {/* Color Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Select Color:</label>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`
                  w-7 h-7 rounded-full border-2 transition-transform transform hover:scale-110
                  ${selectedColor === color ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"}
                  ${color === "white" ? "bg-white" : ""}
                  ${color === "black" ? "bg-black" : ""}
                  ${color === "navy" ? "bg-navy-500" : ""}
                  ${color === "gray" ? "bg-gray-500" : ""}
                  ${color === "natural" ? "bg-[#f5e6d3]" : ""}
                `}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Inventory Information */}
        <div className="mt-4 text-sm text-gray-600">
          Available: <span className="font-medium text-gray-900">{product.inventory} units</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product, selectedColor)}
          className={`
            mt-4 w-full py-2 px-4 rounded-md text-white flex items-center justify-center gap-2 transition-all
            ${product.inventory === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
          disabled={product.inventory === 0}
        >
          <ShoppingCart size={20} />
          {product.inventory === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
