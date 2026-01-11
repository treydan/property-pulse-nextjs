import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getSessionServer } from '@/utils/getSessionServer';

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
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
