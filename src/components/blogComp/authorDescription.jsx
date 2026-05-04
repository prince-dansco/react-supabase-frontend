import React, { useEffect } from "react";
// import {Link } from  "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutDetails() {
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
      {/* <h1 className="text-2xl font-bold text-center">introduction to</h1> */}
      <div className="text-center my-16">
        <h1 className="text-lg  md:text-5xl font-bold text-fuchsia-300 mb-2">
          Introduction to <span className="text-fuchsia-600">HTML5</span>
        </h1>
        <p className="text-lg text-gray-600">
          The Language That Powers the Web
        </p>
      </div>
      <div className="md:px-32 px-4 my-10 flex flex-col md:flex-row items-center gap-4">
        {/* First Section */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 border border-gray-300 rounded-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">HTML5</h1>
          <h5 className="text-gray-700 text-sm">
            HTML5 is the latest version of HyperText Markup Language, the code
            that describes the structure and content of web pages. It introduces
            new elements, attributes, and behaviors, making it easier to create
            dynamic and interactive websites. HTML5 supports multimedia elements
            like audio and video natively, without requiring third-party
            plugins.
          </h5>
          <p className="text-gray-700 text-sm mt-2">
            HTML5 also includes features for better semantic markup, such as
            &lt;header&gt;, &lt;footer&gt;, &lt;article&gt;, and
            &lt;section&gt;. These elements help improve the accessibility and
            SEO of web pages. Additionally, HTML5 provides APIs for offline
            storage, drag-and-drop functionality, and more, enabling developers
            to build powerful web applications.
          </p>
          <button className="mt-4 px-4 py-2 bg-fuchsia-400 text-white rounded hover:bg-fuchsia-500">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </button>
        </div>

        {/* Second Section */}
        <div className="max-w-[600px] w-full max-h-[700px] h-full p-4 bg-fuchsia-400 text-white rounded-lg overflow-auto">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg"
              alt="Sir Tim Berners-Lee"
              className="w-full h-64 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-bold mt-4">Sir Tim Berners-Lee</h1>
            <p className="text-sm mt-2">
              The inventor of HTML and the founder of the World Wide Web.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
