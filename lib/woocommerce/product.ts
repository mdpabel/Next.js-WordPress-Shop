import { WooProduct } from '@/types/woo-product';
import WooCommerce from '.';
import { cache } from 'react';
import { ProductFilters } from '@/types/product-filter';

// Utility function to get products with optional filters
export const getProducts = cache(
  async (filters: ProductFilters = {}): Promise<WooProduct[]> => {
    try {
      // Setup default query parameters
      const params: ProductFilters = {
        per_page: 20, // Number of products to fetch per page
        ...filters, // Merge provided filters with default params
      };

      // Fetch products from WooCommerce with the applied filters
      const response = await WooCommerce.get('products', { params });

      // Return the products data
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },
);

// Utility function to get a single product by ID
export const getProductById = cache(
  async (productId: number): Promise<WooProduct> => {
    try {
      const response = await WooCommerce.get(`products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw new Error('Failed to fetch product');
    }
  },
);

// Utility function to get products by category ID
export const getProductsByCategory = cache(
  async (categoryId: number): Promise<WooProduct[]> => {
    try {
      const response = await WooCommerce.get('products', {
        category: categoryId,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products for category ID ${categoryId}:`,
        error,
      );
      throw new Error('Failed to fetch products by category');
    }
  },
);

// Utility function to search products by keyword
export const searchProducts = cache(
  async (keyword: string): Promise<WooProduct[]> => {
    try {
      const response = await WooCommerce.get('products', {
        search: keyword,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Error searching products with keyword "${keyword}":`,
        error,
      );
      throw new Error('Failed to search products');
    }
  },
);

// Utility function to get a single product by slug
export const getProductBySlug = cache(
  async (slug: string): Promise<WooProduct> => {
    try {
      // Fetch products with the given slug
      const response = await WooCommerce.get('products', {
        slug: slug,
      });

      // Check if the product exists
      if (response.data && response.data.length > 0) {
        return response.data[0]; // Return the first matching product
      } else {
        throw new Error(`No product found with slug "${slug}"`);
      }
    } catch (error) {
      console.error(`Error fetching product with slug "${slug}":`, error);
      throw new Error('Failed to fetch product by slug');
    }
  },
);
