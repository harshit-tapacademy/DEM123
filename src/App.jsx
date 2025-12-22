import ProductCard from "./components/ProductCard";
import products from "./data";
import "./App.css";
import { useState } from "react";

function App() {
  //BRANDS
  const allBrands = [...new Set(products.map((p) => p.brand))];

  // State
  // Cart - array of products in cart
  const [cartItems, setCartItems] = useState([]);

  // Wishlist - array of product IDs that are wishlisted
  const [wishlist, setWishlist] = useState([]);

  // Search - what user types in search box
  const [searchTerm, setSearchTerm] = useState("");

  // Brand Filter - which brand is selected ('All' means show all)
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Sort - how to sort products
  const [sortBy, setSortBy] = useState("default");

  function addToCart(product) {
    //Check if Cart Item Exists
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      //PRODUCT IS THERE IN THE CART
      setCartItems(
        cartItems.map(
          (
            item //[ARRAY OF OBJECTS]
          ) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
        )
      );
    } else {
      //PRODUCT NOT THERE
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  //Calculate Total number of Cart ITEMS
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  //CALCULATE TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //WISHLIST FUNCTION

  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      //Already Existing - Remove It
      setWishlist(wishlist.filter((id) => id !== productID));
    } else {
      //NOT IN THE WISHLIST - JUST ADD IT
      setWishlist([...wishlist, productID]);
    }
  }

  //STEP 1 : FILTER BASED ON SEARCH [BASED ON BRAND]

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.brand
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  //STEP 2 : SORT BASED ON FILTERED PRODUCTS



  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2025</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>
        <div className="product-grid">
          {products.map((data) => (
            <ProductCard
              key={data.id}
              image={data.image}
              name={data.name}
              price={data.price}
              originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
