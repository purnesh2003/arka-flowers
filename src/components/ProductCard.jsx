import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h3 className="text-lg font-semibold mt-2">
        {product.name}
      </h3>

      <p className="text-pink-600 font-bold">
        ₹{product.price}
      </p>

      <button
        onClick={handleAdd}
        className="bg-pink-600 text-white px-4 py-2 rounded mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
}
