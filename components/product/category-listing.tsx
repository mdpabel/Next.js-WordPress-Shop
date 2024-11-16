import { getProducts } from '@/lib/woocommerce/product';
import React from 'react';
import ProductCard from './product-card';
import Link from 'next/link';

// Group products by category
export const groupProductsByCategory = async () => {
  const products = await getProducts(); // Fetch products from WooCommerce API

  // Group products by category
  const groupedByCategory = products.reduce(
    (acc: Record<string, any[]>, product: any) => {
      product.categories.forEach((category: any) => {
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(product);
      });
      return acc;
    },
    {},
  );

  return groupedByCategory;
};

const CategoryListing = async () => {
  const groupedProducts = await groupProductsByCategory(); // Group products by category

  console.log(groupedProducts);

  return (
    <div className='mx-auto p-4 max-w-7xl'>
      {/* Loop through categories and render product cards */}
      {Object.keys(groupedProducts).map((categoryName) => {
        const products = groupedProducts[categoryName];
        console.log({ products });
        return (
          <section key={categoryName} className='space-y-4 mb-8'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-2xl text-teal-600'>
                {categoryName}
              </h2>
              <Link href={`/search/`} className='text-teal-600'>
                View All
              </Link>
            </div>
            <div className='gap-6 grid grid-cols-1 lg:grid-cols-3'>
              {/* Display the first 3 products in the category */}
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className='w-full'>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* View All button */}
          </section>
        );
      })}
    </div>
  );
};

export default CategoryListing;
