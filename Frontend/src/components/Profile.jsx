import { Form, useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient.js";
import { toast } from "react-toastify";

export async function profileLoader() {
  const res = await apiClient.get("/profile");
  return res.data;
}

export async function profileAction({ request }) {
  const fd = await request.formData();

  const payload = {
    name: fd.get("name"),
    doorNo: fd.get("doorNo"),
    street: fd.get("street"),
    city: fd.get("city"),
    state: fd.get("state"),
    pincode: fd.get("pincode"),
  };

  await apiClient.put("/profile", payload);
  toast.success("Profile Updated Successfully");
  return null;
}

export default function Profile() {
  const data = useLoaderData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">

        <h2 className="gym-heading text-3xl text-center mb-8">My Profile</h2>

        <Form method="post" className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="md:col-span-2">
            <label className="gym-text mb-1 block">Full Name</label>
            <input
              name="name"
              defaultValue={data.name}
              className="gym-input"
              placeholder="Full Name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="gym-text mb-1 block">Email (Read Only)</label>
            <input
              value={data.username}
              disabled
              className="gym-input bg-slate-200 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="gym-text mb-1 block">Door No</label>
            <input name="doorNo" defaultValue={data.doorNo} className="gym-input" />
          </div>

          <div>
            <label className="gym-text mb-1 block">Street</label>
            <input name="street" defaultValue={data.street} className="gym-input" />
          </div>

          <div>
            <label className="gym-text mb-1 block">City</label>
            <input name="city" defaultValue={data.city} className="gym-input" />
          </div>

          <div>
            <label className="gym-text mb-1 block">State</label>
            <input name="state" defaultValue={data.state} className="gym-input" />
          </div>

          <div className="md:col-span-2">
            <label className="gym-text mb-1 block">Pincode</label>
            <input name="pincode" defaultValue={data.pincode} className="gym-input" />
          </div>

          <div className="md:col-span-2 pt-4">
            <button className="gym-btn w-full py-3 text-lg">Save Profile</button>
          </div>

        </Form>
      </div>
    </div>
  );
}
