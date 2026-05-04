
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useStores } from "../store/userStore"; 

function Wrapper({ children }) {
  const { isAuthenticated, isLoading: storeLoading, user } = useStores();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if store has finished loading and auth state is determined
    if (!storeLoading) {
      setLoading(false);
    }
  }, [storeLoading]);

  if (loading || storeLoading) {
    // Render the spinner while loading
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-20 h-20">
          {/* Multi-colored spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-fuchsia-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-amber-500 animate-spin animation-delay-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-emerald-500 animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-rose-500 animate-spin animation-delay-300"></div>
        </div>
      </div>
    );
  }

  // If authenticated, render the children (protected content)
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Otherwise, redirect to login
  return <Navigate to="/signIn" replace />;
}

export default Wrapper;
