// src/pages/GoogleSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // redirect to your app
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Signing you in...</p>;
};

export default GoogleSuccess;