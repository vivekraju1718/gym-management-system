import { useEffect, useState } from "react";
import { useAuth } from "../store/auth-context";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function Contact() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    if (user?.email) {
      setForm(f => ({ ...f, email: user.email }));
    }
  }, [user]);

  const submitMessage = async () => {
    if (!form.email || !form.message) {
      toast.error("Email and Message are required");
      return;
    }

    await apiClient.post("/contact", form);
    toast.success("Message sent to Manager successfully 📩");

    setForm({
      email: user?.email || "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[var(--bg-main)] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">

        <h2 className="gym-heading text-3xl mb-6 text-center">Contact Manager</h2>

        <input
          className="gym-input mb-4"
          placeholder="Your Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="gym-input mb-4"
          placeholder="Subject"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          rows="4"
          className="gym-input mb-6 resize-none"
          placeholder="Write your message..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />

        <button onClick={submitMessage} className="gym-btn w-full py-3 text-lg">
          Send Message
        </button>
      </div>
    </div>
  );
}
