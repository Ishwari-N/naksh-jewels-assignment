'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './CartItem.module.css';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${item.name} from cart?`)) {
      onRemove(item.id);
    }
  };

  const getFallbackEmoji = () => {
    if (item.name.includes('Necklace')) return '📿';
    if (item.name.includes('Earrings')) return '✨';
    if (item.name.includes('Bracelet')) return '🔗';
    if (item.name.includes('Ring')) return '💍';
    if (item.name.includes('Pendant')) return '❤️';
    if (item.name.includes('Bangle')) return '⭕';
    return '💎';
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <div className={styles.imageWrapper}>
          {!imageError && item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className={styles.itemImage}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className={styles.fallbackImage}>
              <span className={styles.fallbackEmoji}>{getFallbackEmoji()}</span>
            </div>
          )}
        </div>
        
        <div className={styles.itemDetails}>
          <h4 className={styles.itemName}>{item.name}</h4>
          <div className={styles.priceInfo}>
            <span className={styles.itemPrice}>₹{item.price.toLocaleString()}</span>
            <span className={styles.pricePerItem}>each</span>
          </div>
          <div className={styles.materialInfo}>
            <span className={styles.materialLabel}>Material:</span>
            <span className={styles.materialValue}>{item.material || 'Gold & Diamond'}</span>
          </div>
          
          <Link href="/" className={styles.addAnotherLink}>
            <span className={styles.addAnotherIcon}>+</span>
            Add Another Item
          </Link>
        </div>
      </div>
      
      <div className={styles.controlsSection}>
        <div className={styles.quantitySection}>
          <div className={styles.quantityLabel}>Quantity:</div>
          <div className={styles.quantityControl}>
            <button 
              onClick={handleDecrease}
              className={styles.quantityButton}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button 
              onClick={handleIncrease}
              className={styles.quantityButton}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        
        <div className={styles.totalSection}>
          <div className={styles.totalLabel}>Item Total:</div>
          <div className={styles.totalAmount}>₹{(item.price * quantity).toLocaleString()}</div>
        </div>
        
        <button 
          onClick={handleRemove}
          className={styles.removeButton}
          aria-label="Remove item"
        >
          <span className={styles.removeIcon}>🗑️</span>
          Remove
        </button>
      </div>
    </div>
  );
}