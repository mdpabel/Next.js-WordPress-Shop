import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/layout/navbar';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased bg-black/90`}>
        <div className='grid grid-rows-[1fr_auto_1fr] min-h-[100dvh]'>
          <Navbar />
          <main>
            {children}
            <ToastContainer />
          </main>
        </div>
      </body>
    </html>
  );
}
