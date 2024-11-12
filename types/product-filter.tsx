// Define the allowed query parameters for fetching products
export interface ProductFilters {
  context?: 'view' | 'edit'; // Scope under which the request is made
  page?: number; // Current page of the collection (Default: 1)
  per_page?: number; // Maximum number of items to return (Default: 10)
  search?: string; // Limit results to those matching a string
  after?: string; // Limit response to resources published after a given date
  before?: string; // Limit response to resources published before a given date
  modified_after?: string; // Limit response to resources modified after a given date
  modified_before?: string; // Limit response to resources modified before a given date
  dates_are_gmt?: boolean; // Whether to consider GMT post dates when limiting by date
  exclude?: number[]; // Exclude specific IDs from results
  include?: number[]; // Limit result set to specific IDs
  offset?: number; // Offset the result set by a specific number of items
  order?: 'asc' | 'desc'; // Order of sorting (Default: desc)
  orderby?:
    | 'date'
    | 'modified'
    | 'id'
    | 'include'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating'
    | 'menu_order'; // Sorting attribute
  parent?: number[]; // Limit result set to those of particular parent IDs
  parent_exclude?: number[]; // Exclude result set from particular parent IDs
  slug?: string; // Limit result set to products with a specific slug
  status?: 'any' | 'draft' | 'pending' | 'private' | 'publish'; // Product status (Default: any)
  type?: 'simple' | 'grouped' | 'external' | 'variable'; // Product type
  sku?: string; // Limit result set to products with a specific SKU
  featured?: boolean; // Limit result set to featured products
  category?: string; // Limit result set to a specific category
  tag?: string; // Limit result set to a specific tag
  shipping_class?: string; // Limit result set to a specific shipping class
  attribute?: string; // Limit result set to products with a specific attribute
  attribute_term?: string; // Limit result set to products with a specific attribute term
  tax_class?: string; // Limit result set to products with a specific tax class
  on_sale?: boolean; // Limit result set to products on sale
  min_price?: string; // Limit result set to products above a minimum price
  max_price?: string; // Limit result set to products below a maximum price
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'; // Stock status
}
