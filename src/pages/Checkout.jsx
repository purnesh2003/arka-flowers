import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const phoneNumber = "919019864152"; // replace with your sister's number

  const orderMessage = `
New Order 💐

${cart
  .map((item) => `${item.name} x${item.qty} - ₹${item.price * item.qty}`)
  .join("\n")}

Total: ₹${total}

Name: ${name}
Phone: ${phone}
Address: ${address}
`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    orderMessage
  )}`;

  const placeOrder = () => {
    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    window.open(whatsappLink, "_blank");
    clearCart();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <h3 className="mt-4 font-bold">Total: ₹{total}</h3>

      <button
        onClick={placeOrder}
        className="bg-green-500 text-white px-6 py-3 rounded mt-4"
      >
        Place Order via WhatsApp
      </button>
    </div>
  );
}
