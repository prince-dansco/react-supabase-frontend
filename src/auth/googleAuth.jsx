import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../store/userStore";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "https://react-supabase-backends.onrender.com/api/auth";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      const fetchUser = async () => {
        try {
          const response = await fetch(`${API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const user = userData.user || userData;

            localStorage.setItem("user", JSON.stringify(user));
            useStores.getState().setGoogleAuth(token, user);

            toast.success("Google login successful!");
            navigate("/dashBoard");
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          setError("Failed to complete Google login");
          toast.error("Failed to complete Google login");
          setTimeout(() => navigate("/signIn"), 3000);
        }
      };

      fetchUser();
    } else {
      setError("No authentication token received");
      toast.error("No authentication token received");
      setTimeout(() => navigate("/signIn"), 3000);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/signIn")}
            className="bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing Google login...</p>
      </div>
    </div>
  );
};

export default GoogleSuccess;