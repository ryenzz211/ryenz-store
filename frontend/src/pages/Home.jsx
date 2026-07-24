import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <h1>Ryenz Store</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>

      <section className="hero">
        <h2>Welcome to Ryenz Store</h2>
        <p>Your one-stop shop for quality products</p>
        <Link to="/products" className="cta-button">Shop Now</Link>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Fast Shipping</h3>
          <p>Get your products delivered quickly</p>
        </div>
        <div className="feature">
          <h3>Quality Guaranteed</h3>
          <p>All products come with warranty</p>
        </div>
        <div className="feature">
          <h3>Easy Returns</h3>
          <p>30-day money-back guarantee</p>
        </div>
      </section>
    </div>
  )
}