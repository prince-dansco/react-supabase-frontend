import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogDetailsJavascript() {
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
      {/* Stylish Heading for JavaScript */}
      <div className="text-center my-16">
        <h1 className="text-2xl md:text-5xl font-bold text-fuchsia-300 mb-2">
          Introduction to <span className="text-fuchsia-500">JavaScript</span>
        </h1>
        <p className= "text-base md:text-lg text-gray-600">
          The Language That Makes the Web Interactive
        </p>
      </div>

      {/* Content Sections */}
      <div className="md:px-32 px-4 my-10 flex flex-col md:flex-row items-center gap-4">
        {/* First Section - JavaScript */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 border border-gray-300 rounded-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">JavaScript</h1>
          <h5 className="text-gray-700 text-sm">
            JavaScript is a high-level, interpreted programming language that
            enables interactive web pages. It is a core technology of the web,
            alongside HTML and CSS. JavaScript allows developers to create
            dynamic content, control multimedia, animate images, and handle user
            interactions, making it essential for modern web development.
          </h5>
          <p className="text-gray-700 text-sm mt-2">
            JavaScript is versatile and can be used for both front-end and
            back-end development (via Node.js). It supports event-driven,
            functional, and object-oriented programming styles. With frameworks
            like React, Angular, and Vue.js, JavaScript has become the backbone
            of modern web applications.
          </p>
          <button className="mt-4 px-4 py-2 bg-fuchsia-400 text-white rounded hover:bg-fuchsia-500">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </button>
        </div>

        {/* Second Section - Brendan Eich */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 bg-fuchsia-400 text-white rounded-lg overflow-auto">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg"
              alt="Brendan Eich"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold mt-4">Brendan Eich</h1>
            <p className="text-sm mt-2">
              The inventor of JavaScript and co-founder of the Mozilla Project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}