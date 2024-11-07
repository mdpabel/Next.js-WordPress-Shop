import FeaturedProducts from '@/components/product/featured-products';

export const dynamic = 'force-static';

const HomePage = () => {
  return (
    <div>
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
