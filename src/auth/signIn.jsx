import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStores } from "../store/userStore"; 

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginUser, isLoading: storeLoading, error: storeError, clearError } = useStores();
  const [isLoading, setIsLoading] = useState(false);
  console.log(storeError)
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    setIsLoading(true);
    clearError(); 
    
    try {
      const result = await loginUser(email, password);
      
      if (result) {
        toast.success("Login successful! Welcome back!");
        reset();
        navigate("/dashBoard");
      }
    } catch (error) {
      const errorMsg = error.message || "An unexpected error occurred.";
      toast.error(errorMsg);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "https://react-supabase-backends.onrender.com/api/auth";
    window.location.href = `${apiUrl}/google`;
  };

  return (
    <div className="" data-aos="zoom-in-down">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold text-center">
            Login to your account.
          </h2>
          <p className="mb-5 text-center text-fuchsia-400">
            Its great to see you again.
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.email
                    ? "border-red-500"
                    : isValid
                    ? "border-fuchsia-500"
                    : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {/* Icon */}
              {!errors.email && isValid && (
                <FaCircleCheck
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500"
                  size={20}
                />
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-fuchsia-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-fuchsia-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          <div className="mb-3">
            <p className="text-sm md:text-base font-normal">
              forgot your password?{" "}
              <Link to="/forgettedPassword">
                <span className="underline font-medium text-fuchsia-400">
                  Reset your password
                </span>
              </Link>
            </p>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || storeLoading}
            className="w-full bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {(isLoading || storeLoading) ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Google Login Button */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
          
          <p className="text-base my-3 text-center">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-fuchsia-500 underline text-lg">
              Join
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}