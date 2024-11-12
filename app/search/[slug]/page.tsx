import ProductCard from '@/components/product/product-card';
import { getCategoryBySlug } from '@/lib/woocommerce/category';
import { getProducts } from '@/lib/woocommerce/product';
import React from 'react';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const categoryId = await getCategoryBySlug(slug);

  console.log({ categoryId, slug });

  const products = await getProducts({
    category: categoryId,
  });

  return (
    <div className='gap-4 grid grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;
