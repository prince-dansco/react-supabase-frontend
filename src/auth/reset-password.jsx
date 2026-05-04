import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaArrowLeft,
  FaCircleCheck,
  FaEye,
  FaEyeSlash,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import Api from "../lip/axios"; // Import your API client

export default function UpdatedPassword() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    setIsLoading(true);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const resetToken = urlParams.get('token');
      
      if (!resetToken) {
        toast.error("No reset token found. Please request a new password reset.");
        return;
      }
      
      const response = await Api.post('/reset-password', {
        token: resetToken,
        newPassword: password,
        email: email 
      });
      
      if (response.data) {
        toast.success("Password updated successfully!");
        reset();
        setIsModalOpen(true);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMsg);
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/signIn");
  };

  return (
    <div data-aos="zoom-in-down">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <p className="my-4">
            <Link to="/forgettedPassword">
              <FaArrowLeft size={25} className="text-fuchsia-500" />
            </Link>
          </p>
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="mb-5 text-center text-fuchsia-400">
            Set the new password for your account so you can login and access
            all the features.
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-fuchsia-800"
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
                    : "border-fuchsia-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {!errors.email && isValid && (
                <FaCircleCheck
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
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
              className="block text-sm font-medium text-fuchsia-800"
            >
              New Password
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

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-fuchsia-800"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.confirmPassword ? "border-red-500" : "border-fuchsia-300"
                }`}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-fuchsia-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
          <div className="bg-white mx-5 p-6 rounded-lg shadow-lg max-w-[310px] w-full text-center transform translate-y-28">
            <FaRegCircleCheck
              size={65}
              className="mb-3 mx-auto text-green-500"
            />
            <h2 className="text-base md:text-2xl font-bold mb-3">
              Password Changed!
            </h2>
            <p className="mb-5 text-sm md:text-base">
              You can now use your new password to log in to your account.
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}