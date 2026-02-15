import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import ProductCard from "./components/ProductCard";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";

import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-pink-100 py-20 text-center px-6">
        <h1 className="text-5xl font-bold text-pink-700 mb-4">
          Handmade Artificial Flowers 💐
        </h1>
        <p className="text-gray-600">
          Beautiful handcrafted bouquets for gifts & decoration
        </p>
      </div>

      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Collection
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-pink-50 min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}
