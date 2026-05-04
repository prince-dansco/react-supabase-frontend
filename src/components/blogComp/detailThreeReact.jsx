import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogDetailsReact() {
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
      {/* Stylish Heading for React */}
      <div className="text-center my-16">
        <h1 className="text-lg md:text-5xl font-bold text-fuchsia-300 mb-2">
          Introduction to <span className="text-fuchsia-400">React</span>
        </h1>
        <p className="text-lg text-gray-600">
          The Library That Powers Modern Web Interfaces
        </p>
      </div>

      {/* Content Sections */}
      <div className="md:px-32 px-4 my-10 flex flex-col md:flex-row-reverse items-center gap-4">
        {/* First Section - React */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 border border-gray-300 rounded-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">React</h1>
          <h5 className="text-gray-700 text-sm">
            React is an open-source JavaScript library for building user
            interfaces, particularly single-page applications. Developed and
            maintained by Facebook (now Meta), React allows developers to create
            reusable UI components and manage the state of their applications
            efficiently. It uses a virtual DOM to optimize rendering
            performance.
          </h5>
          <p className="text-gray-700 text-sm mt-2">
            React's component-based architecture makes it easy to build complex
            UIs by breaking them into smaller, reusable pieces. With features
            like hooks, context API, and React Router, it has become one of the
            most popular front-end libraries in the world. React Native extends
            its capabilities to mobile app development.
          </p>
          <button className="mt-4 px-4 py-2 bg-fuchsia-400 text-white rounded hover:bg-fuchsia-500">
            <a
              href="https://reactjs.org/docs/getting-started.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </button>
        </div>

        {/* Second Section - Jordan Walke */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 bg-fuchsia-400 text-white rounded-lg overflow-auto">
          <div>
            <img
              src="data:image/webp;base64,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"
              //   src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jordan_Walke_at_React_Conf_2019.jpg/800px-Jordan_Walke_at_React_Conf_2019.jpg"
              alt="Jordan Walke"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold mt-4">Jordan Walke</h1>
            <p className="text-sm mt-2">
              The creator of React and a software engineer at Facebook (Meta).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
