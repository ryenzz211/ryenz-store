import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Products.css'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Product added to cart!')
  }

  if (loading) return <div>Loading products...</div>

  return (
    <div className="products">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">Rp {product.price.toLocaleString('id-ID')}</p>
            <p className="stock">Stock: {product.stock}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}