import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ShopBanner } from '../components/shop/ShopBanner';
import { FilterBar } from '../components/shop/FilterBar';
import { ProductCard } from '../components/shop/ProductCard';
import { CartDrawer } from '../components/shop/CartDrawer';
import { PRODUCTS } from '../data/products';

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <ShopHeader onCartClick={() => setIsCartOpen(true)} />

      {/* Main Scrollable Content */}
      <div className="flex flex-col pb-32 px-4 space-y-6">
        <ShopBanner />
        
        <FilterBar />

        {/* Product List */}
        <div className="flex flex-col w-full space-y-4">
          {PRODUCTS.map(product => (
            <div key={product.id} onClick={() => navigate(`/shop/${product.id}`)} className="cursor-pointer">
              <ProductCard
                title={product.title}
                category={product.category}
                buff={product.buff}
                price={product.price}
                imageUrl={product.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
