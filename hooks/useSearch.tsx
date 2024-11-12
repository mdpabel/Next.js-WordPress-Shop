'use client';
import { useEffect, useTransition } from 'react';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSearch = ({
  label,
  text,
  condition = true,
}: {
  label: string;
  text: string;
  condition?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [value] = useDebounce(text, 150);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(label, value);
    } else {
      params.delete(label);
    }
    if (condition) {
      startTransition(() => router.replace(pathName + '?' + params.toString()));
    }
  }, [pathName, router, searchParams, value]);

  return { isPending, label };
};
