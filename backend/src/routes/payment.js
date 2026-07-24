const express = require('express');
const router = express.Router();

// Manual payment endpoint
router.post('/manual', async (req, res) => {
  try {
    const { order_id, proof_image } = req.body;

    // TODO: Implement manual payment verification
    res.json({ message: 'Manual payment submitted for verification', order_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Midtrans payment endpoint (optional)
router.post('/midtrans', async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    // TODO: Integrate Midtrans payment gateway
    res.json({ message: 'Midtrans payment initiated', order_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment failed' });
  }
});

module.exports = router;