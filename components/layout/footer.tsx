import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='bg-neutral-900 py-12 text-neutral-200'>
      <div className='mx-auto px-6 max-w-7xl'>
        <div className='gap-8 grid grid-cols-1 md:grid-cols-3'>
          {/* Column 1 - Company Information */}
          <div>
            <h3 className='font-semibold text-teal-600 text-xl'>Company</h3>
            <ul className='space-y-4 mt-4'>
              <li>
                <Link href='/about' className='hover:text-teal-400'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-teal-400'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='/terms' className='hover:text-teal-400'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='hover:text-teal-400'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Social Media Links */}
          <div>
            <h3 className='font-semibold text-teal-600 text-xl'>Follow Us</h3>
            <div className='space-x-4 mt-4'>
              <Link
                href='https://twitter.com'
                target='_blank'
                className='hover:text-teal-400'>
                <i className='fa-twitter fab'></i>
              </Link>
              <Link
                href='https://facebook.com'
                target='_blank'
                className='hover:text-teal-400'>
                <i className='fa-facebook-f fab'></i>
              </Link>
              <Link
                href='https://instagram.com'
                target='_blank'
                className='hover:text-teal-400'>
                <i className='fa-instagram fab'></i>
              </Link>
              <Link
                href='https://linkedin.com'
                target='_blank'
                className='hover:text-teal-400'>
                <i className='fa-linkedin-in fab'></i>
              </Link>
            </div>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h3 className='font-semibold text-teal-600 text-xl'>
              Subscribe to Our Newsletter
            </h3>
            <p className='mt-4 text-neutral-400 text-sm'>
              Stay updated with our latest offers and news.
            </p>
            <div className='mt-4'>
              <input
                type='email'
                placeholder='Enter your email'
                className='bg-neutral-800 mt-2 p-3 rounded-lg w-full text-neutral-200'
              />
              <button className='bg-teal-600 hover:bg-teal-700 mt-2 p-3 rounded-lg w-full text-white'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 text-center text-neutral-400 text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
