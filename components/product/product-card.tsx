import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
            // priority={true}
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

export default ProductCard;
