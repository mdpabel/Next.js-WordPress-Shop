export type Order = {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: Address;
  shipping: Address;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_paid_gmt: string | null;
  date_completed: string | null;
  date_completed_gmt: string | null;
  cart_hash: string;
  meta_data: MetaData[];
  line_items: LineItem[];
  tax_lines: TaxLine[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: Refund[];
  _links: Links;
  currency_symbol: string;
};

export type Address = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
};

export type MetaData = {
  id: number;
  key: string;
  value: string;
};

export type LineItem = {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: Tax[];
  meta_data: MetaData[];
  sku: string;
  price: number;
  image?: {
    id: string;
    src: string;
  }; // Optional image property
};

export type Tax = {
  id: number;
  total: string;
  subtotal: string;
};

export type TaxLine = {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: MetaData[];
};

export type ShippingLine = {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: Tax[];
  meta_data: MetaData[];
};

export type Refund = {
  id: number;
  refund: string;
  total: string;
};

export type Links = {
  self: { href: string }[];
  collection: { href: string }[];
  customer?: { href: string }[];
};
