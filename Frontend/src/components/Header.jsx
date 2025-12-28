import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const { user, roles, logout } = useAuth();
  const { cartCount } = useCart();
  const [openUser, setOpenUser] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const userRef = useRef();
  const managerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setOpenUser(false);
      if (managerRef.current && !managerRef.current.contains(e.target)) setOpenManager(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpenUser(false);
    setOpenManager(false);
  }, [location.pathname]);

  const isManager = roles?.includes("ROLE_MANAGER");

  return (
    <header className="bg-gray-900 fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-2">
          <i className="fa-solid fa-person-running text-green-400 text-2xl"></i>
          <span className="text-white text-xl font-bold">GYM CENTER</span>
        </div>

      <nav className="flex items-center gap-8">

  <Link to="/" className="gym-nav">Home</Link>
  <Link to="/about" className="gym-nav">About</Link>
  <Link to="/contact" className="gym-nav">Contact</Link>
  <Link to="/memberships" className="gym-nav">Memberships</Link>

  {!user && (
    <Link to="/login" className="gym-nav">Login</Link>
  )}

  {user && (
    <div className="flex items-center gap-6">
      {/* USER PANEL */}
      <div ref={userRef} className="relative">
        <button onClick={() => setOpenUser(!openUser)} className="gym-nav flex items-center gap-1">
          {user} <i className="fa-solid fa-chevron-down text-xs"></i>
        </button>

        {openUser && (
          <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl w-44">
            <Link to="/profile" className="block px-4 py-2 hover:bg-slate-100">Profile</Link>
                        <Link to="/my-membership" className="block px-4 py-2 hover:bg-slate-100">Membership</Link>
            <Link to="/my-orders" className="block px-4 py-2 hover:bg-slate-100">Orders</Link>
          <button
  onClick={() => {
    logout();
toast.success("Logout Successfully 🎉")
  }}
  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
>
  Logout
</button>
          </div>
        )}
      </div>

      {/* MANAGER PANEL */}
      {isManager && (
        <div ref={managerRef} className="relative">
          <button onClick={() => setOpenManager(!openManager)} className="gym-btn rounded-full px-4 py-2">
            Manager Panel <i className="fa-solid fa-chevron-down text-xs"></i>
          </button>

          {openManager && (
            <div className="absolute right-0 mt-3 bg-white rounded-xl shadow-xl w-56">
              <Link to="/memberships" className="block px-4 py-2 hover:bg-slate-100">Manage Membership</Link>
              <Link to="/customer-memberships" className="block px-4 py-2 hover:bg-slate-100">Customer Membership Details</Link>
              <Link to="/manager/orders" className="block px-4 py-2 hover:bg-slate-100">Customer Orders</Link>
              <Link to="/manager/contacts" className="block px-4 py-2 hover:bg-slate-100">Messages</Link>
            </div>
          )}
        </div>
      )}
    </div>
  )}

  <Link to="/cart" className="relative gym-btn px-3 py-2 flex items-center gap-2">
    <i className="fa-solid fa-basket-shopping"></i>
    <span className="hidden sm:block">Cart</span>
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartCount}
    </span>
  </Link>
</nav>

      </div>
    </header>
  );
}
