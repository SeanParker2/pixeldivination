import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ShopBanner } from '../components/shop/ShopBanner';
import { FilterBar, type SortType, type CategoryType } from '../components/shop/FilterBar';
import { ProductCard } from '../components/shop/ProductCard';
import { CartDrawer } from '../components/shop/CartDrawer';
import { PRODUCTS, type Product } from '../data/products';
import { shopService } from '../services/shopService';

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [category, setCategory] = useState<CategoryType>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const result = await shopService.getProducts({
          category: category === 'all' ? undefined : category,
        });
        if (result.items && result.items.length > 0) {
          setProducts(result.items);
        }
      } catch (error) {
        console.error('Failed to fetch products, using fallback:', error);
        // Keep using default PRODUCTS
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'sales':
        // Mock sales sorting - in real app would come from backend
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-md mx-auto pt-4 pb-32 px-4 flex flex-col gap-4">
      {/* Header */}
      <ShopHeader onCartClick={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <ShopBanner />
      
      <FilterBar
        onSortChange={setSortBy}
        onCategoryChange={setCategory}
        currentSort={sortBy}
        currentCategory={category}
      />

      {/* Product List */}
      <div className="flex flex-col w-full gap-2.5 mt-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbbf24]"></div>
          </div>
        ) : (
          sortedProducts.map((product, index) => (
            <div key={product.id} onClick={() => navigate(`/shop/${product.id}`)} className="cursor-pointer">
              <ProductCard
                title={product.name}
                category={product.category}
                buff={product.buff}
                price={product.price.toString()}
                imageUrl={product.image}
                hasAudio={product.category === 'audio'}
                index={index}
              />
            </div>
          ))
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
