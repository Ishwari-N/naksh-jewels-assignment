const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static('public'));

// Products with actual image URLs from Unsplash or local public folder
let products = [
  {
    id: 1,
    name: "Diamond Necklace",
    price: 29999,
    image: "/necklace.jpg",
    description: "Elegant diamond necklace with premium craftsmanship",
    category: "necklace",
    material: "Diamond & Gold"
  },
  {
    id: 2,
    name: "Gold Earrings",
    price: 15999,
    image: "/gold-earrings.webp",  
    description: "Traditional gold earrings with intricate design",
    category: "earrings",
    material: "24K Gold"
  },
  {
    id: 3,
    name: "Pearl Bracelet",
    price: 8999,
    image: "/pearl-bracelet.webp",
    description: "Classic pearl bracelet with silver chain",
    category: "bracelet",
    material: "Pearl & Silver"
  },
  {
    id: 4,
    name: "Sapphire Ring",
    price: 24999,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
    description: "Royal sapphire ring with diamond accents",
    category: "ring",
    material: "Sapphire & Diamond"
  },
  {
    id: 5,
    name: "Ruby Pendant",
    price: 18999,
    image: "/ruby-pendent.webp",
    description: "Ruby gemstone pendant with gold chain",
    category: "pendant",
    material: "Ruby & Gold"
  },
  {
    id: 6,
    name: "Emerald Bangle",
    price: 22999,
    image: "/bangle.webp",
    description: "Emerald bangle with gold plating",
    category: "bangle",
    material: "Emerald & Gold"
  },
  {
    id: 7,
    name: "Diamond Stud Earrings",
    price: 34999,
    image: "/studs.webp",
    description: "Premium diamond stud earrings",
    category: "earrings",
    material: "Diamond & Platinum"
  },
  {
    id: 8,
    name: "Gold Chain Necklace",
    price: 12999,
    image: "/gold-necklace.webp",
    description: "Classic gold chain necklace",
    category: "necklace",
    material: "22K Gold"
  }
];

let cart = [];

// Validation middleware
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  if (price <= 0) {
    return res.status(400).json({ error: 'Price must be greater than 0' });
  }
  next();
};

// GET /products API
app.get('/api/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /cart API
app.post('/api/cart', validateProduct, (req, res) => {
  try {
    const { id, name, price, image } = req.body;
    
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1
      });
    }

    res.status(201).json({
      message: 'Item added to cart',
      cart: cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// PUT /cart/:id - Update quantity
app.put('/api/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const item = cart.find(item => item.id === parseInt(id));
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart = cart.filter(item => item.id !== parseInt(id));
    } else {
      item.quantity = quantity;
    }
    
    res.json({
      message: 'Cart updated',
      cart: cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// DELETE /cart/:id - Remove item
app.delete('/api/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== parseInt(id));
    res.json({
      message: 'Item removed from cart',
      cart: cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// GET /cart - Get cart items
app.get('/api/cart', (req, res) => {
  try {
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});
