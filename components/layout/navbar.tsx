import BigScreenNavbar from './big-screen-navbar';
import SmallScreenNavbar from './small-screen-navbar';

const Navbar = () => {
  return (
    <nav className='mx-auto my-2 max-w-7xl container'>
      {/* Small Screen Navbar */}
      <SmallScreenNavbar />
      {/* Big Screen Navbar */}
      <BigScreenNavbar />
    </nav>
  );
};

export default Navbar;
