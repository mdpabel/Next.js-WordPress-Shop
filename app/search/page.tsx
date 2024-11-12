import ProductCard from '@/components/product/product-card';
import { getProducts } from '@/lib/woocommerce/product';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    query: string;
    'max-price': string;
    'min-price': string;
  }>;
};

const Store = async ({ params, searchParams }: Props) => {
  const searchP = await searchParams;
  const searchQuery = searchP.query;
  const minPrice = searchP['min-price'];
  const maxPrice = searchP['max-price'];

  const products = await getProducts({
    search: searchQuery,
    min_price: minPrice,
    max_price: maxPrice,
  });

  if (!products.length) {
    return <p className='p-2 text-neutral-200'>No products found</p>;
  }

  return (
    <div className='gap-4 grid grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Store;
