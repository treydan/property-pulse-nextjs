import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { getSessionServer } from '@/utils/getSessionServer';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'Rental Properties, Real Estate',
  description: 'Find the perfect rental property',
};

const RootLayout = async ({ children }) => {
  const session = await getSessionServer();

  return (
    <AuthProvider session={session}>
      <html lang='en'>
        <body className='flex flex-col min-h-screen'>
          <NavBar />
          <main className='flex-1'>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
