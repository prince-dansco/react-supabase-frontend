import React, { useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
// import { ColorRing } from "react-loader-spinner";

export default function FooterPage() {
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Subscription successful!", {
        position: "top-center",
        duration: 4000,
      });

      console.log("Submitted email:", data.email);
      reset();
    } catch (error) {
      toast.error("Subscription failed. Please try again.", {
        position: "top-center",
        duration: 4000,
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-fuchsia-900 text-white py-12">
      <div className=" ">
        <Toaster />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-between lg:px-32 md:px-22 px-4 ">
          {/* About Us Section */}
          <div data-aos="zoom-in-down">
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are a team of passionate developers and designers creating
              amazing web experiences.
            </p>
          </div>

          {/* Quick Links Section */}
          <div data-aos="zoom-in-down">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog">Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div data-aos="zoom-in-down">
            <h2 className="text-xl font-bold mb-4">
              Subscribe to our Newsletter
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white p-2 rounded mb-2"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.email.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-fuchsia-500 text-white p-2 rounded hover:bg-fuchsia-600 flex items-center justify-center ${
                  isSubmitting ? "opacity-75" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>

          {/* Social Media Section */}
          <div data-aos="zoom-in-down">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Enterprise plc/Futurelabs. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
