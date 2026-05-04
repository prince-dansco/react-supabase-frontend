import { useForm } from "react-hook-form";
import { FaArrowLeft, FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Api from "../lip/axios"; // Add this import

export default function ForgettedPassword() {
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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    const { email } = formData;
    setIsLoading(true);
    
    try {
      const response = await Api.post('/forgot-password', { email });
      
      if (response.data) {
        toast.success(response.data.message || "Password reset email sent successfully! Check your inbox.");
        reset();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMsg);
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="" data-aos="zoom-in-down">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <p className="my-4">
            <Link to="/signIn">
              <FaArrowLeft size={25} className="text-fuchsia-600" />
            </Link>
          </p>
          <h2 className="text-2xl font-bold text-center my-1">
            Forgot password
          </h2>
          <p className="mb-5 text-center text-fuchsia-400">
            Enter your email for the verification process. We will send a
            password reset link to your email.
          </p>

          {/* Email Input */}
          <div className="mb-11">
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
                    ? "border-green-500"
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

          {/* Submit Button */}
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
              "Send code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}