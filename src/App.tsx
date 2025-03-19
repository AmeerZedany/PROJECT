import React, { useState } from 'react';
import { Search, SlidersHorizontal, ShoppingBag, Package } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { CartItem, Product } from './types';

function App() {
  const [selectedSection, setSelectedSection] = useState<'welcome' | 'buy' | 'catalog'>('welcome');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesColor = !selectedColor || product.colors.includes(selectedColor);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesColor && matchesCategory;
  });

  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));
  const allCategories = Array.from(new Set(products.map(p => p.category)));

  const handleAddToCart = (product: Product, color: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity: 1, color }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  if (selectedSection === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Nihad Store</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <button
              onClick={() => setSelectedSection('buy')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center gap-4"
            >
              <ShoppingBag size={48} className="text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Buy Products</h2>
                <p className="text-gray-600">Browse and purchase from our collection of premium merchandise</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedSection('catalog')}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center gap-4"
            >
              <Package size={48} className="text-blue-600" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Catalog</h2>
                <p className="text-gray-600">View our complete product catalog with detailed specifications</p>
              </div>
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (selectedSection === 'catalog') {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
            <button
              onClick={() => setSelectedSection('welcome')}
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Welcome
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-gray-600" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={selectedColor || ''}
                onChange={(e) => setSelectedColor(e.target.value || null)}
                className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Colors</option>
                {allColors.map(color => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.id}</p>
                    </div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Available Colors:</p>
                    <div className="flex gap-2 mt-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className={`
                            w-6 h-6 rounded-full border-2 border-gray-300
                            ${color === 'white' ? 'bg-white' : ''}
                            ${color === 'black' ? 'bg-black' : ''}
                            ${color === 'navy' ? 'bg-navy-500' : ''}
                            ${color === 'gray' ? 'bg-gray-500' : ''}
                            ${color === 'natural' ? 'bg-[#f5e6d3]' : ''}
                          `}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-bold">
                    ${product.basePrice.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Buy Products</h1>
          <button
            onClick={() => setSelectedSection('welcome')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Welcome
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-gray-600" />
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {allCategories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedColor || ''}
                  onChange={(e) => setSelectedColor(e.target.value || null)}
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Colors</option>
                  {allColors.map(color => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;