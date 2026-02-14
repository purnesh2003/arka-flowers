import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-600">
        ARKA Flowers
      </h1>

      <div className="space-x-6 font-medium">
        <Link className="hover:text-pink-600" to="/">
          Home
        </Link>
        <Link className="hover:text-pink-600" to="/cart">
          Cart 🛒
        </Link>
        <Link to="/admin">Admin</Link>

      </div>
    </nav>
  );
}
