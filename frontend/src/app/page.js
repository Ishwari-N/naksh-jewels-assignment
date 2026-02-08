'use client';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, cartCount } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    const success = await addToCart(product);
    if (success) {
      // You could show a toast notification here
    }
  };

  if (loading) return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading exquisite jewelry collection...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => {
            setLoading(true);
            setError('');
            fetchProducts();
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Navigation />
      
      <main className={styles.main}>
        
        <div className={styles.productsHeader}>
          <h2 className={styles.title}>Our Exclusive Collection</h2>
          <p className={styles.subtitle}>{products.length} Handcrafted jewelry that tells your story. Premium quality with traditional craftsmanship.</p>
        </div>
        
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>© 2024 Naksh Jewels. All rights reserved.</p>
        <p>Crafted with ❤️ in India</p>
      </footer>
    </div>
  );
}