const express = require('express');
const router = express.Router();

// Mock data - dalam production gunakan database
let products = [
  {
    id: 1,
    name: 'Laptop Gaming',
    description: 'High performance gaming laptop',
    price: 15000000,
    category: 'Electronics',
    stock: 10
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    price: 250000,
    category: 'Accessories',
    stock: 50
  },
  {
    id: 3,
    name: 'USB-C Cable',
    description: 'Fast charging USB-C cable',
    price: 150000,
    category: 'Accessories',
    stock: 100
  },
  {
    id: 4,
    name: 'Monitor 27 inch',
    description: '4K Ultra HD Monitor',
    price: 3000000,
    category: 'Electronics',
    stock: 8
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    description: 'RGB Mechanical Keyboard',
    price: 1200000,
    category: 'Accessories',
    stock: 25
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST create new product
router.post('/', (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  if (!name || !price || !stock) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    description: description || '',
    price: parseInt(price),
    category: category || 'General',
    stock: parseInt(stock)
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, description, price, category, stock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = parseInt(price);
  if (category) product.category = category;
  if (stock !== undefined) product.stock = parseInt(stock);

  res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
});

module.exports = router;