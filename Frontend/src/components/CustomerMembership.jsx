import { useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient";
export async function customerMembershipLoader() {
  const res = await apiClient.get("/memberships/my");
  return res.data;
}

export default function CustomerMembership() {
  const memberships = useLoaderData();

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h2 className="gym-heading text-3xl mb-6">My Membership</h2>

      {memberships.length === 0 && (
        <p className="text-gray-500">You have not purchased any membership yet.</p>
      )}

      <div className="overflow-x-auto bg-white rounded-3xl shadow-lg p-6">
        <table className="w-full text-left">
          <thead className="border-b text-gray-600">
            <tr>
              <th>Plan</th>
              <th>Months</th>
              <th>Paid</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id} className="border-b">
                <td>{m.planName}</td>
                <td>{m.planMonths}</td>
                <td>₹{m.userPaidPrice}</td>
                <td>{m.startDate}</td>
                <td>{m.endDate}</td>
                <td className={m.status === "ACTIVE" ? "text-green-600" : "text-red-600"}>
                  {m.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
