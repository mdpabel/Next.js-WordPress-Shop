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

type StoreSidebarClientProps = {
  categories: Category[];
};

const StoreSidebarClient: React.FC<StoreSidebarClientProps> = ({
  categories,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minPrice') {
      setPriceRange([parseInt(value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], parseInt(value)]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };

  return (
    <div className='bg-neutral-900 p-6 border-r border-r-neutral-700 w-full'>
      {/* Search Bar */}
      <section className='mb-6'>
        <h2 className='mb-2 font-semibold text-lg text-teal-600'>
          Search Products
        </h2>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search...'
          className='bg-neutral-800 p-2 rounded-lg w-full text-neutral-200'
        />
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
      </section>

      {/* Price Range Filter - Accordion for mobile */}
      <section className='mb-6'>
        <h2 className='mb-2 font-semibold text-lg text-teal-600'>
          Price Range
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
