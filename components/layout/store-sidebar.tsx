import React from 'react';
import StoreSidebarClient from './store-sidebar-client';
import { getCategories } from '@/lib/woocommerce/category';

const StoreSidebar = async () => {
  const categories = await getCategories();

  return <StoreSidebarClient categories={categories} />;
};

export default StoreSidebar;
