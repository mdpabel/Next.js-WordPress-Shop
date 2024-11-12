'use client';
import React, { useState } from 'react';
import { Category } from '@/types/category'; // Assuming the types are already defined
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import Search from './search';
import { useSearch } from '@/hooks/useSearch';
import Spinner from '../common/spinner';

type StoreSidebarClientProps = {
  categories: Category[];
};

const StoreSidebarClient: React.FC<StoreSidebarClientProps> = ({
  categories,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice') {
      setPriceRange([parseInt(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], parseInt(value)]);
    }
  };

  const { isPending: minPricePending, label: minLabel } = useSearch({
    label: 'min-price',
    text: priceRange[0].toString(),
    condition: priceRange[0] > 0,
  });

  const { isPending: maxPricePending, label: maxLabel } = useSearch({
    label: 'max-price',
    text: priceRange[1].toString(),
    condition: priceRange[1] < 1000,
  });

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
  };

  return (
    <div className='bg-neutral-900 p-6 border-r border-r-neutral-700 w-full'>
      {/* Search Bar */}
      <section className='mb-6'>
        <h2 className='mb-2 font-semibold text-lg text-teal-600'>
          Search Products
        </h2>
        <Search className='md:w-full' />
      </section>

      {/* Category Filters - Accordion for mobile */}
      <section className='mb-6'>
        <h2 className='mb-2 font-semibold text-lg text-teal-600'>Categories</h2>
        <div className='block lg:hidden'>
          <Accordion type='single' collapsible>
            <AccordionItem value='categories'>
              <AccordionTrigger className='w-full text-left text-neutral-300 hover:text-teal-600'>
                Categories
              </AccordionTrigger>
              <AccordionContent>
                <ul className='space-y-4'>
                  <li className='text-neutral-300'>
                    <Link
                      href={`/search`}
                      className='w-full text-left hover:text-teal-600'>
                      All
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id} className='text-neutral-300'>
                      <Link
                        href={`/search/${category.slug}`}
                        className='w-full text-left hover:text-teal-600'>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop Category List */}
        <ul className='lg:block space-y-4 hidden'>
          <li className='w-full text-neutral-300'>
            <Link
              href={`/search`}
              className='block w-full text-left hover:text-teal-600'>
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className='w-full text-neutral-300'>
              <Link
                href={`/search/${category.slug}`}
                className='block w-full text-left hover:text-teal-600'>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Range Filter - Accordion for mobile */}
      <section className='mb-6'>
        <h2 className='flex items-center gap-2 mb-2 font-semibold text-lg text-teal-600'>
          Price Range{' '}
          {((minPricePending && minLabel === 'min-price') ||
            (maxPricePending && maxLabel === 'max-price')) && (
            <Spinner className='w-5 h-5 text-neutral-300' />
          )}
        </h2>
        <div className='block lg:hidden'>
          <Accordion type='single' collapsible>
            <AccordionItem value='priceRange'>
              <AccordionTrigger className='w-full text-left text-neutral-300 hover:text-teal-600'>
                Price Range
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex justify-between gap-4'>
                  <input
                    type='number'
                    name='minPrice'
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    min='0'
                    className='bg-neutral-800 p-2 rounded-lg w-1/2 text-neutral-200'
                    placeholder='Min'
                  />
                  <input
                    type='number'
                    name='maxPrice'
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    min='0'
                    className='bg-neutral-800 p-2 rounded-lg w-1/2 text-neutral-200'
                    placeholder='Max'
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Desktop Price Range */}
        <div className='lg:flex justify-between gap-4 hidden'>
          <input
            type='number'
            name='minPrice'
            value={priceRange[0]}
            onChange={handlePriceChange}
            min='0'
            className='bg-neutral-800 p-2 rounded-lg w-1/2 text-neutral-200'
            placeholder='Min'
          />
          <input
            type='number'
            name='maxPrice'
            value={priceRange[1]}
            onChange={handlePriceChange}
            min='0'
            className='bg-neutral-800 p-2 rounded-lg w-1/2 text-neutral-200'
            placeholder='Max'
          />
        </div>
      </section>

      {/* Clear Filters */}
      <div className='mt-6'>
        <button
          onClick={handleClearFilters}
          className='bg-red-600 hover:bg-red-700 py-2 rounded-lg w-full text-white'>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default StoreSidebarClient;
