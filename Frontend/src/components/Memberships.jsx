import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

export default function Memberships() {

  const { roles, isAuthenticated } = useAuth();
  const isManager = roles?.includes("ROLE_MANAGER");

  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    planName: "",
    months: "",
    price: "",
    discount: "",
    description: ""
  });

  useEffect(() => { loadPlans(); }, []);

  const loadPlans = async () => {
    const res = await apiClient.get("/memberships");
    setPlans(res.data);
  };

  const checkoutMembership = async () => {
    const plan = plans.find(p => p.id === selected);

    const res = await apiClient.post("/stripe/membership/checkout", {
      membershipId: plan.id,
      userPaidPrice: plan.finalPrice
    });

    window.location.href = res.data;
  };

  const handleAdd = async () => {
    await apiClient.post("/memberships", form);
    setForm({ planName:"", months:"", price:"", discount:"", description:"" });
    loadPlans();
    toast.success("Plan Added Successfully 🎉");
  };

  const handleDelete = async (id) => {
    await apiClient.delete(`/memberships/${id}?updatedBy=MANAGER`);
    loadPlans();
    toast.success("Plan Removed");
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[var(--bg-main)] pt-20 pb-20">

      <h2 className="gym-heading text-4xl text-center mb-16">Choose Your Plan</h2>

      {isManager && (
        <div className="max-w-6xl mx-auto mb-20 px-6">
          <div className="plan-card border-dashed border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Add New Membership Plan</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input className="gym-input" placeholder="Plan Name"
                value={form.planName} onChange={e=>setForm({...form,planName:e.target.value})}/>
              <input className="gym-input" placeholder="Months"
                value={form.months} onChange={e=>setForm({...form,months:e.target.value})}/>
              <input className="gym-input" placeholder="Price"
                value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
              <input className="gym-input" placeholder="Discount"
                value={form.discount} onChange={e=>setForm({...form,discount:e.target.value})}/>
              <input className="gym-input lg:col-span-2" placeholder="Description"
                value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
              <button onClick={handleAdd}
                className="gym-btn rounded-full h-12 text-lg hover:scale-105 transition-all">
                Add Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {plans.map(p => (
          <div key={p.id}
            className={`plan-card ${selected===p.id?"active-plan":""}`}
            onClick={() => setSelected(p.id)}>

            {p.discount > 0 && <span className="save-badge">SAVE ₹{p.discount}</span>}
            <h3>{p.months} Months</h3>
            <p className="price">₹{p.finalPrice}</p>
            <p className="subtext">{p.description || "Unlimited Gym Access"}</p>

            {!isManager && (
              <button className={selected===p.id?"btn-active":"btn"}>Choose Plan</button>
            )}

            {isManager && (
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                className="mt-4 w-full rounded-full border-2 border-red-500 text-red-600 py-2 font-semibold
                           hover:bg-red-600 hover:text-white transition-all">
                Remove Plan
              </button>
            )}
          </div>
        ))}
      </div>

      {!isManager && (
        <button
          onClick={checkoutMembership}
          disabled={!isAuthenticated || selected === null}
          className={`mt-16 gym-btn px-10 py-3 text-lg rounded-full mx-auto block
          ${(!isAuthenticated || selected === null) &&
            "opacity-50 cursor-not-allowed pointer-events-none"}`}
        >
          {!isAuthenticated ? "Login to Continue 🔒" : "Proceed to Checkout"}
        </button>
      )}
    </div>
  );
}
