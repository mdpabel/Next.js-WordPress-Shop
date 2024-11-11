import ProductCard from '@/components/product/product-card';
import { getProducts } from '@/lib/woocommerce/product';

export const dynamic = 'force-static';

const Store = async () => {
  const products = await getProducts();

  return (
    <div className='gap-4 grid grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Store;
