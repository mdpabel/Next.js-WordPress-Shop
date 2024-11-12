import ProductCard from '@/components/product/product-card';
import { getCategoryBySlug } from '@/lib/woocommerce/category';
import { getProducts } from '@/lib/woocommerce/product';
import React from 'react';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    query: string;
    'max-price': string;
    'min-price': string;
  }>;
};

const page = async ({ params, searchParams }: Props) => {
  const slug = (await params).slug;
  const searchP = await searchParams;
  const searchQuery = searchP.query;
  const minPrice = searchP['min-price'];
  const maxPrice = searchP['max-price'];
  const categoryId = await getCategoryBySlug(slug);

  const products = await getProducts({
    category: categoryId,
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

export default page;
