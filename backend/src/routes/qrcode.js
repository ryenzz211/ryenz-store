const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();

// Generate QR Code
router.post('/generate', async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    const qrDataUrl = await qrcode.toDataURL(data);
    res.json({ qrCode: qrDataUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;