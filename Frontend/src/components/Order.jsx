import { useLoaderData } from "react-router-dom";

export default function Orders() {
  const response = useLoaderData();
  const orders = Array.isArray(response) ? response : response?.content || [];

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h2 className="gym-heading text-3xl mb-6">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex justify-between mb-4">
            <span>Order #{order.id}</span>
            <span className="font-semibold text-green-600">{order.paymentStatus}</span>
          </div>

          <div className="mb-3">Total: ₹{order.totalAmount}</div>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i) => (
                <tr key={i.id} className="border-b">
                  <td>{i.productName}</td>
                  <td>₹{i.productPrice}</td>
                  <td>{i.quantity}</td>
                  <td>₹{i.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
import apiClient from "../api/apiClient";

export async function myOrdersLoader() {
  const res = await apiClient.get("/orders/my");
return res.data?.content || res.data;}
