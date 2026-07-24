import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Checkout.css'

export default function Checkout() {
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerEmail: '',
    paymentMethod: 'manual',
    proofImage: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      proofImage: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || []
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

      const orderData = {
        product_id: cartItems[0]?.id,
        quantity: cartItems.length,
        buyer_email: formData.buyerEmail,
        buyer_name: formData.buyerName,
        payment_method: formData.paymentMethod,
        total_price: totalPrice
      }

      const response = await axios.post('/api/orders', orderData)
      alert('Order placed successfully!')
      localStorage.removeItem('cart')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order')
    }
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="buyerEmail"
            value={formData.buyerEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
            <option value="manual">Manual Transfer</option>
            <option value="midtrans">Midtrans</option>
          </select>
        </div>
        {formData.paymentMethod === 'manual' && (
          <div className="form-group">
            <label>Proof of Payment</label>
            <input
              type="file"
              name="proofImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        )}
        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  )
}