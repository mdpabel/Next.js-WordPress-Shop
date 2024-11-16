import CategoryListing from '@/components/product/category-listing';
import FeaturedProducts from '@/components/product/featured-products';

export const dynamic = 'force-static';

const HomePage = () => {
  return (
    <div>
      <FeaturedProducts />
      <CategoryListing />
    </div>
  );
};

export default HomePage;
