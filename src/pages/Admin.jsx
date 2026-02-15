import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";



export default function Admin() {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState("");

  const ADMIN_PASSWORD = "arka123";
 

  // 🔄 Load products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(productsRef);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(list);
    };
    fetchProducts();
  }, []);

  // ➕ Add product
const productsRef = collection(db, "products");

const addProduct = async () => {
  if (!name || !price || !imageFile) {
    alert("Fill all fields");
    return;
  }

  await addDoc(productsRef, {
    name,
    price: Number(price),
    image: imageFile,
    description: "Handmade artificial flower",
  });

  alert("Product added to database ✅");

  setName("");
  setPrice("");
  setImageFile("");
};


  // ❌ Delete product
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((p) => p.id !== id));
  };

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
          onClick={() =>
            inputPassword === ADMIN_PASSWORD
              ? setIsAuthenticated(true)
              : alert("Wrong password")
          }
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

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
          type="file"
          accept="image/*"
          className="border p-2 w-full"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => setImageFile(reader.result);
            if (file) reader.readAsDataURL(file);
          }}
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
