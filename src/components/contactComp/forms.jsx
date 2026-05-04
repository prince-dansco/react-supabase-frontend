import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FormData() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const form = useRef();



  useEffect(() => {
         AOS.init({
           duration: 800,
           easing: "ease-out",
           once: false,
         });
       }, []);
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data)

    try {
      const result = await emailjs.sendForm(
        "service_x0j65j8",
        "template_zrlgs1d",
        form.current,
        {
          publicKey: "4JJox7RWdMz_on-m0",
        }
      );

      console.log("SUCCESS!", result);
      toast.success("Form submitted successfully!");
      reset();
    } catch (error) {
      console.log("FAILED...", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="md:max-w-[600px] w-full mx-auto bg-[#FFFFFF] p-4 flex flex-col rounded-xl gap-4 shadow-2xl mt-5 mb-10"
        data-aos="zoom-in-down">
        <div className="md:flex items-center justify-between my-2">
          <div className="mb-4">
            <label htmlFor="user_name" className="text-lg font-semibold text-fuchsia-800">
              Name
            </label>
            <input
              {...register("user_name", {
                required:'Name is reuired',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters are allowed",
                },
              })}
              type="text"
              placeholder="Enter your name"
              name="user_name"
              autoFocus
              className="w-full px-4 py-3 rounded-[37px] outline outline-1"
            />
            {errors.user_name && (
              <p className="text-red-500 text-[12px]">{errors.user_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="user_email" className="text-lg font-semibold text-fuchsia-800">
              Email
            </label>
            <input
              {...register("user_email", {
                required:'email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              name="user_email"
              className="w-full px-4 py-3 rounded-[37px] outline outline-1"
            />
            {errors.user_email && (
              <p className="text-red-500 text-[12px]">{errors.user_email.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="text-lg font-semibold text-fuchsia-800">
            Subject
          </label>
          <input
            {...register("subject", {
              required: "Subject is required",
            })}
            type="text"
            placeholder="Write a subject"
            name="subject"
            className="w-full px-4 py-3 rounded-[37px] outline outline-1"
          />
          {errors.subject && (
            <p className="text-red-500 text-[12px]">{errors.subject.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="text-lg font-semibold text-fuchsia-800">
            Message
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
            })}
            placeholder="Write your message"
            name="message"
            className="w-full rounded-lg px-3 py-2 outline outline-1 md:w-full h-fit"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-[12px]">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="text-center my-3 px-8 py-4 bg-fuchsia-500 rounded-[37px] text-white disabled:opacity-70"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
