'use client';
import { useCart } from '../context/CartContext';
import styles from './Navigation.module.css';
import Link from 'next/link';

export default function Navigation() {
  const { cartCount } = useCart();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>💠</span>
            <div className={styles.logoTextContainer}>
              <div className={styles.logoHeading}>Naksh Jewels</div>
              <div className={styles.logoSubheading}>Discover Timeless Elegance</div>
            </div>
          </div>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Home</span>
          </Link>
          
          <Link href="/cart" className={styles.cartLink}>
            <div className={styles.cartIconContainer}>
              <span className={styles.cartIcon}>🛒</span>
              {cartCount > 0 && (
                <span className={styles.cartBadge}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className={styles.cartText}>
              Cart {/* Remove the (${cartCount}) from here */}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}