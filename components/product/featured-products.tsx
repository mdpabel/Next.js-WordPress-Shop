import { cn } from '@/lib/utils';
import { getProducts } from '@/lib/woocommerce/product';
import Image from 'next/image';
import Link from 'next/link';

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

// ProductCard component for displaying each product
const ProductCard = ({
  product,
  className = '',
  firstProduct = false,
}: {
  product: any;
  className?: string;
  firstProduct?: boolean;
}) => {
  const productImage = product.images?.[0]?.src || '/placeholder.png';

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className={cn(
          'relative bg-black group p-4 rounded-lg h-48 text-white border border-transparent hover:border-teal-600 transition',
          className,
        )}>
        {/* Title and Price */}
        <div className='top-2 right-2 z-50 absolute p-4 text-sm'>
          <div>{product.name}</div>
          <div className='font-bold text-end text-teal-600'>
            ${product.price}
          </div>
        </div>

        {/* Product Image */}
        <div className='flex justify-center items-center h-full'>
          <img
            src={productImage}
            width={300}
            height={300}
            alt={product.name}
            className={cn(
              'w-32 h-32 object-contain transform transition-transform duration-300',
              'group-hover:scale-110',
              firstProduct && 'lg:w-60 h-60',
            )}
          />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
