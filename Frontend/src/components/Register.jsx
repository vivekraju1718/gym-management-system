import { Form, useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useEffect } from "react";
export async function registerAction({ request }) {
  const fd = await request.formData();

  const name = fd.get("name");
  const username = fd.get("username");
  const password = fd.get("password");

  if (!name || name.length < 3)
    return { error: "Name must be at least 3 characters" };

  if (!username || !password)
    return { error: "All fields are required" };

  try {
    await apiClient.post("/auth/register", { name, username, password });
    return { success: true };
  } catch (err) {
    // 👇 REAL backend message
    return { error: err.response?.data || "Registration failed" };
  }
}
export default function Register() {
  const data = useActionData();
  const nav = useNavigate();

useEffect(() => {
  if (data?.success) {
    toast.success("Registration successful 🎉");
    nav("/login");
  }
  if (data?.error) toast.error(data.error);
}, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 🏋️‍♂️
        </h2>

        <Form method="post" className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              name="username"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition">
            Register
          </button>
        </Form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
