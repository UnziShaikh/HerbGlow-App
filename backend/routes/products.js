const express = require('express');
const router = express.Router();

// Dummy products - in future replace with DB model
const products = [
  { id: 1, name: 'Lavender Bliss', price: 6.5, description: 'Relaxing lavender soap with essential oil.' },
  { id: 2, name: 'Rose & Honey', price: 7.0, description: 'Gentle rose fragrance with honey.' },
  { id: 3, name: 'Mint Cleanse', price: 5.5, description: 'Refreshing mint and clay.' },
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
