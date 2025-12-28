import { useLoaderData, useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";

export async function managerOrdersLoader() {
  const res = await apiClient.get("/manager/orders/created");
  return res.data;
}

export default function ManagerOrders() {
  const orders = useLoaderData();
  const revalidator = useRevalidator();

  const confirmOrder = async (id) => {
    try {
      await apiClient.put(`/manager/orders/${id}/confirm`);
      toast.success("Order Confirmed ✅");
      revalidator.revalidate();   // 🔥 soft refresh
    } catch {
      toast.error("Failed to confirm order ❌");
    }
  };

  const cancelOrder = async (id) => {
    try {
      await apiClient.put(`/manager/orders/${id}/cancel`);
      toast.error("Order Cancelled ❌");
      revalidator.revalidate();   // 🔥 soft refresh
    } catch {
      toast.error("Failed to cancel order ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h2 className="gym-heading text-3xl mb-6">Pending Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No pending orders.</p>
      )}

      {orders.map((o) => (
        <div key={o.orderId} className="bg-white p-6 mb-4 rounded-xl shadow">
          <div className="flex justify-between mb-3">
            <span>Order #{o.orderId}</span>
            <span className="text-orange-600 font-bold">{o.paymentStatus}</span>
          </div>

          <div>Total: ₹{o.totalAmount}</div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => confirmOrder(o.orderId)}
              className="gym-btn"
            >
              Confirm
            </button>
            <button
              onClick={() => cancelOrder(o.orderId)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
