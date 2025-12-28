export default function About() {
  return (
    <div className="min-h-screen bg-slate-100 py-14 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="gym-heading text-4xl mb-4">About Our Gym</h1>
          <p className="gym-text max-w-3xl mx-auto text-lg">
            We are dedicated to transforming lives through fitness, discipline and smart digital management.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-20">
          <h2 className="gym-heading text-3xl mb-4 text-center">Our Mission</h2>
          <p className="gym-text leading-relaxed mb-4 text-center">
            Our mission is to empower individuals to live healthier lives by providing modern gym facilities,
            expert trainers and a digital-first gym management platform.
          </p>
          <p className="gym-text leading-relaxed text-center">
            With our Gym Management System, we simplify memberships, subscriptions, product purchases,
            payments and customer engagement – all in one secure platform.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-20">
          <h2 className="gym-heading text-3xl text-center mb-10">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">Smart Memberships</h3>
              <p className="gym-text">Easy digital memberships and renewals with automatic tracking.</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">Secure Payments</h3>
              <p className="gym-text">Online payments with Stripe and instant confirmations.</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">Order & Supplement Store</h3>
              <p className="gym-text">Buy supplements and gym products directly from the platform.</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">Manager Dashboard</h3>
              <p className="gym-text">Powerful dashboards for gym managers and admins.</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">Customer Profiles</h3>
              <p className="gym-text">Customers can manage profile, address, memberships and orders.</p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-800">24/7 Access</h3>
              <p className="gym-text">Access gym services anytime from any device.</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-green-500 text-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-3">Start Your Fitness Journey Today 💪</h2>
          <p className="text-lg mb-6">
            Join our gym and experience smart fitness management like never before.
          </p>
          <a
            href="/memberships"
            className="bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-green-100 transition"
          >
            View Membership Plans
          </a>
        </div>

      </div>
    </div>
  );
}
