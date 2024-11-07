import Image from 'next/image';
import { getProductBySlug } from '@/lib/woocommerce/product';
import { notFound } from 'next/navigation';
import CartController from '@/components/product/cart-controller';

type Props = {
  params: Promise<{ slug: string }>;
};

const ProductDetailsPage = async ({ params }: Props) => {
  const slug = (await params).slug;
  if (!slug) {
    return notFound();
  }

  // Fetch product by slug
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  // Extracting product details
  const productImage = product.images?.[0]?.src || '/placeholder.png';
  const productPrice = product.price
    ? `$${product.price}`
    : 'Price not available';
  const productDescription = product.description || 'No description available.';
  const productFeatures = product.attributes?.[0]?.options || [
    'Feature not specified',
  ];

  return (
    <div className='mx-auto p-4 max-w-7xl container'>
      <div className='flex lg:flex-row flex-col gap-8 bg-black py-10'>
        {/* Product Image */}
        <div className='flex flex-1 justify-center items-center'>
          <div className='relative p-4 rounded-lg'>
            <img
              src={productImage}
              alt={product.name}
              width={500}
              height={500}
              className='w-full h-full transition-transform duration-300 object-contain hover:scale-105'
            />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex flex-col flex-1 justify-center space-y-6 p-8'>
          {/* Product Name and Price */}
          <div>
            <h1 className='font-bold text-3xl text-white'>{product.name}</h1>
            <p className='font-semibold text-teal-600 text-xl'>
              {productPrice}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className='font-semibold text-white text-xl'>Description</h2>
            <p
              className='mt-2 text-neutral-400'
              dangerouslySetInnerHTML={{
                __html: productDescription,
              }}></p>
          </div>

          {/* Features */}
          <div>
            <h2 className='font-semibold text-white text-xl'>Features</h2>
            <ul className='mt-2 text-neutral-400 list-disc list-inside'>
              {productFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <CartController product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
