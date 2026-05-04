import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { ColorRing } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const coursePricing = {
  frontend: {
    "html-css": 49,
    javascript: 99,
    react: 149,
    nextjs: 199,
    "frontend-bundle": 349, // Discounted price for all frontend courses
  },
  backend: {
    nodejs: 99,
    expressjs: 149,
    mongodb: 99,
    "backend-bundle": 299, // Discounted price for all backend courses
  },
  "full-stack": {
    "full-stack-bundle": 599, // Discounted price for all courses
  },
};
export default function EnrollmentForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      track: "frontend", // Set default track to frontend
      courses: [], // Initialize courses as empty array
    },
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);

  const [track, setTrack] = useState("frontend"); // Consistent with form default
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Watch track and selected courses to calculate price
  const watchTrack = watch("track");
  const watchCourses = watch("courses");

  useEffect(() => {
    if (watchTrack) {
      setTrack(watchTrack);
      setValue("courses", []); // Reset course selection when track changes
      setSelectedCourses([]);
    }
  }, [watchTrack, setValue]);

  useEffect(() => {
    if (watchCourses) {
      setSelectedCourses(watchCourses);
      calculatePrice(watchCourses);
    } else {
      setSelectedCourses([]);
      setTotalPrice(0);
    }
  }, [watchCourses]);

  const calculatePrice = (courses) => {
    if (!courses || courses.length === 0) {
      setTotalPrice(0);
      return;
    }
    if (courses.includes(`${track}-bundle`)) {
      setTotalPrice(coursePricing[track][`${track}-bundle`]);
      return;
    }

    if (courses.includes("full-stack-bundle")) {
      setTotalPrice(coursePricing["full-stack"]["full-stack-bundle"]);
      return;
    }
    // Calculate individual course prices
    let price = 0;
    courses.forEach((course) => {
      if (coursePricing[track]?.[course]) {
        price += coursePricing[track][course];
      }
    });
    setTotalPrice(price);
  };
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Enrollment Data:", {
        ...data,
        totalPrice,
        paymentMethod,
      });
      setSubmitSuccess(true);
      reset(); // Reset form after successful submission
      setSelectedCourses([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCourseOptions = () => {
    const courses = Object.keys(coursePricing[track]);
    const bundleOption = `${track}-bundle`;

    return (
      <div className="space-y-2" data-aos="zoom-out-left">
        {courses
          .filter(
            (course) => course !== bundleOption && !course.includes("bundle")
          )
          .map((course) => (
            <div key={course} className="flex items-center">
              <input
                type="checkbox"
                id={course}
                value={course}
                {...register("courses")}
                className="h-4 w-4 text-fuchsia-600 rounded"
              />
              <label htmlFor={course} className="ml-2 capitalize">
                {course.replace("-", " ")} (${coursePricing[track][course]})
              </label>
            </div>
          ))}

        {/* Bundle option */}
        {courses.includes(bundleOption) && (
          <div className="flex items-center mt-4 pt-4 border-t">
            <input
              type="checkbox"
              id={bundleOption}
              value={bundleOption}
              {...register("courses")}
              className="h-4 w-4 text-fuchsia-600 rounded"
            />
            <label
              htmlFor={bundleOption}
              className="ml-2 font-medium capitalize text-fuchsia-600"
            >
              {track} Bundle - All courses ($
              {coursePricing[track][bundleOption]})
              <span className="text-green-600 ml-2">
                Save ${calculateBundleSavings(track)}!
              </span>
            </label>
          </div>
        )}

        {/* Full stack bundle option when both tracks are selected */}
        {track === "full-stack" && (
          <div className="flex items-center mt-4 pt-4 border-t">
            <input
              type="checkbox"
              id="full-stack-bundle"
              value="full-stack-bundle"
              {...register("courses")}
              className="h-4 w-4 text-fuchsia-600 rounded"
            />
            <label htmlFor="full-stack-bundle" className="ml-2 font-medium">
              Full Stack Bundle - All Frontend & Backend courses ($
              {coursePricing["full-stack"]["full-stack-bundle"]})
              <span className="text-green-600 ml-2">
                Save ${calculateFullStackSavings()}!
              </span>
            </label>
          </div>
        )}
      </div>
    );
  };

  const calculateBundleSavings = (trackType) => {
    const individualPrices = Object.values(coursePricing[trackType]).reduce(
      (sum, price, index, arr) => {
        // Skip the bundle price (last item)
        if (index === arr.length - 1) return sum;
        return sum + price;
      },
      0
    );
    return individualPrices - coursePricing[trackType][`${trackType}-bundle`];
  };

  const calculateFullStackSavings = () => {
    const frontendIndividual = Object.values(coursePricing.frontend).reduce(
      (sum, price, index, arr) => {
        if (index === arr.length - 1) return sum;
        return sum + price;
      },
      0
    );
    const backendIndividual = Object.values(coursePricing.backend).reduce(
      (sum, price, index, arr) => {
        if (index === arr.length - 1) return sum;
        return sum + price;
      },
      0
    );
    return (
      frontendIndividual +
      backendIndividual -
      coursePricing["full-stack"]["full-stack-bundle"]
    );
  };

  if (submitSuccess) {
    return (
      <div
        className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-40 text-center"
        data-aos="zoom-in-down"
      >
        <div className="text-fuchsia-500 text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
        <p className="mb-4">
          Thank you for your enrollment to{" "}
          <span className="text-bold text-fuchsia-500 text-2xl">
            Futurelabs/EP plc
          </span>
          . We've sent a confirmation to your email.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-fuchsia-500 text-white py-2 px-4 rounded hover:bg-fuchsia-600"
        >
          Enroll Another Student
        </button>
      </div>
    );
  }
  const watchName = watch("name");
  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-32"
      data-aos="fade-down-left"
    >
      <h2 className="text-lg md:text-3xl font-bold text-center mb-6 text-fuchsia-600">
        Course Enrollment Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Track Selection */}
        <div className="bg-fuchsia-300 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-fuchsia-600">
            Select Learning Track
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-fuchsia-100">
              <input
                type="radio"
                value="frontend"
                {...register("track", { required: "Please select a track" })}
                className="h-4 w-4 text-fuchsia-600"
                defaultChecked
              />
              <div>
                <span className="font-medium text-fuchsia-500">
                  Frontend Development
                </span>
                <p className="text-sm text-gray-500">
                  HTML, CSS, JavaScript, React, Next.js
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-fuchsia-100">
              <input
                type="radio"
                value="backend"
                {...register("track")}
                className="h-4 w-4 text-fuchsia-600"
              />
              <div>
                <span className="font-medium text-fuchsia-500">
                  Backend Development
                </span>
                <p className="text-sm text-gray-500">
                  Node.js, Express, MongoDB
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-fuchsia-100">
              <input
                type="radio"
                value="full-stack"
                {...register("track")}
                className="h-4 w-4 text-fuchsia-600"
              />
              <div>
                <span className="font-medium text-fuchsia-500">
                  Full Stack Development
                </span>
                <p className="text-sm text-gray-500">
                  All Frontend & Backend courses
                </p>
              </div>
            </label>
          </div>
          {errors.track && (
            <p className="text-red-500 text-sm mt-1">{errors.track.message}</p>
          )}
        </div>

        {/* Personal Details */}
        <div
          className="bg-fuchsia-300 p-4 rounded-lg"
          data-aos="fade-down-right"
        >
          <h3 className="text-xl font-semibold mb-3 text-fuchsia-500">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-1 text-fuchsia-700">
                Full Name
              </label>
              <input
                {...register("name", { required: "Full Name is required" })}
                className="w-full border p-2 rounded"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-fuchsia-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1 text-fuchsia-700">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Education Level */}
            <div>
              <label className="block font-medium mb-1 text-fuchsia-700">
                Education Level
              </label>
              <select
                {...register("education")}
                className="w-full border p-2 rounded text-fuchsia-400"
              >
                <option value="">-- Select Education Level --</option>
                <option value="high-school">High School</option>
                <option value="college">College</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div className="bg-fuchsia-300 p-4 rounded-lg" data-aos="zoom-in-up">
          <h3 className="text-xl font-semibold mb-3 text-fuchsia-500">
            Select Courses ({track.toUpperCase()})
          </h3>
          {renderCourseOptions()}
          {errors.courses && (
            <p className="text-red-500 text-sm mt-1">
              Please select at least one course
            </p>
          )}

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div
              className="mt-4 p-3 bg-fuchsia-300 rounded-lg"
              data-aos="zoom-in-up"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <span className="text-2xl font-bold">${totalPrice}</span>
              </div>
              {selectedCourses.includes(`${track}-bundle`) && (
                <p className="text-fuchsia-800 text-sm mt-1">
                  You're saving ${calculateBundleSavings(track)} with this
                  bundle!
                </p>
              )}
              {selectedCourses.includes("full-stack-bundle") && (
                <p className="text-fuchsia-800 text-sm mt-1">
                  You're saving ${calculateFullStackSavings()} with the Full
                  Stack bundle!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Payment Details */}
        <div className="bg-fuchsia-300 p-4 rounded-lg" data-aos="zoom-in-up">
          <h3 className="text-xl font-semibold mb-3 text-fuchsia-500">
            Payment Information
          </h3>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-fuchsia-700">
              Payment Method
            </label>
            <div className="flex space-x-4 flex-wrap">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="h-4 w-4 text-fuchsia-500"
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                  className="h-4 w-4 text-fuchsia-500"
                />
                <span>Bank Transfer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="h-4 w-4 text-fuchsia-600"
                />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          {/* Card Details (shown only if card is selected) */}
          {paymentMethod === "card" && (
            <div className="space-y-4" data-aos="zoom-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card Number */}
                <div>
                  <label className="block font-medium mb-1 text-fuchsia-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    {...register("cardNumber", {
                      required: "Card Number is required",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Enter a valid 16-digit card number",
                      },
                    })}
                    className="w-full border p-2 rounded"
                    placeholder="Enter your card number"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                {/* Card Holder Name */}
                <div>
                  <label className="block font-medium mb-1 text-fuchsia-700">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    {...register("cardHolder", {
                      required: "Card Holder Name is required",
                    })}
                    className="w-full border p-2 rounded"
                    placeholder="Name on card"
                  />
                  {errors.cardHolder && (
                    <p className="text-red-500 text-sm">
                      {errors.cardHolder.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Expiry Date */}
                <div>
                  <label className="block font-medium mb-1 text-fuchsia-700">
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    {...register("expiry", {
                      required: "Expiry Date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                        message: "Enter in MM/YY format",
                      },
                    })}
                    className="w-full border p-2 rounded"
                    placeholder="MM/YY"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>

                {/* CVV */}
                <div>
                  <label className="block font-medium mb-1 text-fuchsia-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    {...register("cvv", {
                      required: "CVV is required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "Enter a valid CVV (3 or 4 digits)",
                      },
                    })}
                    className="w-full border p-2 rounded"
                    placeholder="CVV"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer Details */}
          {paymentMethod === "transfer" && (
            <div className="bg-fuchsia-300 p-4 rounded-lg" data-aos="fade-left">
              <h4 className="font-medium mb-2 text-fuchsia-600">
                Bank Transfer Instructions
              </h4>
              <p className="text-sm mb-2">
                Please transfer the amount of <strong>${totalPrice}</strong> to:
              </p>
              <div className="text-sm space-y-1">
                <p className="text-fuchsia-500 font-bold">
                  <strong>Bank Name:</strong> Futurelabs Bank
                </p>
                <p className="text-fuchsia-500 font-bold">
                  <strong>Account Name:</strong> Futurelabs/Enterprise plc.
                </p>
                <p className="text-fuchsia-500 font-bold">
                  <strong>Account Number:</strong> 1234567890
                </p>
                <p className="text-fuchsia-500 font-bold">
                  <strong>Routing Number:</strong> 987654321
                </p>
                <p className="text-fuchsia-500 font-bold">
                  <strong>Reference:</strong> {watchName || "Your full name"}
                </p>
              </div>
            </div>
          )}

          {/* PayPal Notice */}
          {paymentMethod === "paypal" && (
            <div
              className="bg-yellow-50 p-4 rounded-lg"
              data-aos="fade-down-left"
            >
              <h4 className="font-medium mb-2">
                You will be redirected to PayPal after form submission
              </h4>
              <p className="text-sm">
                After submitting this form, you'll be taken to PayPal to
                complete your payment of <strong>${totalPrice}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className="h-4 w-4 text-fuchsia-600 rounded"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-fuchsia-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-fuchsia-600 hover:underline">
                Privacy Policy
              </a>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        
        
        <button
          type="submit"
          disabled={isSubmitting || totalPrice === 0}
          className={`w-full py-3 px-4 rounded font-bold ${
            isSubmitting || totalPrice === 0
              ? "bg-fuchsia-400 cursor-not-allowed"
              : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Enroll & Pay $${totalPrice}`
          )}
        </button>
      </form>
    </div>
  );
}
