import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_API_URL || '', // Base URL for WooCommerce store
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '', // Consumer Key
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '', // Consumer Secret
  version: 'wc/v3', // WooCommerce API version
});

export default WooCommerce;
