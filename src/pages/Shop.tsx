import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ShopBanner } from '../components/shop/ShopBanner';
import { FilterBar } from '../components/shop/FilterBar';
import { ProductCard } from '../components/shop/ProductCard';
import { PRODUCTS } from '../data/products';

export const Shop: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Header */}
      <ShopHeader />

      {/* Main Scrollable Content */}
      <div className="flex flex-col pb-32">
        <ShopBanner />
        
        <FilterBar />

        {/* Product List */}
        <div className="flex flex-col w-full">
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
    </MobileContainer>
  );
};
