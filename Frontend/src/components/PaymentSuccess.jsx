import { useEffect } from "react";
import { useCart } from "../store/cart-context";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();   // 💣 wipe cart immediately after success
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="gym-heading text-3xl mb-2 text-green-600">Payment Successful 🎉</h2>
      <p className="gym-text mb-6">Your order has been placed successfully.</p>
      <Link to="/" className="gym-btn px-6 py-3">Back to Home</Link>
    </div>
  );
}
