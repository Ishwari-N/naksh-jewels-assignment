'use client';
import Navigation from '../../components/Navigation';
import CartItem from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from '../page.module.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, cartCount } = useCart();
  const shippingCost = 99;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  if (cartCount === 0) {
    return (
      <div className={styles.container}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.emptyCartContainer}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2>Your Shopping Cart is Empty</h2>
            <p>Add some exquisite jewelry to make it shine!</p>
            <a href="/" className={styles.continueShopping}>
              ← Continue Shopping
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation />
      
      <main className={styles.main}>
        <div className={styles.cartHeader}>
          <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
          <p className={styles.cartSubtitle}>
            {cartCount} item{cartCount !== 1 ? 's' : ''} • Total: ₹{total.toLocaleString()}
          </p>
        </div>
        
        <div className={styles.cartLayout}>
          {/* Left Column - Cart Items */}
          <div className={styles.cartItemsSection}>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          
          {/* Right Column - Order Summary */}
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            
            <div className={styles.summaryRow}>
              <span>Subtotal ({cartCount} items):</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>₹{shippingCost}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Tax (GST 18%):</span>
              <span>₹{(subtotal * 0.18).toLocaleString()}</span>
            </div>
            
            <div className={styles.summaryDivider}></div>
            
            <div className={styles.summaryRow}>
              <strong>Total Amount:</strong>
              <strong className={styles.totalAmount}>₹{total.toLocaleString()}</strong>
            </div>
            
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
            
            <div className={styles.paymentMethods}>
              <p className={styles.paymentTitle}>Secure Payment</p>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentIcon}>🏦</span>
                <span className={styles.paymentIcon}>📱</span>
                <span className={styles.paymentIcon}>💎</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Continue Shopping Section */}
        <div className={styles.continueShoppingSection}>
          <a href="/" className={styles.continueShoppingLink}>
            ← Continue Shopping
          </a>
        </div>
      </main>
    </div>
  );
}