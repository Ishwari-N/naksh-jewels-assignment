'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setAdding(true);
    const success = await addToCart(product);
    setAdding(false);
    
    if (success) {
      // Show success feedback
      if (onAddToCart) onAddToCart(product);
    } else {
      alert('Failed to add item to cart');
    }
  };

  const getFallbackEmoji = () => {
    switch(product.category) {
      case 'necklace': return '📿';
      case 'earrings': return '✨';
      case 'bracelet': return '🔗';
      case 'ring': return '💍';
      case 'pendant': return '❤️';
      case 'bangle': return '⭕';
      default: return '💎';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {!imageError && product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className={styles.productImage}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className={styles.fallbackImage}>
            <span className={styles.fallbackEmoji}>{getFallbackEmoji()}</span>
            <span className={styles.fallbackText}>{product.name.charAt(0)}</span>
          </div>
        )}
        <div className={styles.categoryBadge}>
          {product.category?.toUpperCase()}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.material}>
          <span className={styles.materialLabel}>Material:</span>
          <span className={styles.materialValue}>{product.material || 'Gold & Diamond'}</span>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <span className={styles.price}>₹{product.price.toLocaleString()}</span>
            <span className={styles.priceNote}>Free Shipping</span>
          </div>
          <button 
            className={`${styles.addButton} ${adding ? styles.adding : ''}`}
            onClick={handleAddToCart}
            disabled={adding}
            aria-label={`Add ${product.name} to cart`}
          >
            {adding ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <span className={styles.buttonIcon}>🛒</span>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}