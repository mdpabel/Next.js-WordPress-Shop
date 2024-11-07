'use client';
import Link from 'next/link';
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { ReactNode } from 'react';

const sidebarItems = [
  { href: '/account/profile', label: 'Profile', icon: <FiUser /> },
  { href: '/account/orders', label: 'Orders', icon: <FiShoppingBag /> },
  { href: '/account/addresses', label: 'Addresses', icon: <FiMapPin /> },
  { href: '/account/settings', label: 'Settings', icon: <FiSettings /> },
  {
    href: '/account/logout',
    label: 'Logout',
    icon: <FiLogOut />,
    isLogout: true,
  },
];

const Sidebar = () => {
  return (
    <aside className='lg:mr-8 w-full lg:w-1/4'>
      {/* Desktop Sidebar */}
      <div className='lg:block hidden bg-neutral-900 p-6 rounded-lg'>
        <h2 className='mb-6 font-semibold text-lg text-teal-600'>
          <Link href='/account'>Account</Link>
        </h2>
        <nav className='space-y-4'>
          {sidebarItems.map(({ href, label, icon, isLogout }) => (
            <SidebarLink
              key={label}
              href={href}
              icon={icon}
              label={label}
              isLogout={isLogout}
            />
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div className='lg:hidden bg-neutral-900 p-4 rounded-lg'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='bg-black hover:bg-black/90 w-full font-semibold text-left text-lg text-teal-600 hover:text-teal-600'>
              Account Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='left-0 bg-neutral-800 mt-2 w-full text-neutral-200'>
            {sidebarItems.map(({ href, label, icon, isLogout }) => (
              <DropdownMenuItem asChild key={label}>
                <Link
                  href={href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded ${
                    isLogout
                      ? 'text-red-500 hover:bg-red-600'
                      : 'hover:bg-teal-600'
                  } hover:text-white`}>
                  {icon}
                  <span>{label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

type SidebarLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
  isLogout?: boolean;
};

const SidebarLink = ({
  href,
  icon,
  label,
  isLogout = false,
}: SidebarLinkProps) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect to home page
  };

  return isLogout ? (
    <button
      onClick={handleLogout}
      className='flex items-center space-x-2 hover:bg-red-600 px-3 py-2 rounded w-full text-red-500 hover:text-white transition'>
      {icon}
      <span>{label}</span>
    </button>
  ) : (
    <Link
      href={href}
      className='flex items-center space-x-2 hover:bg-teal-600 px-3 py-2 rounded hover:text-white transition'>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
