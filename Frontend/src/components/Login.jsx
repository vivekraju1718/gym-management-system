import { Form, useActionData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";
import { useAuth } from "../store/auth-context";
import { useEffect } from "react";

export async function loginAction({ request }) {
  const fd = await request.formData();

  try {
    const res = await apiClient.post("/auth/login", {
      username: fd.get("username"),
      password: fd.get("password"),
    });
    return { success: true, data: res.data };
  } catch {
    return { error: "Invalid email or password" };
  }
}

export default function Login() {
  const data = useActionData();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (data?.success) {
      login(data.data);
      toast.success("Login successful 🎉");

      // 🔥 Redirect user to last blocked page
      const redirectPath = sessionStorage.getItem("redirectPath");

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        sessionStorage.removeItem("redirectPath");
      } else {
        navigate("/", { replace: true });
      }
    }

    if (data?.error) {
      toast.error(data.error);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 💪
        </h2>

        <Form method="post" className="space-y-5">

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
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition">
            Login
          </button>
        </Form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
