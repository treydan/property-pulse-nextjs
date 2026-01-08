import '@/assets/styles/globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'Rental Properties, Real Estate',
  description: 'Find the perfect rental property'
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
