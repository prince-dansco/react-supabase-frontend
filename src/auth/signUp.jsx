import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleCheck, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStores } from "../store/userStore";

export default function Register() {
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
  const { creatUser } = useStores();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

     const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "https://react-supabase-backends.onrender.com/api/auth";
    // window.location.href = "http://localhost:5000/api/auth/google";
    window.location.href = `${apiUrl}/google`;
    
// "http://localhost:5000/api/auth/google";
  };


  const onSubmit = async (formData) => {
    const { email, password, name } = formData;
    setIsLoading(true);
    try {
      await creatUser(name, email, password);
      reset();
      navigate("/signIn");
    } catch (error) {
      toast.error("An unexpected error occurred.", error);
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
          className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full"
        >
          <div className="">
            <Link to="/">
              <FaArrowLeft size={20} />
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-center ">
            Create an account{" "}
          </h2>
          <p className="mb-5 text-center text-fuchsia-400">
            let create your account
          </p>
          {/*  */}

          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-fuchsia-700"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className={`mt-1 block w-full p-2 border rounded ${
                  errors.name
                    ? "border-red-500"
                    : isValid
                      ? "border-fuchsia-500"
                      : "border-fuchsia-300"
                }`}
                {...register("name", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Z][a-zA-Z\s'-]{4,19}$/,
                    message:
                      "Name must start with a capital letter, contain only letters, spaces, hyphens, or apostrophes, and be 5-20 characters long.",
                  },
                  validate: (value) => {
                    if (value.length < 5 || value.length > 20) {
                      return "Name must be between 5 and 20 characters long.";
                    }
                    return true;
                  },
                })}
              />
              {/* Icon */}
              {!errors.name && isValid && (
                <FaCircleCheck
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fuchsia-500"
                  size={20}
                />
              )}
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/*  */}
          <div className="mb-3">
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
                placeholder="enter email your email address"
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
          <div className="mb-3">
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
                placeholder="enter your password"
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
            <p className="text-sm my-3 text-fuchsia-400">
              By signing up you agree to our Terms,{" "}
              <span className="underline cursor-pointer font-medium text-fuchsia-600">
                {" "}
                Privacy Policy,
              </span>{" "}
              and{" "}
              <span className="underline font-medium cursor-pointer text-fuchsia-600">
                {" "}
                Cookie Use{" "}
              </span>
            </p>
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
              "Register"
            )}
          </button>
          <div className="flex items-center gap-3 my-2">
            <hr className="flex-grow border-t border-fuchsia-600" />
            <p className="text-fuchsia-500 font-medium">or</p>
            <hr className="flex-grow border-t border-fuchsia-600" />
          </div>
          {/* <GoogleApp /> */}
          {/* <a href="http://localhost:5000/api/auth/google">
            <button>Login with Google</button>
          </a> */}

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



          <p className="text-base my-2">
            Already have an account?{" "}
            <Link to="/signIn" className="text-fuchsia-500 underline text-lg">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
