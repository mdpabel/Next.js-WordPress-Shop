'use client';
import { Input } from '../ui/input';
import { FiSearch } from 'react-icons/fi';
import { useSearch } from '@/hooks/useSearch';
import Spinner from '../common/spinner';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Search = ({ className = '' }: { className?: string }) => {
  const [text, setText] = useState('');
  const { isPending, label } = useSearch({
    label: 'query',
    text,
    condition: text.length > 0,
  });

  return (
    <div className={cn('flex justify-center md:w-1/3', className)}>
      <form className='relative w-full lg:w-80 xl:w-full'>
        <Input
          type='text'
          placeholder='Search for products...'
          className='bg-transparent px-4 py-2 border rounded-lg w-full text-md text-neutral-300 md:text-sm placeholder:text-neutral-500'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className='top-1/2 right-3 absolute -translate-y-1/2'>
          {isPending && label === 'query' ? (
            <Spinner className='w-5 h-5 text-neutral-300' />
          ) : (
            <FiSearch className='w-5 h-5 text-neutral-300' />
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
