import './globals.css';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'Naksh Jewels - Exquisite Handcrafted Jewelry',
  description: 'Premium jewelry e-commerce store',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body style={{ 
        backgroundColor: '#f9fafb',
        color: '#1f2937',
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}