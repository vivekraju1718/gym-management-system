import { useLoaderData, useRevalidator } from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function ManagerContacts() {
  const contacts = useLoaderData();
  const revalidator = useRevalidator();

  const accept = async (id) => {
    await apiClient.put(`/manager/contacts/${id}/accept`);
    toast.success("Message Accepted ✅");
    revalidator.revalidate();
  };

  const reject = async (id) => {
    await apiClient.put(`/manager/contacts/${id}/reject`);
    toast.error("Message Rejected ❌");
    revalidator.revalidate();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h2 className="gym-heading text-3xl mb-8">Contact Requests</h2>

      {contacts.length === 0 && (
        <p className="text-gray-500">No pending contact messages.</p>
      )}

      {contacts.map(c => (
        <div key={c.contactId} className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-bold">{c.userEmail}</span>
            <span className="text-orange-500 font-semibold">{c.status}</span>
          </div>

          <p className="font-semibold mb-1">{c.subject || "No Subject"}</p>
          <p className="text-gray-600 mb-4">{c.message}</p>

          <div className="flex gap-4">
            <button onClick={() => accept(c.contactId)} className="gym-btn px-6">
              Accept
            </button>
            <button
              onClick={() => reject(c.contactId)}
              className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


export async function managerContactsLoader() {
  const res = await apiClient.get("/manager/contacts/sent");
  return res.data;
}
