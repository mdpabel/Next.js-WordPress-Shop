'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import Spinner from './spinner';
import { cn } from '@/lib/utils';

const FormButton = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(
        'bg-teal-600 hover:bg-teal-700 py-3 rounded-md w-36 text-white',
        className,
      )}>
      {pending ? <Spinner /> : children}
    </Button>
  );
};

export default FormButton;
