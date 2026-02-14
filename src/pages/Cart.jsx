import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b py-2"
        >
          <span>
            {item.name} x{item.qty}
          </span>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
          <Link
  to="/checkout"
  className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-3"
>
  Proceed to Checkout
</Link>

        </div>
      ))}

      <h3 className="mt-4 font-bold">Total: ₹{total}</h3>
    </div>
  );
}
