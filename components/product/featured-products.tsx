import { cn } from '@/lib/utils';
import { getProducts } from '@/lib/woocommerce/product';
import ProductCard from './product-card';

// Fetching products from WooCommerce
const FeaturedProducts = async () => {
  // Fetch products using the WooCommerce API utility function
  const products = await getProducts();

  return (
    <div className='mx-auto p-4 max-w-7xl container'>
      {/* First Row - 2 Products */}
      <div className='gap-6 grid grid-cols-1 lg:grid-cols-3 grid-rows-2'>
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className={cn(index === 0 && 'lg:col-span-2 lg:row-span-2')}>
            <ProductCard
              className='h-full'
              product={product}
              firstProduct={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Second Row - 3 Products */}
      <div className='flex gap-4 mt-4'>
        {products.slice(3, 6).map((product) => (
          <div key={product.id} className='flex-1'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Other Rows - 3 Products per row */}
      <div className='gap-4 grid grid-cols-1 md:grid-cols-3 mt-4'>
        {products.slice(6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
