import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './store/auth-context.jsx';
import { CartProvider } from './store/cart-context.jsx';

import StorePage from "./components/Storepage.jsx";
import Login, { loginAction } from './components/Login.jsx';
import Register, { registerAction } from './components/Register.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Cart from './components/Cart.jsx';
import Memberships from './components/Memberships.jsx';
import Profile, { profileAction, profileLoader } from './components/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import PaymentFailed from './components/PaymentFailed.jsx';
import Orders from './components/Order.jsx';
import { myOrdersLoader } from './components/Order.jsx';
import ManagerCustomerMemberships from './components/ManagerCustomerMemberships.jsx';
import { managercustomerMembershipsLoader } from './components/ManagerCustomerMemberships.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import CustomerMembership, { customerMembershipLoader } from "./components/CustomerMembership.jsx";
import ManagerOrders from './manager/ManagerOrders.jsx';
import { managerOrdersLoader } from './manager/ManagerOrders.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import ManagerContacts from './manager/ManagerContacts.jsx';
import { managerContactsLoader } from './manager/ManagerContacts.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      {/* PUBLIC ROUTES */}
      <Route index element={<StorePage />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="register" element={<Register />} action={registerAction} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="memberships" element={<Memberships />} />
            <Route path="about" element={<About />} />

            <Route path="contact" element={<Contact />} />
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="payment-failed" element={<PaymentFailed />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />

        <Route path="profile" element={<Profile />} action={profileAction} loader={profileLoader} />
              <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="payment-failed" element={<PaymentFailed />} />
     <Route path="my-membership" element={<CustomerMembership />} loader={customerMembershipLoader} />
      <Route path="customer-memberships" element={<ManagerCustomerMemberships />} loader={managercustomerMembershipsLoader}/>
      <Route path="my-orders" element={<Orders />} loader={myOrdersLoader}/>
<Route path="manager/orders" element={<ManagerOrders />} loader={managerOrdersLoader}/>
<Route
  path="/manager/contacts"
  element={<ManagerContacts />}
  loader={managerContactsLoader}
/>

      </Route>

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>

    <ToastContainer
      position="top-center"
      autoClose={3000}
      draggable
      pauseOnHover
      transition={Bounce}
        theme="dark"
  toastClassName="gym-toast"
  bodyClassName="gym-toast-body"
    />
  </StrictMode>
);
