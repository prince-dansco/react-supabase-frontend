import React, { useEffect } from "react";
// import {Link } from  "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogDetailsCss() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-anchor-placement="center-bottom"
    >
      <div className="text-center my-16">
        <h1 className="text-2xl md:text-5xl font-bold text-fuchsia-300 mb-2">
          Introduction to <span className="text-fuchsia-500">CSS</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          The Language That Styles the Web
        </p>
      </div>

      <div className="md:px-32 px-4 my-10 flex flex-col md:flex-row-reverse  items-center gap-4">
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 border border-gray-300 rounded-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">CSS</h1>
          <h5 className="text-gray-700 text-sm">
            CSS (Cascading Style Sheets) is a stylesheet language used to
            describe the presentation of a document written in HTML or XML. It
            controls the layout, colors, fonts, and overall visual appearance of
            web pages. CSS enables developers to create responsive and visually
            appealing designs that work across different devices and screen
            sizes.
          </h5>
          <p className="text-gray-700 text-sm mt-2">
            CSS3, the latest version of CSS, introduces new features like
            animations, transitions, gradients, and flexbox/grid layouts. These
            features make it easier to create modern, dynamic, and interactive
            web designs without relying on JavaScript or images.
          </p>
          <button className="mt-4 px-4 py-2 bg-fuchsia-400 text-white rounded hover:bg-fuchsia-500">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </button>
        </div>

        {/* Second Section - Håkon Wium Lie */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 bg-fuchsia-400 text-white rounded-lg overflow-auto">
          <div>
            <img
              //   src="https://upload.wikimedia.org/wikipedia/commons/7/7d/H%C3%A5kon_Wium_Lie.jpg"
              src="data:image/webp;base64,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"
              alt="Håkon Wium Lie"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold mt-4">Håkon Wium Lie</h1>
            <p className="text-sm mt-2">
              The inventor of CSS and a pioneer in web development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
