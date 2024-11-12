import { Category } from '@/types/category';
import WooCommerce from '.';
import { cache } from 'react';

export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const response = await WooCommerce.get('products/categories');

    // Filter out the 'Uncategorized' category
    const filteredCategories = response.data.filter(
      (category: Category) => category.name !== 'Uncategorized',
    );

    // Return the formatted categories
    return filteredCategories.map((category: Category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parent: category.parent,
      description: category.description,
      display: category.display,
      image: category.image,
      menu_order: category.menu_order,
      count: category.count,
      _links: category._links,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});

export const getCategoryBySlug = cache(async (slug: string) => {
  try {
    const response = await WooCommerce.get('products/categories', {
      slug,
    });

    if (response.data.length === 0) {
      return null; // No category found for the slug
    }

    return response.data[0].id; // Return the first matching category
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
});
