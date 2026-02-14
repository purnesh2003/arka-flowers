import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name} x{item.qty}
                  </h3>
                  <p className="text-gray-500">
                    ₹{item.price * item.qty}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-6">
            Total: ₹{total}
          </h3>

          <Link
            to="/checkout"
            className="bg-green-500 text-white px-6 py-3 rounded inline-block mt-4"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
