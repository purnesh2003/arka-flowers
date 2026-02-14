import { useState, useEffect } from "react";

export default function Admin() {
  // 🔐 Password state
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🛍 Product state
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState("");

  const ADMIN_PASSWORD = "arka123";

  // 📦 Load products from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products"));
    if (stored) setProducts(stored);
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  // ➕ Add product
  const addProduct = () => {
    if (!name || !price || !imageFile) {
      alert("Please fill all fields and upload image");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image: imageFile,
      description: "Handmade artificial flower",
    };

    saveProducts([...products, newProduct]);

    // Reset form
    setName("");
    setPrice("");
    setImageFile("");
  };

  // ❌ Delete product
  const deleteProduct = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  // 🔐 LOGIN SCREEN
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

  // 🎨 ADMIN PANEL
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <div className="space-y-3">
        {/* Product name */}
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Price */}
        <input
          className="border p-2 w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              setImageFile(reader.result);
            };

            if (file) reader.readAsDataURL(file);
          }}
        />

        {/* Add button */}
        <button
          onClick={addProduct}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Product list */}
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
