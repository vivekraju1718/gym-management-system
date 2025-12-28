import { useCart } from "../store/cart-context";
import { Link } from "react-router-dom";
import emptycart from "../assets/stickers/emptycart.png"
import apiClient from "../api/apiClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
export default function Cart() {
  const { items, addToCart, removeItem, decreaseQty } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
const location = useLocation();
  const [hasAddress, setHasAddress] = useState(true);

useEffect(() => {
  const checkAddress = async () => {
    try {
      const res = await apiClient.get("/profile/address-complete");
      console.log("LIVE ADDRESS CHECK:", res.data);
      setHasAddress(res.data === true);
    } catch {
      setHasAddress(false);
    }
  };

  checkAddress();
}, [items]);    // 🔥 depend on items (forces refresh when page reopens)



  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img src={emptycart} className="w-56 mb-6 opacity-80" />
        <h2 className="gym-heading text-2xl mb-1">Your cart is empty</h2>
        <p className="gym-text mb-5">Looks like you haven't added anything yet</p>
        <Link to="/" className="gym-btn px-6 py-3">Start Shopping</Link>
      </div>
    );
  }

const checkoutCart = async () => {
  if (hasAddress !== true) {
    toast.error("Please complete your address before checkout ⚠️");
    return;
  }
  const res = await apiClient.post("/stripe/cart/checkout", {
    items: items.map(i => ({
      productId: i.id,
      name: i.name,
      price: i.price,
      quantity: i.qty
    }))
  });
  window.location.href = res.data;
};

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="gym-heading text-3xl mb-8">Shopping Cart</h2>

      {!hasAddress && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-xl text-yellow-800">
          ⚠️ Please complete your address in profile before placing an order.
          <Link to="/profile" className="ml-2 underline font-semibold">Update Address</Link>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {items.map(item => (
          <div key={item.id} className="grid grid-cols-5 items-center gap-6 p-6 border-b last:border-none">
            <div className="col-span-2 flex items-center gap-4">
              <img src={item.imageUrl} className="w-20 h-20 object-contain" />
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-slate-500 text-sm">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <button onClick={() => decreaseQty(item.id)} className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 font-bold">−</button>
              <span className="font-semibold">{item.qty}</span>
              <button onClick={() => addToCart(item, 1)} className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 font-bold">+</button>
            </div>

            <div className="text-center font-semibold text-green-600">
              ₹{item.price * item.qty}
            </div>

            <div className="text-center">
              <button onClick={() => removeItem(item.id)} className="w-9 h-9 rounded-full border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center">
                <span className="text-lg font-bold">×</span>
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center p-6 bg-slate-50">
          <h3 className="text-xl font-bold">Total: ₹{total}</h3>
          <button
            onClick={checkoutCart}
            disabled={!hasAddress}
            className={`gym-btn w-full mt-4 py-3 rounded-xl text-lg ${!hasAddress && "opacity-50 cursor-not-allowed"}`}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
