import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-xl font-bold text-pink-600">
            ₹{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
