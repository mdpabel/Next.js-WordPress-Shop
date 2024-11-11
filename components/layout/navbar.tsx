import { getCategories } from '@/lib/woocommerce/category';
import BigScreenNavbar from './big-screen-navbar';
import SmallScreenNavbar from './small-screen-navbar';

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <nav className='mx-auto my-2 max-w-7xl container'>
      {/* Small Screen Navbar */}
      <SmallScreenNavbar categories={categories} />
      {/* Big Screen Navbar */}
      <BigScreenNavbar categories={categories} />
    </nav>
  );
};

export default Navbar;
