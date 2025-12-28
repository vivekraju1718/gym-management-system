import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/login") {

      // store redirect path once
      sessionStorage.setItem("redirectPath", location.pathname);

      // show toast only once
      if (!toastShown.current) {
        toast.warning("Please login to continue 🔒");
        toastShown.current = true;
      }
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
