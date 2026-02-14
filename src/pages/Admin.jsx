import { useState, useEffect } from "react";

export default function Admin() {
  // 🔐 Password input state
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🛍 Product state
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const ADMIN_PASSWORD = "arka123";

  // 📦 Load products
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products"));
    if (stored) setProducts(stored);
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const addProduct = () => {
    if (!name || !price) return;

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      description: "Handmade artificial flower",
    };

    saveProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setImage("");
  };

  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  // 🔐 If not logged in → show login form
  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={() => {
            if (inputPassword === ADMIN_PASSWORD) {
              setIsAuthenticated(true);
            } else {
              alert("Wrong password");
            }
          }}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  // 🎨 Admin panel
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={addProduct}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-2"
          >
            <span>{p.name}</span>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
